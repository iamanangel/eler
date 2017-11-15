$(function () {
    //首先根据搜索关键词发送ajax请求，通过接口拿到对应的数据，渲染页面
    getSearchListData();
    // 下拉刷新功能
    mui.init({
        pullRefresh: {
            container: "#lt-search",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height: '50px',//可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    getSearchListData();
                }
            }
        }
    });
    var flag = true;
    var judge = true;
    // 按价格排序功能
    $('.order-price').on('tap', function () {
        // 点击后按钮变色(清除别的按钮的颜色)
        $('.search-result-order a').removeClass('active');

        $(this).addClass('active');
        // 默认为降序，flag为true时，进入if，降序变为升序，而且更换小图标为升序

        if (flag) {
            // 更换小图标箭头
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
            getSearchListData(1, 1, 2);
            flag = false;
        }else {
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
            getSearchListData(1, 2, 2);
            flag = true;
        }
    })

    // 按库存排序
    $('.order-stock').on('tap', function () {
        // 点击后按钮变色(清除别的按钮的颜色)
        $('.search-result-order a').removeClass('active');

        $(this).addClass('active');
        // 默认为降序，flag为true时，进入if，降序变为升序，而且更换小图标为升序

        if (judge) {
            // 更换小图标箭头
            $(this).find('i').addClass('fa-angle-up');
            $(this).find('i').removeClass('fa-angle-down');
            getSearchListData(1, null, 1);
            judge = false;
        }else {
            $(this).find('i').addClass('fa-angle-down');
            $(this).find('i').removeClass('fa-angle-up');
            getSearchListData(1, null, 2);
            judge = true;
        }
    })

    // 点击按钮，立即购买(进入商品详情)
    $('.search-result-list').on('tap', 'button', function () {
        // 要通过地址传入参数id，找到对应的数据
        
        var id = $(this).attr('data-id');
        // console.log(id);
        location.href = './detail.html?id=' + id;
    }) 

})

// 加载页面数据的函数
var getSearchListData = function (pageNum, price, num) {
    //需要的数据，proName怎么通过地址获取
    // console.log(location);
    // location是一个对象，里面的href属性既包含完整的地址和从搜索页面传来的参数
    // location里面的search属性：只包含参数
    //search:"?proName=n"
    // 通过内置对象的方法获取到需要的参数
    var url = new URLSearchParams(location.search);
    var proName = url.get('proName');

    // 请求方式 // GET // proName |否|产品名称 // brandId |否|品牌id
    // price |否|使用价格排序（1升序，2降序）
    // num |否|产品库存排序（1升序，2降序）// page |是|第几页
    // pageSize|是|每页的条数

    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: {
            proName: proName || '',
            page: pageNum || 1,
            pageSize: 6,
            price: price || null,
            num: num || 2
        },
        success: function (data) {
            console.log(data);
            // 将数据通过模板引擎渲染到页面
            var searchData = template('searchListTemplate', data);
            $('.search-result-list').html(searchData);
        }

    })
}