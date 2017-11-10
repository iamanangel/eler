// 该文件是用来写echarts这个图表的文件
$(function () {
    // 柱状图
   var firstDom = document.querySelector('.picTable:first-child');
   var firstChart = echarts.init(firstDom);
    
    var option = {
        title: {
           text: '2017年注册人数'
        },
        color: ['#ff0000'],
        legend: {
            data: ['人数']
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['一月', '二月', '三月', '四月', '五月', '六月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'人数',
                type:'bar',
                barWidth: '60%',
                data:[1000, 2500, 2800, 3300, 1600, 1200]
            }
        ]
    };
    firstChart.setOption(option);

    // 饼状图
    var secondDom = document.querySelector('.picTable:last-child');
    var secondChart = echarts.init(secondDom);

    var secondoption = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','百伦','安踏','李宁']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    secondChart.setOption(secondoption);
    
})