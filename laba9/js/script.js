function main() {
  generalMultiplicationTable(5);
  console.log('--------------------');
  showQuote(['Hello', 'World', 'In', 'JS'], '*');
  console.log('--------------------');
  combineArrays([1, 2, 3], ['a', 'b', 'c', 'd']);
  console.log('--------------------');
  countSandwiches({bread: 5, cheese: 6});
  console.log('--------------------');
  uniq(['a', 'a', 1, 2, 3, 1, 2]);
  burger();
  accordeon();
  notice();
}
main();
// Task 1
function generalMultiplicationTable(n) {
  let nums = [];
  for (m of generate(n)) {
    nums.push(m);
  }
  for (m of nums) {
    console.log(nums.map((num) => num * m));
  }
}

function* generate(n) {
  i = 1;
  while (i <= n) {
    yield i;
    i++;
  }
}

// Task 2
function showQuote(words, sep) {
  let maxLength = getMaxLength(words);
  console.log(sep.repeat(maxLength + 4));

  for (word of words) {
    console.log(`* ${word} ${' '.repeat(maxLength - word.length)}*`)
  }

  console.log(sep.repeat(maxLength + 4));
}

function getMaxLength(words) {
  let maxLengthWord = words.reduce(
    function(a, b) {
      return a.length > b.length ? a : b;
    }
  )
  return maxLengthWord.length;
}

// Task 3
function combineArrays(arr1, arr2) {
  let arr = [];
  while (arr1.length != 0 || arr2.length !=0) {
    if (arr1.length != 0) {
      arr.push(arr1.shift());
    }
    if (arr2.length != 0) {
      arr.push(arr2.shift());
    }
  }
  console.log(arr);
}

// Task 4
function countSandwiches(obj) {
  bread = obj.bread;
  cheese = obj.cheese;

  let res = 0;

  while (true) {
    if (bread - 2 >= 0 && cheese - 1 >= 0) {
      bread -= 2;
      cheese -= 1;
    } else {
      break;
    }
    res++;
  }
  console.log(res);
}

// Task 5
function uniq(arr) {
  let obj = {};
  for (item of arr) {
    if (obj[item]) {
      obj[item]++;
    } else {
      obj[item] = 1;
    }
  }
  console.log(arr);
  console.table(obj);
}

// Task 6
function burger() {
  let burger = document.querySelector(".burger");
  let menu = document.querySelector(".menu");
  burger.addEventListener('click', hoverOn)
  
  function hoverOn() {
      let burgerLines = document.querySelectorAll(".burger__line");
      for (let burgerLine of burgerLines) {
          burgerLine.classList.toggle("hover-on");
      }
    menu.classList.toggle("hover-on");
  }
}

// Task 7
function accordeon() {
  let accordeonBtns = document.querySelectorAll(".accordeon__button");
  let accordeonTexts = document.querySelectorAll(".accordeon__text");
  for (accordeonBtn of accordeonBtns) {
    accordeonBtn.addEventListener('click', openText);
  }

  function openText(accordeonBtn) {
    accordeonBtn.srcElement.classList.toggle('active');
    accordeonText = this.nextElementSibling;
    if (accordeonText.style.maxHeight) {
      accordeonText.style.maxHeight = null;
    } else {
    accordeonText.style.maxHeight = '100px';
    }
  }
}

// Task 8
function notice() {
  obj = {
    name: "String",
    message: 'String',
  }
  let notice = document.querySelector(".notice");
  let closeBtn = document.querySelector(".notice__close");

  for (let property in obj) {
    let cardElement = document.createElement("p");
    notice.append(cardElement);
    cardElement.append(`${property}: ${obj[property]}`);
  }
  setTimeout(noticeAppears, 2000);
  function noticeAppears() {
    notice.style.top = "40%";
    notice.style.left = "40%";
  }

  closeBtn.addEventListener('click', noticeClose);
  function noticeClose() {
    notice.style.top="100%";
    notice.style.left="100%";
  }
}