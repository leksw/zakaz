function prop(obj){
    for(var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;
        console.log(prop);
        }
}    
var $form = $('#ajaxform'),
$sumDisplay = $('#sum');

$(document).ready(function() {
    $form.on('change', 'input', function (){
        var sum = 0,
        multiply = 0,
        input_one = $(this);
        
        if (input_one.hasClass('cost')){
            var input_two = input_one.parent().prev('div').find('input');
        } else {
            input_two = input_one.parent().next('div').find('input');
        }
        
        if (input_one.val() && input_two.val()) {
                multiply = Number(input_one.val())*Number(input_two.val());
        }
        
        $(this).parent().parent().attr('multiply', multiply);
        
    
            $('.sum').each(function () {
                var value = Number($(this).attr('multiply'));
            if (!isNaN(value)) {
                sum += value;
            }
        });
        
        $sumDisplay.text(sum);
    });
    

    $('input').change();
    
        function block_form() {
        $("#loading").show();
        $('textarea').attr('disabled', 'disabled');
        $('input').attr('disabled', 'disabled');
    }

    function unblock_form() {
        $('#loading').hide();
        $('textarea').removeAttr('disabled');
        $('input').removeAttr('disabled');
        $('.errorlist').remove();
    }

    // prepare Options Object for plugin
    var options = {
        beforeSubmit: function(form, options) {
            // return false to cancel submit
            block_form();
        },
        success: function() {
            unblock_form();
            $("#form_ajax").show();
            setTimeout(function() {
                $("#form_ajax").hide();
            }, 5000);
        },
        error:  function(resp) {
            unblock_form();
            $("#form_ajax_error").show();
            // render errors in form fields
            var errors = JSON.parse(resp.responseText);

            for (var error in errors) {
                var id = '#id_' + error;
                $(id).parent('div')
                        .prepend("<div class='errorlist'>" + 
                                 errors[error][0] +
                                  "</div>");
            }
            setTimeout(function() {
                $("#form_ajax_error").hide();
            }, 5000);
        }
    };

    $('#ajaxform').ajaxForm(options);
});