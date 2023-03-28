5、 package-lock文件的作用： 对整个依赖树进行版本固定的（锁死）

在执行npm install 的时候，会自动生成package-lock.json的文件。

用于记录当前状态下实际安装的各个npm package的具体来源和版本号。

当package.json与 package-lock.json的版本信息不一致的时候

    当大版本一致的时候，package.json中的小版本 小于 package-lock.json时，则被package-lock.json锁定。 当大于时候，则 会安装大版本下的最新的版本，并 更新至 package-lock.json中。
    当大版本不同时候，npm install 遵循的是 package.json中的版本
    如果一个模块在package.json中有记录，而在package-lock.json中无记录时，npm install后则会在package-lock.json中有详细记录，反之同理。



6、 cnpm不支持package-lock.json

    使用cnpm install时候，并不会生成package-lock.json文件。
    cnpm install的时候，就算你项目中有package-lock.json文件，cnpm也不会识别，仍会根据package.json来安装。所以这就是为什么之前你用npm 安装产生了package-lock.json，后面的人用cnpm来安装，可能会跟你安装的依赖包不一致，这是因为cnpm 不受package-lock.json影响，只会根据package.json进行下载。
