# my-management-system

技术栈：vue2 + vuex + vue-router + element-ui + axios + mock + echarts + less

项目目录：
-src
    -api     接口
        -mockServeData
        -index.js
        -mock.js
    -assets    图片
    -components   公共组件
        -CommonAside.vue
        -CommonHeader.vue
        -CommonTag.vue
    -router     路由
        -index.js
    -store     状态管理
        -index.js
        -tab.js
    -utils     axios
        -request.js
    -views     页面视图
        -Home.vue
        -Login.vue
        -Main.vue
        -Mall.vue
        -PageOne.vue
        -PageTwo.vue
        -User.vue
-App.vue
-main.js

* 管理员/用户：
登录：用户名 密码
admin admin
lyq lyq

* 功能模块
管理员：首页、商品管理、用户管理、其它1 2...
用户：首页、商品管理

导航栏：点击菜单跳转页面，点击悬停效果
顶栏：用户退出登录，面包屑，tag，导航栏展开/收起
首页：图表，卡片，mock模拟数据
用户管理：新删改查，表格，表单，分页，对话框
登录：表单，导航守卫，不同用户权限，动态添加路由，token，cookie，mock
