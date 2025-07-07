window.addEventListener('DOMContentLoaded', initApp);

function initApp() {

    controlMobileMenu(); // мобильное меню;
    initHeroSlider() // слайдер на главном экране
    initCoursesSlider() // слайдер в разделе 'наши курсы'
    controlCoursesBtn() // кнопка 'все курсы' в разделе 'наши курсы'
    initReviewsSlider() // слайдер в разделе 'отзывы'
    controlSpoilers() // спойлеры
    initProgramSlider() // слайдеры в разделе 'программа курса'
    setPhoneMask('.js_input_phone', "+7 (___) ___-__-__"); // маска для телефона
    sendForm('.js_feedback_form_1') // отправка формы в разделе 'попробуйте бесплатно'
    sendForm('.js_any_questions_form') // отправка формы в разделе 'остались вопросы'
    sendForm('.js_feedback_form_2') // отправка формы в разделе 'как начать учиться'
    controlBenefitsItems() // логика при ховере карточек в разделе 'наши преимущества'
    controlModal(); // логика для модальных окон

    console.log('initApp');

}


// мобильное меню;

function controlMobileMenu() {

    const header = document.querySelector('.js_header');

    if (header) {

        const burger = header.querySelector('.js_burger');
        const menu = header.querySelector('.js_menu');

        const links = header.querySelectorAll('.js_menu_link');

        burger.addEventListener('click', () => {

            header.classList.toggle('menu-open');
            burger.classList.toggle('active');
            menu.classList.toggle('active');

            if (burger.classList.contains('active')) {
                fixBodyPosition();
            } else {
                unfixBodyPosition();
            }

        });

        links.forEach(link => {

            link.addEventListener('click', () => {

                unfixBodyPosition();

                header.classList.remove('menu-open');
                burger.classList.remove('active');
                menu.classList.remove('active');

            });

        });

    }

}

// фиксация <body>

function fixBodyPosition() {

    setTimeout(function () {

        if (!document.body.hasAttribute('data-body-scroll-fix')) {

            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            document.querySelector('.js_header').style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
            document.body.setAttribute('data-body-scroll-fix', scrollPosition);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.left = '0';
            document.body.style.width = '100%';
            document.documentElement.style.scrollBehavior = 'unset';

        }

    }, 15);

}

// расфиксация <body>

function unfixBodyPosition() {

    if (document.body.hasAttribute('data-body-scroll-fix')) {

        let scrollPosition = document.body.getAttribute('data-body-scroll-fix');

        document.body.style.paddingRight = "";
        document.querySelector('.js_header').style.paddingRight = "";
        document.body.removeAttribute('data-body-scroll-fix');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        window.scroll(0, scrollPosition);
        document.documentElement.style.scrollBehavior = '';

    }

}

// слайдер на главном экране

function initHeroSlider() {

    if (document.querySelector('.js_hero_swiper')) {

        const swiper = new Swiper('.js_hero_swiper', {
            navigation: {
                nextEl: '.js_hero_next',
                prevEl: '.js_hero_prev',
            },
            pagination: {
                el: '.js_hero_pagination',
                clickable: true,
            },
            loop: true,
            autoplay: {
                delay: 5000,
                // disableOnInteraction: true,
            },
        });

    }

}

// слайдер в разделе 'наши курсы'

function initCoursesSlider() {

    if (document.querySelector('.js_courses_swiper')) {

        const slider = document.querySelector('.js_courses_swiper');
        let swiper;

        function mobileSlider() {

            if (window.innerWidth < 1200 && slider.dataset.mobile === 'false') {

                swiper = new Swiper(slider, {
                    navigation: {
                        nextEl: '.js_courses_next',
                        prevEl: '.js_courses_prev',
                    },
                    pagination: {
                        el: '.js_courses_pagination',
                        clickable: true,
                    },
                    slidesPerView: 1,
                    spaceBetween: 20,
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    loop: true,
                    breakpoints: {
                        576: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }
                });

                slider.dataset.mobile = 'true';

            }

            if (window.innerWidth >= 1200) {

                slider.dataset.mobile = 'false';

                if (slider.classList.contains('swiper-initialized')) {
                    swiper.destroy();
                }

            }

        }

        mobileSlider();

        window.addEventListener('resize', () => {
            mobileSlider();
        });

    }

}

// кнопка 'все курсы' в разделе 'наши курсы'

function controlCoursesBtn() {

    const wrapper = document.querySelector('.js_courses_wrapper');

    if (wrapper) {

        const btn = wrapper.querySelector('.js_courses_btn');

        btn.addEventListener('click', (e) => {

            e.preventDefault();

            wrapper.classList.toggle('active');
            btn.classList.toggle('active');

            if (!btn.classList.contains('active')) {
                window.location.href = btn.getAttribute('href');
            }

        });

    }

}

// слайдер в разделе 'отзывы'

function initReviewsSlider() {

    if (document.querySelector('.js_reviews_swiper')) {

        const swiper = new Swiper('.js_reviews_swiper', {
            navigation: {
                nextEl: '.js_reviews_next',
                prevEl: '.js_reviews_prev',
            },
            // grabCursor: true,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 26,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 26,
                }
            },
        });

    }

}

// спойлеры

function controlSpoilers() {

    const items = document.querySelectorAll('.js_spoilers_item');

    if (items.length) {

        items.forEach(item => {

            const btn = item.querySelector('.js_spoilers_item_btn');

            btn.addEventListener('click', () => {
                item.classList.toggle('active');
            });

        });

    }

}

// слайдеры в разделе 'программа курса'

function initProgramSlider() {

    if (document.querySelector('.js_program_thumb') && document.querySelector('.js_program_swiper')) {

        const swiper1 = new Swiper('.js_program_thumb', {
            direction: "vertical",
            spaceBetween: 20,
        });

        const swiper2 = new Swiper('.js_program_swiper', {
            spaceBetween: 20,
            slidesPerView: 1,
            navigation: {
                nextEl: '.js_program_next',
                prevEl: '.js_program_prev',
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            // thumbs: {
            //     swiper: swiper1,
            // },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1200: {
                    grid: {
                        rows: 2,
                    },
                    slidesPerView: 1,
                    spaceBetween: 20,
                }
            },
        });

        swiper1.controller.control = swiper2;
        swiper2.controller.control = swiper1;

    }

}

// маска для телефона

function setPhoneMask(el, newmask) {

    function setCursorPosition(pos, elem) {

        elem.focus();

        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);

        else if (elem.createTextRange) {

            const range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();

        }

    }

    function mask(event) {

        const matrix = newmask;
        const def = matrix.replace(/\D/g, "");

        let val = this.value.replace(/\D/g, "");
        let i = 0;

        if (def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    }

    const inputs = document.querySelectorAll(el);

    if (inputs.length) {

        inputs.forEach(input => {

            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);

        });

    }

}

// валидация формы

function validateForm(form) {

    const formInputs = form.querySelectorAll('[class*="js_input"]');
    const patternEmail = /^[a-zA-Z0-9._%+-\.]+@[a-z0-9.-]+\.[a-z]{2,}$/i; // рег. выражение для поля 'электронная почта';

    let isValid = true;

    formInputs.forEach(input => {

        // проверяем поле на заполненность от одного знака и более
        if (input.classList.contains('js_input') && input.value === "") {
            createError(input, 'Заполните поле');
            isValid = false;
        } else if (input.classList.contains('js_input')) {
            removeError(input);
        }

        // проверяем правильность заполнения поля 'телефон'
        if (input.classList.contains('js_input_phone') && input.value === "") {
            createError(input, 'Заполните поле');
            isValid = false;
        } else if (input.classList.contains('js_input_phone') && input.value.length === 18) {
            removeError(input);
        } else if (input.classList.contains('js_input_phone')) {
            createError(input, 'Укажите корректный телефон');
            isValid = false;
        }

        // проверяем правильность заполнения поля 'электронная почта'
        if (input.classList.contains('js_input_email') && input.value === "") {
            createError(input, 'Заполните поле');
            isValid = false;
        } else if (input.classList.contains('js_input_email') && input.value.search(patternEmail) === 0) {
            removeError(input);
        } else if (input.classList.contains('js_input_email')) {
            createError(input, 'Укажите корректный e-mail');
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

// отправка формы

function sendForm(formSelector) {

    const form = document.querySelector(formSelector);
    const success = document.querySelector('[data-modal="success"]');

    if (form) {

        const formBtn = form.querySelector('.js_form_btn');
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

                // сюда пишем команды, которые должны выполниться после успешной валидации

                console.log('validate');

                formBtn.classList.add('animated');
                formBtn.disabled = true;

                setTimeout(() => { // имитация отправки, когда отправка будет настроена, нужно удалить setTimeout(), код отправки ниже закомментирован

                    formBtn.classList.remove('animated');
                    formBtn.disabled = false;
                    form.reset();
                    success && success.classList.add('active');
                    fixBodyPosition();

                }, 3000);

                // const formData = new FormData(form);

                // const response = await fetch('/', {
                //     method: 'POST',
                //     body: formData
                // });

                // if (response.ok) {
                //     form.reset();
                //     success && success.classList.add('active');
                //     fixBodyPosition();
                // } else {
                //     alert('Ошибка');
                // }

                // formBtn.classList.remove('animated');
                // formBtn.disabled = false;

            } else {

                console.log('no-validate');

                if (form.querySelector('[class*="js_input"].error')) {
                    form.querySelector('[class*="js_input"].error').focus(); //фокус к полю с ошибкой;
                }

            }

        });

    }

}

// логика при ховере карточек в разделе 'наши преимущества'

function controlBenefitsItems() {

    list = document.querySelector('.js_benefits_list');
    wrappers = document.querySelectorAll('.js_benefits_img_wrapper');

    if (list && wrappers.length) {
        items = document.querySelectorAll('.js_benefits_item');
        images = document.querySelectorAll('.js_benefits_img');

        items.forEach(item => {

            item.addEventListener('mouseenter', () => {

                images.forEach(img => {

                    img.classList.remove('active');

                    if (item.dataset.item === img.dataset.img) {
                        img.classList.add('active');
                    }

                });

            });

            item.addEventListener('mouseleave', () => {

                images.forEach(img => img.classList.remove('active'));

                wrappers.forEach(wrapper => {

                    const wrapperImages = wrapper.querySelectorAll('.js_benefits_img');
                    wrapperImages[0].classList.add('active');

                });

            });

            item.addEventListener('click', () => {

                list.scrollBy({
                    left: item.offsetLeft - list.scrollLeft,
                    behavior: 'smooth',
                })

            });

        });

    }

}

// логика для модальных окон

function controlModal() {

    const btns = document.querySelectorAll('[data-btn]');
    const modals = document.querySelectorAll('[data-modal]');

    if (btns.length && modals.length) {

        btns.forEach(btn => {

            btn.addEventListener('click', (e) => {

                e.preventDefault();

                modals.forEach(modal => {

                    if (btn.dataset.btn === modal.dataset.modal) {
                        modal.classList.add('active');
                        fixBodyPosition();
                    }

                });

            });

        });

    }

    if (modals.length) {

        modals.forEach(modal => {

            closeBtns = modal.querySelectorAll('.js_modal_close');

            closeBtns.forEach(btn => {

                btn.addEventListener('click', () => {
                    closeModal(modal);
                });

            });

            modal.addEventListener('click', (e) => {

                if (modal === e.target) {
                    closeModal(modal);
                }

            });

        });

        window.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {

                modals.forEach(modal => {
                    closeModal(modal);
                });

            }

        });

        function closeModal(modal) {
            modal.classList.remove('active');
            unfixBodyPosition();
        }

    }

}