window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  controlMobileMenu(); // мобильное меню;
  controlSpoilers(); // спойлеры
  controlModal(); // логика для модальных окон
  controlPasswordVisibility(); // кнопка показать-скрыть пароль
  controlModalFilter(); // фильтрация и сортирвка в модальных окнах
  copyNewUserLink(); // копирование ссылки для приглашения нового пользователя
  copyStatistics(); // копирование статистики
  initDatepicker(); // датапикер
  attachFile(); // прикрепление файла
  setTabs(); // табы
  setTabs(".js_lesson_tabs", ".js_lesson_tabs_btn", ".js_lesson_tabs_item"); // табы на странице урока
  initTrainingSliders(); // превращение карточек в слайдеры на мобильных расширениях
  seTextareaHeight(); // автоматическое увеличение высоты textarea при переполнении текстом
  setTimer(); // таймер
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

    window.closeModal = function (modal) {
      modal.classList.remove("active");
      unfixBodyPosition();
    };

    // Добавляем глобальную функцию для открытия
    window.openModal = function (modalName) {
      const modal = document.querySelector(`[data-modal="${modalName}"]`);
      if (!modal) return;

      document.querySelectorAll("[data-modal]").forEach((m) => {
        m.classList.remove("active");
      });

      modal.classList.add("active");
      fixBodyPosition();
    };
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

function controlModalFilter() {
  const modals = document.querySelectorAll("[data-modal]");
  if (!modals.length) return;

  modals.forEach((modal) => {
    const searchInput = modal.querySelector(".js_modal_search");
    const list = modal.querySelector(".js_modal_list");
    if (!list) return;

    const sortBtns = list.querySelectorAll(".js_modal_list_sort_btn");
    const itemsWrapper = list.querySelector(".js_modal_list_items");
    if (!itemsWrapper) return;

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

    function getItemsData() {
      const items = Array.from(list.querySelectorAll(".js_modal_list_item"));
      return items.map(getItemData);
    }

    function filterAndSort() {
      const itemsData = getItemsData();
      if (!itemsData.length) return;

      const searchValue = searchInput?.value.trim().toLowerCase() || "";
      const activeSortBtn = list.querySelector(
        ".js_modal_list_sort_btn.active"
      );
      const sortKey = activeSortBtn?.dataset.sort || "name";

      // Фильтрация
      itemsData.forEach((item) => {
        const matches =
          item.name.includes(searchValue) || item.course.includes(searchValue);
        item.element.style.display = matches ? "" : "none";
      });

      // Сортировка только видимых
      const visibleItems = itemsData.filter(
        (item) => item.element.style.display !== "none"
      );
      visibleItems.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

      // Перестроение DOM
      visibleItems.forEach((item) => itemsWrapper.appendChild(item.element));
    }

    // Поиск
    if (searchInput) {
      searchInput.addEventListener("input", filterAndSort);
    }

    // Сортировка
    if (sortBtns.length) {
      sortBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          sortBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          filterAndSort();
        });
      });

      // Если ни одна кнопка не активна — активируем первую
      if (
        !Array.from(sortBtns).some((btn) => btn.classList.contains("active"))
      ) {
        sortBtns[0].classList.add("active");
      }
    }

    // Первый запуск
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
          '<svg width="12" height="12"><use xlink:href="static/new_design/images/sprite.svg#close"></use></svg>';
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
  function autoResize(el) {
    if (!el.classList.contains("js_training_chat_textarea")) {
      el.style.height = "auto";
    }
    
    const extra = el.offsetHeight - el.clientHeight;
    el.style.height = el.scrollHeight + extra + "px";
  }

  document.querySelectorAll("textarea").forEach((textarea) => {
    if (!textarea.classList.contains("js_training_chat_textarea")) {
      autoResize(textarea);
    }

    textarea.addEventListener("input", () => autoResize(textarea));
  });
}

// таймер

// function setTimer(id, deadline) {
//   function getTimeRemaining(endtime) {
//     const t =
//       Date.parse(endtime) -
//       Date.parse(new Date()) +
//       new Date().getTimezoneOffset() * 60000;

//     const totalHours = Math.floor(t / (1000 * 60 * 60));
//     const minutes = Math.floor((t / 1000 / 60) % 60);
//     const seconds = Math.floor((t / 1000) % 60);

//     return {
//       total: t,
//       hours: totalHours,
//       minutes: minutes,
//       seconds: seconds,
//     };
//   }

//   function getZero(num) {
//     return num < 10 ? `0${num}` : `${num}`;
//   }

//   function setClock(selector, endtime) {
//     const timer = document.querySelector(selector);

//     if (timer) {
//       const timeInterval = setInterval(updateClock, 1000);
//       updateClock();

//       function updateClock() {
//         const t = getTimeRemaining(endtime);

//         timer.innerHTML = `${getZero(t.hours)}:${getZero(t.minutes)}:${getZero(
//           t.seconds
//         )}`;

//         if (t.total <= 0) {
//           clearInterval(timeInterval);
//           timer.innerHTML = `00:00:00`;
//         }
//       }
//     }
//   }

//   setClock(id, deadline);
// }

function setTimer() {
  const timer = document.querySelector(".js_training_link_timer");
  if (!timer) return;

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
    timer.textContent = formatTime(remaining);

    const interval = setInterval(() => {
      remaining--;
      timer.textContent = formatTime(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        timer.textContent = "00:00:00";
      }
    }, 1000);
  }

  const raw = timer.getAttribute("data-timer");
  if (raw) {
    const seconds = parseTimeString(raw);
    if (seconds > 0) {
      startCountdown(seconds);
    }
  }
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

  function addHistoryItem(date, amount, comment) {
    // Находим контейнер
    const container = document.querySelector(".a-profile-history__items");
    if (!container) {
      console.error("Контейнер .a-profile-history__items не найден");
      return;
    }

    // Создаём элемент
    const item = document.createElement("div");
    item.classList.add("a-profile-history-item");

    item.innerHTML = `
        <div class="a-profile-history-item__col">
            <span class="a-profile-history-item__caption">Дата</span>
            <span class="a-profile-history-item__date">${date}</span>
        </div>
        <div class="a-profile-history-item__col">
            <span class="a-profile-history-item__caption">Кол-во</span>
            <span class="a-profile-history-item__amount a-profile-history-item__amount--plus">
                ${amount}
            </span>
        </div>
        <div class="a-profile-history-item__col">
            <span class="a-profile-history-item__caption">Комментарий</span>
            <span class="a-profile-history-item__comment">${comment}</span>
        </div>
    `;

    // Добавляем в начало (новые сверху) — как обычно в истории
    container.prepend(item);

    // Или в конец: container.appendChild(item);
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

    const studentId = btn.getAttribute("data-student-id");

    const normalizedAngle = ((totalRotation % 360) + 360) % 360;
    const index = Math.floor(((360 - normalizedAngle) % 360) / segmentAngle);
    const result = segments[index];

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (result !== "green") {
      fetch("/api/wheel_result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ result, student_id: studentId }),
      });
    }

    setTimeout(() => {
      openModal("ziton_message");

      const messageModal = document.querySelector(
        '[data-modal="ziton_message"]'
      );
      const title = messageModal.querySelector("#ziton_title");
      const desc = messageModal.querySelector("#ziton_desc");
      const coins = {
        red: {
          coins: 0,
          title: "🐞 Это похоже на баг!",
          desc: "Каждая ошибка учит тебя чему-то новому. Перезагрузка колеса через 24 часа!",
        },
        orange: {
          coins: 1,
          title: "🎉 +1 ЗИТОН!",
          desc: "Отличный старт! Каждая монета приближает тебя к большой цели! Не останавливайся на достигнутом!",
        },
        yellow: {
          coins: 3,
          title: "🔥 ДЖЕКПОТ! +3 ЗИТОНА!",
          desc: "Уровень удачи зашкаливает! Такие победы случаются не каждый день!",
        },
        green: {
          coins: 0,
          title: "🔄 Крути ещё раз!",
          desc: "Удача на твоей стороне! Лови дополнительный спин!",
        },
      };
      title.textContent = coins[result]["title"];
      desc.textContent = coins[result]["desc"];

      if (result === "green") {
        spinning = false;
        btn.disabled = false;
        btn.textContent = "КРУТИТЬ";
        return;
      }

      if (result !== "green" && result !== "red") {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, "0"); // День (01-31)
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяц (01-12), getMonth() начинается с 0
        const year = String(now.getFullYear()).slice(-2); // Последние 2 цифры года

        const formattedDate = `${day}.${month}.${year}`;
        addHistoryItem(formattedDate, coins[result]["coins"], "Колесо фортуны");
      }

      const nextCooldown = "24:00:00";

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

// сортировка таблицы на странице 'рейтинг учеников' | 'настройки' (сортировка работает по строкам)

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
      // Смена столбца или направления
      if (activeColumnIndex !== columnIndex) {
        isAscending = true;
        activeColumnIndex = columnIndex;
      } else {
        isAscending = !isAscending;
      }

      // Сброс стилей у всех кнопок
      sortButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.dataset.sort = "";
        const svg = btn.querySelector("svg");
        if (svg) svg.style.transform = "";
      });

      // Получаем строки
      const rows = Array.from(tbody.querySelectorAll("tr"));

      // Сортировка
      rows.sort((a, b) => {
        const aCell = a.children[columnIndex];
        const bCell = b.children[columnIndex];

        if (!aCell || !bCell) return 0;

        const aText = aCell.textContent.trim();
        const bText = bCell.textContent.trim();

        // Определяем, похоже ли на число (включая проценты)
        const isNumeric = /[\d.%,]/.test(aText) && /[\d.%,]/.test(bText);

        let aValue, bValue;

        if (isNumeric) {
          // Пытаемся извлечь число: убираем %, пробелы и парсим
          aValue = parseFloat(aText.replace(/[^\d.-]/g, "")) || -Infinity;
          bValue = parseFloat(bText.replace(/[^\d.-]/g, "")) || -Infinity;
          return isAscending ? aValue - bValue : bValue - aValue;
        } else {
          // Текстовая сортировка (без учёта регистра)
          aValue = aText.toLowerCase();
          bValue = bText.toLowerCase();
          if (aValue < bValue) return isAscending ? -1 : 1;
          if (aValue > bValue) return isAscending ? 1 : -1;
          return 0;
        }
      });

      // Перемещаем строки в отсортированном порядке
      rows.forEach((row) => tbody.appendChild(row));

      // Обновляем активную кнопку
      button.classList.add("active");
      button.dataset.sort = isAscending ? "asc" : "desc";
      const svg = button.querySelector("svg");
      if (svg) {
        svg.style.transform = isAscending ? "rotate(180deg)" : "rotate(0deg)";
      }
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

  let sortState = { index: null, direction: "asc" }; // текущее состояние сортировки

  function filterTable() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const [teacherSelect, courseSelect, percentSelect] = selects;

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      const studentName = cells[1].textContent.trim().toLowerCase();
      const teacher = cells[4].textContent.trim();
      const course = cells[7].textContent.trim();
      const percentText = cells[6].textContent.trim().replace("%", "");
      const percent = parseInt(percentText, 10) || 0;

      let matchesSearch = !searchValue || studentName.includes(searchValue);
      let matchesTeacher =
        !teacherSelect.value ||
        teacherSelect.options[teacherSelect.selectedIndex].text === teacher;
      let matchesCourse =
        !courseSelect.value ||
        courseSelect.options[courseSelect.selectedIndex].text === course;

      let matchesPercent = true;
      if (percentSelect.value) {
        const selectedOption =
          percentSelect.options[percentSelect.selectedIndex].text;
        const [min, max] = selectedOption
          .split("-")
          .map((v) => parseInt(v, 10));
        matchesPercent = percent >= min && percent <= max;
      }

      if (matchesSearch && matchesTeacher && matchesCourse && matchesPercent) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  function sortTable(colIndex, type = "text", direction = "asc") {
    const visibleRows = rows.filter((row) => row.style.display !== "none");

    visibleRows.sort((a, b) => {
      let aText = a.querySelectorAll("td")[colIndex].textContent.trim();
      let bText = b.querySelectorAll("td")[colIndex].textContent.trim();

      if (type === "number") {
        aText = parseFloat(aText.replace("%", "")) || 0;
        bText = parseFloat(bText.replace("%", "")) || 0;
      }

      let comparison =
        type === "number"
          ? aText - bText
          : aText.localeCompare(bText, "ru", { sensitivity: "base" });

      return direction === "asc" ? comparison : -comparison;
    });

    visibleRows.forEach((row) => tbody.appendChild(row));
  }

  searchInput.addEventListener("input", filterTable);
  selects.forEach((select) => select.addEventListener("change", filterTable));

  sortBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      sortBtns.forEach((b) => {
        b.classList.remove("active");
        b.classList.remove("rotated");
      });

      if (index === 0) {
        // Сброс
        btn.classList.add("active");
        searchInput.value = "";
        selects.forEach((select) => (select.selectedIndex = 0));
        rows.forEach((row) => (row.style.display = ""));
        rows.forEach((row) => tbody.appendChild(row));
        sortState = { index: null, direction: "asc" };
        return;
      }

      // Если жмём на ту же кнопку — меняем направление
      if (sortState.index === index) {
        sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
      } else {
        sortState = { index, direction: "asc" };
      }

      btn.classList.add("active");
      if (sortState.direction === "desc") {
        btn.classList.add("rotated"); // для поворота стрелки
      }

      let colIndex = 0;
      let type = "text";

      switch (index) {
        case 1:
          colIndex = 1;
          type = "text";
          break; // имя
        case 2:
          colIndex = 1;
          type = "text";
          break; // фамилия
        case 3:
          colIndex = 7;
          type = "text";
          break; // курс
        case 4:
          colIndex = 4;
          type = "text";
          break; // преподаватель
        case 5:
          colIndex = 6;
          type = "number";
          break; // % ДЗ
      }

      if (index === 2) {
        // По фамилии
        const visibleRows = rows.filter((row) => row.style.display !== "none");
        visibleRows.sort((a, b) => {
          const aSurname = a
            .querySelectorAll("td")[1]
            .textContent.trim()
            .split(" ")
            .slice(-1)[0]
            .toLowerCase();
          const bSurname = b
            .querySelectorAll("td")[1]
            .textContent.trim()
            .split(" ")
            .slice(-1)[0]
            .toLowerCase();
          let comparison = aSurname.localeCompare(bSurname, "ru", {
            sensitivity: "base",
          });
          return sortState.direction === "asc" ? comparison : -comparison;
        });
        visibleRows.forEach((row) => tbody.appendChild(row));
      } else {
        sortTable(colIndex, type, sortState.direction);
      }
    });
  });
}
