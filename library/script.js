let myLibrary = [];

function Book(title, author, pages, hasRead=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.remove = function() {

    }
}

function addBookToLibrary() {
    // Form
    let formButton = document.getElementById("books");
    formButton.innerHTML = `<form id="form">
                                <label for="author">Author:</label><br>
                                <input type="text" id="author" name="author"></input><br>
                                <label for="title">Title:</label></br>
                                <input type="text" id="title" name="title"></input><br>
                                <label for="pages">Pages:</label></br>
                                <input type="number" id="pages" name="pages" min="1"></input><br>
                                <label for="hasRead">Has book been read?</label>
                                <input type="checkbox" id="hasRead" name="hasRead" value="Read"></input>
                            </form>`;
    // Create object from form
    myLibrary.push(new_book);
    window.localStorage.setItem('books', JSON.stringify(myLibrary));
    render();
}

function render() {
    window.localStorage.getItem('books');
    let display = document.getElementById("books");
    myLibrary.forEach(book => {
        display.innerHTML += `<div class="book-details">${book.title} by ${book.author} contains ${book.pages} pages.</div>`;
        if (book.hasRead) {
            display.innerHTML += `<div class="has-read-details>You have read this book.</div>`;
        } else {
            display.innerHTML += `<div class="has-read-details>You have not read this books.</div>`;
        }
    });
}

document.getElementById("addBook").onclick = addBookToLibrary