$(function () {
    // 首先获取数据渲染到页面
    var getProductManage = function (pageNum) {
        // console.log(1);
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                // 使用模板引擎渲染到页面
                var productResult = template('productManage', data);
                $('tbody').html(productResult);
                //分页操作
                $('.pagination').bootstrapPaginator({
                    /*当前使用的是3版本的bootstrap*/
                    bootstrapMajorVersion: 3,
                    /*配置的字体大小是小号*/
                    size: 'small',
                    /*当前页*/
                    currentPage: data.page,
                    /*一共多少页*/
                    // 总页数=数据的总数/每页显示多少条数据
                    totalPages: Math.ceil(data.total / data.size),
                    /*点击页面事件*/
                    onPageClicked: function (event, originalEvent, type, page) {
                        /*改变当前页再渲染 page当前点击的按钮的页面*/
                        getSecondData(page);
                    }
                });
            }
        })
    }

    getProductManage();

    var picList = [];
    var upload = function () {
        // 下面的id是type=file类型的input的id
        $("#pic").fileupload({
          // 找到上传图片的接口
          url: "/product/addProductPic",
          done: function (e,data) {
            // console.log(data);
            $('.fileupload').append('<img width="50" src="'+ data.result.picAddr +'" alt="">');
            // console.log(data.result);
            picList.push(data.result);
            // console.log(picList);
            
          }
        })
    }


      upload();

    // 校验功能
    $('#productform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '库存不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '价格不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);

        var data = $form.serialize();

        // console.log(data);
        // proName=123
        // &proDesc=123
        // &num=123
        // &price=123
        // &oldPrice=123
        // &size=123
        // 除了data中的数据，还需要id，brandId,PIC图片(从哪取到pic路径)
        $.each(picList, function (i, item) {
            // console.log(i,item);
            data += '&picName' +(i+1) + '=' + item.picName + '&picAddr' +(i+1) + '=' + item.picAddr;
            
        })
        // console.log(data);

        // 现在图片中已经加入了图片路径
        // 还需要加入brandId
        data+='&brandId=4';
        // console.log(data);

        // 数据已经·准备好，开始发送id
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                $('#productModel').modal('hide');
                getProductManage();
            }
        })
        

    });



    
})