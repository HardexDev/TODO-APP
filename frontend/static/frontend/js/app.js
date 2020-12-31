const addButton = document.getElementById('add-button');
const pageContainer = document.getElementById('page-container');
const modal = document.getElementById('modal-form');
const backButton = document.getElementById('back-button');
const bodyContainer = document.getElementById('body-container');
const weekday = document.getElementById('day-name');
const year = document.getElementById('year');
const day = document.getElementById('day-num');
const month = document.getElementById('month');
const addForm = document.getElementById('add-form');

addForm.addEventListener('submit', createTask);
addButton.addEventListener('click', toggleModal);
backButton.addEventListener('click', toggleModal);

const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

weekday.innerHTML = date.toLocaleDateString('fr-FR', { weekday: 'long'}).toUpperCase();
year.innerHTML = date.toLocaleDateString('fr-FR', { year: 'numeric'});
day.innerHTML = date.toLocaleDateString('fr-FR', { day: 'numeric'});
month.innerHTML = date.toLocaleDateString('en-EN', { month: 'short'}).toUpperCase();

function toggleModal(e){
    pageContainer.classList.toggle('active');
    modal.classList.toggle('active');
}

function buildList(){
    let url = "http://127.0.0.1:8000/api/task-list/";
    bodyContainer.innerHTML = "";
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);

        for (let i in data){
            let status = data[i].done;
            let statusClass = status ? "fa-check-circle" : "fa-circle";
            let taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            taskDiv.classList.add("d-flex");
            taskDiv.classList.add("justify-content-between");

            taskDiv.id = `data-row-${i}`;

            let taskName = document.createElement("p");
            taskName.classList.add("task-name");
            taskName.innerHTML = `${data[i].name}`;

            let statusDiv = document.createElement("div");
            statusDiv.classList.add("status");
            statusDiv.classList.add("d-flex");

            let statusIcon = document.createElement("i");
            statusIcon.classList.add("far");
            statusIcon.classList.add(`${statusClass}`);
            statusIcon.classList.add("check-circle");

            let deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fas");
            deleteIcon.classList.add("fa-trash-alt");
            deleteIcon.classList.add("delete-icon");

            statusDiv.appendChild(statusIcon);
            statusDiv.appendChild(deleteIcon);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(statusDiv);

            statusIcon.addEventListener('click', (function(task){
                return function(){
                    checkToggle(task);
                }
            })(data[i]));

            deleteIcon.addEventListener('click', (function(task){
                return function(){
                    deleteTask(task);
                }
            })(data[i]));

            bodyContainer.appendChild(taskDiv);
        }

        
    });
}

function createTask(e){
    e.preventDefault();
    let url = "http://127.0.0.1:8000/api/task-create/";
    let title = document.getElementById('task-name').value;
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify({'name':title})
    }).then((resp) => {
        toggleModal();
        buildList();
        addForm.reset();
    })
}

function checkToggle(task){
    task.done = !task.done;
    let url = `http://127.0.0.1:8000/api/task-update/${task.id}/`;
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(
            {
                'name':task.name,
                'done':task.done,
            }
        )
    }).then((resp) => {
        buildList();
    })
}

function deleteTask(task){
    console.log("Delete button clicked");
    let url = `http://127.0.0.1:8000/api/task-delete/${task.id}/`;
    fetch(url, {
        method: 'DELETE',
        headers:{
            'Content-type':'application/json',
        }
    }).then((resp) => {
        buildList();
    })
}

buildList();

