// 该文件的功能是用来写首页的js交互的
//设置左边侧边栏的显示与隐藏
 $('[data-menu]').on('click', function () {
     $('.lt_aside').toggle();
     $('.lt_section').toggleClass('menu');
 })

//  左边菜单的下拉项(事件委托给a，直接点击a会触发)
$('.lt_aside .menu').on('click','[href="javascript:;"]', function () {
    var _this = $(this);
    // console.log(_this);
    var child = _this.siblings();
    child.slideToggle();
})

//退出功能
$('.btn-primary').on('click', function () {
    $.ajax({
        type: 'get',
        url: 'javascript',
        dataType: 'json',
        success: function (data) {
            if(success){
                location.href = './login.html';
            }
        }
    })
})