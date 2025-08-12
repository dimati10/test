window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  controlMobileMenu(); // мобильное меню;
  controlSpoilers(); // спойлеры
  // sendForm(".js_feedback_form_1"); // отправка формы в разделе 'попробуйте бесплатно'
  // sendForm(".js_any_questions_form"); // отправка формы в разделе 'остались вопросы'
  // sendForm(".js_feedback_form_2"); // отправка формы в разделе 'как начать учиться'
  controlModal(); // логика для модальных окон
  controlPasswordVisibility(); // кнопка показать-скрыть пароль
  controlMofalFilter(); // фильтрация и сортирвка в модальных окнах
  copyNewUserLink(); // копирование ссылки для приглашения нового пользователя
  copyStatistics(); // копирование статистики
  initDatepicker(); // датапикер
  attachFile(); // прикрепление файла
  setTabs(); // табы
  setTabs(".js_lesson_tabs", ".js_lesson_tabs_btn", ".js_lesson_tabs_item"); // табы на странице урока
  initTrainingSliders(); // превращение карточек в слайдеры на мобильных расширениях
  seTextareaHeight(); // автоматическое увеличение высоты textarea при переполнении текстом
  setTimer(".js_training_link_timer", "2025-08-10"); // таймер
  setQrCode(); // qr код
  setFortuneWheel(); // колесо фортуны
  initModalDataEditorSlider(); // слайдер c аватарами в модальном окне 'редактор данных'
  setInputNumber(); // ввод только цифр
  changeAvatar(); //смена аватара в профиле
  controlRatingTableSort(); // сортировка таблицы на странице 'рейтинг учеников'
  initLessonSliders(); // превращение кнопок табов в слайдеры на мобильных расширениях на странице урока
  controlStudentsTable(); // сортировка таблицы на странице 'мои ученики'

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

// логика для модальных окон

function controlModal() {
  const btns = document.querySelectorAll("[data-btn]");
  const modals = document.querySelectorAll("[data-modal]");

  if (btns.length && modals.length) {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        modals.forEach((modal) => {
          modal.classList.remove("active");

          if (btn.dataset.btn === modal.dataset.modal) {
            modal.classList.add("active");
            fixBodyPosition();

            // if (modal.dataset.modal === "statistics") {
            //   const copyBlock = modal.querySelector(
            //     ".js_modal_statistics_copy"
            //   );

            //   copyContent(copyBlock.textContent.trim());
            // }

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
      const closeBtns = modal.querySelectorAll(".js_modal_close");

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

// копирование статистики

function copyStatistics() {
  const modal = document.querySelector("[data-modal='statistics']");

  if (!modal) return;

  const descr = modal.querySelector(".js_modal_statistics_descr");
  const textarea = modal.querySelector(".js_modal_statistics_textarea");
  const btn = modal.querySelector(".js_modal_statistics_btn");

  textarea.value = textarea.value.replace(/^[ \t]+/gm, "");

  btn.addEventListener("click", () => {
    copyContent(textarea.value);
    if (descr) {
      descr.classList.add("active");
    }

    setTimeout(() => {
      if (descr) {
        descr.classList.remove("active");
      }
    }, 3000);
  });
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
  // const status = document.querySelector(".js_lesson_tabs_status");

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

        // if(btn.classList.contains("js_lesson_tabs_btn")) {
        //   status.style.setProperty("--bg-color", btn.style.getPropertyValue("--status-color"));
        // }
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

        if (window.innerWidth > 767) {
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

  if (!qrContainer) return;

  const url = qrContainer.dataset.url;

  new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
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
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
    });
  }
}

// ввод только цифр

function setInputNumber() {
  const input = document.querySelector(".js_input_number");
  if (input) {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "");
    });
  }
}

// смена аватара в профиле

// function changeAvatar() {
//   const uploadBlock = document.querySelector(".js_modal_data_editor_upload");

//   if (!uploadBlock) return;

//   const input = uploadBlock.querySelector(".js_modal_data_editor_upload_input");
//   const imgWrapper = uploadBlock.querySelector(
//     ".js_modal_data_editor_upload_img_wrapper"
//   );
//   const img = uploadBlock.querySelector(".js_modal_data_editor_upload_img");
//   const btn = uploadBlock.querySelector(".js_modal_data_editor_upload_btn");

//   const allowedExtensions = ["jpg", "jpeg", "png"];
//   const MAX_FILE_SIZE_MB = 5;

//   function handleFile(file) {
//     const fileExtension = file.name.split(".").pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExtension)) {
//       alert("Поддерживаются только изображения в формате JPG, JPEG и PNG.");
//       resetCustomAvatar();
//       return;
//     }

//     if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       alert(
//         `Файл слишком большой. Максимальный размер — ${MAX_FILE_SIZE_MB}MB.`
//       );
//       resetCustomAvatar();
//       return;
//     }

//     const reader = new FileReader();

//     imgWrapper.classList.remove("hidden");
//     btn.classList.add("hidden");

//     reader.addEventListener("load", () => {
//       img.src = reader.result;
//     });

//     reader.readAsDataURL(file);
//   }

//   function resetCustomAvatar() {
//     imgWrapper.classList.add("hidden");
//     btn.classList.remove("hidden");
//     input.value = "";
//     img.src = "";
//   }

//   input.addEventListener("change", () => {
//     if (input.files && input.files[0]) {
//       handleFile(input.files[0]);
//     } else {
//       resetCustomAvatar();
//     }
//   });

//   const highlight = (flag) => uploadBlock.classList.toggle("is-dragover", flag);

//   ["dragenter", "dragover"].forEach((ev) => {
//     uploadBlock.addEventListener(ev, (e) => {
//       e.preventDefault();
//       highlight(true);
//     });
//   });

//   ["dragleave", "dragend", "drop"].forEach((ev) => {
//     uploadBlock.addEventListener(ev, (e) => {
//       e.preventDefault();
//       highlight(false);
//     });
//   });

//   uploadBlock.addEventListener("drop", (e) => {
//     e.preventDefault();
//     highlight(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       // handleFile(e.dataTransfer.files[0]);
//       input.files = e.dataTransfer.files;
//       handleFile(input.files[0]);
//     } else {
//       resetCustomAvatar();
//     }
//   });
// }

function changeAvatar() {
  const uploadBlock = document.querySelector(".js_modal_data_editor_upload");
  if (!uploadBlock) return;

  const input = uploadBlock.querySelector(".js_modal_data_editor_upload_input");
  const imgWrapper = uploadBlock.querySelector(
    ".js_modal_data_editor_upload_img_wrapper"
  );
  const imgPreview = uploadBlock.querySelector(
    ".js_modal_data_editor_upload_img"
  );
  const btn = uploadBlock.querySelector(".js_modal_data_editor_upload_btn");

  const formBlock = document.querySelector(".js_modal_data_editor_form");
  const cropperBlock = document.querySelector(".js_modal_data_editor_cropper");
  const cropperImgWrapper = cropperBlock.querySelector(
    ".js_modal_data_editor_cropper_img_wrapper"
  );
  const cropperImg = cropperBlock.querySelector(
    ".js_modal_data_editor_cropper_img"
  );

  const cropperCancelBtn = cropperBlock.querySelector('button[type="button"]');
  const cropperSaveBtn = cropperBlock.querySelector('button[type="submit"]');

  let cropperInstance = null;
  let tempFile = null;

  const allowedExtensions = ["jpg", "jpeg", "png"];
  const MAX_FILE_SIZE_MB = 5;

  function resetCustomAvatar() {
    imgWrapper.classList.add("hidden");
    btn.classList.remove("hidden");
    input.value = "";
    imgPreview.src = "";
  }

  function showCropper(file) {
    // Переход в режим кроппера
    formBlock.classList.add("hidden");
    cropperBlock.classList.remove("hidden");

    // Чистим предыдущий кроппер
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    const reader = new FileReader();
    reader.onload = () => {
      cropperImg.src = reader.result;

      // Инициализируем Cropper.js после загрузки изображения
      cropperImg.onload = () => {
        cropperInstance = new Cropper(cropperImg, {
          aspectRatio: 1,
          viewMode: 1,
          autoCropArea: 1,
        });
      };
    };
    reader.readAsDataURL(file);
  }

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

    tempFile = file;
    showCropper(file);
  }

  // Кнопка "Отмена" в кроппере
  cropperCancelBtn.addEventListener("click", () => {
    cropperBlock.classList.add("hidden");
    formBlock.classList.remove("hidden");
    tempFile = null;
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }
  });

  // Кнопка "Сохранить" в кроппере
  // cropperSaveBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   if (!cropperInstance) return;

  //   const canvas = cropperInstance.getCroppedCanvas({
  //     width: 300,
  //     height: 300,
  //     imageSmoothingQuality: "high",
  //   });

  //   const dataUrl = canvas.toDataURL("image/png");

  //   // Показываем превью в форме
  //   imgPreview.src = dataUrl;
  //   imgWrapper.classList.remove("hidden");
  //   btn.classList.add("hidden");

  //   // Возвращаемся в форму
  //   cropperBlock.classList.add("hidden");
  //   formBlock.classList.remove("hidden");

  //   // Чистим кроппер
  //   cropperInstance.destroy();
  //   cropperInstance = null;
  //   tempFile = null;
  // });

  // Кнопка "Сохранить" в кроппере
  cropperSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!cropperInstance) return;

    cropperInstance
      .getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: "high",
      })
      .toBlob(
        (blob) => {
          if (!blob) return;

          // Создаем новый File на основе обрезанного Blob
          const fileExtension = tempFile
            ? tempFile.name.split(".").pop().toLowerCase()
            : "png";
          const fileName = tempFile
            ? tempFile.name.replace(/\.[^/.]+$/, "") +
              "_cropped." +
              fileExtension
            : "avatar_cropped." + fileExtension;
          const croppedFile = new File([blob], fileName, { type: blob.type });

          // Подставляем превью
          imgPreview.src = URL.createObjectURL(blob);
          imgWrapper.classList.remove("hidden");
          btn.classList.add("hidden");

          // Подменяем input.files на новый обрезанный файл
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(croppedFile);
          input.files = dataTransfer.files;

          // Возвращаемся в форму
          cropperBlock.classList.add("hidden");
          formBlock.classList.remove("hidden");

          // Чистим кроппер
          cropperInstance.destroy();
          cropperInstance = null;
          tempFile = null;
        },
        "image/png",
        0.92
      ); // можно поменять формат и качество
  });

  // Слушатели для input file
  input.addEventListener("change", () => {
    if (input.files && input.files[0]) {
      handleFile(input.files[0]);
    } else {
      resetCustomAvatar();
    }
  });

  // Drag & Drop
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
      input.files = e.dataTransfer.files;
      handleFile(input.files[0]);
    } else {
      resetCustomAvatar();
    }
  });
}

// сортировка таблицы на странице 'рейтинг учеников'

function controlRatingTableSort() {
  const table = document.querySelector(".js_table");

  if (!table) return;

  const tbody = table.querySelector(".js_table_body");
  const sortButtons = table.querySelectorAll(".js_table_sort_btn");

  let activeColumnIndex = null;
  let isAscending = true;

  sortButtons.forEach((button) => {
    const th = button.closest("th");
    const columnIndex = Array.from(th.parentElement.children).indexOf(th);

    button.addEventListener("click", () => {
      if (activeColumnIndex !== columnIndex) {
        isAscending = true;
        activeColumnIndex = columnIndex;
      } else {
        isAscending = !isAscending;
      }

      sortButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.dataset.sort = "";
        btn.querySelector("svg").style.transform = "";
      });

      const rows = Array.from(tbody.querySelectorAll("tr"));

      rows.sort((a, b) => {
        const aText = a.children[columnIndex]?.textContent.trim() || "";
        const bText = b.children[columnIndex]?.textContent.trim() || "";

        const aValue = parseFloat(aText.replace("%", "")) || 0;
        const bValue = parseFloat(bText.replace("%", "")) || 0;

        return isAscending ? aValue - bValue : bValue - aValue;
      });

      rows.forEach((row) => tbody.appendChild(row));

      button.classList.add("active");
      button.dataset.sort = isAscending ? "asc" : "desc";
      button.querySelector("svg").style.transform = isAscending
        ? "rotate(180deg)"
        : "rotate(0deg)";
    });
  });
}

// превращение кнопок табов в слайдеры на мобильных расширениях на странице урока

function initLessonSliders() {
  const sliderWraps = document.querySelectorAll(".js_lesson_slider");

  if (sliderWraps.length) {
    sliderWraps.forEach((wrap) => {
      const slider = wrap.querySelector(".js_lesson_swiper");
      const prev = wrap.querySelector(".js_lesson_prev");
      const next = wrap.querySelector(".js_lesson_next");

      let swiper;

      function mobileSlider() {
        if (window.innerWidth <= 1199 && slider.dataset.mobile == "false") {
          swiper = new Swiper(slider, {
            navigation: {
              nextEl: next,
              prevEl: prev,
            },
            slidesPerView: "auto",
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
          });

          slider.dataset.mobile = "true";
        }

        if (window.innerWidth > 1199) {
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

// сортировка таблицы на странице 'мои ученики'

function controlStudentsTable() {
  const tbody = document.querySelector(".js_students_table_body");
  if (!tbody) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));

  const searchInput = document.querySelector(".js_students_search_input");
  const selects = document.querySelectorAll(".js_students_filter_select");
  const sortBtns = document.querySelectorAll(".js_students_sort_btn");

  function filterTable() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const [teacherSelect, courseSelect, percentSelect] = selects;

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");

      const studentName = cells[1].textContent.trim().toLowerCase();
      const teacher = cells[4].textContent.trim();
      const course = cells[7].textContent.trim();
      const percentText = cells[6].textContent.trim().replace("%", "");
      const percent = parseInt(percentText, 10) || 0;

      let matchesSearch = !searchValue || studentName.includes(searchValue);
      let matchesTeacher = !teacherSelect.value || teacherSelect.options[teacherSelect.selectedIndex].text === teacher;
      let matchesCourse = !courseSelect.value || courseSelect.options[courseSelect.selectedIndex].text === course;

      let matchesPercent = true;
      if (percentSelect.value) {
        const selectedOption = percentSelect.options[percentSelect.selectedIndex].text;
        const [min, max] = selectedOption.split("-").map(v => parseInt(v, 10));
        matchesPercent = percent >= min && percent <= max;
      }

      if (matchesSearch && matchesTeacher && matchesCourse && matchesPercent) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  function sortTable(colIndex, type = "text") {
    const visibleRows = rows.filter(row => row.style.display !== "none");

    visibleRows.sort((a, b) => {
      let aText = a.querySelectorAll("td")[colIndex].textContent.trim();
      let bText = b.querySelectorAll("td")[colIndex].textContent.trim();

      if (type === "number") {
        aText = parseFloat(aText.replace("%", "")) || 0;
        bText = parseFloat(bText.replace("%", "")) || 0;
        return aText - bText; // всегда по возрастанию
      } else {
        return aText.localeCompare(bText, "ru", { sensitivity: "base" });
      }
    });

    visibleRows.forEach(row => tbody.appendChild(row));
  }

  searchInput.addEventListener("input", filterTable);
  selects.forEach(select => select.addEventListener("change", filterTable));

  sortBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      sortBtns.forEach(b => b.classList.remove("active"));

      if (index === 0) {
        // Сброс
        btn.classList.add("active");
        searchInput.value = "";
        selects.forEach(select => select.selectedIndex = 0);
        rows.forEach(row => row.style.display = "");
        // порядок возвращаем как был в HTML
        rows.forEach(row => tbody.appendChild(row));
        return;
      }

      btn.classList.add("active");

      let colIndex = 0;
      let type = "text";

      switch (index) {
        case 1: colIndex = 1; type = "text"; break; // имя
        case 2: colIndex = 1; type = "text"; break; // фамилия
        case 3: colIndex = 7; type = "text"; break; // курс
        case 4: colIndex = 4; type = "text"; break; // преподаватель
        case 5: colIndex = 6; type = "number"; break; // % ДЗ
      }

      if (index === 2) {
        // По фамилии
        const visibleRows = rows.filter(row => row.style.display !== "none");
        visibleRows.sort((a, b) => {
          const aSurname = a.querySelectorAll("td")[1].textContent.trim().split(" ").slice(-1)[0].toLowerCase();
          const bSurname = b.querySelectorAll("td")[1].textContent.trim().split(" ").slice(-1)[0].toLowerCase();
          return aSurname.localeCompare(bSurname, "ru", { sensitivity: "base" });
        });
        visibleRows.forEach(row => tbody.appendChild(row));
      } else {
        sortTable(colIndex, type);
      }
    });
  });
}