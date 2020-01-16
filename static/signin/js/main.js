
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
    /*==================================================================
    [ Change Value room name input ]*/
    //$('#room_input').val($('#room_input').val() + 'General');
    $('#room_input').on("click", function(){

        var text = "General";
        var input = $('#room_input');
        var textLocation = $(input).val().indexOf(text);
      
        if(textLocation === -1){
          $(input).val( $(input).val() + text );
        }else{
          $(input).val( $(input).val().substr(0, textLocation) + text );
        }
      
      });


      if (localStorage.getItem('last_channel')) {
        // Redirect to last channel
        let channel = localStorage.getItem('last_channel');    
        window.location.replace('/channels/' + channel);   
    }

})(jQuery);