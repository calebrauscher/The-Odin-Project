let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function createForm() {
    // Form
    const formButton = document.getElementById("books");
    formButton.innerHTML = `<form id="form" class="container" onsubmit="addBookToLibrary(event)">
                                <label for="author">Author:</label><br>
                                <input type="text" id="author" name="author" required></input><br>
                                <label for="title">Title:</label></br>
                                <input type="text" id="title" name="title" required></input><br>
                                <label for="pages">Pages:</label></br>
                                <input type="number" id="pages" name="pages" min="1" required></input><br>
                                <label for="hasRead">Has book been read?</label>
                                <input type="checkbox" id="hasRead" name="hasRead"></input><br>
                                <input type="submit" value="Submit"><br>
                            </form>`;
    hideButton();
}

function addBookToLibrary(event) {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").checked;

    const book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    render();
}

function render() {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    const display = document.getElementById("books");
    display.innerHTML = "";
    myLibrary.forEach((book, idx) => {
        const card = document.createElement("div");
        display.innerHTML += `<div class="book-details">
                                <div class="title">${book.title}</div>
                                <div class="author">by ${book.author}</div>
                                <div class="num-pages">${book.pages} pages</div>
                                <div class="read-status">${
                                  book.hasRead
                                    ? "You have read this book."
                                    : "You have not read this book."
                                }</div>
                                <button class="change-status" onclick="changeReadStatus(${idx})">Read?</input>
                                <button class="remove-book" onclick="removeBook(${idx})">Remove</button>
                              </div>`;
    });

    displayButton();
}

function removeBook(idx) {
    const firstPart = myLibrary.slice(0, idx);
    const secondPart = myLibrary.slice(idx + 1, myLibrary.length);

    myLibrary = firstPart.concat(secondPart);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    render();
}

function changeReadStatus(idx) {
    myLibrary[idx].hasRead = !myLibrary[idx].hasRead;
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    render();
}

function hideButton() {
    const addButton = document.getElementById("addBook");

    addButton.style.display = "none";
}

function displayButton() {
    const addButton = document.getElementById("addBook");

    addButton.style.display = "block";
}

window.onload = function () {
    document.getElementById("addBook").onclick = createForm;
    render();
};