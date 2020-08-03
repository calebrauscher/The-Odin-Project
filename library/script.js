"use strict";

const entryForm = document.getElementById("form");
const addButton = document.getElementById("addBook");
const submitButton = document.getElementById("submitButton");

let myLibrary = [];

window.onload = function () {
  render();
};

addButton.addEventListener("click", () => {
  showForm();
});

submitButton.addEventListener("click", () => {
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").checked;
  const book = new Book(title, author, pages, hasRead);
  addBookToLibrary(book);
});

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(book) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  myLibrary.push(book);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  entryForm.style.display = "none";
  render();
}

function render() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary) {
    const display = document.getElementById("books");
    display.innerHTML = "";
    myLibrary.forEach((book, idx) => {
      const card = document.createElement("div");
      display.innerHTML += `<div class="book-details">
                                  <div class="title">${book.title}</div>
                                  <div class="author">by ${book.author}</div>
                                  <div class="num-pages">${
                                    book.pages
                                  } pages</div>
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
}

function removeBook(idx) {
  const firstPart = myLibrary.slice(0, idx);
  const secondPart = myLibrary.slice(idx + 1, myLibrary.length);

  myLibrary = firstPart.concat(secondPart);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render();
}

function changeReadStatus(idx) {
  myLibrary[idx].hasRead = !myLibrary[idx].hasRead;
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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

function showForm() {
  entryForm.style.display = "block";
}
