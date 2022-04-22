function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function createNotesItem(title) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
    const listItem = createElement('li', { className: 'notes-item' }, checkbox, label, editInput, editButton, deleteButton);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(notesItem) {
    const checkbox = notesItem.querySelector('.checkbox');
    const editButton = notesItem.querySelector('button.edit');
    const deleteButton = notesItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleNotesItem);
    editButton.addEventListener('click', editNotesItem);
    deleteButton.addEventListener('click', deleteNotesItem);
}

function addNotesItem(event) {
    event.preventDefault();

    if (addInput.value === '') {
        return alert('Поле пустое. Введите текст.');
    }

    const notesItem = createNotesItem(addInput.value);
    notesList.appendChild(notesItem);
    addInput.value = '';
}

function toggleNotesItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editNotesItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Изменить';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');
}

function deleteNotesItem() {
    const listItem = this.parentNode;
    notesList.removeChild(listItem);
}

const notesForm = document.getElementById('notes-form');
const addInput = document.getElementById('add-input');
const notesList = document.getElementById('notes-list');
const notesItems = document.querySelectorAll('.notes-item');

function main() {
    notesForm.addEventListener('submit', addNotesItem);
    notesItems.forEach(item => bindEvents(item));
}

main();
