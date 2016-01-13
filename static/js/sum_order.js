$(document).ready(function() {
    var $form = $('#ajaxform'),
    $sumDisplay = $('#sum');
    
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
});