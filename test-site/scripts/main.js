let myImage = document.querySelector("img");

myImage.onclick = function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/OIP-C.jpg") {
    myImage.setAttribute("src", "images/R-C.jpg");
  } else {
    myImage.setAttribute("src", "images/OIP-C.jpg");
  }
};

/*
let iceCream = "chocolate";
if (iceCream === "chocolate") {
  alert("我最喜欢巧克力冰淇淋了。");
} else {
  alert("但是巧克力才是我的最爱呀……");
}
*/
function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}

/*document.querySelector("html").addEventListener("click", function () {
  alert("别戳我，我怕疼。");
});*/
document.querySelector("h1").addEventListener("click", () => {
  alert("戳我，我不疼。");
});

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

//利用切换用户button输入用户id，储存用户id
function setUserName() {
  let myName = prompt("请输入你的名字。");
  if (!myName) {
    setUserName();
  } else {
  localStorage.setItem("name", myName);
  myHeading.textContent = "Mozilla 酷毙了，" + myName;
}
//用一次if语句调用button上的函数
if (!localStorage.getItem("name")) {
  setUserName();
} else {
  let storedName = localStorage.getItem("name");
  myHeading.textContent = "Mozilla 酷毙了，" + storedName;
}
//将函数添加到按钮上
myButton.onclick = function () {
  setUserName();
};