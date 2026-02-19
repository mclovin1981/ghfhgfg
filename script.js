const container = document.querySelector('.blue_block_container');
if (container) {
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const [hours, gallery, route] = ['hoursModal', 'galleryModal', 'routeModal'].map(id => document.getElementById(id));
    
    const toggleModal = (modal, show) => {
        if (!modal) return;
        modal.classList.toggle('show', show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    const highlightDay = () => {
        document.querySelectorAll('.schedule__item').forEach(d => d.classList.remove('schedule__item--current'));
        const idx = new Date().getDay();
        const days = document.querySelectorAll('.schedule__item');
        if (idx === 0) days[6]?.classList.add('schedule__item--current');
        else days[idx-1]?.classList.add('schedule__item--current');
    };

    // Белые кнопки
    document.querySelectorAll('.button_white').forEach((btn, i) => {
        btn.onclick = (e) => {
            e.preventDefault();
            if (i === 0) { 
                toggleModal(hours, true); 
                highlightDay(); 
            }
            else if (i === 1) {
                document.querySelector('.hero_blur_small')?.scrollIntoView({behavior:'smooth'});
            }
            else if (i === 2) { 
                toggleModal(gallery, true); 
                setTimeout(() => gallery?.querySelector('.vertical-gallery')?.scrollTo(0,0), 100); 
            }
        };
    });

    // Синие кнопки - добавляем обработчик
    document.querySelectorAll('.button_blue').forEach((btn, i) => {
        btn.onclick = (e) => {
            e.preventDefault();
            
            // Проверяем текст кнопки или индекс, чтобы понять, какая это кнопка
            if (btn.textContent.includes('маршрут') || i === 2) {
                // Кнопка "маршрут прогулки" (третья синяя кнопка)
                toggleModal(route, true);
            } else {
                // Другие синие кнопки (например, "записаться на экскурсию", "афиша спектаклей")
                alert('Функция будет доступна позже');
            }
        };
    });

    // Закрытие модалок
    document.querySelectorAll('.modal').forEach(m => {
        m.onclick = (e) => {
            if (e.target === m || e.target.classList.contains('modal__close')) {
                toggleModal(m, false);
            }
        };
    });

    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(m => toggleModal(m, false));
        }
    };
});

// Бургер меню
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
}

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});
