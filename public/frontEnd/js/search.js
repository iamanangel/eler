$(function () {
    
    // setHistoryData('nick');
    // 刚进入的时候要显示历史纪录，调用showHistoryData（）；
    // 先获取本地仓库的数据(编写一个获取本地存储的函数getHistoryData，在此处直接调用)，然后进行判断，如果本地仓库数据为空，则让p（提示历史搜索为空）
    // 如果本地仓库中有历史搜索，则从localhost中获取历史列表，渲染到页面上
    // var showHistoryData = function () {
    //     var list = getHistoryData();
    //     if(list.length == 0) {
    //         $('.empty-history').show();
    //         $('.search-history').hide();
    //     }else {
    //         //展示历史纪录
    //         var historyList = template('historyTeplate',{
    //             list: list
    //         })
    //         $('.search-history-list').html(historyList);
    //         $('.empty-history').hide();
    //         $('.search-history').show();
    //     }
    // }
    showHistoryData();

    //点击搜索按钮 把关键词加入历史记录
    var searchInput = $('.search-box input');
    $('#search-btn').on('tap', function () {
        // console.log(1);
        var keyWord = searchInput.val();
        // console.log(keyWord);
        setHistoryData(keyWord);
        location.href = './searchList.html?proName=' + keyWord;
        showHistoryData();

    })

    // 点击删除按钮
    $(".search-history-list").on('tap', 'i', function () {
        var deleteData = $(this).siblings('span').html();
        // console.log(deleteData);

        removeHistoryData(deleteData);
        showHistoryData();
    })
    //点击清空按钮 
    $('#clear-history').on('tap', function () {
        // 为什么不用localStorage.clear(); 怕影响其他网站或本网站的功能
        localStorage.removeItem('ltHistory');
    })

    // 点击搜索里面的历史，进行页面跳转
    $('.search-history-list').on('tap', 'span', function () {
        var keyword = $(this).html();
        location.href = './searchList.html?proName=' + keyword;
    })

    
})

//首先获取数据
var getHistoryData = function(){
    return JSON.parse( window.localStorage.getItem('ltHistory')||'[]');
  }


var addHistoryData = function (value) {
    // 先获取本地仓库的全部数据，为一个对象格式
    var list = getHistoryData();
    // 遍历该数组
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    })
    list.push(value);
    // 目前是数组，需要转换为字符串，再设置给本地仓库
    localStorage.setItem('ltStorage', JSON.stringify('list'));
}



var setHistoryData = function (value) {
    // 获取历史记录
    var list = getHistoryData();

    // 遍历数据(去除重复数据)
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    });

    list.push(value);

    localStorage.setItem('ltHistory', JSON.stringify(list));
}


var removeHistoryData = function (value) {
    var list = getHistoryData();//获取历史记录

    // 找到和历史记录列表中的某一项一样的数组元素 切掉
    $.each(list, function (i, item) {
        if (value == item) {
            list.splice(i, 1);
        }
    })

    // 把切掉的后的数组 放回历史记录中
    window.localStorage.setItem('ltHistory', JSON.stringify(list));
}


var showHistoryData = function () {
    var list = getHistoryData();//空数组或有长度的数组
    if (list.length == 0) {
        // 告诉用户没有历史记录
        $('.empty-history').show();
        $('.search-history').hide()

    } else {
        // 展示历史记录
        var historyList = template('historyTeplate',
            {
                // list: ['nike','gucci']
                list: list
            });

        $('.search-history-list').html(historyList);
        $('.search-history').show()
        $('.empty-history').hide();


    }
}