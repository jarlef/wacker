# Wacker

Zero configuration web application / library bundler

## Getting started

1. Install 

```
npm install wacker
```

2. Create an entry point. E.g a html, script or css file

- index.html
```html
<html>
    <body>
        <script src="src/main.js"></script>
    </body>
</html>
```

- src/main.js
```js
function main() {
    console.log('do something');
}

main();
```

3. Add scripts to package.json

```json
{
    "scripts": {
        "build": "wack build -e index.html",
        "start": "wack serve -e index.html",
    }
}
```

4. Run/build it

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
