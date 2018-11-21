# Umi TypeScript Template
这个一个使用[create-umi](https://github.com/umijs/create-umi)创建的项目。

它将告诉你:如何在[Umi](https://umijs.org/)中使用TypeScript。

下面将对几个特殊文件作简易的说明。

## 临时文件
指临时解决方案，官方修复后，可删除相应文件。
### jest.config.js
ts-jest 版本升级后和 babelConfig 配置不兼容，相关Issues:[umi#1386](
https://github.com/umijs/umi/issues/1386).
### dva.d.ts
在项目中如下使用dva/connect时，无法正确识别state类型
```
@connect(state => state.global)
class App extends React.Component { }
```
相关PR[dvajs#1966](https://github.com/dvajs/dva/pull/1966)

## import图片和css
比如在项目中import文件：
```js
import styles from './index.css';
import logo from './logo.png'; 
```
会提示
>Cannot find module './logo.png'.

>Cannot find module './index.css'.

所以在typings.d.ts文件中声明
```ts
declare module "*.css";
declare module "*.png";
...
```
更多如何使用图片，请查看[after-the-build-the-picture-is-lost](https://umijs.org/guide/faq.html#after-the-build-the-picture-is-lost)



遇到任何问题，欢迎[PR](https://github.com/umijs/create-umi)和[Issues](ttps://github.com/umijs/umi/issues)