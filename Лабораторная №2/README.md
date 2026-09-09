# Лабораторная работа №2 — MongoDB

## Дисциплина

Нереляционные базы данных (NoSQL)

## Тема

Моделирование данных в MongoDB: Embedded Documents, массивы и References.

## Предметная область

Университет.

## Используемые технологии

- MongoDB
- MongoDB Shell
- JavaScript
- HTML5
- CSS3
- VS Code

## Структура базы данных

База данных:

`universityDB`

Коллекции:

- `students`
- `courses`

## Students

Документы студентов содержат:

- studentId
- name
- age
- group
- gpa
- contact
- skills
- grades
- courseIds

## Embedded Documents

Контактная информация хранится непосредственно внутри документа студента:

```javascript
contact: {
    city: "Almaty",
    email: "aibek@example.com"
}
