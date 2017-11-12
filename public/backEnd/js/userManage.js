$(function () {
    //获取数据(封装到一个函数里面)
    // console.log('1');
    var getUserManageData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var userManageResult = template('usermanage-template', data);
                $('tbody').html(userManageResult);

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
                        getUserManageData(page);
                    }
                });
            }
        })
    }
    
    getUserManageData();

    $('tbody').on('click', '.btn', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;
        if(isDelete ==1) {
            $('.modal-body').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要启用' + name + '吗？');
        }else {
            $('.modal-body').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要禁用' + name + '吗？');
        }

        $('#manage-modal').on('click', '#user-modal', function () {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if( data.success == true) {
                        $('#manage-modal').modal('hide'); 
                        getUserManageData();
                    }
                } 
            })
        })
       
    })

    
})