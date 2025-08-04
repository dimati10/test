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

    const canvas = cropperInstance.getCroppedCanvas({
      width: 300,
      height: 300,
      imageSmoothingQuality: "high",
    });

    const dataUrl = canvas.toDataURL("image/png");

    // Показываем превью в форме
    imgPreview.src = dataUrl;
    imgWrapper.classList.remove("hidden");
    btn.classList.add("hidden");

    // Возвращаемся в форму
    cropperBlock.classList.add("hidden");
    formBlock.classList.remove("hidden");

    // Чистим кроппер
    cropperInstance.destroy();
    cropperInstance = null;
    tempFile = null;
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