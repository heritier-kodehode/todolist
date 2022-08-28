/**Selection of dom elements */
const formEl = document.getElementById("form");
const titleInputEl = document.getElementById("titleinput");
const infoInputEl = document.getElementById("infoinput");
const errorMsgEl = document.querySelector("#errormsgbox");
const errorMsgBtn = document.querySelector("#errormsgboxbtn");
const itemsList = document.querySelector(".itemsList");
/**Initializing Todolist array and todays date */
let todoItems = getFromLocalStorage() || [];
let today = formatDate(new Date);
/**initializing items in localstorage if any */
renderItems();

//Eventlistener for adding submited items into the todoitems array
formEl.addEventListener("submit", (e) => {
  e.preventDefault(); //stop site from refresh

  if (titleInputEl.value.length < 3 || infoInputEl.value.length < 3) {//display error msg and return if text length to short
    errorMsgEl.style.display = "block"
    return
  };

  todoItems.push({ //Push the items into the todoitems array
    id: Date.now(),
    title: titleInputEl.value,
    info: infoInputEl.value,
    date: today
  })

  titleInputEl.value = "";
  infoInputEl.value = "";
  sendToLocalStorage(todoItems);
  renderItems();
})

//Error message listener if text to short
errorMsgBtn.addEventListener("click", () => {
  errorMsgEl.style.display = "none";
})

//Creating dom items and rendering them with appropriate textcontent and appeding them
function renderItems() {
  itemsList.textContent = "";
  for (let i = 0; i < todoItems.length; i++) {
    //for every item in the array we create the dom elements and push in appropriate textcontent for the current item
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
    //append the children into the appropriate containers
    itemContentContainer.append(itemTitle);
    itemContentContainer.append(itemInfo);
    itemContentContainer.append(itemDateFormat);
    itemContainer.append(itemContentContainer);
    itemContainer.append(itemBtn);
    itemsList.append(itemContainer);

    itemBtn.addEventListener("click", (e)=>{//add eventlistener to removal button
      removeItem(todoItems[i].id);
    })
  }
}

//remove items based on id and update localstorage and rerender
function removeItem(id){
    
    let newTodoItems = todoItems.filter((item) => {
     return item.id != id  ;
    })
    todoItems = newTodoItems;
    sendToLocalStorage(todoItems);
    renderItems();

}

//Send to locastorage

function sendToLocalStorage(ourItems){
   localStorage.setItem("todolist", JSON.stringify(todoItems));
}
//Get from localstorage
function getFromLocalStorage(){
  return JSON.parse(localStorage.getItem("todolist"));
}

//format the date for item
function formatDate(date) {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};
