(function () {
    'use strict';

    function startPlugin() {
        // Слухаємо подію завантаження повної інформації про фільм
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                // У веб-версії e.object може бути не jQuery об'єктом, 
                // тому шукаємо контейнер кнопок через глобальний селектор всередині поточної сторінки
                var page = $('.full-start'); 
                var container = page.find('.full-start__buttons');
                
                if (container.length && !container.find('.my-ua-button').length) {
                    // Створюємо кнопку
                    var btn = $(`
                        <div class="button full-start__button selector my-ua-button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="gold"/>
                            </svg>
                            <span>Дивитись UA</span>
                        </div>
                    `);

                    // Логіка натискання
                    btn.on('hover:enter', function () {
                        var title = e.data.movie.title || e.data.movie.name;
                        Lampa.Noty.show('Шукаю солов\'їною: ' + title);
                        window.open('https://toloka.to/tracker.php?nm=' + encodeURIComponent(title), '_blank');
                    });

                    // Додаємо кнопку
                    container.append(btn);
                    
                    // Оновлюємо контролер навігації (важливо для пульта/клавіатури)
                    if (Lampa.Controller) Lampa.Controller.render();
                }
            }
        });
    }

    // Стандартна ініціалізація як у SaloPower
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();