$(document).ready(function () {

    iniciarSelect2();

});

function iniciarSelect2() {
    // Adicionando select2 sem busca em todos os selects que não possuem um select2 atribuido
  //  $('select').not('.select2').not('.select2_disabled').addClass('select2_sem_busca');

    // Opções globais do select2
    $.fn.select2.defaults.set("theme", "bootstrap4");

    $.fn.select2.defaults.set("width", "100%");


    $('.select2').select2();

    $('.select2_sem_busca').select2({
        minimumResultsForSearch: -1
    });
}