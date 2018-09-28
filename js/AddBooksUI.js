class AddBooksUI {
  constructor() {
    this._tempBookshelf = new Array();
    this._encodedImg;
    this.libraryURL = 'http://127.0.0.1:3002/library/'
  }

_init() {
  this._bindEvents();
};

_bindEvents() {
  $('button#add-book-btn').on('click', this._handleModalOpen.bind(this));

  $('button#add-another-btn').on('click', this._bookInLine.bind(this));

  $('button#save-book-btn').on('click', this._saveBook.bind(this));
};

_handleModalOpen() {
  $('#addBookModal').modal('show');
}

_getFieldsFromModal () {
  let fieldsData = $('#add-book-form').serializeArray();
  let oData = new Object();
  fieldsData.map((item, index) => {
    oData[item.name] = item.value;
  })
  // console.log(oData, "DATA");
  return oData;
};

_bookInLine() {
  const bookData = this._getFieldsFromModal ();
  // This line is adding the rating of 1 to new book
  bookData["rating"] = 1;
  // console.log(bookData, 'BookData');

  if (bookData.title === "") {
    $('#title-text').addClass('required animated pulse');
    var errorMessage = $('<p>', {class: 'text-danger animated pulse'});
    errorMessage.text("Please complete missing fields");
    $('.booksInLine').html(errorMessage);
    return;
  }
  if (bookData.author === "") {
    $('#title-text').removeClass('required');
    $('#author').addClass('required animated pulse');
    var errorMessage = $('<p>', {class: 'text-danger animated pulse'});
    errorMessage.text("Please complete missing fields");
    $('.booksInLine').html(errorMessage);
    return;
  }

  $('#title-text').removeClass('required');
  $('#author').removeClass('required');

 var file = document.querySelector('#file-upload').files[0];
 var reader = new FileReader();
 if (file) {
   reader.readAsDataURL(file);
   reader.onload = function() {
     // console.log(reader.result);
     bookData.cover = reader.result;
     // console.log(bookData, 'Log 1: BookData , after encoding');
   };
 } else {
   bookData.cover = "No Cover!!!"
 }
  this._tempBookshelf.push(bookData);
  // console.log(this._tempBookshelf, "TEMP SHelf");

  var booksToAdd = $('<p>', {'class': 'booksToAdd text-success'});
    booksToAdd.text(`Books to be added: ${this._tempBookshelf.length}`);
    $('.booksInLine').html(booksToAdd);
    $('#add-book-form')[0].reset();
};

_saveBook() {
  this._bookInLine();
console.log(this._tempBookshelf, "books to be snet to DB");

  $.ajax({
    url: this.libraryURL,
    method: 'POST',
    dataType: 'json',
    data: {bookshelf: this._tempBookshelf}, //this is our request
    success: (data) => { //this is the response from DB
      gDataTable._getAllBooks();

      $('#success-modal').modal('show');
      setTimeout(function () {
        $('#success-modal').removeClass('zoomIn');
        $('#success-modal').addClass('zoomOut');
      }, 1000);
      setTimeout(function () {
        $('#success-modal').modal('hide');
        $('#success-modal').removeClass('zoomOut');
        $('#success-modal').addClass('zoomIn');
      }, 1500);

      this._tempBookshelf = new Array();
      $('#add-book-form')[0].reset();
      $('.booksInLine').empty();
      $('#addBookModal').modal('hide');
      console.log(data, 'log 2: back from DB');
    },
    error: ()  => {
      $('#failure-modal').modal('show')
      var errorMessage = $('<p>', {class: 'text-danger animated pulse'});
      errorMessage.text("Oops! Something went wrong! Please try again!");
      $('#failure-modal').find('.modal-footer').html(errorMessage);
      $('.booksInLine').empty();
      this._tempBookshelf = new Array();
    },
  })
};

  // createBook = function() {
  //
  //   if (title === "") {
  //     $('#title-text').addClass('required animated pulse');
  //     return;
  //   }
  //   if (author === "") {
  //     $('#title-text').removeClass('required');
  //     $('#author').addClass('required animated pulse');
  //     return;
  //   }
  //
  //   var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);
  //   $('#title-text').removeClass('required');
  //   $('#author').removeClass('required');
  //   this._tempBookshelf.push(book);
  //
  //   var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
  //   $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
  //   $('#add-book-form')[0].reset();
  // }.bind(this);
  //
  // var file = document.querySelector('#file-upload').files[0];
  // var reader = new FileReader();
  // console.log(reader);
  //
  // if (file) {
  //   reader.readAsDataURL(file);
  //   reader.onload = function() {
  //     console.log(reader.result);
  //     bookCover = reader.result;
  //     createBook();
  //   };
  // } else {
  //   bookCover = noCover;
  //   createBook();
  // }

// _getBase64 (callback) {
//   var file = document.querySelector('#file-upload').files[0];
//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function() {
//     return this._encodedImg = reader.result;
//   };
// };

saveBook() {
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover;
  var deleteCol = '';
  var edit = '';
  var rating = '1';
  var noCover = '../assets/books/noCover.jpg';

  createBook = function() {
    if (title === "") {
      $('#title-text').addClass('required animated pulse');
      return;
    }
    if (author === "") {
      $('#title-text').removeClass('required');
      $('#author').addClass('required animated pulse');
      return;
    }
    var book = new Book(bookCover, title, author, genre, pages, publishDate, rating, deleteCol, synopsis, edit);

    var addSuccessful = this._tempBookshelf.length > 0
      ? this.addBooks(this._tempBookshelf) && this.addBook(book)
      : this.addBook(book);
    if (addSuccessful) {
      $('#title-text').addClass('new-book');
      $('#title-text').removeClass('required');
      $('#author').removeClass('required');
      $('#success-modal').modal('show');
      setTimeout(function() {
        $('#success-modal').removeClass('zoomIn');
        $('#success-modal').addClass('zoomOut');
      }, 1000);
      setTimeout(function() {
        $('#success-modal').modal('hide');
        $('#success-modal').removeClass('zoomOut');
        $('#success-modal').addClass('zoomIn');
      }, 1500);
    }
    $('#add-book-form')[0].reset();
    $('#addBookModal').modal('hide');
    $('.booksInLine').empty();
    this._tempBookshelf = new Array();
  }.bind(this);

  var file = document.querySelector('#file-upload').files[0];
  var reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onload = function() {
      // console.log(reader.result);
      bookCover = reader.result;
      createBook();
    };
  } else {
    bookCover = noCover;
    createBook();
  }
};
};


$(function() {
  window.gAddBooksUI = new AddBooksUI();
  window.gAddBooksUI._init();
});
