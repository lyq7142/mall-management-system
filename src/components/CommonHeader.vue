<template>
  <div class="header-container">
    <div class="l-content">
        <el-button style="margin-right:20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
                {{item.label}}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.jpg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    name:"CommonHeader",
    data(){
        return {
        }
    },
    methods:{
        // 控制左侧菜单是否折叠
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        // 退出登录
        handleClick(command){  
            if(command === 'cancel'){
                Cookie.remove('token') //清除cookie中的token
                Cookie.remove('menu') //清除cookie中的menu
                this.$router.push('/login')
            }
        }
    },
    computed:{
        // 获取vuex数据的另一种写法
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    mounted(){
        // console.log(this.tags,'tags');
    }
}
</script>

<style lang="less" scoped>
// 写了scoped ->不会覆盖elementUI默认的样式
.header-container{
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content{
        display: flex;
        align-items: center;
        //deep可以强制修改默认ElementUI样式
        /deep/.el-breadcrumb__item{
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color: #666
                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                   color:#fff
                }
            }

        }
    }
}

</style>