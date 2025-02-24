$(document).ready(function () {

    $.extend($.fn.dataTable.defaults, {
        searching: false,
        lengthChange: false,
        "columnDefs": [{targets: 'no-sort', orderable: false}],
        language: {

            "decimal": "",
            "emptyTable": "Não foram encontrados registros",
            "info": "Encontramos _TOTAL_ resultados",
            "infoEmpty": "Não encontramos resultados",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Show _MENU_ entries",
            "loadingRecords": "Loading...",
            "processing": "",
            "search": "Search:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "Início",
                "last": "Fim",
                "next": "<i class='fa fa-chevron-right'></i>",
                "previous": "<i class='fa fa-chevron-left'></i>"
            },
            "aria": {
                "orderable": "Order by this column",
                "orderableReverse": "Reverse order this column"
            },

            //url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/pt-BR.json',
        },

    });

    $('.datatable').DataTable();
});