function change_date(d){
    //exchange month and day of date: 12.12.2015 22:23
    var day_order = d.slice(0, 2);
    var month_order = d.slice(3, 5);
    var year_order = d.slice(-10);
    var date_table = month_order +'.'+ day_order +'.'+ year_order;
    return date_table;
}

// Date range filter
var minDateFilter = "";
var maxDateFilter = "";

$.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iMin = minDateFilter;
        var iMax = maxDateFilter;
        var date_table = change_date(aData[0]);
        var iDate = new Date(date_table).getTime();

        if ( iMin == "" && iMax == "" )
        {
            return true;
        }
        else if ( iMin == "" && iDate < iMax )
        {
            return true;
        }
        else if ( iMin < iDate && "" == iMax )
        {
            return true;
        }
        else if ( iMin < iDate && iDate < iMax )
        {
            return true;
        }
        return false;
    }
);

$(document).ready( function () {
    
    $.extend( $.fn.dataTable.defaults, {
       "dom": '<"top"i>rt<"bottom"flp><"clear">'
    } );
    
    // DataTable
    var table = $('#table_id').DataTable();
   
    // Phone number column search 
    $('#phone_search').on( 'keyup', function () {
    table
        .columns( 2 )
        .search( this.value )
        .draw();
    } );
 
    
    $('#archive_checkbox').change(function() {
        if($(this).is(":checked")) {
            $.fn.dataTable.ext.search.pop();
            table.draw();
        }
        else {
            $.fn.dataTable.ext.search.push(
                function(settings, data, dataIndex) {
                   return $(table.row(dataIndex).node()).attr('data-archive') != 1;
                }
            );
            table.draw();
        }
    });

    $("#min").datepicker({
        "onSelect": function(date) {
            minDateFilter = new Date(date).getTime();
            table.draw();
        }
    }).keyup(function(){
        minDateFilter = new Date(this.value).getTime();
        table.draw();
    });

    $("#max").datepicker({
        "onSelect": function(date) {
            console.log(maxDateFilter);
            maxDateFilter = new Date(date).getTime();
            console.log(maxDateFilter);
            table.draw();
        }
    }).keyup(function(){
        maxDateFilter = new Date(this.value).getTime();
        console.log(maxDateFilter);
        table.draw();
    });
});