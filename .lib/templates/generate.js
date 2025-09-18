#!/usr/bin/env node
import parser from 'tree-sitter';
import loader from 'tree-sitter-javascript';
import hbs from 'handlebars';
import fs from 'fs';
import path from 'path';



const p = new parser();
p.setLanguage(loader);


const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
}

const argMap = {
  '--page': 'page',
  '--shared': 'shared',
  '--route': 'route',
  '-p': 'page',
  '-s': 'shared',
  '-r': 'route',
  '--component': 'component',
  '-c': 'component',
  '-d': 'dry',
};

const importQry = 
`(import_statement 
    (import_clause 
      (named_imports 
        (import_specifier name: 
          (identifier) @import
        )
      ) @clause
    )     
    source: (string) @source
  )`;
const exportArrQry = '(export_statement declaration: (lexical_declaration (variable_declarator name: (identifier) @exp value: (array (identifier) @imts ) )) )';
const exQryStmt = '(export_statement) @capture';
const exRouteQry = `
(export_statement 
  declaration: 
  (lexical_declaration 
    (variable_declarator name: 
      (identifier) 
  value: 
      (array 
        (object) @capture 
      )
    )
  )
)`
const getImportNode = (searchPath, root) => {
  const iqry = new parser.Query(loader,importQry);
  const nodes = iqry.matches(root).map(r => r.captures.flatMap(c => c.node));
  const imt = []
  for ( const node of nodes) {
    if (node[2].text.toString().includes(searchPath)){
      imt.push(node[1])
    }
  }
  return imt;
}

const getArguments = (args) => {
  const parsedArgs = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--') || arg.startsWith('-')) {
      const key = argMap[arg];
      const value = args[i + 1];
      parsedArgs[key] = key==='dry'? true :value;
      i++;
    }
  }
  return parsedArgs;
}

const getConfigPaths = (configPath = './.lib/config.wcz.json') => {
  const configContents = fs.readFileSync(configPath);
  const config = JSON.parse(configContents.toString());
  let paths = {};
 for (const x in config) {
    const item = config[x];
    
    if (item.path && item.file) {
      paths[x] = {
        ...item,
        fullPath: path.join(item.path, item.file),
      };
    }
    if (x === 'templates') {
      paths[x] = {
        ...item,
        pagePath: path.join(item.path, item.page),
        routePath: path.join(item.path, item.route),
      };
    }
  }
  return paths;
};
const getExportNode = (filterExp,root) => {
  const iqry = new parser.Query(loader, exportArrQry);
  const nodes = iqry.matches(root).map(r => r.captures.flatMap(c => c.node));
  const imt = []
  for ( const node of nodes) {
    if (node[0].text.toString().includes(filterExp)){
      imt.push(node[1])
    }
  }

  return imt;
}

const getRoutes = (root) => {
  const iqry = new parser.Query(loader, exRouteQry);
  const nodes = iqry.matches(root).flatMap(r => r.captures.flatMap(c => c.node));
  return nodes[nodes.length -1];
}


const generateFileContents = (fileName = 'login-page',path = '') => {
  const toPascalCase = (name) => {
    const step1 = name.split('-');
    let caps = step1.map(i =>  i.charAt(0).toUpperCase()+i.slice(1).toLowerCase());
    return caps.join('');
  }
  const componentTemplate = fs.readFileSync(path);
  const tmplt = hbs.compile(componentTemplate.toString(),{noEscape: true, preventIndent: true});
  const result = {
    PageName: toPascalCase(fileName),
    ComponentName: fileName,
    fullFileName: `${fileName}.js`,
  }
  result.fileContents = tmplt(result);
  return result;
}

const updateIndex = (fileResult,  path = './') => {
  const fileContents = fs.readFileSync(path);
  const exQryStmt = '(export_statement) @capture';
  const tree = p.parse(fileContents.toString());
  const qry = new parser.Query(loader, exQryStmt);
  let lastExport;
  /*qry.matches(tree.rootNode).forEach(m => {
    lastExport = m.captures[0].node;
  });*/
  const nodesSearch = qry.matches(tree.rootNode);
  const cnt = nodesSearch.length;
  lastExport = nodesSearch[cnt - 1].captures[0].node;
  const src = tree.rootNode.text;
  return `${src.slice(0, lastExport.endIndex)}\nexport { ${fileResult.PageName} } from "./${fileResult.ComponentName}.js";`;
}

const ensureLoading = (fileResult,type = 'pages',  path = './') => {
  const fileContents = fs.readFileSync(path);
  const tree = p.parse(fileContents.toString());
  const nodes = getImportNode( type, tree.rootNode);
  const exNodes = getExportNode( type, tree.rootNode);
  const src = tree.rootNode.text.toString();
  const {endIndex} = nodes[nodes.length - 1];
  const lx = exNodes[exNodes.length -1];
  return `${ src.slice(0, endIndex+1 )}\n    ${ fileResult.PageName }    ${ src.slice(endIndex,lx.endIndex) },\n    ${ fileResult.PageName },\n${ src.slice(lx.endIndex+1)}`;
}

const addRoute = (fileResult, route = 'login', path = './', routePath = './routeObject.hbs') => {
  const fileContents = fs.readFileSync(path);
  const routeText = fs.readFileSync(routePath).toString();
  const routeTemplate = hbs.compile(routeText, {noEscape: true, preventIndent: true});
  const routeVars = {
    route,
    ComponentName: fileResult.ComponentName
  } 
  const result = routeTemplate(routeVars);
  const {rootNode} = p.parse(fileContents.toString());
  const src = rootNode.text.toString();
  const {endIndex} = getRoutes(rootNode);
  return `${src.slice(0, endIndex+1)}\n    ${result}${src.slice(endIndex+1)}`; 
}

(async function main() {
  const args = process.argv.slice(2);
  const {page, shared, route, dry} = getArguments(args);
  const config = getConfigPaths();
  const fileResult =  {};
  if (page) {
    const {fullPath, destination} = config.pages;
    if (!fs.existsSync(destination)) {
      console.error(`${colors.red} src folder does not exist`);
      return;
    }
    const generateFile = generateFileContents(page, config.templates.pagePath);
    fileResult.file = generateFile;
    fileResult.destination = destination;
    const fileDestination = path.join(destination, generateFile.fullFileName);
    if (fs.existsSync(fileDestination)) {
      console.error(`${colors.red}${fileDestination} already exists`);
      return;
    }
    const webRoute = route? route : page;
    console.log(`${fileDestination} generated`);
    const indexFile = updateIndex(fileResult.file, fullPath);
    console.log(`${fullPath} updated`);
    const routePath = path.join(config.templates.path, config.templates.route);
    const routesFilePath = path.join(config.routes.destination, config.routes.file);
    const routeFile = addRoute(fileResult.file, webRoute, routesFilePath, routePath);
    console.log(`${routesFilePath} updated, route /${webRoute} added`);
    const loaderFilePath =  path.join(config.loader.path, config.loader.file);
    const updatedLdFile = ensureLoading(fileResult.file, 'pages', loaderFilePath);
    console.log(`${loaderFilePath} updated`);
    if (dry) {
      console.log(`${colors.cyan}Dry run, no files will be written`);
      return;
    }
    fs.writeFileSync(fileDestination, fileResult.file.fileContents);
    fs.writeFileSync(fullPath, indexFile);
    fs.writeFileSync(routesFilePath, routeFile);
    fs.writeFileSync(loaderFilePath, updatedLdFile);
    console.log(`${colors.green}files persisted to disk`);
    return;
  }

  if (shared) {
    const {fullPath, destination} = config.shared;
    const generateFile = generateFileContents(shared, config.templates.pagePath);
    const fileDestination = path.join(destination, generateFile.fullFileName);
    if (fs.existsSync(fileDestination)) {
      console.error(`${colors.red}${fileDestination} already exists`);
      return;
    }
    console.log(`${fileDestination} generated`);
    fileResult.file = generateFile;
    fileResult.destination = destination;
    const indexPath = path.join(config.shared.destination, config.shared.file);
    const indexFile = updateIndex(fileResult.file, indexPath);
    console.log(`${indexPath} updated`);
    const loaderFilePath =  path.join(config.loader.path, config.loader.file);
    const updatedLdFile = ensureLoading(fileResult.file, 'shared', loaderFilePath);
    console.log(`${loaderFilePath} updated`);
    if (dry) {
      console.log(`${colors.cyan}Dry run, no files will be written`);
      return;
    }
    fs.writeFileSync(fileDestination, fileResult.file.fileContents);
    fs.writeFileSync(indexPath, indexFile);
    fs.writeFileSync(loaderFilePath, updatedLdFile);
    console.log(`${colors.green}files persisted to disk`);
    return;
  }
})()
