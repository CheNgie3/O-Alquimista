# Node+TypeScript 开发命令行工具 实现文件操作

## 一、创建Node和TypeScript项目

### 1、安装node 和TypeScript

npm install -g typescript,
如果安装正确,输入 tsc -v, 会显示当前typescript的版本号

### 2、创建项目

创建文件夹，进入文件夹，使用 npm init 创建项目，会产生一个package.json的文件

```json
"dependencies": {

  "@types/node": "^14.14.21"

 }
```

**记得npm install @types/node -d 否则在ts文件中无法使用node类**

要使用TypeScript作为开发语言, 使用命令 tsc --init 来初始化ts的配置,运行后,项目文件夹中出现一个 tsconfig.json 的文件,文件的各个字段定义请参考 [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)

```json
{
  "compilerOptions": {
   
    "target": "es6",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "outDir": "./lib",                        /* Redirect output structure to the directory. */
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,              /* Enable strict null checks. */
    "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}

```



在src文件夹下创建index.ts文件，作为项目入口

### 3、使用tsc命令将ts文件编译成js文件

编译完成后,在dist目录中会出现src中对应的文件,但是扩展名变成.js。使用命令 node ./dist/index.js 运行生产的js文件。

 使用typescript 的 `--watch` 选项，可以自动监听文件变化

在package.json中scripts增加脚本tsc --watch

```json
"scripts": {
  "start": "tsc --watch",
  "debug":"node --inspect-brk ./bin/ucf.js"
 }
```

### 4、使用ts-node直接运行ts文件（可选，用于调试）

1. 安装ts-node, 使用命令 npm install ts-node -g 全局安装ts-node
2. 使用vscode的调试功能, 在 .vscode 文件夹中创建launch.json 文件

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Current TS File",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/ts-node/dist/bin.js",
            "args": [
                "${relativeFile}"
            ],
            "cwd": "${workspaceRoot}",
            "protocol": "inspector"
        }
    ]
}
```



### 二、开发命令行工具

1、npm 包注册的命令需要在 `package.json` 中进行声明

```json
  "bin": {
    "ucf": "./bin/ucf.js"
  },
```

2、/bin/ucf.js的内容：

```js
#!/usr/bin/env node
require('../lib/index.js');
```

/lib/index.js为tsc命令编译成的js文件，在src/index.ts文件中书写逻辑。

3、在当前目录调用 `npm link` ，这条命令会把我们本地注册的命令放到 Nodejs 安装目录的 `bin` 文件夹下。这样就可以在全局使用ucf命令了。