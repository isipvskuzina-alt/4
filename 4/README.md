1. Универсальный селектор *
css
/* Применяется ко всем элементам */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
📌 Селектор по классу .class
css
/* Применяется ко всем элементам с этим классом */
.card {
    background: white;
    padding: 20px;
}

.text {
    color: #333;
    font-size: 16px;
}
📌 Селектор по ID #id
css
/* Применяется к одному уникальному элементу */
#header {
    background: #4CAF50;
    color: white;
}

#saveBtn {
    background: blue;
    color: white;
}
📌 Селектор по атрибуту [attribute]
css
/* По наличию атрибута */
[required] {
    border-color: red;
}

/* По точному значению */
input[type="text"] {
    border: 2px solid #ddd;
}

/* По части значения */
a[href^="https"] {
    color: green;  /* Ссылки начинающиеся с https */
}

a[href$=".pdf"] {
    color: red;    /* Ссылки заканчивающиеся на .pdf */
}

a[href*="google"] {
    font-weight: bold;  /* Ссылки содержащие google */
}
📌 Примеры комбинаций
css
/* Все input с type="text" внутри формы */
form input[type="text"] {
    width: 100%;
}

/* Элементы с классом active и атрибутом disabled */
.active[disabled] {
    opacity: 0.5;
}

/* Карточка с классом big внутри контейнера */
.container .card.big {
    font-size: 24px;
}
2.   РАБОТА С FETCH
GET запрос (получение данных)
javascript
// Простой GET запрос
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
📌 GET с обработкой ошибок
javascript
fetch('https://api.example.com/users')
    .then(response => {
        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Данные:', data);
    })
    .catch(error => {
        console.error('Ошибка запроса:', error.message);
    });
📌 POST запрос (отправка данных)
javascript
const userData = {
    name: 'Иван',
    email: 'ivan@example.com'
};

fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => console.log('Создано:', data))
.catch(error => console.error('Ошибка:', error));
📌 Async/Await (современный способ)
javascript
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        console.error('Ошибка:', error.message);
        return [];
    }
}

// Использование
getUsers();
📌 Другие методы HTTP
javascript
// PUT - обновление
fetch('https://api.example.com/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Новое имя' })
});

// DELETE - удаление
fetch('https://api.example.com/users/1', {
    method: 'DELETE'
});
📌 Обработка разных ответов
javascript
// JSON
fetch('api/data')
    .then(res => res.json())
    .then(data => console.log(data));

// Текст
fetch('api/text')
    .then(res => res.text())
    .then(text => console.log(text));

// Изображение (Blob)
fetch('image.jpg')
    .then(res => res.blob())
    .then(blob => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        document.body.append(img);
    });
📌 Полный пример с обработкой всех ошибок
javascript
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        // Проверка статуса
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Данные не найдены');
            } else if (response.status === 401) {
                throw new Error('Нет доступа');
            } else {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Ошибка:', error.message);
        // Можно показать пользователю
        alert('Не удалось загрузить данные');
        return null;
    }
}

// Использование
const data = await fetchWithErrorHandling('https://api.example.com/data');
if (data) {
    console.log('Получены данные:', data);
}
🎯 Шпаргалка
Селекторы CSS
Селектор	Пример	Что делает
*	* { margin: 0; }	Все элементы
.class	.card { }	Элементы с классом
#id	#header { }	Элемент с ID
[attr]	[required] { }	Элементы с атрибутом
[attr="value"]	input[type="text"]	Точное значение
[attr^="value"]	a[href^="https"]	Начинается с
[attr$="value"]	a[href$=".pdf"]	Заканчивается на
[attr*="value"]	a[href*="google"]	Содержит
Fetch API
Метод	Использование
fetch(url)	GET запрос
fetch(url, { method: 'POST' })	POST запрос
response.json()	Парсинг JSON
response.text()	Получение текста
response.ok	Проверка статуса (200-299)
response.status	Код статуса
Основные коды статусов
Код	Значение
200	OK (успешно)
201	Created (создано)
400	Bad Request (ошибка в запросе)
401	Unauthorized (не авторизован)
404	Not Found (не найдено)
500	Internal Server Error (ошибка сервера)
