$(document).ready(function(){
	    var $commodity = $('#commodity');

	    $('#add').click(function() {
	    	alert(1);
            var $clone = $commodity.clone( true );
            $clone.appendTo('.inputs');
	        
	    });

	    $('#remove').click(function() {
     	    if(i > 1) {
	           $('.field:last').remove();
	            i--;
	        }
	    });

	    $('#reset').click(function() {
            while(i > 2) {
     	        $('.field:last').remove();
     	        i--;
     	    }
	    });

	    // here's our click function for when the forms submitted

	    $('.submit').click(function(){
            var answers = [];
            $.each($('.field'), function() {
                answers.push($(this).val());
            });
    	    if(answers.length == 0) {
     	        answers = "none";
            }  
     	    alert(answers);
    	    return false;
	    });
});

