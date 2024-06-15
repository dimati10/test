window.addEventListener('DOMContentLoaded', () => {
    initApp();
});


function initApp() {

    controlMobileMenu(); // мобильное меню;
    initTariffsSlider(); // слайдер в разделе 'tariffs and methods'
    initMethodsSlider(); // слайдер в разделе 'methods'
    initTypicalSlider(); // типовые слайдеры
    setCustomAnimation('.js_payments_img', '.js_payments_message'); // анимация в разделе 'mass payments'
    setCustomAnimation('.js_available_solution_items', '.js_available_solution_item'); // анимация в разделе 'available solutions'
    setSolutionAnimation(7000, 1000); // анимация в разделе 'solution'
    setMissionAnimation(); // анимация в разделе 'mission'
    setSafetyAnimation(); // анимация в разделе 'safety'
    sendFeedbackForm(); // отправка формы на странице 'контакты'
    initAchievementsSlider(); // слайдер в разделе 'our achievements'
    setSmoothScroll('.js_policy_links a'); // плавный скролл к якорюy на странице 'privacy policy'
    setPaymentsAcceptingAnimation('.js_payments_accepting_items', '.js_payments_accepting_item', 0.5, 200) //анимация в разделе 'accept payments'

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
            // document.documentElement.style.scrollBehavior = 'unset';

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
        // document.documentElement.style.scrollBehavior = '';

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

// слайдер в разделе 'methods'

function initMethodsSlider() {

    if (document.querySelector('.js_methods_swiper')) {

        const swiper = new Swiper('.js_methods_swiper', {
            navigation: {
                nextEl: '.js_methods_next',
                prevEl: '.js_methods_prev',
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

// анимация в разделах: 'mass payments', 'available solutions', 'accept payments'

function setCustomAnimation(blockSelector, itemSelector, delay = 0.5, offset = 0, reverse = true) {

    const block = document.querySelector(blockSelector);
    const items = document.querySelectorAll(itemSelector);

    if (block) {

        function animateItems() {

            if (block.getBoundingClientRect().bottom - offset < innerHeight) {

                items.forEach((item, i) => {

                    if (reverse) {
                        item.style.animationDelay = `${delay * (items.length - 1 - i)}s`;
                    } else {
                        item.style.animationDelay = `${delay * i}s`;
                    }

                    item.classList.add('animated');

                });

            }

        }

        animateItems();
        window.addEventListener('scroll', animateItems);
        window.addEventListener('resize', animateItems);

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

// валидация формы

function validateForm(form) {

    const formInputs = form.querySelectorAll('[class*="js_input"]');
    const patternEmail = /^[a-zA-Z0-9._%+-\.]+@[a-z0-9.-]+\.[a-z]{2,}$/i; // рег. выражение для поля 'электронная почта';
    const patternPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,}(\s*)?$/; // рег. выражение для поля 'телефон';

    let isValid = true;

    formInputs.forEach(input => {

        // проверяем поле на заполненность от одного знака и более
        if (input.classList.contains('js_input') && input.value === "") {
            createError(input, 'The field is required');
            isValid = false;
        } else if (input.classList.contains('js_input')) {
            removeError(input);
        }

        // проверяем правильность заполнения поля 'телефон'
        if (input.classList.contains('js_input_phone') && input.value === "") {
            createError(input, 'The field is required');
            isValid = false;
        } else if (input.classList.contains('js_input_phone') && input.value.search(patternPhone) === 0) {
            removeError(input);
        } else if (input.classList.contains('js_input_phone')) {
            createError(input, 'Enter a valid phone number');
            isValid = false;
        }

        // проверяем правильность заполнения поля 'электронная почта'
        if (input.classList.contains('js_input_email') && input.value === "") {
            createError(input, 'The field is required');
            isValid = false;
        } else if (input.classList.contains('js_input_email') && input.value.search(patternEmail) === 0) {
            removeError(input);
        } else if (input.classList.contains('js_input_email')) {
            createError(input, 'Enter a valid email address');
            isValid = false;
        }


    });

    return isValid;

}

// создание ошибки валидации

const createError = (input, text) => {

    removeError(input);

    input.classList.add('error');
    input.closest('label').insertAdjacentHTML('beforeend', `<span class="field__error">${text}</span>`);

}

// удаление ошибки валидации

const removeError = (input) => {

    input.classList.remove('error');

    if (input.parentElement.querySelector('.field__error')) {
        input.parentElement.querySelector('.field__error').remove();
    }

}

// отправка формы на странице 'контакты'

function sendFeedbackForm() {

    const form = document.querySelector('.js_feedback_form');

    if (form) {

        const formBtn = form.querySelector('.js_feedback_btn');
        const formInputs = form.querySelectorAll('[class*="js_input"]');

        let isInputEventAdded = false;

        form.addEventListener('submit', async (e) => {

            e.preventDefault();

            if (!isInputEventAdded) {

                formInputs.forEach(input => {

                    input.addEventListener('input', () => {
                        validateForm(form);
                    });

                });

                isInputEventAdded = true;

            }

            if (validateForm(form)) {

                // сюда пишем команды, которые должны сработать после успешной валидации

                console.log('validate');

                formBtn.classList.add('animated');
                formBtn.disabled = true;

                setTimeout(() => { // имитация отправки, когда отправка будет настроена, нужно удалить setTimeout(), код отправки ниже закомментирован

                    formBtn.classList.remove('animated');
                    formBtn.disabled = false;
                    form.reset();

                }, 2000);

                // const formData = new FormData(form);

                // const response = await fetch('/', {
                //     method: 'POST',
                //     body: formData
                // });

                // if (response.ok) {

                //     formBtn.classList.remove('animated');
                //     formBtn.disabled = false;
                //     form.reset();

                // } else {

                //     alert('Error');
                //     formBtn.classList.remove('animated');
                //     formBtn.disabled = false;

                // }

            } else {

                console.log('no-validate');

                if (form.querySelector('[class*="js_input"].error')) {
                    form.querySelector('[class*="js_input"].error').focus(); //фокус к полю с ошибкой;
                }

            }

        });

    }

}

// слайдер в разделе 'our achievements'

function initAchievementsSlider() {

    if (document.querySelector('.js_about_achievements_swiper')) {

        const swiper = new Swiper('.js_about_achievements_swiper', {
            grabCursor: true,
            spaceBetween: 15,
            slidesPerView: 1.06,
            // freeMode: true,
            // mousewheel: true,
            mousewheel: {
                sensitivity: 1,
                releaseOnEdges: true
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 1.75,
                    spaceBetween: 15,
                },
                1200: {
                    slidesPerView: 1.75,
                    spaceBetween: 20,
                }
            }
        });

    }

}

// плавный скролл к якорю

function setSmoothScroll(el) {

    const links = document.querySelectorAll(el);

    if (links.length) {

        links.forEach(link => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                const href = link.getAttribute('href').substring(1);
                const scrollTarget = document.getElementById(href);

                if (href && scrollTarget) {

                    // const topOffset = 50;
                    const topOffset = 0;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset;

                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                }

            });

        });

    }

}

// анимация в разделе 'accept payments'

function setPaymentsAcceptingAnimation(blockSelector, itemSelector, delay = 0.5, offset = 0) {

    const block = document.querySelector(blockSelector);
    const items = document.querySelectorAll(itemSelector);

    if (block) {

        const duration = items.length * delay * 2 - delay;

        function animateItems() {

            if (block.getBoundingClientRect().bottom - offset < innerHeight) {

                items.forEach((item, i) => {

                    item.style.animationDelay = `${delay * i}s`;
                    item.style.animationDuration = `${duration}s`;
                    item.classList.add('animated');

                });

            }

        }

        animateItems();
        window.addEventListener('scroll', animateItems);
        window.addEventListener('resize', animateItems);

    }

}