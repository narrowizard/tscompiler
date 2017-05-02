# tscompiler

## usage 

```shell
npm install
node server.js
```

## api

### /tscompiler
+ compile giving ts code to js.
+ method:post
+ params:
    + Source:source code
    + Config:tsconfig.json
+ returns:
```js
{
    "outputText":string,    // compiled js code
    "diagnostics":[]string
}
```

### /html/normal
+ normalize the given html expression
+ method:post
+ params:
    + Data: html expression
+ returns:
```js
{
    "Normal":bool, // true if the given expression is already normalized.
    "Input":string, // the given expression,
    "Output":string // the normalized expression
}
```