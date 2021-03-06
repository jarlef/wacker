# Wacker - The Easy Web Packer

![alt text](https://raw.githubusercontent.com/jarlef/wacker/master/assets/logo.png "Wacker")

Zero configuration web application / library bundler built on top of webpack

## Getting started

### 1 - Install

```bash
npm install wacker --save-dev
```

### 2 - Create an entry point. E.g a html, script or css file

index.html

```html
<html>
    <body>
        <script src="src/main.js"></script>
    </body>
</html>
```

and a script. src/main.js
```js
function main() {
    console.log('do something');
}

main();
```

### 3 - Add scripts to package.json

```json
{
    "scripts": {
        "build": "wack build -e index.html",
        "start": "wack serve -e index.html",
    }
}
```

### 4 - Run/build it

```bash
# run
npm start
# build
npm run build
```

## Supports

- [x] Javascript
- [x] Typescript
- [x] Css
- [x] Scss
- [x] Angular
- [x] React
- [ ] Svelte
- [x] Vue
- [x] Mono repo / Lerna
