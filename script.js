let todoItemsContainer = document.getElementById("todoItemsContainer");
let addBtn=document.getElementById("addBtn");
let saveBtn=document.getElementById("saveBtn");

function getTodoListFromLocalStorage(){
    let stringified=localStorage.getItem("todoList");
    let parsed=JSON.parse(stringified);
    if(parsed===null){
        return;
    }
    else{
        return parsed;
    }
}
let todoList=getTodoListFromLocalStorage();

saveBtn.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

let todosCount=todoList.length;


function onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex=todoList.findIndex(function(eachItem){
        eachItem="todo"+eachItem.uniqueNo;
        if(eachItem===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    let todoObject=todoList[todoObjectIndex];

    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
}



function onDeleteTodo(todoId){
      let todoElement=document.getElementById(todoId);
      todoItemsContainer.removeChild(todoElement);
      let todoIndex=todoList.findIndex(function(eachItem){
        if(eachItem===todoElement){
            return true;
        }
        else{
            return false;
        }
      });
      todoList.splice(todoIndex,1);
}
function createAndAppendTodo(todo) {
  let inputId="input"+todo.uniqueNo;
  let labelId="label"+todo.uniqueNo;
  let todoId="todo"+todo.uniqueNo;
  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id=todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = inputId;
  inputElement.classList.add("checkbox-input");
  inputElement.checked=todo.isChecked;
  inputElement.onclick=function(){
    onTodoStatusChange(inputId,labelId,todoId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for",inputId);
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelElement.id=labelId;
  if(todo.isChecked===true){
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  
  deleteIcon.onclick=function(){
      onDeleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function addTodo(){
    let userInput=document.getElementById("todoUserInput");
    let userInputValue=userInput.value;
    
    if(userInputValue===""){
        alert("please enter a valid text");
        return;
    }
    todosCount=todosCount+1;
    let newTodo={
            text:userInputValue,
            uniqueNo:todosCount,
            isChecked:false
        };
        todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value="";
}
addBtn.onclick=function(){
    addTodo();
}