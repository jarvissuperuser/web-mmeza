# WEB-MMEZa

web-mmeza is a smalllibrary to with runs in the browser without needing to use packagers e.g. webpack, rollup etc.

## possible usecases

- cordova apps ui,
- building SPA that require the ShadowDOM by default,

## features

- url path resoltion (needs improvement) (full resolution or hash resolution)
- DOM Interpolation
  ```js
    object.model.text = 'test text'
  ```
  ```html
    <span>{{text}}</span>
  ```
- Batch custom element registration
- code generation from cli tool

## Quick start
file: `my-element.js`
```javascript
import {Core, DOMElement, declarer} from './core/index.js';

export class MyElement extends DOMElement {
  static get is() { return 'my-element'};
  HTMLTemplate() {
    return `
<div>
  Hello World
</div>
    `
  }
}

declarer([MyElement]);
```


```html
...
<body>
  <my-element></my-element>
  <script src="my-element.js" type="module"></script>  
</body>
...
```

### generating files with cli tool

- generate a new page
```sh
node .lib/generate.js -p new-page -r my/page
```

- generate a shared componen

```sh
node .lib/generate.js -p new-page -r my/page
```
License: MIT
