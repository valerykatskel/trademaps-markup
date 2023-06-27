document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    window.addEventListener('scroll', function() {
        let header = document.querySelector('.sticky-header');
        let headerHeight = header.offsetHeight; // Получаем высоту заголовка

        if (window.pageYOffset > headerHeight-40) {
            header.classList.add('sticky')
        } else {
            header.classList.remove('sticky'); // Удаляем класс прилипающего заголовка
        }
    });
});