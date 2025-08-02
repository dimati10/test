window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  controlMobileMenu(); // мобильное меню;
  // initHeroSlider(); // слайдер на главном экране
  // initCoursesSlider(); // слайдер в разделе 'наши курсы'
  // controlCoursesBtn(); // кнопка 'все курсы' в разделе 'наши курсы'
  // initReviewsSlider(); // слайдер в разделе 'отзывы'
  controlSpoilers(); // спойлеры
  // initProgramSlider(); // слайдеры в разделе 'программа курса'
  // setPhoneMask(".js_input_phone", "+7 (___) ___-__-__"); // маска для телефона
  // sendForm(".js_feedback_form_1"); // отправка формы в разделе 'попробуйте бесплатно'
  // sendForm(".js_any_questions_form"); // отправка формы в разделе 'остались вопросы'
  // sendForm(".js_feedback_form_2"); // отправка формы в разделе 'как начать учиться'
  // controlBenefitsItems(); // логика при ховере карточек в разделе 'наши преимущества'
  controlModal(); // логика для модальных окон

  // новые скрипты

  controlPasswordVisibility(); // кнопка показать-скрыть пароль
  controlMofalFilter(); // фильтрация и сортирвка в модальных окнах
  copyNewUserLink(); // копирование ссылки для приглашения нового пользователя
  initDatepicker(); // датапикер
  attachFile(); // прикрепление файла
  setTabs(); // табы
  initTrainingSliders(); // превращение карточек в слайдеры на мобильных расширениях
  seTextareaHeight(); // автоматическое увеличение высоты textarea при переполнении текстом
  setTimer(".js_training_link_timer", "2025-08-10"); // таймер
  setQrCode(); // qr код
  setFortuneWheel(); // колесо фортуны
  initModalDataEditorSlider(); // слайдер c аватарами в модальном окне 'редактор данных'
  changeAvatar(); //смена аватара в профиле

  console.log("initApp");
}

// мобильное меню;

function controlMobileMenu() {
  const header = document.querySelector(".js_header");

  if (header) {
    const burger = header.querySelector(".js_burger");
    const menu = header.querySelector(".js_menu");

    // const links = header.querySelectorAll(".js_menu_link");

    burger.addEventListener("click", () => {
      header.classList.toggle("menu-open");
      burger.classList.toggle("active");
      menu.classList.toggle("active");

      if (burger.classList.contains("active")) {
        fixBodyPosition();
      } else {
        unfixBodyPosition();
      }
    });

    // links.forEach((link) => {
    //   link.addEventListener("click", () => {
    //     unfixBodyPosition();

    //     header.classList.remove("menu-open");
    //     burger.classList.remove("active");
    //     menu.classList.remove("active");
    //   });
    // });
  }
}

// фиксация <body>

function fixBodyPosition() {
  const header = document.querySelector(".js_header");

  setTimeout(function () {
    if (!document.body.hasAttribute("data-body-scroll-fix")) {
      let scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      document.body.style.paddingRight = `${
        window.innerWidth - document.body.offsetWidth
      }px`;
      if (header)
        header.style.paddingRight = `${
          window.innerWidth - document.body.offsetWidth
        }px`;
      document.body.setAttribute("data-body-scroll-fix", scrollPosition);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = "0";
      document.body.style.width = "100%";
      document.documentElement.style.scrollBehavior = "unset";
    }
  }, 15);
}

// расфиксация <body>

function unfixBodyPosition() {
  const header = document.querySelector(".js_header");

  if (document.body.hasAttribute("data-body-scroll-fix")) {
    let scrollPosition = document.body.getAttribute("data-body-scroll-fix");

    document.body.style.paddingRight = "";
    if (header) header.style.paddingRight = "";
    document.body.removeAttribute("data-body-scroll-fix");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";
    window.scroll(0, scrollPosition);
    document.documentElement.style.scrollBehavior = "";
  }
}

// слайдер на главном экране

function initHeroSlider() {
  if (document.querySelector(".js_hero_swiper")) {
    const swiper = new Swiper(".js_hero_swiper", {
      navigation: {
        nextEl: ".js_hero_next",
        prevEl: ".js_hero_prev",
      },
      pagination: {
        el: ".js_hero_pagination",
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
  if (document.querySelector(".js_courses_swiper")) {
    const slider = document.querySelector(".js_courses_swiper");
    let swiper;

    function mobileSlider() {
      if (window.innerWidth < 1200 && slider.dataset.mobile === "false") {
        swiper = new Swiper(slider, {
          navigation: {
            nextEl: ".js_courses_next",
            prevEl: ".js_courses_prev",
          },
          pagination: {
            el: ".js_courses_pagination",
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
          },
        });

        slider.dataset.mobile = "true";
      }

      if (window.innerWidth >= 1200) {
        slider.dataset.mobile = "false";

        if (slider.classList.contains("swiper-initialized")) {
          swiper.destroy();
        }
      }
    }

    mobileSlider();

    window.addEventListener("resize", () => {
      mobileSlider();
    });
  }
}

// кнопка 'все курсы' в разделе 'наши курсы'

function controlCoursesBtn() {
  const wrapper = document.querySelector(".js_courses_wrapper");

  if (wrapper) {
    const btn = wrapper.querySelector(".js_courses_btn");

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      wrapper.classList.toggle("active");
      btn.classList.toggle("active");

      if (!btn.classList.contains("active")) {
        window.location.href = btn.getAttribute("href");
      }
    });
  }
}

// слайдер в разделе 'отзывы'

function initReviewsSlider() {
  if (document.querySelector(".js_reviews_swiper")) {
    const swiper = new Swiper(".js_reviews_swiper", {
      navigation: {
        nextEl: ".js_reviews_next",
        prevEl: ".js_reviews_prev",
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
        },
      },
    });
  }
}

// спойлеры

function controlSpoilers() {
  const items = document.querySelectorAll(".js_spoilers_item");

  if (items.length) {
    items.forEach((item) => {
      const btn = item.querySelector(".js_spoilers_item_btn");

      btn.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }
}

// слайдеры в разделе 'программа курса'

function initProgramSlider() {
  if (
    document.querySelector(".js_program_thumb") &&
    document.querySelector(".js_program_swiper")
  ) {
    const swiper1 = new Swiper(".js_program_thumb", {
      direction: "vertical",
      spaceBetween: 20,
    });

    const swiper2 = new Swiper(".js_program_swiper", {
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        nextEl: ".js_program_next",
        prevEl: ".js_program_prev",
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
        },
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
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });

    if (event.type == "blur") {
      if (this.value.length == 2) this.value = "";
    } else setCursorPosition(this.value.length, this);
  }

  const inputs = document.querySelectorAll(el);

  if (inputs.length) {
    inputs.forEach((input) => {
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

  formInputs.forEach((input) => {
    // проверяем поле на заполненность от одного знака и более
    if (input.classList.contains("js_input") && input.value === "") {
      createError(input, "Заполните поле");
      isValid = false;
    } else if (input.classList.contains("js_input")) {
      removeError(input);
    }

    // проверяем правильность заполнения поля 'телефон'
    if (input.classList.contains("js_input_phone") && input.value === "") {
      createError(input, "Заполните поле");
      isValid = false;
    } else if (
      input.classList.contains("js_input_phone") &&
      input.value.length === 18
    ) {
      removeError(input);
    } else if (input.classList.contains("js_input_phone")) {
      createError(input, "Укажите корректный телефон");
      isValid = false;
    }

    // проверяем правильность заполнения поля 'электронная почта'
    if (input.classList.contains("js_input_email") && input.value === "") {
      createError(input, "Заполните поле");
      isValid = false;
    } else if (
      input.classList.contains("js_input_email") &&
      input.value.search(patternEmail) === 0
    ) {
      removeError(input);
    } else if (input.classList.contains("js_input_email")) {
      createError(input, "Укажите корректный e-mail");
      isValid = false;
    }
  });

  return isValid;
}

// создание ошибки валидации

const createError = (input, text) => {
  removeError(input);

  input.classList.add("error");
  input
    .closest("label")
    .insertAdjacentHTML(
      "beforeend",
      `<span class="field__error">${text}</span>`
    );
};

// удаление ошибки валидации

const removeError = (input) => {
  input.classList.remove("error");

  if (input.parentElement.querySelector(".field__error")) {
    input.parentElement.querySelector(".field__error").remove();
  }
};

// отправка формы

function sendForm(formSelector) {
  const form = document.querySelector(formSelector);
  const success = document.querySelector('[data-modal="success"]');

  if (form) {
    const formBtn = form.querySelector(".js_form_btn");
    const formInputs = form.querySelectorAll('[class*="js_input"]');

    let isInputEventAdded = false;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!isInputEventAdded) {
        formInputs.forEach((input) => {
          input.addEventListener("input", () => {
            validateForm(form);
          });
        });

        isInputEventAdded = true;
      }

      if (validateForm(form)) {
        // сюда пишем команды, которые должны выполниться после успешной валидации

        console.log("validate");

        formBtn.classList.add("animated");
        formBtn.disabled = true;

        setTimeout(() => {
          // имитация отправки, когда отправка будет настроена, нужно удалить setTimeout(), код отправки ниже закомментирован

          formBtn.classList.remove("animated");
          formBtn.disabled = false;
          form.reset();
          success && success.classList.add("active");
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
        console.log("no-validate");

        if (form.querySelector('[class*="js_input"].error')) {
          form.querySelector('[class*="js_input"].error').focus(); //фокус к полю с ошибкой;
        }
      }
    });
  }
}

// логика при ховере карточек в разделе 'наши преимущества'

function controlBenefitsItems() {
  list = document.querySelector(".js_benefits_list");
  wrappers = document.querySelectorAll(".js_benefits_img_wrapper");

  if (list && wrappers.length) {
    items = document.querySelectorAll(".js_benefits_item");
    images = document.querySelectorAll(".js_benefits_img");

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        images.forEach((img) => {
          img.classList.remove("active");

          if (item.dataset.item === img.dataset.img) {
            img.classList.add("active");
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        images.forEach((img) => img.classList.remove("active"));

        wrappers.forEach((wrapper) => {
          const wrapperImages = wrapper.querySelectorAll(".js_benefits_img");
          wrapperImages[0].classList.add("active");
        });
      });

      item.addEventListener("click", () => {
        list.scrollBy({
          left: item.offsetLeft - list.scrollLeft,
          behavior: "smooth",
        });
      });
    });
  }
}

// логика для модальных окон

function controlModal() {
  const btns = document.querySelectorAll("[data-btn]");
  const modals = document.querySelectorAll("[data-modal]");

  if (btns.length && modals.length) {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        modals.forEach((modal) => {
          if (btn.dataset.btn === modal.dataset.modal) {
            modal.classList.add("active");
            fixBodyPosition();

            if (modal.dataset.modal === "statistics") {
              const copyBlock = modal.querySelector(
                ".js_modal_statistics_copy"
              );

              copyContent(copyBlock.textContent.trim());
            }

            if (modal.dataset.modal === "adding-lesson") {
              const hiddenInput = modal.querySelector(".js_hidden_input");

              if (btn.dataset.type) {
                hiddenInput.value = btn.dataset.type;
              }
            }
          }
        });
      });
    });
  }

  if (modals.length) {
    modals.forEach((modal) => {
      closeBtns = modal.querySelectorAll(".js_modal_close");

      closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          closeModal(modal);
        });
      });

      modal.addEventListener("click", (e) => {
        if (modal === e.target) {
          closeModal(modal);
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        modals.forEach((modal) => {
          closeModal(modal);
        });
      }
    });

    function closeModal(modal) {
      modal.classList.remove("active");
      unfixBodyPosition();
    }
  }
}

// кнопка показать-скрыть пароль

function controlPasswordVisibility() {
  const btns = document.querySelectorAll(".js_field_btn");

  if (btns.length) {
    btns.forEach((btn) => {
      const input = btn.previousElementSibling;

      btn.addEventListener("click", () => {
        if (input.getAttribute("type") === "password") {
          input.setAttribute("type", "text");
          btn.classList.add("view");
        } else {
          input.setAttribute("type", "password");
          btn.classList.remove("view");
        }
      });
    });
  }
}

// фильтрация и сортирвка в модальных окнах

function controlMofalFilter() {
  const modals = document.querySelectorAll("[data-modal]");

  if (!modals.length) return;

  modals.forEach((modal) => {
    const searchInput = modal.querySelector(".js_modal_search");
    const list = modal.querySelector(".js_modal_list");

    if (!list) return; // Если нет списка, выходим

    const sortBtns = list.querySelectorAll(".js_modal_list_sort_btn");
    const itemsWrapper = list.querySelector(".js_modal_list_items");
    const items = Array.from(list.querySelectorAll(".js_modal_list_item"));

    if (!items.length) return; // Нет учеников — выходим

    const getItemData = (item) => {
      const name =
        item
          .querySelector(".js_modal_list_item_name")
          ?.textContent.trim()
          .toLowerCase() || "";
      const surname = name.split(" ").slice(-1).join(" ");
      const course =
        item
          .querySelector(".js_modal_list_item_course")
          ?.textContent.trim()
          .toLowerCase() || "";
      return { element: item, name, surname, course };
    };

    let itemsData = items.map(getItemData);

    function filterAndSort() {
      const searchValue = searchInput?.value.trim().toLowerCase() || "";

      // Определяем активную сортировку
      const activeSortBtn = list.querySelector(
        ".js_modal_list_sort_btn.active"
      );
      const sortKey = activeSortBtn?.dataset.sort || "name";

      // Фильтрация
      itemsData.forEach((item) => {
        const matches =
          item.name.includes(searchValue) || item.course.includes(searchValue);
        item.element.style.display = matches ? "block" : "none";
      });

      // Сортировка только видимых
      const visibleItems = itemsData.filter(
        (item) => item.element.style.display !== "none"
      );
      visibleItems.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

      // Перестроение DOM
      visibleItems.forEach((item) => itemsWrapper.appendChild(item.element));
    }

    // Поиск, если поле есть
    if (searchInput) {
      searchInput.addEventListener("input", filterAndSort);
    }

    // Сортировка, если кнопки есть
    if (sortBtns.length) {
      sortBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          sortBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          filterAndSort();
        });
      });

      // Если ни одна кнопка не активна — активируем первую
      const hasActive = Array.from(sortBtns).some((btn) =>
        btn.classList.contains("active")
      );
      if (!hasActive) {
        sortBtns[0].classList.add("active");
      }
    }

    // Первый запуск фильтрации и сортировки
    filterAndSort();
  });
}

// копирование содержимое в буфер обмена

function copyContent(content) {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      // console.log('Содержимое скопировано в буфер обмена:', content);
    })
    .catch((err) => {
      // console.error('Не удалось скопировать содержимое:', err);
    });
}

// копирование ссылки для приглашения нового пользователя

function copyNewUserLink() {
  const input = document.querySelector(".js_new_user_input");
  const btn = document.querySelector(".js_new_user_btn");
  const modal = document.querySelector("[data-modal='new-user']");

  if (input && btn) {
    btn.addEventListener("click", () => {
      copyContent(input.value);
      if (modal) {
        modal.classList.add("active");
        fixBodyPosition();
      }
    });
  }
}

// датапикер https://air-datepicker.com/ru

function initDatepicker() {
  const inputs = document.querySelectorAll(".js_date_input");

  if (inputs.length) {
    inputs.forEach((input) => {
      new AirDatepicker(input, {
        autoClose: true,
        position: "bottom center",
      });
    });
  }
}

// прикрепление файла

function attachFile() {
  const widgets = document.querySelectorAll(".js_upload");
  if (!widgets.length) return;

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const MAX_FILES_COUNT = 10;

  widgets.forEach((widget) => {
    const input = widget.querySelector(".js_upload_input");
    const text = widget.querySelector(".js_upload_text");
    const list = widget.querySelector(".js_upload_list");
    const area = widget.querySelector(".a-upload__area");

    const allowMultiple = widget.hasAttribute("data-multiple");
    if (allowMultiple) input.setAttribute("multiple", "multiple");

    let files = [];

    const reset = () => {
      files = [];
      render();
      input.value = "";
    };

    const removeAt = (idx) => {
      files.splice(idx, 1);
      render();
    };

    const render = () => {
      text.textContent = files.length
        ? allowMultiple
          ? `${files.length}/${MAX_FILES_COUNT} файл(ов) выбран`
          : "Файл выбран"
        : "Файл не выбран";

      list.innerHTML = "";
      list.classList.toggle("active", files.length > 0);

      files.forEach((file, idx) => {
        const item = document.createElement("div");
        item.className = "a-upload__item";

        const name = document.createElement("span");
        name.className = "js_upload_name";
        name.textContent = file.name;
        item.appendChild(name);

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "js_upload_remove";
        removeBtn.innerHTML =
          '<svg width="12" height="12"><use xlink:href="images/sprite.svg#close"></use></svg>';
        removeBtn.addEventListener("click", () => removeAt(idx));
        item.appendChild(removeBtn);

        list.appendChild(item);
      });
    };

    const tryAddFiles = (selected) => {
      if (!selected.length) return;

      const oversize = selected.find((f) => f.size > MAX_FILE_SIZE);
      if (oversize) {
        alert(`Размер файла «${oversize.name}» превышает 5 МБ`);
        return;
      }

      if (!allowMultiple) {
        files = [selected[0]];
      } else {
        const combined = [...files, ...selected];
        const map = new Map();
        combined.forEach((f) => map.set(`${f.name}_${f.size}`, f));
        files = Array.from(map.values()).slice(0, MAX_FILES_COUNT);

        if (combined.length > MAX_FILES_COUNT) {
          alert(
            `Можно загрузить максимум ${MAX_FILES_COUNT} файлов. Лишние будут проигнорированы.`
          );
        }
      }
      render();
    };

    input.addEventListener("change", () => {
      tryAddFiles(Array.from(input.files));
      input.value = "";
    });

    if (area) {
      const highlight = (flag) => area.classList.toggle("is-dragover", flag);

      ["dragenter", "dragover"].forEach((ev) => {
        area.addEventListener(ev, (e) => {
          e.preventDefault();
          highlight(true);
        });
      });

      ["dragleave", "dragend", "drop"].forEach((ev) => {
        area.addEventListener(ev, (e) => {
          e.preventDefault();
          highlight(false);
        });
      });

      area.addEventListener("drop", (e) => {
        const dtFiles = Array.from(e.dataTransfer.files);
        tryAddFiles(dtFiles);
      });
    }

    widget.getFiles = () => files;
    widget.resetFiles = reset;
  });
}

// табы

function setTabs(
  tabsSelector = ".js_tabs",
  btnSelector = ".js_tabs_btn",
  itemSelector = ".js_tabs_item"
) {
  const tabs = document.querySelectorAll(tabsSelector);

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    const btns = tab.querySelectorAll(btnSelector);
    const items = tab.querySelectorAll(itemSelector);

    if (!btns.length || !items.length) return;

    btns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        items.forEach((i) => i.classList.remove("active", "fade"));
        btn.classList.add("active");
        items[btnIndex].classList.add("active", "fade");
      });
    });
  });
}

// превращение карточек в слайдеры на мобильных расширениях

function initTrainingSliders() {
  const sliders = document.querySelectorAll(".js_training_swiper");

  if (sliders.length) {
    sliders.forEach((slider) => {
      let swiper;

      function mobileSlider() {
        if (window.innerWidth <= 767 && slider.dataset.mobile == "false") {
          swiper = new Swiper(slider, {
            navigation: {
              nextEl: ".js_training_next",
              prevEl: ".js_training_prev",
            },
            slidesPerView: 1,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
          });

          slider.dataset.mobile = "true";
        }

        if (window.innerWidth > 1200) {
          slider.dataset.mobile = "false";

          if (slider.classList.contains("swiper-initialized")) {
            swiper.destroy();
          }
        }
      }

      mobileSlider();

      window.addEventListener("resize", () => {
        mobileSlider();
      });
    });
  }
}

// автоматическое увеличение высоты textarea при переполнении текстом

function seTextareaHeight() {
  const textarea = document.querySelector(".js_textarea");

  if (!textarea) return;

  textarea.addEventListener("input", () => {
    // textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
}

// таймер

function setTimer(id, deadline) {
  function getTimeRemaining(endtime) {
    const t =
      Date.parse(endtime) -
      Date.parse(new Date()) +
      new Date().getTimezoneOffset() * 60000;

    const totalHours = Math.floor(t / (1000 * 60 * 60));
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      hours: totalHours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);

    if (timer) {
      const timeInterval = setInterval(updateClock, 1000);
      updateClock();

      function updateClock() {
        const t = getTimeRemaining(endtime);

        timer.innerHTML = `${getZero(t.hours)}:${getZero(t.minutes)}:${getZero(
          t.seconds
        )}`;

        if (t.total <= 0) {
          clearInterval(timeInterval);
          timer.innerHTML = `00:00:00`;
        }
      }
    }
  }

  setClock(id, deadline);
}

// qr код

function setQrCode() {
  const qrContainer = document.querySelector(".js_qr");
  const url = qrContainer.dataset.url;

  if (url) {
    new QRCode(qrContainer, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}

// колесо фортуны

function setFortuneWheel() {
  const btn = document.querySelector(".js_profile_fortune_wheel_btn");
  const wheel = document.querySelector(".js_profile_fortune_wheel_inner");

  if (!btn || !wheel) return;

  const segments = [
    "red",
    "yellow",
    "green",
    "orange",
    "red",
    "yellow",
    "green",
    "orange",
  ];

  const segmentAngle = 360 / segments.length;
  const minTurns = 1;
  const maxTurns = 4;
  let spinning = false;
  let totalRotation = 0;
  let countdownInterval = null;

  function parseTimeString(str) {
    const [h, m, s] = str.split(":").map((n) => parseInt(n, 10));
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  }

  function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  function startCountdown(duration) {
    let remaining = duration;
    btn.textContent = formatTime(remaining);
    btn.disabled = true;

    countdownInterval = setInterval(() => {
      remaining--;
      btn.textContent = formatTime(remaining);
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        btn.textContent = "КРУТИТЬ";
        btn.disabled = false;
      }
    }, 1000);
  }

  const raw = btn.getAttribute("data-timer");
  if (raw) {
    const seconds = parseTimeString(raw);
    if (seconds > 0) {
      startCountdown(seconds);
    }
  }

  btn.addEventListener("click", () => {
    if (spinning || btn.disabled) return;
    spinning = true;
    btn.disabled = true;

    const turns =
      Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
    const extraRotation = turns * 360 + Math.random() * 360;
    totalRotation += extraRotation;

    wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      const normalizedAngle = ((totalRotation % 360) + 360) % 360;
      const index = Math.floor(((360 - normalizedAngle) % 360) / segmentAngle);
      const result = segments[index];

      // console.log("Выпало:", result);

      if (result === "green") {
        spinning = false;
        btn.disabled = false;
        btn.textContent = "КРУТИТЬ";
        return;
      }

      const nextCooldown = "12:00:00";

      fetch("/api/wheel-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result, cooldown: nextCooldown }),
      });

      const seconds = parseTimeString(nextCooldown);
      startCountdown(seconds);

      spinning = false;
    }, 5200);
  });
}

// слайдер c аватарами в модальном окне 'редактор данных'

function initModalDataEditorSlider() {
  if (document.querySelector(".js_modal_data_editor_swiper")) {
    const swiper = new Swiper(".js_modal_data_editor_swiper", {
      navigation: {
        nextEl: ".js_modal_data_editor_next",
        prevEl: ".js_modal_data_editor_prev",
      },
      slidesPerView: "auto",
      spaceBetween: 43,
    });
  }
}

// смена аватара в профиле

function changeAvatar() {
  console.log("changeAvatar");

  const uploadBlock = document.querySelector(".js_modal_data_editor_upload");

  if (!uploadBlock) return;

  const input = uploadBlock.querySelector(".js_modal_data_editor_upload_input");
  const imgWrapper = uploadBlock.querySelector(
    ".js_modal_data_editor_upload_img_wrapper"
  );
  const img = uploadBlock.querySelector(".js_modal_data_editor_upload_img");
  const btn = uploadBlock.querySelector(".js_modal_data_editor_upload_btn");

  const allowedExtensions = ["jpg", "jpeg", "png"];
  const MAX_FILE_SIZE_MB = 5;

  function handleFile(file) {
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Поддерживаются только изображения в формате JPG, JPEG и PNG.");
      resetCustomAvatar();
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(
        `Файл слишком большой. Максимальный размер — ${MAX_FILE_SIZE_MB}MB.`
      );
      resetCustomAvatar();
      return;
    }

    const reader = new FileReader();

    imgWrapper.classList.remove("hidden");
    btn.classList.add("hidden");

    reader.addEventListener("load", () => {
      img.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  function resetCustomAvatar() {
    imgWrapper.classList.add("hidden");
    btn.classList.remove("hidden");
    input.value = "";
    img.src = "";
  }

  input.addEventListener("change", () => {
    if (input.files && input.files[0]) {
      handleFile(input.files[0]);
    } else {
      resetCustomAvatar();
    }
  });

  const highlight = (flag) => uploadBlock.classList.toggle("is-dragover", flag);

  ["dragenter", "dragover"].forEach((ev) => {
    uploadBlock.addEventListener(ev, (e) => {
      e.preventDefault();
      highlight(true);
    });
  });

  ["dragleave", "dragend", "drop"].forEach((ev) => {
    uploadBlock.addEventListener(ev, (e) => {
      e.preventDefault();
      highlight(false);
    });
  });

  uploadBlock.addEventListener("drop", (e) => {
    e.preventDefault();
    highlight(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFile(e.dataTransfer.files[0]);
      input.files = e.dataTransfer.files;
      handleFile(input.files[0]);
    } else {
      resetCustomAvatar();
    }
  });
}
