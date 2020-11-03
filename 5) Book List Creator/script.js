/*
======================================
CONSTRUCTORS
=====================================
*/


// BOOK - Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



// UI - Constructor
function UI() {

}






/*
======================================
FUNCTIONS
=====================================
*/

UI.prototype.addBook = function(book) {

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




// CLEAR INPUT - Function
UI.prototype.clearInput = function() {

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}




// ALERT MESSAGE - Function
UI.prototype.alertMsg = function (msg, className) {

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
  setTimeout(function() {
    document.querySelector('div').remove();
  }, 2000);
}







/*
======================================
EVENT HANDLERS
=====================================
*/

// EVENT LISTENER FOR SUBMIT
document.getElementById('form-btn').addEventListener('click', function(e) {

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
  if(title === '' || author === '' || isbn === '') {

    // 5.1 - Show error msg
    newItem.alertMsg('Please enter all fields!', 'error');

  } else {

    // 5.1 - Use addBook() to add book to list
    newItem.addBook(book);
  
    // 5.2 - Clear input fields
    newItem.clearInput();

    // 5.3 - Show success msg
    newItem.alertMsg('Book details added!', 'success');

  }

});





// EVENT LISTENER FOR DELETE
document.getElementById('book-table').addEventListener('click', function(e) {

  // 1 - Check the target element
  if (e.target.className === 'fas fa-times') {

    // 1.1 - Delete the book item
    e.target.parentElement.parentElement.remove();

    // 1.2 - Create a UI instance
    const newItem = new UI();

    // 1.3 - Show deleted msg
    newItem.alertMsg('Book details deleted!', 'delete');
  }

});