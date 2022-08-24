const formEl = document.getElementById("form");
const titleInputEl = document.getElementById("titleinput");
const infoInputEl = document.getElementById("infoinput");

formEl.addEventListener("submit", (e)=> {
  e.preventDefault();
  if(titleInputEl.value.length < 3 || infoInputEl.value.length < 3){return} ;

  console.log(titleInputEl.value)
  console.log(infoInputEl.value)
})