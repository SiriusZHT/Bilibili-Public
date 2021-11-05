## 如果有巨量的图片要展示，除了懒加载的方式，有没有什么其他方法限制一下同时加载图片数量

实现 promise 的并发控制

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326214608466.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326214618686.png)

### 我们常说的 chunk 和 bundle 区别是什么

1. chunk

webpack 打包是一个入口模块开始，入口模块引用其他模块，其他模块引用其他模块。。。。
webpack 通过引用关系逐个打包模块，这些 modole 就形成了一个 chunk

如果有多个入口模块，可能会产出多条打包路径对吧，每条路径就会形成一个 chunk

2. bundle

是我们最终输出的一个或者多个打包好的文件

3. 两者的关系是什么？

大多数情况下，一个 chunk 会产生一个 bundle，但也有例外
如果加了 sourcemap，一个 entry，一个 chunk 对应两个 bundle
chunk 是过程中代码块 bundle 是打包结果输出的代码块

- 初始化 npm -> package.json
- 新建.npmrc -> 配置淘宝源
- 安装 webpack -> npm i webpack webpack-cli -D
- src
- 新建配置 webpack config
-
