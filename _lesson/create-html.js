function addTodo(newTodoValue) {
  if (newTodoValue.trim() === "") return;

  // set ID to use
  const nextId = `todo-${++idCounter}`;

  // get root element
  const todoList = document.getElementById("todoList");

  // create children
  const newTodoItem = createTodoItemElement(nextId);
  const checkbox = createCheckbox(nextId);
  const label = createLabel(nextId, newTodoValue);
  const formCheckDiv = createFormCheckDiv(checkbox, label);
  const deleteButton = createDeleteButton(nextId);

  // add children to parent item container
  newTodoItem.appendChild(formCheckDiv);
  newTodoItem.appendChild(deleteButton);

  // insert new todo item at the top of the list
  todoList.insertBefore(newTodoItem, todoList.firstChild);
}

// Helper functions for element creation
function createTodoItemElement(id) {
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );
  li.setAttribute("data-todo-id", id);
  return li;
}

function createFormCheckDiv(checkbox, label) {
  const div = document.createElement("div");
  div.classList.add("form-check");
  div.appendChild(checkbox);
  div.appendChild(label);
  return div;
}

function createCheckbox(id) {
  const input = document.createElement("input");
  input.classList.add("form-check-input");
  input.type = "checkbox";
  input.id = id;
  return input;
}

function createLabel(id, text) {
  const label = document.createElement("label");
  label.classList.add("form-check-label");
  label.setAttribute("for", id);
  label.textContent = text;
  return label;
}

function createDeleteButton(id) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn", "btn-outline-danger", "btn-sm");
  button.addEventListener("click", function () {
    deleteItem(id);
  });
  button.appendChild(createTrashIcon());
  return button;
}

function createTrashIcon() {
  const icon = document.createElement("i");
  icon.classList.add("bi", "bi-trash");
  return icon;
}
