const createButton = document.querySelector(".create-button");
const input = document.querySelector(".todo-input");
const itemContainer = document.querySelector(".item-container");

const todoItems = [];

const createTodoItem = () => {
  // 拿到輸入框裡的值
  const inputValue = input.value;
  // 透過 createTodoItemData 產生 todo item 物件
  const todoItem = createTodoItemData(inputValue);

  // 拿到todo item 物件後，放進 todoItems 陣列中
  todoItems.push(todoItem);
  // console.log(todoItems);

  // 清空輸入框
  clearInput();

  // 把所有 todo items 顯示在畫面上
  renderTodoItems();
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

const createTodoItemData = (text) => {
  const data = {
    text: text
  };

  return data;
}

const renderTodoItems = () => {
  // 每一次渲染時先清空 item container
  clearTodoItems();
  for (let i = 0; i < todoItems.length; i++) {
    const todoItem = todoItems[i];
    // console.log(todoItem);
    // const text = todoItem.text; // 取出物件的值
    const { text } = todoItem; // destructing 取出物件的值
    // console.log(text);

    const todoItemElement = generateTodoItem(text);
    // console.log(todoItemElement);

    itemContainer.appendChild(todoItemElement);
  }
}

const clearTodoItems = () => {
  itemContainer.innerHTML = "";
}

const clearInput = () => {
  input.value = "";
}

createButton.addEventListener("click", createTodoItem);
