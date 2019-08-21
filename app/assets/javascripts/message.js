$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    console.log(message)
    var imagehtml = message.image.url == null ? "" : `<img src="${message.image.url}" class="lower-message__image">`
    var html = `<div class="message" data-message-id="${message.id}"'>
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
                      ${imagehtml}
                    </div>
                  </div> `
    return html;
  }

  

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      // var last_message_id = $('.message:last').data("message-id");
      var last_message_id = $('.message').last().attr("data-message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })





    .done(function(messages) {
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
          });
        })
      .fail(function() {
        alert('error');
      });
    }
  };


  

  $('#new_message').on('submit', function(e){

    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $( ".form__submit").prop( "disabled", false );
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('errorです');
    });
    return false;
  });
  setInterval(reloadMessages, 5000);
});