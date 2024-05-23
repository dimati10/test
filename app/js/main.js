window.addEventListener('DOMContentLoaded', () => {
    initApp();
});


function initApp() {

    controlMobileMenu(); // мобильное меню;
    initTariffsSlider(); // слайдер в разделе 'tariffs and methods'
    initTypicalSlider(); // типовые слайдеры
    setPaymentsAnimation(); // анимация в разделе 'mass payments'
    setSolutionAnimation(7000, 1000); // анимация в разделе 'solution'
    setMissionAnimation(); // анимация в разделе 'mission'
    setSafetyAnimation(); // анимация в разделе 'safety'

    console.log('initApp');

}


// мобильное меню;

function controlMobileMenu() {

    const header = document.querySelector('.js_header');

    if (header) {

        const burger = header.querySelector('.js_burger');
        const menu = header.querySelector('.js_menu');
        const items = header.querySelectorAll('.js_menu_item');

        burger.addEventListener('click', () => {

            burger.classList.toggle('active');
            menu.classList.toggle('active');

            if (burger.classList.contains('active')) {
                header.classList.add('fixed');
                fixBodyPosition();
            } else {
                header.classList.remove('fixed');
                unfixBodyPosition();
            }

        });

        items.forEach(item => {

            const caption = item.querySelector('.js_menu_caption');

            caption.addEventListener('click', () => {
                item.classList.toggle('active');
            });

        });

    }

}

// фиксация <body>

function fixBodyPosition() {

    setTimeout(function () {

        if (!document.body.hasAttribute('data-body-scroll-fix')) {

            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            // document.querySelector('.js_header').style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            document.body.setAttribute('data-body-scroll-fix', scrollPosition);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.left = '0';
            document.body.style.width = '100%';

        }

    }, 15);

}

// расфиксация <body>

function unfixBodyPosition() {

    if (document.body.hasAttribute('data-body-scroll-fix')) {

        let scrollPosition = document.body.getAttribute('data-body-scroll-fix');

        // document.body.style.paddingRight = "";
        // document.querySelector('.js_header').style.paddingRight = "";
        document.body.removeAttribute('data-body-scroll-fix');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        window.scroll(0, scrollPosition);

    }

}

// типовые слайдеры

function initTypicalSlider() {

    const sliders = document.querySelectorAll('.js_swiper');

    if (sliders.length) {

        sliders.forEach(slider => {

            const swiper = new Swiper(slider, {
                slidesPerView: 1.4,
                spaceBetween: 15,
                freeMode: true,
                breakpoints: {
                    576: {
                        slidesPerView: 2.2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            });

        });

    }

}

// слайдер в разделе 'tariffs and methods'

function initTariffsSlider() {

    if (document.querySelector('.js_tariffs_swiper')) {

        const swiper = new Swiper('.js_tariffs_swiper', {
            navigation: {
                nextEl: '.js_tariffs_next',
                prevEl: '.js_tariffs_prev',
            },
            grabCursor: true,
            spaceBetween: 20,
        });

    }

}

// генерация случайного числа в заданном диапазоне

function generateRandomNumber(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// анимация в разделе 'mass payments'

function setPaymentsAnimation() {

    const payments = document.querySelector('.js_payments');

    if (payments) {

        const img = payments.querySelector('.js_payments_img');
        const messages = payments.querySelectorAll('.js_payments_message');

        function animateMessages() {

            if (img.getBoundingClientRect().bottom < innerHeight) {

                messages.forEach((message, i) => {
                    message.style.animationDelay = `${0.5 * (messages.length - 1 - i)}s`;
                    message.classList.add('animated');
                });

            }

        }

        animateMessages();
        window.addEventListener('scroll', animateMessages);
        window.addEventListener('resize', animateMessages);

    }

}

// анимация в разделе 'solution'

function setSolutionAnimation(duration, delay) {

    const solution = document.querySelector('.js_solution');

    if (solution) {

        const solutionWrapper = solution.querySelector('.js_solution_wrapper');
        const itemsWrapper = solutionWrapper.querySelector('.js_solution_items');
        const items = itemsWrapper.querySelectorAll('.js_solution_item');

        let isAnimate = false;
        let d = 0;

        function animateItems() {

            const copyWrapper = itemsWrapper.cloneNode(true);

            itemsWrapper.after(copyWrapper);

            copyWrapper.querySelectorAll('.js_solution_item').forEach((item, i) => {

                item.style.animation = `solution-animation linear ${duration}ms ${d}ms`;
                item.style.left = `${generateRandomNumber(0, solutionWrapper.offsetWidth - item.offsetWidth)}px`;
                d = d + delay + generateRandomNumber(0, delay);

                if (i === (items.length - 1)) {

                    item.addEventListener('animationstart', () => {

                        d = 0;

                        setTimeout(() => {
                            // animateItems();
                            requestAnimationFrame(animateItems);
                        }, d + delay + generateRandomNumber(0, delay));

                    });

                    item.addEventListener('animationend', () => {
                        copyWrapper.remove();
                    });

                }

            });

        }

        const callback = function (entries) {

            if (entries[0].isIntersecting && !isAnimate) {

                isAnimate = true;
                // animateItems();
                requestAnimationFrame(animateItems);

            }

        };

        const observer = new IntersectionObserver(callback, { threshold: 0 });

        observer.observe(solution);

    }

}

// анимация в разделе 'mission'

function setMissionAnimation() {

    const mission = document.querySelector('.js_mission');

    if (mission) {

        const blocks = mission.querySelector('.js_mission_blocks');
        const tl = gsap.timeline();

        tl.to(".js_mission_blocks", { x: '-66.7%', ease: "none" });

        const trigger = ScrollTrigger.create({
            animation: tl,
            trigger: '.js_mission',
            // start: () => blocks.getBoundingClientRect().top,
            start: 'top top',
            // end: 'bottom',
            end: () => blocks.offsetWidth * 0.7,
            scrub: true,
            pin: true,
            // markers: true,
        });

        let isEnabled = null;

        if (innerWidth >= 1200) {
            trigger.enable();
            isEnabled = true;
        } else {
            trigger.disable();
            isEnabled = false;
        }

        window.addEventListener('resize', () => {

            if (innerWidth >= 1200 && !isEnabled) {
                trigger.enable();
                isEnabled = true;
            }

            if (innerWidth < 1200 && isEnabled) {
                trigger.disable();
                isEnabled = false;
            }

        });

    }

}

// анимация в разделе 'safety'

function setSafetyAnimation() {

    const safety = document.querySelector('.js_safety');

    if (safety) {

        const images = safety.querySelector('.js_safety_images');
        const block = safety.querySelector('.js_safety_block');
        const topOffset = 200;
        const bottomOffset = 200;

        function animateBlock() {

            const blockTop = block.getBoundingClientRect().top;

            if (window.innerHeight > topOffset + bottomOffset) {

                if (blockTop + block.offsetHeight > topOffset && blockTop < innerHeight - bottomOffset) {

                    const diff = window.innerHeight + block.offsetHeight - bottomOffset - topOffset;
                    const translate = (100 - (blockTop + block.offsetHeight - topOffset) / diff * 100) * 0.667;

                    images.style.transform = `translateY(-${translate}%)`

                } else if (blockTop + block.offsetHeight - topOffset <= 0) {
                    images.style.transform = 'translateY(-66.7%)'
                } else {
                    images.style.transform = 'translateY(0)'
                }

            } else {
                images.style.transform = 'translateY(0)'
            }

        }

        animateBlock();
        window.addEventListener('scroll', animateBlock);
        window.addEventListener('resize', animateBlock);

    }

}