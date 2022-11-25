const createButton = document.querySelector(".create-button");
const input = document.querySelector(".todo-input");

const createTodoItem = () => {
  const inputValue = input.value;
  const todoItem = generateTodoItem(inputValue);

  console.log(todoItem);
};

const generateTodoItem = (text) => {
  const container = document.createElement("div");
  container.classList.add("todo-item-container");

  const itemContainer = document.createElement("div");
  const itemText = document.createTextNode(text);

  itemContainer.appendChild(itemText);
  container.appendChild(itemContainer);

  return container;
};

createButton.addEventListener("click", createTodoItem);
