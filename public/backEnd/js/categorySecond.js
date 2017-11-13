$(function () {
    //先获取数据到页面上
    // console.log(1);
    var getSecondData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var secondResult = template('second-template', data);
                $('tbody').html(secondResult);
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

    getSecondData();
    

    //表单里的数据都可以取到

    // 校验表单
    $('#secondform').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        // 字段名是name属性的值
        brandName: {
          validators: {
            notEmpty: {
              message: '二级分类不能为空'
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

      console.log(data);
      // 使用ajax提交表单数据
      $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data: data,
        dataType: 'json',
        success: function (data) {
          // console.log(data)
          getSecondData();
        }

      })
     
    });


    //封装一个下拉框动态取数据的文件
var dropDown = function () {
  var dropdown = $('.dropdown');
  dropdown.on('click', function () {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 20
      },
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        var html = '';
        $.each(data.rows,function(i , item) {
          console.log(i,item);
          html += '<li><a href="javascript:;" data-id='+ item.id +'>'+ item.categoryName +'</a></li>';
        })
        $('.dropdown-menu').html(html);
        $('.dropdown-menu').on('click', 'a', function (){
          $('.dropdown-text').html($(this).html());
          // 由于只能验证表单里面的元素，但是一级分类的选项不在表单里面。无法验证，所以通过添加隐藏的input，取到想要的数据
          // 在这虽然要取categoryName的值，但是，由于接口要求传入的是id，故在此取id放入到隐藏的input中
          $('#categoryId').val($(this).attr('data-id'));
        }) 
      }
    })
  })
}

// 封装一个
var upload = function () {
  
  $("#secondupload").fileupload({
    // 找到上传图片的接口
    url: "/category/addSecondCategoryPic",
    done: function (e,data) {
      console.log(data);
      $('#previewimg').attr('src',data.result.picAddr);
      $('#brandLogo').val(data.result.picAddr);
      
    }
  })
}

dropDown();
upload();     
})



 