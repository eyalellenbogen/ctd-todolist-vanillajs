function addTodo(newTodoValue) {
  if (newTodoValue.trim() === "") return;

  const nextId = `todo-${++idCounter}`;
  const todoList = document.getElementById("todoList");

  const todoItemHTML = `
        <li class="list-group-item d-flex align-items-center justify-content-between" data-todo-id="${nextId}">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${nextId}">
                <label class="form-check-label" for="${nextId}">${newTodoValue}</label>
            </div>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteItem('${nextId}')">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    `;

  // Create a temporary container to parse the HTML string
  const temp = document.createElement("div");
  temp.innerHTML = todoItemHTML.trim();
  const newTodoItem = temp.firstChild;

  todoList.appendChild(newTodoItem);
}
