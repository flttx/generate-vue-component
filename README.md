# generate-vue-component README

一键生成 vue 组件，组件目录结构：

- my-component
  - my-component.vue
  - my-component.scss
  - index.js

### 组件引用

import MyComponent from '@/components/my-component'

### 打包

全局安装 vsce

运行 vsce package，会打包出一个 vsix 文件
