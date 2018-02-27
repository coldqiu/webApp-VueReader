var id = location.href.split('?id=').pop();
if(isNaN(id)){
  id = '18218';
}
$.get('/ajax/book?id='+id,function(d){
  console.log(d)
  new Vue({
    el:"#app",
    data:{
      d:d
    },
    methods:{
      readBook:function(){
        location.href = '/reader';
      }
    }
  })
},'json')
