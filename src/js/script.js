document.addEventListener('DOMContentLoaded', () => {
    const click = document.querySelector('.header-dropdown__click');
    const list = document.querySelector('.header-dropdown__list');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const salesDropdown = document.querySelectorAll('.sales-dropdown');
    const hint = document.querySelector('.hint a');
    const tooltip = document.querySelector('.tooltip');
    const close = document.querySelector('.close');
    const sliderContent = document.querySelector('.slider-content');
    const sliderImages = document.querySelectorAll('.slider-img');
    const sliderPictures = document.querySelector('.slider-pictures');
    const sliderBtnPrev = document.querySelector('.slider-btn-prev');
    const sliderBtnNext = document.querySelector('.slider-btn-next');
    const btnDots = document.querySelectorAll('.btn-dots');

    let slideCount = 0;
    let sliderWidth = sliderContent.offsetWidth;
    const deadline = '2023-02-28';

    const getTimeRemaining = (endtime) => {
        const total = Date.parse(endtime) - new Date();
        const hours = Math.floor(total / (1000 * 60 * 60));
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);

        return { total, hours, minutes, seconds };
    };

    const setTimeRemainig = (endtime) => {
        const hours = document.querySelector('.hours');
        const minutes = document.querySelector('.minutes');
        const seconds = document.querySelector('.seconds');

        const updateTimeRemaining = () => {
            const t = getTimeRemaining(endtime);
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };

        const timeInterval = setInterval(updateTimeRemaining, 1000);
    };

    setTimeRemainig(deadline);

    btnDots.forEach((item, index) => {
        item.addEventListener('click', () => {
            slideCount = index;
            document
                .querySelector('.btn-dots.active')
                .classList.remove('active');

            item.classList.add('active');

            rollSlider(slideCount);
        });
    });

    const nextSlide = () => {
        slideCount++;
        if (slideCount >= sliderImages.length) {
            slideCount = 0;
        }
        document.querySelector('.btn-dots.active').classList.remove('active');
        btnDots[slideCount].classList.add('active');
        rollSlider(slideCount);
    };

    const prevSlide = () => {
        slideCount--;
        if (slideCount < 0) {
            slideCount = sliderImages.length - 1;
        }
        document.querySelector('.btn-dots.active').classList.remove('active');
        btnDots[slideCount].classList.add('active');
        rollSlider(slideCount);
    };

    const rollSlider = (slideCount) => {
        sliderPictures.style.transform = `translateX(${
            -slideCount * sliderWidth
        }px)`;
    };

    const showMenu = () => {
        nav.classList.add('open');
    };

    const closeMenu = () => {
        nav.classList.remove('open');
    };

    const showHint = (e) => {
        e.preventDefault();
        tooltip.classList.toggle('open');
    };

    const showDropdown = () => {
        list.classList.toggle('newlist');
        click.classList.toggle('newlist');
    };

    sliderBtnNext.addEventListener('click', nextSlide);
    sliderBtnPrev.addEventListener('click', prevSlide);

    click.addEventListener('click', showDropdown);

    burger.addEventListener('click', showMenu);

    close.addEventListener('click', closeMenu);

    hint.addEventListener('click', showHint);

    salesDropdown.forEach((item) => {
        const select = item.querySelector('.select');
        const caret = item.querySelector('.caret');
        const menu = item.querySelector('.menu');
        const options = item.querySelectorAll('.menu li');
        const selected = item.querySelector('.selected');

        select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });

        options.forEach((option) => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;

                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach((option) => {
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });
});
