<template>
  <div class="tabs">
        <!--closable 首页的tag不能删除 -->
     <el-tag
        v-for="(item,index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' :'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        size="small" >
        {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data(){
        return {
        }
    },
    computed:{
        //获取vuex的标签集合数据
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag标签跳转路由
        changeMenu(){   
            this.$router.push({name: item.name})
            //  this.$store.commit('selectMenu', item)
        },
        // 点击tag删除标签功能
        handleClose(item,index){
            this.closeTag(item)   //调用store中mutation，删除数据
            const length = this.tags.length  //获取删除后的长度
            // 如果关闭的标签不是当前路由，就不跳转
            if(item.name !== this.$route.name){
                return 
            }
            //删除的是最后一项，就往左跳转一个
            if(index === length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{  //否则，往右跳转
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>