<template>
    <el-row>
        <!-- span默认总24，两个分隔栏所占宽度1:2  ，即8:16 -->
      <el-col :span="8" style="padding-right:10px">
            <!-- 用户信息卡片 -->
            <el-card class="box-card" shadow='hover'>
                <div class="user">
                    <img src="../assets/images/user.jpg" alt="头像">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2022-10-11</span></p>
                    <p>上次登录地点：<span>南京</span></p>
                </div>
            </el-card>
            <!-- 数据表格 -->
            <el-card shadow="hover" style="margin-top: 20px;height: 460px;">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val" />
                </el-table>
            </el-card>        
      </el-col>
      <!-- 右侧区域 -->
      <el-col :span="16"  style="padding-left:10px">
        <!-- 右上方6个盒子 -->
        <div class="num">
            <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}" >
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                <div class="detail">
                    <p class="price">￥ {{item.value}}</p>
                    <p class="dec">{{item.name}}</p>
                </div>
            </el-card>
        </div>
        <el-card shadow="hover" style="height:280px">
            <!-- 折线图（大） -->
            <div ref="echarts1" style="height:280px"></div>
        </el-card>
        <div class="graph">
            <el-card shadow="hover" style="height:260px">
                <!-- 柱状图 -->
                <div ref="echarts2" style="height:260px"></div>
            </el-card>
            <el-card shadow="hover" style="height:260px">
                <!-- 饼图 -->
                <div ref="echarts3" style="height:240px"></div>
            </el-card>
        </div>
      </el-col>
    </el-row>
</template>

<script>
import { getData } from "../api"
import * as echarts from 'echarts'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    data () {
        return{
            tableData: [ ],  // 表格数据
            tableLabel: {    // 列名
                name:'课程',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买'
            },
            countData:[  // 6个盒子
            {
                name:"今日支付订单",
                value:1234,
                icon:"success",
                color:"#2ec7c9"
            },{
                name:"今日收藏订单",
                value:210,
                icon:"star-on",
                color:"#ffb980"
            },{
                name:"今日未支付订单",
                value:1234,
                icon:"s-goods",
                color:"#5ab1ef"
            },{
                name:"本月支付订单",
                value:1234,
                icon:"success",
                color:"#2ec7c9"
            },{
                name:"本月收藏订单",
                value:210,
                icon:"star-on",
                color:"#ffb980"
            },{
                name:"本月未支付订单",
                value:1234,
                icon:"s-goods",
                color:"#5ab1ef"
            },
            ],

        }
    },
    mounted () {
        getData().then(({data}) => {
            const {tableData} = data.data
            this.tableData = tableData
            //  初始化echarts实例
            const echarts1 = echarts.init(this.$refs.echarts1)
            //指定图表配置项和数据
            var echarts1Option = {}
            const {orderData,userData,videoData} = data.data
            // 取出series中的name部分
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData ={
                data: xAxis
            }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis= {}
            echarts1Option.legend = xAxisData
            echarts1Option.series = []
            // 循环添加数据
            xAxis.forEach(key=>{
                echarts1Option.series.push({
                    name: key,
                    data: orderData.data.map(item=>item[key]),
                    type:'line'
                })
            })
            echarts1.setOption(echarts1Option)
            //柱状图
            const echarts2 = echarts.init(this.$refs.echarts2)
            const echarts2Option={
                legend:{
                    textStyle:{
                        color: "#333",
                    },
                },
                grid:{
                    left:"20%",
                },
                tooltip:{
                    trigger:"axis",
                },
                xAxis:{
                    type:"category",
                    data: userData.map(item => item.data),
                    axisLine:{
                        lineStyle:{
                            color:"#17b3a3",
                        },
                    },
                    axisLabel:{
                        interval:0,
                        color:"#333",
                    },
                },
                yAxis:[
                    {
                        type:"value",
                        axisLine:{
                            lineStyle:{
                            color:"#17b3a3",
                            },
                        },
                    },
                ],
                color:["#2ec7c9","#b6a2de"],
                series:[
                    {
                        name: '新增用户',
                        data: userData.map(item=>item.new),
                        type:'bar'
                    },
                    {
                        name: '活跃用户',
                        data: userData.map(item=>item.active),
                        type:'bar'
                    }
                ],
            }
            echarts2.setOption(echarts2Option)
            //饼状图
            const echarts3 = echarts.init(this.$refs.echarts3)
            const echarts3Option={
                tooltip:{
                    trigger:"item",
                },
                color:[
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series:[
                {
                    data:videoData,
                    type:'pie',
                }
                ],
            }
            echarts3.setOption(echarts3Option)
        })
    }
}

</script>

<style lang="less" scoped>
.user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img{
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    .userinfo{
        .name{
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access{
            color: #999;
        }
    }
}
.login-info{
    p{
        line-height: 28px;
        font-size: 14px;
        color: #999;
        span{
            color: #666;
            margin-left: 60px;
        }
    }
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        color: #fff;
        text-align: center;
        line-height: 80px;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .dec{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    .el-card{
            width: 32%;
            margin-bottom: 20px;
        }
}
.graph{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .el-card{
        width: 48%;
    }
}
</style>