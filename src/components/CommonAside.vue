<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse? '后台':'通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)"  v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          {{subItem.label}}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      // menuData: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其它",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       }
      //     ]
      //   },
      // ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 根据名称 跳转路由
    clickMenu(item) {
      if ( this.$route.path !== item.path && !(this.$route.path === "/home" && (item.path === "/"))) {
      //  跳转路由（当页面的路由和跳转的路由不一致）
       this.$router.push(item.path);
      }
      // 调用vuex的selectMenu方法存储数据
      this.$store.commit('selectMenu',item)
    },
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单（问题 有子菜单的永远在没有子菜单的下面）
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    menuData(){
      // 判断当前数据，如果缓存中没有，当前store中获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    isCollapse(){   //从vuex中取得数据
        return this.$store.state.tab.isCollapse;
    }
  },
};
</script>

<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 120vh;
  border-right: none;
  h3 {
    color: #fff;
    line-height: 48px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
