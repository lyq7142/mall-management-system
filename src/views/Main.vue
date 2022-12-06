<template>
  <div>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <!-- 右侧栏 -->
      <el-container>
        <!-- header部分 -->
        <el-header>
         <common-header />
        </el-header>
        <!-- 面包屑 -->
        <common-tag />
        <!-- 中间部分 -->
        <el-main> 
          <!-- 唯一变化的地方，用router-view展示所需控件  -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  data () {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
};
</script>

<style scoped>
.el-header{
    padding: 0;
}
</style>
