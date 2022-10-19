function main() {
  let btn = document.querySelector(".open");
  btn.addEventListener('click', openModal);
  
  function openModal() {
    let modal = document.querySelector(".modal");
    modal.classList.add("active");

    let closeBtn = document.querySelector(".modal__close");
    closeBtn.addEventListener('click', closeModal);
    let body = document.querySelector(".body");
    body.addEventListener('click', closeModal);

    body.classList.add("modal-open");

    function closeModal(event) {
      if (event.target.closest('svg')) {
        modal.classList.remove("active");
        body.classList.remove("modal-open");
      }
      if (event.target.classList[0] != 'open' &&
          !event.target.closest('form')) {
        modal.classList.remove("active");
        body.classList.remove("modal-open");
      }
    }

    let name = document.querySelector(".form__name");
    let email = document.querySelector(".form__email");
    name.addEventListener("blur", checkValidaty);
    email.addEventListener("blur", checkValidaty);

    function checkValidaty(event) {
      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity("Пустая строка");
      }
      else if (event.target.validity.tooShort) {
        event.target.setCustomValidity("Слишком короткое имя");
      }
      else if (event.target.validity.tooLong) {
        event.target.setCustomValidity("Слишком длинное имя");
      }
      else if (event.target.validity.typeMismatch) {
        event.target.setCustomValidity("Введен неправильный email адрес");
      }
      else {
        event.target.setCustomValidity("");
        event.target.classList.remove("invalid");
        return false;
      };
      event.target.classList.add("invalid");
      modal.reportValidity();
    }

    let submit = document.querySelector(".modal__submit");
    submit.addEventListener('click', showFormData);

    function showFormData(event) {
      event.preventDefault();

      let mark = "";
      for (elem of modal.elements.mark) {
        if (elem.checked) {
          mark = elem.nextElementSibling.innerText;
        }
      }
      let obj = {
        name: modal.elements.name.value,
        email: modal.elements.email.value,
        mark: mark,
      };

      console.table(obj);
    }
  }
}

main();