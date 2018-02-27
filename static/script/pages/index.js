// 前后端数据交互的 js 代码

// 用ajax拿到数据后用Vue 渲染
$.get('/ajax/index',function(d){
    // console.log('index.js---')
    // debugger;
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;

    new Vue({
        el:'#app',
        data: {
            top:d.items[0].data.data,
            hot:d.items[1].data.data,
            recommend:d.items[2].data.data,
            female:d.items[3].data.data,
            male:d.items[4].data.data,
            free:d.items[5].data.data,
            topic:d.items[6].data.data,
            show_index: true,
            show_shelf: false
        },
        methods:{
            show_index_fn:function(){
                this.show_index = true;
                this.show_shelf = false;
            },
            show_shelf_fn:function(){
                this.show_shelf = true;
                this.show_index = false;
            },
        }
    })
},'json');


// duration: 0,
//     position: 0,
//     header_duration: 0,
//     header_position: 0,
//     tab_1_class:'Swipe-tab__on',
//     tab_2_class: '',
//     screen_width:windowWidth,
//     double_screen_width:windowWidth*2,
//     index_header_tab_width:index_header_tab_width

// tabSwitch:function(pos){
//     this.duration = 0.5;
//     this.header_duration = 0.5;
//     if(pos == 0){
//         this.position = 0;
//         this.header_position = 0;
//         this.tab_1_class = "Swipe-tab__on";
//         this.tab_2_class = "";
//     }else{
//         this.position = (-windowWidth);
//         this.header_position = index_header_tab_width;
//         this.tab_2_class = "Swipe-tab__on";
//         this.tab_1_class = "";
//     }
//
// }