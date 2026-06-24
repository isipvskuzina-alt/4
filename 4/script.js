// === ДАННЫЕ ===
let notes = [];
let editingId = null;

// === DOM ===
const titleInput = document.getElementById('titleInput');
const textInput = document.getElementById('textInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const notesContainer = document.getElementById('notesContainer');
const notesCount = document.getElementById('notesCount');

// === LOCALSTORAGE ===

// Сохраняем заметки
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Загружаем заметки
function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        notes = JSON.parse(saved);
    }
}

// === РЕНДЕРИНГ ===

function renderNotes() {
    if (notes.length === 0) {
        notesContainer.innerHTML = '<div class="empty"> Нет заметок</div>';
        notesCount.textContent = '0';
        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class="note-item">
            <div class="note-title">${escapeHtml(note.title) || 'Без заголовка'}</div>
            <div class="note-text">${escapeHtml(note.text) || 'Нет текста'}</div>
            <div class="note-date"> ${formatDate(note.createdAt)}</div>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote('${note.id}')"> Редактировать</button>
                <button class="delete-btn" onclick="deleteNote('${note.id}')"> Удалить</button>
            </div>
        </div>
    `).join('');

    notesCount.textContent = notes.length;
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// === CRUD ОПЕРАЦИИ ===

// Добавление заметки
function addNote() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title && !text) {
        alert('Введите заголовок или текст заметки!');
        titleInput.focus();
        return;
    }

    const note = {
        id: Date.now().toString(),
        title: title || 'Без заголовка',
        text: text || 'Нет текста',
        createdAt: new Date().toISOString()
    };

    notes.push(note);
    saveNotes();
    renderNotes();
    clearForm();
}

// Редактирование заметки
function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    titleInput.value = note.title;
    textInput.value = note.text;
    editingId = id;
    saveBtn.textContent = ' Обновить';
    cancelBtn.style.display = 'inline-block';
    titleInput.focus();
}

// Сохранение изменений
function updateNote() {
    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title && !text) {
        alert('Введите заголовок или текст заметки!');
        titleInput.focus();
        return;
    }

    notes = notes.map(note => 
        note.id === editingId 
            ? { ...note, title: title || 'Без заголовка', text: text || 'Нет текста' }
            : note
    );

    saveNotes();
    renderNotes();
    clearForm();
    cancelEdit();
}

// Удаление заметки
function deleteNote(id) {
    if (!confirm('Удалить заметку?')) return;
    
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes();

    if (editingId === id) {
        cancelEdit();
    }
}

// === УПРАВЛЕНИЕ ФОРМОЙ ===

function clearForm() {
    titleInput.value = '';
    textInput.value = '';
    titleInput.focus();
}

function cancelEdit() {
    editingId = null;
    saveBtn.textContent = ' Сохранить';
    cancelBtn.style.display = 'none';
    clearForm();
}

// === ОБРАБОТЧИКИ ===

saveBtn.addEventListener('click', function() {
    if (editingId) {
        updateNote();
    } else {
        addNote();
    }
});

cancelBtn.addEventListener('click', cancelEdit);

// Сохранение по Ctrl+Enter
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (editingId) {
            updateNote();
        } else {
            addNote();
        }
    }
});

// Отмена по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && editingId) {
        cancelEdit();
    }
});

// === ПРИМЕР РАБОТЫ С FETCH ===

// Пример получения данных с сервера (закомментирован)
/*
async function fetchNotes() {
    try {
        const response = await fetch('https://api.example.com/notes');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Данные с сервера:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке:', error);
        return null;
    }
}
*/

// Пример отправки данных на сервер
/*
async function sendNoteToServer(note) {
    try {
        const response = await fetch('https://api.example.com/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ответ сервера:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        return null;
    }
}
*/

// === ИНИЦИАЛИЗАЦИЯ ===

function init() {
    loadNotes();
    renderNotes();
    console.log(' Редактор заметок загружен!');
    console.log(` Всего заметок: ${notes.length}`);
    
    // Пример использования fetch (закомментирован)
    // fetchNotes();
}

// Запускаем
init();