// Sticky Navigation Menu JS Code
let nav = document.querySelector("header");
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }

}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

const formOpenbtn = document.querySelector("#form-open");
const formOpenbtn1 = document.querySelector("#form-open1"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formClosebtn = document.querySelector(".form_close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenbtn.addEventListener("click", () => home.classList.add("show"))
formOpenbtn1.addEventListener("click", () => home.classList.add("show"))
formClosebtn.addEventListener("click", () => home.classList.remove("show"))

pwShowHide.forEach(icon => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    }else{
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  })
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active")
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active")
});



toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
