let todoItemsContainer=document.getElementById("todoItemsContainer");
let addBtn=document.getElementById("addBtn");
let userInput=document.getElementById("todoUserInput");
let saveBtn=document.getElementById("saveBtn");


function getTodoListFromLocalStorage(){
    let tobeParsed=localStorage.getItem("todoItem");
    let todoListParsed=JSON.parse(tobeParsed);
    if(todoListParsed===null){
        return [];
    }
    else{
        return todoListParsed;
    }
}
let todoList=getTodoListFromLocalStorage();
let count=todoList.length;
saveBtn.onclick=function(){
    localStorage.setItem("todoItem",JSON.stringify(todoList));
}

 function onTodoStatusChange(checkboxId,labelId,todoId){
    let inputElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let elementIndex=todoList.findIndex(function(eachTodo){
      let eachTodoId="todo"+eachTodo.uniqueNo;
      if(eachTodoId===todoId){
        return true;
      }
      else{
        return false;
      }
    })
    let toddoObject=todoList[elementIndex];
    if(toddoObject.isChecked===true){
      toddoObject.isChecked=false;
    }
    else{
      toddoObject.isChecked=true;
    }
}
function onDeleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteIndex=todoList.findIndex(function(eachTodo){
      let eachTodoId="todo"+eachTodo.uniqueNo;
      if(eachTodoId===todoId){
        return true;
      }
      else{
        return false;
      }
    })
    todoList.splice(deleteIndex,1);
}

function createAndAppendTodo(todo){
    let checkboxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoId="todo"+todo.uniqueNo;
    
    let todoElement=document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);
    
    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.checked=todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick=function(){
        onTodoStatusChange(checkboxId,labelId,todoId);
    }
    todoElement.appendChild(inputElement);
    
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    todoElement.appendChild(labelContainer);
    
    
    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelElement.id=labelId;
    if(todo.isChecked===true){
      labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    
    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    
    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("delete-icon","far","fa-trash-alt");
    deleteIcon.onclick=function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for(let todo of todoList){
    createAndAppendTodo(todo);
}

addBtn.onclick=function(){
    count=count+1;
    let newTodo={
        text:userInput.value,
        uniqueNo:count,
        isChecked:false
    };
    if(userInput.value===""){
        alert("please Enter Valid Text");
        return;
    }
    createAndAppendTodo(newTodo);
    userInput.value="";
    todoList.push(newTodo);
}