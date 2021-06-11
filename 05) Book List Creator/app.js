/*
======================================
CLASSES
=====================================
*/

class Book {

  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}





class UI {

  // ADD BOOK - Method
  addBook(book) {

    // 1 - Get table body
    const bookList = document.getElementById('tbody');

    // 2 - Create a new row inside
    const row = document.createElement('tr');

    // 3 - Insert book details inside row
    row.innerHTML = `
    <td></td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><i class="fas fa-times"></i></td>
    `

    // 4 - Append row to table body
    bookList.appendChild(row);

  }



  // CLEAR INPUT - Method
  clearInput() {

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }



  // ALERT MESSAGE - Method
  alertMsg(msg, className) {

    // 1 - Create a div
    const div = document.createElement('div');

    // 2 - Assign a class
    div.className = className;

    // 3 - Insert a text msg
    div.appendChild(document.createTextNode(msg));

    // 4 - Select a parent and a child for alert to be in between
    const card = document.getElementById('card');
    const form = document.getElementById('book-form');

    // 5 - Insert alert msg
    card.insertBefore(div, form);

    // 6 - Delete alert msg after some time
    setTimeout(function () {
      document.querySelector('div').remove();
    }, 2000);

  }

}





class Storage {

  static getBooks() {

    // 1 - Create a books variable
    let books;

    // 2 - Check if local storage has any books
    if (localStorage.getItem('books') === null) {

    // 3 - If no, create an empty array
      books = [];
    } else {

    // 4 - If yes, retrieve books from LS
      books = JSON.parse(localStorage.getItem('books'));
    }

    // 5 - Return books array from LS
    return books;

  }



  static displayBooks() {

    // 1 - Get books from LS 
    const books = Storage.getBooks();

    // 2 - Loop over each book from books array
    books.forEach(function(book) {

    // 3 - Create a UI instance 
      const newItem = new UI();

    // 4 - Use UI addbook to list method
      newItem.addBook(book);

    });

  }



  static addBook(book) {

    // 1 - Get books from LS 
    const books = Storage.getBooks();

    // 2 - Add new book details to LS
    books.push(book);

    // 3 - Save new books array to LS
    localStorage.setItem('books', JSON.stringify(books));

  }



  static removeBook(isbn) {

    // 1 - Get books from LS 
    const books = Storage.getBooks();

    // 2 - Loop over each book from books array
    books.forEach(function(book, index) {

    // 3 - Compare isbn of current book with book to be removed
    if(book.isbn === isbn) {

    // 4 - Remove 1 book from the matched index
      books.splice(index, 1);

    }

    });

    // 5 - Save new books array to LS
    localStorage.setItem('books', JSON.stringify(books));

  }

}






/*
======================================
EVENT HANDLERS
=====================================
*/

// Event Listener -> DOM LOADING
document.addEventListener('DOMContentLoaded', Storage.displayBooks);





// Event Listener -> SUBMIT
document.getElementById('form-btn').addEventListener('click', function (e) {

  // 1 - Prevent default
  e.preventDefault();

  // 2 - Get input values
  let title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // 3 - Create a book instance
  const book = new Book(title, author, isbn);

  // 4 - Create a UI instance
  const newItem = new UI();

  // 5 - Check if input field is empty
  if (title === '' || author === '' || isbn === '') {

    // 5.1 - Show error msg
    newItem.alertMsg('Please enter all fields!', 'error');

  } else {

    // 5.1 - Add book to book list
    newItem.addBook(book);

    // 5.2 - Add book to local storage
    Storage.addBook(book);

    // 5.3 - Clear input fields
    newItem.clearInput();

    // 5.4 - Show success msg
    newItem.alertMsg('Book details added!', 'success');

  }

});





// Event Listener -> DELETE
document.getElementById('book-table').addEventListener('click', function (e) {

  // 1 - Check the target element
  if (e.target.className === 'fas fa-times') {

    // 1.1 - Delete the book from book list
    e.target.parentElement.parentElement.remove();

    // 1.2 - Remove book from LS
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent); //(isbn of book)

    // 1.3 - Create a UI instance
    const newItem = new UI();

    // 1.4 - Show deleted msg
    newItem.alertMsg('Book details deleted!', 'delete');
  }

});