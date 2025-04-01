let todoContainer=document.getElementById("todoContainer");
let addButton=document.getElementById("addButton");
let saveButton=document.getElementById("saveButton");


function getTodoListFromLocalStorage(){

    let storedContent=localStorage.getItem("userInputValue");
    let parsedList=JSON.parse(storedContent);
    if(parsedList===null){
        return [];
    }else{
        return parsedList;
    }
    }
let object=getTodoListFromLocalStorage();
let idCount=object.length;

saveButton.onclick=function(){
    localStorage.setItem("userInputValue",JSON.stringify(object));
}


function onTodoStatusChange(checkboxId,labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    
    labelElement.classList.toggle("line-through");
    
    let todoObjectIndex=object.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.id;
        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject=object[todoObjectIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }else{
        todoObject.isChecked=true;
    }
    
}

function onDeleteTodo(todoId){
    let todoElement=document.getElementById(todoId);
    todoContainer.removeChild(todoElement);
    
    let itemIndex=object.findIndex(function(eachTodo){
        let eachTodoId="todo"+eachTodo.id;
        if(eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    object.splice(itemIndex,1);
}
function createTodo(todo){
    
    let checkboxId="checkbox"+todo.id;
    let labelId="label"+todo.id;
    let todoId="todo"+todo.id;
    
    let todoItem=document.createElement("li");
    todoItem.classList.add("d-flex","flex-row","todo-items");
    todoItem.id=todoId;
    
    todoContainer.appendChild(todoItem);
    
    let todoElement=document.createElement("input");
    todoElement.type="checkbox";
    todoElement.id=checkboxId;
    todoElement.checked=todo.isChecked;
    todoElement.onclick=function(){
        onTodoStatusChange(checkboxId,labelId,todoId);
    };
    todoElement.classList.add("checkbox-styling");
    todoItem.appendChild(todoElement);
    
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row","label-container");
    
    todoItem.appendChild(labelContainer);
    
    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelElement.id=labelId;
    if(todo.isChecked===true){
        labelElement.classList.add("line-through");
    }
    labelContainer.appendChild(labelElement);
    
    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    
    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick=function(){
        onDeleteTodo(todoId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}


function onAddTodo(){
    let userInput=document.getElementById("userInputValue");
    let userInputValue=userInput.value;
    
    if(userInputValue===""){
        alert("Enter a valid Input");
        return;
    }
    
    idCount=idCount+1;
    let newObject={
        text:userInputValue,
        id:idCount,
        isChecked:false
    };    
    object.push(newObject);    
    createTodo(newObject);
    userInput.value="";
}

addButton.onclick=function(){
    onAddTodo();
    
}

for(let todo of object){
    createTodo(todo);
}
