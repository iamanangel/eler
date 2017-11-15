$(function () {
    // 声明一个获取一级分类的方法
    var getFirstData = function () {
        // /category/queryTopCategory
        // 请求方法get
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategory',
            data: {},
            success: function (data) {
                // console.log(data);
                var firstResult = template('firstTemplate',data);
                $('.lt-sort-left ul').html(firstResult);
                // 在开始打开该页面时，调用二级分类的ajax的查询，选定第一个里面的内容渲染到页面
                getSecondData(data.rows[0].id);
            }
        })
    }
    getFirstData();

    // 当点击对应的li里面的a时，显示一级选项中对应的二级选项
    $('.lt-sort-left ul').on('tap','a', function () {
        // console.log(1);
        $('.lt-sort-left ul').find('a').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('data-id');
        getSecondData(id);
    })

    // 声明一个获取二级分类的方法
    var getSecondData = function (id) {
        // 接口地址/category/querySecondCategory
        // 请求方式get
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data:{
                id: id
            },
            success: function (data) {
                // console.log(data);
                var secondResult = template('secondTemplate',data);
                $('.brand-list').html(secondResult);
            }
        })
    }

})