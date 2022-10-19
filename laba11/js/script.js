function main() {
  const getBtn = document.querySelector(".get");
  const postBtn = document.querySelector(".post");

  const loader = document.querySelector(".loader");
  const result = document.querySelector(".data");

  getBtn.addEventListener('click', serverResponse);
  postBtn.addEventListener('click', serverResponse);

  // async function serverResponse(event) {
  //   if (event.target.innerText == "POST") {
  //     const data = {
  //       name: "string",
  //       group: "string"
  //     }

  //     let response = fetch("http://students-api.std-1578.ist.mospolytech.ru/api/post/", {
  //       method: "POST",
  //       headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //       },
  //       body: JSON.stringify(data),
  //     })
  //     return response
  //     .then((answer) => console.log(answer))
  //     .catch((error) => console.log(error));
  //   } else {
  //     let response = fetch("http://students-api.std-1578.ist.mospolytech.ru/api/get/", {
  //       method: "GET",
  //     })
  //     return response
  //     .then((answer) => console.log(answer))
  //     .catch((error) => console.log(error));
  //   }
  // }
  
  async function serverResponse(event) {
    if (event.target.innerText == "POST") {
      try {
        const data = {
          name: "Хасанов Марат",
          group: "211-322"
        }

        postBtn.disabled = true;
        loader.style.opacity = 1; 

        let response = await fetch("http://students-api-prod.std-1578.ist.mospolytech.ru/api/post/", {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data),
        });

        postBtn.disabled = false;
        loader.style.opacity = checkDisabled(); 

        response = response.json();
        return response.then((data) => showResult(data));
      } catch(error) {
        return showResult(error);
      }
    } else {
      try {
        getBtn.disabled = true;
        loader.style.opacity = 1; 

        let response = await fetch("http://students-api-prod.std-1578.ist.mospolytech.ru/api/get/", {
          method: "GET",
        });

        getBtn.disabled = false;
        loader.style.opacity = checkDisabled(); 
  
        response = response.json();
        return response.then((data) => showResult(data));
      } catch(error) {
        return showResult(error);
      }
    }
  }

  function checkDisabled() {
    if (getBtn.disabled == true || postBtn.disabled == true) {
      return 1;
    }
    else {
      return 0;
    }
  }

  function showResult(data) {
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    for (value in data) {
      if (value == 'image_url') {
        img = document.createElement("img");
        img.src = data[value];
        img.classList = "image_url";
        result.appendChild(img);
      } else {
        if ((value == 'message') && (data[value] == 'success')) {
          continue;
        } else {
          p = document.createElement("p");
          p.innerText = `${data[value]}`;
          if (value == 'message') {
            p.classList = 'warning';
            p.innerText += ': Отправьте запрос повторно';
          }
          result.appendChild(p);
        }
      }
    }
  }
}

main();