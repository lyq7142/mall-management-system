import Cookie from 'js-cookie'
export default{
    // 存储数据
    state:{
        isCollapse: false,   //菜单展开
        tabsList:[   //面包屑数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ] , 
        menu:[]  // 菜单栏
    },
    // 调用方法
    mutations:{
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse 
        },
        //更新面包屑数据
        selectMenu(state, val){
            // console.log(val,'val');
            if(val.name !== 'home'){  //判断添加的数据是否首页
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if(index === -1){
                    state.tabsList.push(val)
                }
            }
        },
        // 关闭标签，面包屑
        closeTag(state,item){ 
            // console.log(item,'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1)
        },
        // 设置menu的数据
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu'))  return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item=>{
                        item.component=()=> import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component=()=> import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // console.log(menuArray,'menuArray');
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}