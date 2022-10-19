function main() {
  const addBtn = document.querySelector(".buy__add");
  const inputList = document.querySelectorAll(".buy__input");
  const goodies = document.querySelector(".goodies");
  const notice = document.querySelector(".buy__notice");
  let empty = document.querySelector(".goodies__empty");

  const name = inputList[0];
  const category = inputList[1];
  const count = inputList[2];

  addBtn.addEventListener('click', addElement);

  function addElement() {
    let icon = document.createElement("img");
    let detail = document.createElement("p");
    let detailCount = document.createElement("p");
    let deleteBtn = document.createElement("img");
    let accept = document.createElement("img");

    let list = [icon, detail, detailCount, deleteBtn, accept];

    if (category.options[category.selectedIndex].value == "Выберите категорию" ||
        name.value == "") {
          notice.style.opacity = 1;
          return false;
        }
    if (category.options[category.selectedIndex].value == "Мониторы") {
      icon.src = "../images/monitor.svg";
    } else if (category.options[category.selectedIndex].value == "Видеокарты") {
      icon.src = "../images/video.svg";
    } else {
      icon.src = "../images/motherboard.svg";
    }
    
    detail.innerText = name.value;
    detailCount.innerText = count.value;
    deleteBtn.src = "../images/delete.svg";
    accept.src = "../images/accept.svg";

    icon.classList = "goodies__icon";
    detail.classList = "goodies__element";
    detailCount.classList = "goodies__howmuch";
    deleteBtn.classList = "goodies__delete";
    accept.classList = "goodies__accept";

    if (empty) {
      goodies.removeChild(empty);
      empty = "";
    }
    for (elem of list) {
      goodies.appendChild(elem);
    }
    notice.style.opacity = 0;
    name.value = "";
    category.selectedIndex = 0;

    deleteBtn.addEventListener('click', deleteElement);
    accept.addEventListener('click', acceptElement);
  }

  function deleteElement(event) {
    prop = event.target;
    goodies.removeChild(prop.nextSibling);
    for (let i = 1; i < 5; i++) {
      prevprop = prop.previousSibling;
      goodies.removeChild(prop);
      prop = prevprop;
    }
    emptyCheck();
  }

  function emptyCheck() {
    if (goodies.children.length == 2) {
      p = document.createElement("p");
      p.innerText = "Пусто";
      p.classList = "goodies__empty";
      goodies.appendChild(p);
      empty = p;
    }
  }

  function acceptElement(event) {
    prop = event.target;
    for (let i = 1; i < 6; i++) {
      prevprop = prop.previousSibling;
      prop.classList.toggle("accept");
      prop = prevprop;
    }
  }
}

main();