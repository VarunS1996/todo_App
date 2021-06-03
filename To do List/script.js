// fetching all the required elements from the html File
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; // user entered value
    if (userData.trim() != 0) {
        //if user values aren't only spaces
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}

showTasks();

// if user clicks on the add button
addBtn.onclick = () =>
{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //local storage 
    if(getLocalStorage == null)
    {
        //local storage is null
        listArr =[];           //creating blank array
    }
    else
    {
        listArr = JSON.parse(getLocalStorage);           // transforming json string into a js objects
    }
    listArr.push(userData);  // pushing of adding user input value
    localStorage.setItem("New Todo", JSON.stringify(listArr));   // transforming js objects into a json string
    showTasks();
    addBtn.classList.remove("active");
}

// add task list inside ul
function showTasks()
{
    let getLocalStorage = localStorage.getItem("New Todo"); //local storage 
    if(getLocalStorage == null)
    {
        //local storage is null
        listArr =[];           //creating blank array
    }
    else
    {
        listArr = JSON.parse(getLocalStorage);           // transforming json string into a js objects
    }
    const pendNum = document.querySelector(".pending");
    pendNum.textContent = listArr.length;  // passing the value of pending tasks\
    if(listArr.length > 0)
    {
        deleteAllBtn.classList.add("active");
    }
    else
    {
        deleteAllBtn.classList.remove("active");
    }
    let newList = '';
    listArr.forEach((element, index) => 
    {
        newList += `<li> ${element} <span onclick="del(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newList; // adding new li tag inside ul tag
    inputBox.value = "";  // once task added leave the input field

}


// delete command 

function del(index)
{
    let getLocalStorage = localStorage.getItem("New Todo"); //local storage 
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index, 1);
    // after remove the li again update the data from local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); 
}

// delete all existing tasks function
deleteAllBtn.onclick = () =>
{
    listArr =[];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
