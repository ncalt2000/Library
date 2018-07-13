// create a contructor: addBooksUI
var AddBooksUI = function(container){
//placeholder for an id='addBooksModal'
  this.$container = container;
  // allow us to access anythign in the Library
  Library.call(this);
  // temp bookshelf is to hold multiple books, then pass it in addBooks function, and tie to Add btn.
  this._tempBookshelf = new Array();
};
// new instance of Library.prototype is created
AddBooksUI.prototype = Object.create(Library.prototype);
//data-target and data-value are removed from html. This will be added in js.

// init fires whatever is in the _bindEvents.
AddBooksUI.prototype.init = function(){
  this.getStorage();
  this._bindEvents();
  return;
};

// this opens the modal
// proxy is doing similar ot call(this)
AddBooksUI.prototype._bindEvents = function(){
  // add an id=''
  $('button#add-book-btn').on('click',
  $.proxy(this._handleModalOpen, this));

  $('button#add-another-btn').on('click', $.proxy(this._createBook, this));

  $('button#save-book-btn').on('click',
  $.proxy(this._saveBook, this));
};

// event handlers
AddBooksUI.prototype._handleModalOpen = function(){
  this.$container.modal('show');
  return;
}

AddBooksUI.prototype._createBook = function () {
  event.preventDefault();
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();
  var deleteCol = '';

  var book = new Book(bookCover, title, author, genre, pages, publishDate, deleteCol, synopsis);
  this._tempBookshelf.push(book);

  var $booksToAdd = $('<p>', {'class': 'booksToAdd'});
  $('.booksInLine').append($booksToAdd).text(`Books to be added: ${this._tempBookshelf.length}`);
  console.log(this._tempBookshelf, 'temp');
  $('#add-book-form')[0].reset();
};

AddBooksUI.prototype._saveBook = function(){
  var title = $('#title-text').val();
  var author = $('#author').val();
  var genre = $('#genre').val();
  var pages = $('#pages').val();
  var publishDate = $('#publicationDate').val();
  var synopsis = $('#synopsis').val();
  var bookCover = $('#file-upload').val();
  var deleteCol = '';

  var book = new Book(bookCover, title, author, genre, pages, publishDate, deleteCol, synopsis);

  if(this._tempBookshelf.length === 0){
    this.addBook(book);
  }
  this.addBooks(this._tempBookshelf);
  $('#add-book-form')[0].reset();
  this._tempBookshelf = new Array();
};

$(function(){
  window.gAddBooksUI = new AddBooksUI($('#addBookModal'));
  window.gAddBooksUI.init();
});
