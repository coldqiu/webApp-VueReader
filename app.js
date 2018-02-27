// var koa = require('koa');
// var controller = require('koa-route');
// var querystring = require('querystring');
//
// var app = koa();
//
// var views = require('co-views');
// var render = views('./view',{
//   map:{
//     html:'ejs'
//   }
// });
//
// var koa_static = require('koa-static-server');
// var service = require('./service/webAppService');
// var testData = require('./mock/test.json');
//
// app.use(koa_static({
//   rootDir: './static/',
//   rootPath: '/static/',
//   maxage: 0
// }))
//
// app.use(controller.get('/route_test',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = 'hello koa';
// }));
// //ejs模板
// app.use(controller.get('/ejs_test',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = yield render('test',{title:'title_test'});
// }));
//
// app.use(controller.get('/api_test',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = testData;
// }));
// //首页
// app.use(controller.get('/',function*(){
//   this.set('Cache-Control','no-cache');
//   //console.log(render('index',{title:'首页'}));
//   this.body = yield render('index',{title:'首页'});
// }));
//
// app.use(controller.get('/ajax/index',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = service.get_index_data();
// }));
// //排行版
// app.use(controller.get('/ajax/rank',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = service.get_rank_data();
// }));
//
// //男生频道view
// app.use(controller.get('/male',function*(){
// 	this.set('Cache-Control','no-cache');
// 	this.body = service.get_male_data();
// }));
//
// //女生频道view
// app.use(controller.get('/female',function*(){
// 	this.set('Cache-Control','no-cache');
// 	this.body = service.get_female_data();
// }));
//
// //分类页面view
// app.use(controller.get('/category',function*(){
// 	this.set('Cache-Control','no-cache');
// 	this.body = service.get_category_data();
// }));
//
// //书籍
// app.use(controller.get('/book',function*(){
//   this.set('Cache-Control','no-cache');
//   var params = querystring.parse(this.req._parsedUrl.query);
//   var bookId = params.id;
//   this.body = yield render('book',{nav:"书籍详情",bookId:bookId});
// }));
//
// app.use(controller.get('/ajax/book',function*(){
//   this.set('Cache-Control','no-cache');
//   //console.log(this.req._parsedUrl.query);
//   var params = querystring.parse(this.req._parsedUrl.query);
//   var id = params.id;
//   if(!id){
//     id = '';
//   }
//   this.body = service.get_book_data(id);
// }));
//
// //搜索
// app.use(controller.get('/search',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = yield render('search',{nav:'搜索'});
// }));
//
// app.use(controller.get('/ajax/search',function*(){
//   this.set('Cache-Control','no-cache');
//   var querystring = require('querystring');
//   //console.log(this.req._parsedUrl.query);
//   var params = querystring.parse(this.req._parsedUrl.query);
//   var start = params.start;
//   var end = params.end;
//   var key = params.keyword;
//   this.body = yield service.get_search_data(start,end,key);
// }));
// //阅读器
// app.use(controller.get('/reader',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = yield render('reader');
// }));
//
// app.use(controller.get('ajax/chapter',function*(){
//   this.set('Cache-Control','no-cache');
//   this.body = service.get_book_data();
// }));
//
// app.listen(3001);
// console.log('koa server is started!')
var koa = require('koa');
var controller = require('koa-route');
var app = koa();
var querystring = require('querystring');

var views = require('co-views');
var render = views('./view',{
  map : {html : 'ejs'}
});
// koa_static 引入静态资源的中间件
var koa_static = require('koa-static-server');
var service = require('./service/webAppService');

app.use(koa_static({
    rootDir:'./static/',
    rootPath:'/static/',
    maxage:0 // 最大缓存时间
}));


app.use(controller.get('/route_test',function*(){
    this.set('Cache-Control','no-cache');// function*(){} 是一个generator 一个异步函数
    this.body = 'hello';    //this.body 返回体 可以是文本，模板

}));
// koa 中使用的是ES6的generator特性，不是promise
// 后端模板的渲染
app.use(controller.get('/ejs_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('test',{title:'title_test'});
}));

// 如何使用模拟数据

app.use(controller.get('/ajax/index',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_index_data();
}));

//排行版
app.use(controller.get('/ajax/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/book',function*(){
    this.set('Cache-Control','no-cache');
    console.log(this.req._parsedUrl.query);
    debugger;
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id = '';
    }
    this.body = service.get_book_data(id);
}));

app.use(controller.get('/',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('index',{title:'书城首页'});
}));

app.use(controller.get('/male',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('male',{nav: '男生频道'});
}));

app.use(controller.get('/female',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('female',{nav: '女生频道'});
}));

app.use(controller.get('/category',function*(){
    // this.set('Cache-Control','no-cache');
    this.body = yield render('category',{nav: '分类'});
}));

app.use(controller.get('/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('rank',{nav: '排行'});
}));

app.use(controller.get('/book',function*(){
    // this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book',{nav:'书籍详情页',bookId:bookId});
}));

app.use(controller.get('/search',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('search',{title:'搜索页面'});
}));

// 查询数据 访问线上的数据;其他数据是模拟的
app.use(controller.get('/ajax/search',function*(){
    // this.set('Cache-Control','no-cache');
    // querystring 把http解析成obj对象
    var querystring = require('querystring');
    // 要解析的字符串放在 req._parseUrl.query
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    // console.log(keyword);
    // debugger;
    this.body = yield service.get_search_data(start,end,keyword);
    // console.log('aa',keyword+1);

}));

//阅读器
app.use(controller.get('/reader',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('reader');
}));

app.use(controller.get('/ajax/chapter',function*(){
    this.set('Cache-Control','no-cache');
    debugger;
    this.body = service.get_chapter_data();
}));
app.use(controller.get('/ajax/chapter_data',function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    // console.log('(app.js)id:', id);
    if (!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
    // console.log('(app.js--get_chapter_content_data)id:', id);
}));



app.listen(3001);
console.log('koaser is started');