// BUILDING AN API:
// 1. Create a Library obj
var Library = function() {
  // this creates a new private array, that gLib or gLibTwo has a reference to
  this._bookshelf = new Array();
  // localStorage.setItem("Bookshelf" ,  JSON.stringify(this._bookshelf));
};

// 2. Create a Book object:
var Book = function(title, author, pages, date){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.date = new Date(date)
};

// Methods:

Library.prototype.addBook = function(book) {
  //Purpose: Add a book object to your books array.
  // Return: boolean true if it is not already added, false if it is already added.
  // var bookshelf = localStorage;
  // console.log(bookshelf)
  if(this._bookshelf.length === 0){
    this._bookshelf.push(book);
    // localStorage.setItem("bookshelf", this._bookshelf)
    return "The book is added!";
  }

  var bookExist = false;
  for (var i = 0; i < this._bookshelf.length; i++) {
    if(this._bookshelf[i]['title'] === book.title){
      bookExist = true;
    }
  }
    if(bookExist){
      return "Already exist"
      } else {
      this._bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf));
      return "The book is added"
    };

    return this._bookshelf;
};

Library.prototype.removeBook = function(bookTitle) {
  var bookDeleted = false;
  for (var i = 0; i < this._bookshelf.length; i++) {
    if(this._bookshelf[i]['title'].toLowerCase() === bookTitle.toLowerCase()){
      bookDeleted = true;
      this._bookshelf.splice(i, 1)
    }
  }
  if(bookDeleted){
    localStorage.setItem("bookshelf", JSON.stringify(this._bookshelf))
    return "The book is deleted!"
  }
  return this._bookshelf;
};

Library.prototype.removeBookByAuthor = function (authorName) {

  var isDeleted = false;
  var deletedBooks = 0;
  for (var i = this._bookshelf.length-1; i >= 0; i--) {
    console.log('gets to the loop')
    if(this._bookshelf[i]['author'].toLowerCase() === authorName.toLowerCase()){
      this._bookshelf.splice(i, 1);
      deletedBooks +=1;
      isDeleted = true;
    }
  }
  if(isDeleted && deletedBooks < 2){
    return deletedBooks + " " + "book is deleted";
  } else if(isDeleted && deletedBooks > 1 ){
    return deletedBooks + " " + "books are deleted"
  } else {
    return "Author is not found"
  }
  return this._bookshelf;
};

Library.prototype.getRandomBook = function (){
// Purpose: Return a random book object from your books array
// Return: book object if you find a book, null if there are no books
  if(this._bookshelf.length === 0){
    return "There are no books in the library"
  }
  var randomBook = this._bookshelf[Math.floor(Math.random() * this._bookshelf.length)]
  return "Random Book: " + " " + randomBook.title + " " + "by" + " " + randomBook.author;
};

Library.prototype.getBookByTitle = function (title){
// Purpose: Return all books that completely or partially matches the string title passed into the function
// Return: array of book objects if you find books with matching titles, empty array if no books are found
  var result = this._bookshelf.filter(function (item) {
    return item.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
  })
  return result;
};

Library.prototype.getBooksByAuthor = function (authorName){
// Purpose: Finds all books where the author’s name partially or completely match-es the authorName argument passed to the function.
//Return:array of books if you find books with match authors, empty array if no books match.
  var result = this._bookshelf.filter(function (item) {
    return item.author.toLowerCase().indexOf(authorName.toLowerCase()) > -1;
  })
  return result;
};

Library.prototype.addBooks = function (books){
// Purpose: Takes multiple books, in the form of an array of book objects, and adds the objects to your books array.
// Return: number of books successfully added, 0 if no books were added
var countNotAdded = 0;
var count = 0;

  for (var i = 0; i < books.length; i++) {
    // use the same method
    var booksAdded = gLibrary.addBook(books[i]);
    if(booksAdded === "Already exist"){
      countNotAdded +=1;
    }
    if(booksAdded === "The book is added"){
      count+=1;
    }
  }
  return countNotAdded + " book(s) not added, because they already exist, " + count + " book(s) added!";
};

Library.prototype.getAuthors = function (){
// Purpose: Find the distinct authors’ names from all books in your library, only 1 book by that author
// Return: array of strings the names of all distinct authors, empty array if no books exist or if no authors exist
  var resultArr = [];
  for (var i = 0; i < this._bookshelf.length; i++) {
    resultArr.push(this._bookshelf[i]['author']);
  }
  console.log(resultArr, 'result Arr');

  var finalArr = resultArr.reduce(function (a,b){
    if(a.indexOf(b) < 0){
      a.push(b)
    }
    return a;
  }, [])

  return finalArr;
};

Library.prototype.getRandomAuthorName = function (){
// Purpose: Retrieves a random author name from your books collection
// Return: string author name, null if no books exist
  if(this._bookshelf.length === 0){
    return null;
  }
  var randomAuthor = this._bookshelf[Math.floor(Math.random() * this._bookshelf.length)]
  return randomAuthor.author;
};

document.addEventListener('DOMContentLoaded', function() {
  window.gLibrary = new Library();
  window.book1 = new Book('Harry Potter', 'J.Rowlins', 234, 'December 25, 2000');
  window.book2 = new Book('IT', 'S.King', 197, 'December 25, 2006');
  window.book3 = new Book('War and Peace', 'L.Tolstoy', 1097, 'December 25, 1985');
  window.book4 = new Book('Javascript', 'J.Duckett', 797, 'December 25, 2006');
  window.book5 = new Book('JQuery', 'J.Duckett', 897, 'December 25, 2008');
  window.book6 = new Book('JQuery2', 'J.Duckett', 897, 'December 25, 2008');
  window.book7 = new Book('Carrie', 'S.King', 897, 'December 25, 2008');
  window.book8 = new Book('Evgeniy Onegin', 'A.Pushkin', 897, 'December 25, 1879');
  window.book9 = new Book('Harry Potter 2', 'J.Rowlins', 234, 'December 25, 2000');
  window.book10 = new Book('Harry Potter 3', 'J.Rowlins', 234, 'December 25, 2000');
  window.book11 = new Book('Harry Potter 4', 'J.Rowlins', 234, 'December 25, 2000');
  window.bookArr = [book1, book2, book3];

});
