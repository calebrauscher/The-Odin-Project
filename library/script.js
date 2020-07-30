let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead ? "You have read this book." : "You have not read this book yet.";
}

function changeReadStatus(book) {
    book.hasRead = book.hasRead ? "You have not read this book yet" : "You have read this book";
}

function createForm() {
    // Form
    const formButton = document.getElementById("books");
    formButton.innerHTML = `<form id="form" onsubmit="addBookToLibrary(event)">
                                <label for="author">Author:</label><br>
                                <input type="text" id="author" name="author"></input><br>
                                <label for="title">Title:</label></br>
                                <input type="text" id="title" name="title"></input><br>
                                <label for="pages">Pages:</label></br>
                                <input type="number" id="pages" name="pages" min="1"></input><br>
                                <label for="hasRead">Has book been read?</label>
                                <input type="checkbox" id="hasRead" name="hasRead" value="Read"></input><br>
                                <input type="submit" value="Submit">
                            </form>`;
}

// function removeForm() {
//     document.getElementById("author").value = "";
//     document.getElementById("title").value = "";
//     document.getElementById("pages").value = "";
//     document.getElementById("hasRead").value = false;
//     //document.getElementById("form").remove();
// }

function addBookToLibrary(event) {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").value;

    const book = new Book(author, title, pages, hasRead);
    myLibrary.push(book);
    //localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    //removeForm();
    render();
}


function render() {
    //myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    const display = document.getElementById("books");
    display.innerHTML = "";
    myLibrary.forEach((book, idx) => {
        const card = document.createElement("div");

        display.innerHTML += `<div class="book-details">
                                <div class="title">${book.title}</div>
                                <div class="author">${book.author}</div>
                                <div class="num-pages">${book.pages} pages</div>
                                <div class="read-status">${book.hasRead}</div>
                                <input type="checkbox" onclick="changeReadStatus(${book})" class="change-status">Read?</input>
                                <button class="remove-book" onclick="removeBook(${book})">Remove</button>
                              </div>`;
    });
}



window.onload = function() {
    document.getElementById("addBook").onclick = createForm
    render();
};