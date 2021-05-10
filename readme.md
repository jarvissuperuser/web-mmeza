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

## Quick start
file: `my-element.js`
```javascript
import {{Core, DOMElement, declarer}} from './core/index.js';

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
</body>
...
```
