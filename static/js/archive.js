$(function() {
    
    $('.archive').on('click', function(e) {
        var $this = $(this);
        var id = $this.attr("item");
        var request = $.ajax({
           url: "archive_ajax/",
           method: "GET",
           data: { id : id },
           dataType: "json"
        });

        request.done(function( msg ) {
            $this.find('button').hide();
            $this.text('Архив');
            $this.parent().attr('data-archive', '1');
            $this.prev().find('a').hide();
            $('#archive_checkbox').change();
            
        });

        request.fail(function( jqXHR, textStatus ) {
            console.log( jqXHR.responseText );
        });
   });
});

