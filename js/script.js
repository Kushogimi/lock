document.addEventListener("DOMContentLoaded", () => {
  const btnPopup = document.getElementById("btn-popup");
  const popupOverlay = document.getElementById("popup-overlay");
  const popupContent = document.querySelector(".popup-content");
  const successMessage = document.getElementById("success-message");
  const popupForm = document.getElementById("popup-form");
  const closeBtn = document.querySelector(".close-btn");

  btnPopup.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
    popupContent.style.display = "block";
    popupForm.style.display = "flex";
    document.body.style.overflow = "hidden"; // Блокировка скролла
  });

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  closeBtn.addEventListener("click", closePopup);

  popupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(popupForm);

    fetch("send_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          popupForm.style.display = "none";
          successMessage.style.display = "block";
          setTimeout(() => {
            closePopup();
          }, 2000); // Автоматическое закрытие через 2 секунды после успешной отправки
        } else {
          alert("Ошибка отправки формы: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при отправке формы.");
      });
  });

  function closePopup() {
    popupOverlay.style.display = "none";
    popupContent.style.display = "none";
    successMessage.style.display = "none";
    document.body.style.overflow = ""; // Разблокировка скролла
  }
});

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll("#input-field"), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      var reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
});
