const createButton = document.querySelector(".create-button");
const input = document.querySelector(".todo-input");

const todoItems = [];

const createTodoItem = () => {
  // 拿到輸入框裡的值
  const inputValue = input.value;
  // 透過 createTodoItemData 產生 todo item 物件
  const todoItem = createTodoItemData(inputValue);

  // 拿到todo item 物件後，放進 todoItems 陣列中
  todoItems.push(todoItem);
  console.log(todoItems);
};

createButton.addEventListener("click", createTodoItem);

const generateTodoItem = (text) => {
  const container = document.createElement("div");
  container.classList.add("todo-item-container");

  const itemContainer = document.createElement("div");
  const itemText = document.createTextNode(text);

  itemContainer.appendChild(itemText);
  container.appendChild(itemContainer);

  return container;
};

const createTodoItemData = (text) => {
  const data = {
    text: text
  };

  return data;
}
