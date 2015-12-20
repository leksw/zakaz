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
    
    var itemIndex = 0;
    
    $('input').change();
    
    $('#ajaxform')
        .on('click', '.addButton', function() {
            itemIndex++;
            var $template = $('#commodity'),
                $clone    = $template
                                .clone()
                                .removeAttr('id')
                                .attr('data-item-index', itemIndex)
                                .attr('multiply', 0)
                                .insertAfter($template);

            // Update the name attributes
            $clone
                .find('[name="item"]')
                    .attr('name', 'order_item_' + itemIndex)
                    .attr('id', 'id_item_' + itemIndex)
                    .val('').end()
                .find('[name="quantity"]')
                    .attr('name', 'order_quantity_' + itemIndex)
                    .attr('id', 'id_quantity_' + itemIndex)
                    .val('').end()
                .find('[name="cost"]')
                    .attr('name', 'order_cost_' + itemIndex)
                    .attr('id', 'id_cost_' + itemIndex)
                    .val('').end()
                .find('label[for="id_item"]')
                    .attr('for', 'id_item_' + itemIndex)
                    .end()
                .find('label[for="id_quantity"]')
                    .attr('for', 'id_quantity_' + itemIndex)
                    .end()
                .find('label[for="id_cost"]')
                    .attr('for', 'id_cost_' + itemIndex)
                    .end()    
                .find('span')
                    .removeClass('glyphicon glyphicon-plus addButton')
                    .addClass('glyphicon glyphicon-minus removeButton').end();
                
        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-item-index');

            // Remove fields
            $row.find('[name="item_' + index + '"]').remove();
            $row.find('[name="quantity_' + index + '"]').remove();
            $row.find('[name="cost_' + index + '"]').remove();

            // Remove element containing the fields
            $row.remove();
            $('input').change();
        });

    
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
                if (id.indexOf('form') == -1){
                    $(id).parent('div')
                        .prepend("<div class='errorlist'>" + errors[error][0].message + "</div>");
                }else{
                    $(id).parent('div')
                        .prepend("<div class='errorlist'>" + errors[error][0] + "</div>");
                }     
            }
            setTimeout(function() {
                $("#form_ajax_error").hide();
            }, 5000);
        }
    };

    $('#ajaxform').ajaxForm(options);
});