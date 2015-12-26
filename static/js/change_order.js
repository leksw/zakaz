$(document).ready(function() {
    var itemIndex = 0,
    $button = $('#trigger'),
    $button_plus = $button
        .clone()
        .addClass('glyphicon-plus')
        .show(),
    $button_minus = $button
        .clone()
        .addClass('glyphicon-minus')
        .show();
                                              
    $('.trigger').first().append($button_plus);
    $('.trigger').not(":first").append($button_minus);
    
        
    $('#ajaxform')
        .on('click', '.glyphicon-plus', function() {
            var itemIndex = new Number($('#id_form-TOTAL_FORMS').val()),
                $row  = $(this).parent().parent(),
                $clone  = $row
                              .clone()
                              .attr('multiply', 0);
                $clone.appendTo($row.parent());
            // Update the name attributes
            $clone
                .find('[name="form-0-name"]')
                    .attr('name', 'form-' + itemIndex + '-name')
                    .attr('id', 'id_form-' + itemIndex + '-name')
                    .val('').end()
                .find('[name="form-0-amount"]')
                    .attr('name', 'form-' + itemIndex + '-amount')
                    .attr('id', 'id_form-' + itemIndex + '-amount')
                    .val('').end()
                .find('[name="form-0-cost"]')
                    .attr('name',  'form-' + itemIndex + '-cost')
                    .attr('id',  'id_form-' + itemIndex + '-cost')
                    .val('').end()
                .find('[name="form-0-id"]')
                    .attr('name',  'form-' + itemIndex + '-id')
                    .attr('id',  'id_form-' + itemIndex + '-id')
                    .end()    
                .find('label[for="id_form-0-name"]')
                    .attr('for', 'id_form-' + itemIndex + '-name')
                    .end()
                .find('label[for="id_form-0-amount"]')
                    .attr('for',  'id_form-' + itemIndex + '-amount')
                    .end()
                .find('label[for="id_form-0-cost"]')
                    .attr('for', 'id_form-' + itemIndex + '-cost')
                    .end()
                .find('span')
                    .removeClass('glyphicon-plus')
                    .addClass('glyphicon-minus').end();    
            
            $('#id_form-TOTAL_FORMS').val(itemIndex+1);
                
        })

        // Remove button click handler
        .on('click', '.glyphicon-minus', function() {
            var $row  = $(this).parent().parent(),
                $id =  $(this).parent().prev();
                
            // Remove fields
            $('<input/>').appendTo($(this).parent())
                         .attr('name', $id.attr('name').replace('id', 'DELETE'))
                         .attr('type', 'checkbox')
                         .attr('checked', 'checked')
                         .end();
            $row.removeClass('sum').attr('multiply', 0).hide();
           
            //update sum 
            $('input').change();


    });
});