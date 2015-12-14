
$(document).ready(function() {
    var itemIndex = 0;
    
    $('#ajaxform')
        .on('click', '.addButton', function() {
            itemIndex++;
            var $template = $('#commodity'),
                $clone    = $template
                                .clone()
                                .removeAttr('id')
                                .attr('data-item-index', itemIndex)
                                .insertAfter($template);

            // Update the name attributes
            $clone
                .find('[name="item"]').attr('name', 'item_' + itemIndex).removeAttr('id').end()
                .find('[name="quantity"]').attr('name', 'quantity_' + itemIndex).removeAttr('id').end()
                .find('[name="cost"]').attr('name', 'cost_' + itemIndex).removeAttr('id').end()
                .find('span').removeClass('glyphicon glyphicon-plus addButton').addClass('glyphicon glyphicon-minus removeButton').end();

            // Add new fields
            // Note that we also pass the validator rules for new field as the third parameter
            
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
                $(id).parent('div')
                     .prepend("<div class='errorlist'>" + errors[error][0].message + "</div>");
                console.log(errors[error][0].message);
            }
            setTimeout(function() {
                $("#form_ajax_error").hide();
            }, 5000);
        }
    };

    $('#ajaxform').ajaxForm(options);
});