$(document).ready(function () {
    $('#menu').on('click', function () {
        $('#menu').toggleClass('tham-active');
        $('#menu-items').slideToggle(300);
    });
});