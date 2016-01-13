function change_date(d){
    //exchange month and day of date: 12.12.2015 22:23
    var day_order = d.slice(0, 2);
    var month_order = d.slice(3, 5);
    var year_order = d.slice(-10,-6);
    var date_table = year_order + ',' + month_order + ',' + day_order;
    return date_table;
}

// Date range filter
var minDateFilter = "";
var maxDateFilter = "";

$.fn.dataTableExt.afnFiltering.push(
    function( oSettings, aData, iDataIndex ) {
        var iMin = minDateFilter || "";
        var iMax = maxDateFilter || "";
        var date_table = change_date(aData[0]);
        var iDate = new Date(date_table).getTime();

        if ( iMin == "" && iMax == "") 
        {
            return true;
        }
        else if ( iMin == "" && iDate <= iMax )
        {
            return true;
        }
        else if ( iMin <= iDate && "" == iMax )
        {
            return true;
        }
        else if ( iMin <= iDate && iDate <= iMax )
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
    var table = $('#table_id').DataTable({
        "language": {
              "processing": "Подождите...",
              "search": "Поиск:",
              "lengthMenu": "Показать _MENU_ записей",
              "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
              "infoEmpty": "Записи с 0 до 0 из 0 записей",
              "infoFiltered": "(отфильтровано из _MAX_ записей)",
              "infoPostFix": "",
              "loadingRecords": "Загрузка записей...",
              "zeroRecords": "Записи отсутствуют.",
              "emptyTable": "В таблице отсутствуют данные",
              "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
              },
              "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
              }
            },
        "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
            
    });
   
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
    }).keyup(function(e){
        minDateFilter = new Date(this.value).getTime();
        table.draw();
    });

    $("#max").datepicker({
        "onSelect": function(date) {
            maxDateFilter = new Date(date).getTime();
            table.draw();
        }
    }).keyup(function(e){
        maxDateFilter = new Date(this.value).getTime();
        table.draw();
        
    });
    $('#archive_checkbox').change();
    
    $('#get').click(function(){
        console.log('get');
        $.ajax({
            type: "GET",
            url: '/',
            data: {'format': 'json'},
            success: function (e){
               console.log(e);
            },
            dataType: 'json'
        });
    
       
    });
    
});

