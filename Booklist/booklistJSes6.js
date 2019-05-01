//book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// ui class
class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td> 
      <a href="#"class="close" aria-label="Close">
      <span class="delete" aria-hidden="true">&times;</span></a>
      </td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const row = document.querySelector('.row');
    // Get form
    const containter = document.querySelector('.container');
    // Insert alert
    containter.insertBefore(div, row);

    // Timeout after 3 sec
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      if (confirm('You wanna delete??')) {
        target.parentElement.parentElement.parentElement.remove();
      }
    }
  }
}

class Store {
  static getBookFromLS() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBookFromLS() {
    const books = Store.getBookFromLS();
    books.forEach(function(book) {
      let ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBookToLS(book) {
    const books = Store.getBookFromLS();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBookFromLS(isbn) {
    //console.log(isbn);
    const books = Store.getBookFromLS();
    books.forEach(function(book, index) {
      //console.log(book.isbn);
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBookFromLS);

//listen to events
document.querySelector('#form').addEventListener('submit', function(e) {
  //getting input values
  const title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  //instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  //validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all the fields!', 'alert-danger');
  } else {
    // Add book to list
    ui.addBookToList(book);

    //add book  to LS
    Store.addBookToLS(book);

    //success book add alert
    ui.showAlert('Book Added!', 'alert-success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//listen for delete events
document.querySelector('#book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  //remove book from LS
  Store.removeBookFromLS(
    e.target.parentElement.parentElement.previousElementSibling.textContent
  );

  // Show message
  ui.showAlert('Book Removed!', 'alert-success');

  e.preventDefault();
});
