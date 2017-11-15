$(function () {

    // 加载页面数据


    getDetailData();
})

var getDetailData = function () {
    // /product/queryProductDetail
    // id |是|产品id
    var url = new URLSearchParams(location.search);
    var id = url.get('id');
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            
            // 获取尺码
            var num = data.size;
            var size = num.split('-');
            data.size=size;
            console.log(data)

            // console.log(arr);
            // var obj = {
            //     arr: arr
            // }
            // console.log(obj.arr[0]);
            // var numData = template('numTemplate',obj);
            // $('.product-size').html(numData);
            var detailData = template('detailTemplate', data);
            $('.lt-details').html(detailData);

            
        }
    })
}