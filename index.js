const formEl = document.getElementById("form");
const titleInputEl = document.getElementById("titleinput");
const infoInputEl = document.getElementById("infoinput");
const errorMsgEl = document.querySelector("#errormsgbox");
const errorMsgBtn = document.querySelector("#errormsgboxbtn");
const itemsList = document.querySelector(".itemsList");

let todoItems = getFromLocalStorage() || [];
let today = formatDate(new Date);

renderItems();


formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (titleInputEl.value.length < 3 || infoInputEl.value.length < 3) {
    errorMsgEl.style.display = "block"
    return
  };

  todoItems.push({
    id: Date.now(),
    title: titleInputEl.value,
    info: infoInputEl.value,
    date: today
  })
  console.log(titleInputEl.value)
  console.log(infoInputEl.value)
  titleInputEl.value = "";
  infoInputEl.value = "";
  sendToLocalStorage(todoItems);
  renderItems();
})

errorMsgBtn.addEventListener("click", () => {
  errorMsgEl.style.display = "none";
})

function renderItems() {
  itemsList.textContent = "";
  for (let i = 0; i < todoItems.length; i++) {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("item", "popheight");
    
    let itemContentContainer = document.createElement("div");
    itemContentContainer.classList.add("item-content");
    let itemTitle = document.createElement("h4");
    itemTitle.className = "itemtitle";
    itemTitle.textContent = todoItems[i].title;
    let itemInfo = document.createElement("p");
    itemInfo.className = "iteminfo";
    itemInfo.textContent = todoItems[i].info;
    let itemDateFormat = document.createElement("p");
    itemDateFormat.className = "itemdate";
    itemDateFormat.textContent = todoItems[i].date;
    let itemBtn = document.createElement("button");
    itemBtn.className = "removebtn";
    itemBtn.textContent = "X";
    itemBtn.id = todoItems[i].id;
    itemContentContainer.append(itemTitle);
    itemContentContainer.append(itemInfo);
    itemContentContainer.append(itemDateFormat);
    itemContainer.append(itemContentContainer);
    itemContainer.append(itemBtn);
    itemsList.append(itemContainer);

    itemBtn.addEventListener("click", (e)=>{
      removeItem(todoItems[i].id);
    })
  }
}

function removeItem(id){
    
    let newTodoItems = todoItems.filter((item) => {
     return item.id != id  ;
    })
    todoItems = newTodoItems;
    sendToLocalStorage(todoItems);
    renderItems();
    console.log(todoItems)
}


function sendToLocalStorage(ourItems){
   localStorage.setItem("todolist", JSON.stringify(todoItems));
}
function getFromLocalStorage(){
  return JSON.parse(localStorage.getItem("todolist"));
}

function formatDate(date) {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};
