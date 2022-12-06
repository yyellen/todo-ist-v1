const createButton = document.querySelector('.create-button');
const input = document.querySelector('.todo-input');
const itemContainer = document.querySelector('.item-container');
const totalCount = document.querySelectorAll('.total-count');
const completedCount = document.querySelector('.completed-count');

const todoItems = [];

const createTodoItem = () => {
  // 拿到輸入框裡的值
  const inputValue = input.value.trim();
  // 透過 createTodoItemData 產生 todo item 物件
  const todoItem = createTodoItemData(inputValue);

  // 拿到 todo item 物件後，放進 todoItems 陣列中
  todoItems.push(todoItem);

  // 更新 total count
  updateTotalCount();

  // 清空輸入框
  clearInput();

  // 把所有 todo items 顯示在畫面上
  renderTodoItems();
};

const generateTodoItem = (text, index) => {
  const container = document.createElement('div');
  container.classList.add('todo-item-container');

  const itemContainer = document.createElement('div');
  itemContainer.classList.add('todo-text-container');
  const itemText = document.createTextNode(text);

  itemContainer.appendChild(itemText);

  // 新增 delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

  deleteButton.addEventListener('click', () => {
    // delete button 要做的事情
    // alert(`確定要刪除${text}? 此動作無法恢復`);
    todoItems.splice(index, 1);
    renderTodoItems();
    updateTotalCount();
  });

  // 新增 checkbox
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');

  checkbox.addEventListener('click', () => {
    // checkbox 要做的事情
    // 使 completed = true
    const todoItem = todoItems[index];
    todoItem.completed = !todoItem.completed;
    renderTodoItems();
    updateCompletedCount();
  });

  // 新增 edit button
  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'

  editButton.addEventListener('click', () => {
    // edit button 要做的事
    // 使 edit = true
    const todoItem = todoItems[index];
    todoItem.edit = true;
    renderTodoItems();
  });

  container.appendChild(checkbox);
  container.appendChild(itemContainer);
  container.appendChild(editButton);
  container.appendChild(deleteButton);

  return container;
};

const createTodoItemData = (text) => {
  const data = {
    text: text,
    completed: false,
    edit: false
  };

  return data;
};

const renderTodoItems = () => {
  // 每一次渲染時先清空 item container
  clearTodoItems();
  for (let i = 0; i < todoItems.length; i++) {
    const todoItem = todoItems[i];
    // const text = todoItem.text; // 取出物件的值
    const { text } = todoItem; // destructing 取出物件的值
    const todoItemElement = generateTodoItem(text, i);

    // 完成項目
    if (todoItem.completed) {
      todoItemElement.childNodes[1].classList.add('text-completed');
      todoItemElement.childNodes[0].setAttribute('checked', true);
    }

    // 編輯狀態
    if (todoItem.edit) {
      // 清空 todo item container
      todoItemElement.innerHTML = '';

      const editInput = document.createElement('input');
      editInput.classList.add('edit-input');
      editInput.value = text;

      const editConfirmButton = document.createElement('button');
      editConfirmButton.classList.add('edit-button');
      editConfirmButton.innerHTML = '<i class="fa-solid fa-check"></i>';

      const editCancelButton = document.createElement('button');
      editCancelButton.classList.add('edit-button');
      editCancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      todoItemElement.appendChild(editInput);
      todoItemElement.appendChild(editConfirmButton);
      todoItemElement.appendChild(editCancelButton);

      editConfirmButton.addEventListener('click', () => {
        todoItem.text = editInput.value;
        todoItem.edit = false;
        renderTodoItems();
      })

      editCancelButton.addEventListener('click', () => {
        todoItem.edit = false;
        renderTodoItems();
      });
    }


    itemContainer.appendChild(todoItemElement);
    updateCompletedCount();
  }
  if (todoItems.length === 0) {
    itemContainer.innerText = 'Start with a new task.';
  }
};

const clearTodoItems = () => {
  itemContainer.innerHTML = '';
};

const clearInput = () => {
  input.value = '';
};

const updateTotalCount = () => {
  totalCount[0].innerHTML = totalCount[1].innerHTML = todoItems.length;
};

const updateCompletedCount = () => {
  // 計算 completed = true 的數量
  const checkedItem = todoItems.filter((item) => item.completed);
  completedCount.innerHTML = checkedItem.length;
};

createButton.addEventListener('click', createTodoItem);
