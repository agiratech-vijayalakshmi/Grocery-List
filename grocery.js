// displayTodo();
const text = document.getElementById("text");
const addTaskButton = document.getElementById("submitbtn");
const saveTaskButton = document.getElementById("savebtn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");
const clear = document.getElementById("clear");
let groceryArray = [];
addTaskButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if(text.value!=""){
    let glist = localStorage.getItem("glist");
    if (glist === null) {
      groceryArray = [];
  
  d  } else {
      groceryArray = JSON.parse(glist);
    }
    groceryArray.push(text.value);
    text.value = "";
    text.focus();
    localStorage.setItem("glist", JSON.stringify(groceryArray));
    displayitem();
  }
 else{
   alert("Please add grocery item...");
 }
   });
   function displayitem() {
    let glist = localStorage.getItem("glist");
    if (glist === null) {
      groceryArray = [];
    } else {
      groceryArray = JSON.parse(glist);
    }
    let htmlCode = "";
    groceryArray.forEach((list, ind) => {
      htmlCode += `<div class='item'>
      <p class='w-full text-grey-darkest'>${list}</p>
      <button onclick='edit(${ind})' id='edit' class='editbtn'><i class="far fa-edit" id=editicon></i></i></button>
      <button onclick='deleteitem(${ind})' id='delete' class='deletebtn'><i class="far fa-trash-alt" id=deleteicon></i></button>
   </div>`;
    });
    listBox.innerHTML = htmlCode;
   }
   function deleteitem(ind) {
    let glist = localStorage.getItem("glist");
    groceryArray = JSON.parse(glist);
    groceryArray.splice(ind, 1);
    localStorage.setItem("glist", JSON.stringify(groceryArray));
    displayitem();
   }
   
   function edit(ind) {
    saveInd.value = ind;
    let glist = localStorage.getItem("glist");
    groceryArray = JSON.parse(glist);
    text.value = groceryArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
   }
  saveTaskButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let glist = localStorage.getItem("glist");
    groceryArray = JSON.parse(glist);
    let id = saveInd.value;
    groceryArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("glist", JSON.stringify(groceryArray));
    displayitem();
   });
   function searchfilter() {
    let filter = text.value.toUpperCase();
  
    let li = document.getElementsByClassName("item");
     let edititem = document.getElementById("edit");
    let deleteitem = document.getElementById("delete");
  
    for (let i = 0; i < li.length; i++) {
      let p = li[i].getElementsByTagName("p")[0];
      let textValue = p.textContent || p.innerText;
      if (textValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  clear.addEventListener("click",function removeItems(){
    //delete from local storage
    localStorage.removeItem('glist');
    let items = document.querySelectorAll('.grocery-item');
    
    if(items.length > 0){
        //remove each item from the list
        
        groceryArray.forEach(function(element){
            list.removeChild(element);
        })
    } else {
        // 
    }
    displayitem();
});