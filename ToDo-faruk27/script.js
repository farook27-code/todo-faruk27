document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    // Check if there are existing todos in local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        todos = savedTodos;
        renderTodos();
    }

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }
            const actions = document.createElement('div');
            actions.classList.add('actions');
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                toggleComplete(index);
            });
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                editTask(index);
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });
            actions.appendChild(completeButton);
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            li.appendChild(actions);
            todoList.appendChild(li);
        });
        // Save todos to local storage
        saveTodos();
    }

    // Function to save todos to local storage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to add new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push({ text: todoText, completed: false });
            todoInput.value = '';
            renderTodos();
        }
    });

    // Function to toggle task completion
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    // Function to edit task
    function editTask(index) {
        const newText = prompt('Enter new task text:', todos[index].text);
        if (newText !== null) {
            todos[index].text = newText.trim();
            renderTodos();
        }
    }

    // Function to delete task
    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            todos.splice(index, 1);
            renderTodos();
        }
    }
});
