let idCounter = 0;

function getNextId() {
  return "todo-" + ++idCounter;
}
const state = [
  { todo: "Buy groceries", isDone: false, id: getNextId() },
  { todo: "Finish homework", isDone: true, id: getNextId() },
  { todo: "Call mom", isDone: true, id: getNextId() },
  { todo: "Read a book", isDone: false, id: getNextId() },
];

window.addEventListener("load", () => {
  render();
});

function deleteItem(id) {
  const target = state.findIndex((x) => x.id === id);

  if (target !== -1) {
    state.splice(target, 1);
  }
  render();
}

function addTodoToState(todoText) {
  state.unshift({ id: getNextId(), todo: todoText, isDone: false });
  render();
}

function render() {
  // clear the ul
  document.querySelector("#pending").innerHTML = "";
  document.querySelector("#done").innerHTML = "";

  state.forEach((item) => {
    renderTodo(item.id, item.todo, item.isDone);
  });
}

function renderTodo(id, newTodoValue, isDone = false) {
  if (newTodoValue.trim() === "") return;

  // set ID to use
  const nextId = id === 0 ? getNextId() : id;

  // get root element
  const todoList = isDone
    ? document.getElementById("done")
    : document.getElementById("pending");

  // create children
  const newTodoItem = createTodoItemElement(nextId);
  const checkbox = createCheckbox(nextId, isDone);
  const label = createLabel(nextId, newTodoValue);
  const formCheckDiv = createFormCheckDiv(checkbox, label);
  const deleteButton = createDeleteButton(nextId);

  // add children to parent item container
  newTodoItem.appendChild(formCheckDiv);
  newTodoItem.appendChild(deleteButton);

  // add to the target UL (order is dictated by the state array)
  todoList.appendChild(newTodoItem);
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

function createCheckbox(id, isDone) {
  const input = document.createElement("input");
  input.classList.add("form-check-input");
  input.type = "checkbox";
  input.id = id;
  input.checked = isDone;
  input.addEventListener("change", (event) => {
    const todoItem = state.find((item) => item.id === id);
    if (todoItem) {
      todoItem.isDone = event.target.checked;
      render();
    }
  });
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
