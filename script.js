const taskInput = document.querySelector("#task-input input");
filters = document.querySelectorAll(".task-box");
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

// inputando os itens no localStorage do navegador
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo(){
	let li = "";
	 if(todos){
	 	todos.forEach((todo, id) => {
	 		let isCompleted = todo.status == "completado" ? "checked" : "";
	 	li += `<li class="task">
				<label for="${id}">
					<input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
					<p class="${isCompleted}">${todo.name}</p>
				</label>
				<div class="settings">
					<i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
					<ul class="task-menu">
						<li onclick="editTask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Editar</li>
						<li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Deletar</li>
					</ul>
				</div>
			</li>`;
	 });
	 }
	 taskBox.innerHTML = li;
}
showTodo();

function showMenu(selectedTask){
	let taskMenu = selectedTask.parentElement.lastElementChild;
	taskMenu.classList.add("show");
	document.addEventListener("click", e =>{
		if(e.target.tagName != "I" || e.target != selectedTask){
		taskMenu.classList.remove("show");
		}
	});
}

function editTask(taskId, taskName){
	editId = taskId;
	isEditedTask = true;
	taskInput.value = taskName;
}

function deleteTask(deleteId){
	todos.splice(deleteId,1);
	localStorage.setItem("todo-list",JSON.stringify(todos));
	showTodo();
}

function updateStatus(selectedTask){
	let taskName = selectedTask.parentElement.lastElementChild;
	if(selectedTask.checked){
			taskName.classList.add("checked");
			todos[selectedTask.id].status = "completado";
	}else {
			taskName.classList.remove("checked");
			todos[selectedTask.id].status = "pendente";
	}
	localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
	let userTask = taskInput.value.trim();
	if (e.key == "Enter" && userTask) {
	if(!isEditedTask){ // verificando a tarefa se foi editada ou não.
		if (!todos) {
		todos =[]; //Caso não exista itens na lista cria novo array.
		}
		let taskInfo = {name: userTask, status:"pending"};
		todos.push(taskInfo); // inputando nova tarefa
	}else{
		isEditedTask = false;
		todos[editId].name = userTask;
	}
	
	taskInput.value ="";
	localStorage.setItem("todo-list",JSON.stringify(todos));
	showTodo();
	}
});