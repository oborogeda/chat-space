$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src=${message.image}>` : "";
    
     var html =
      `<div class="message" data-id=${message.id}>
         <div class="upper-message">
           <div class="upper-message__user-name">
             ${message.user_name}
           </div>
           <div class="upper-message__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         ${img}
       </div>`
       console.log(html)
     return html;
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    console.log(data)
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('#new_message')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message').last().data('id');
    $.ajax({
      url: `api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
};
  setInterval(reloadMessages, 5000);
});