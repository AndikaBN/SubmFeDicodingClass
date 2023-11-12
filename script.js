document.addEventListener("DOMContentLoaded", function () {
  const unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];
  const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

  displayBooks("unreadList", unreadBooks);
  displayBooks("readList", readBooks);

  function generateId() {
    return +new Date();
  }

  window.addBook = function () {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const status = document.getElementById("status").value;
    const yearInput = document.getElementById("year").value;

    if (title && author && yearInput) {
      const newBook = {
        id: generateId(),
        title: title,
        author: author,
        year: parseInt(yearInput),
        isComplete: status === "read",
      };

      if (status === "unread") {
        unreadBooks.push(newBook);
      } else {
        readBooks.push(newBook);
      }

      localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
      localStorage.setItem("readBooks", JSON.stringify(readBooks));

      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("year").value = "";

      displayBooks("unreadList", unreadBooks);
      displayBooks("readList", readBooks);
    }
  };

  function displayBooks(elementId, books) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = "";

    books.forEach((book) => {
      const listItem = document.createElement("div");
      listItem.classList.add("buku");
      listItem.textContent = `${book.title} by ${book.author} .Diterbitkan pada ${book.year}`;

      const buttonFlexDiv = document.createElement("div");
      buttonFlexDiv.classList.add("button-flex");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.onclick = function () {
        removeBook(books, book, elementId);
      };

      buttonFlexDiv.appendChild(deleteButton);

      const moveButton = document.createElement("button");

      if (elementId === "unreadList") {
        moveButton.textContent = "Sudah di baca";
        moveButton.onclick = function () {
          moveBook(books, readBooks, book, elementId);
        };
        buttonFlexDiv.appendChild(moveButton);
      } else if (elementId === "readList") {
        moveButton.textContent = "Belum di baca";
        moveButton.onclick = function () {
          moveBook(books, unreadBooks, book, elementId);
        };
        buttonFlexDiv.appendChild(moveButton);
      }

      listItem.appendChild(buttonFlexDiv);
      listElement.appendChild(listItem);
    });
  }

  function removeBook(books, book, elementId) {
    const index = books.indexOf(book);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem(
        elementId === "unreadList" ? "unreadBooks" : "readBooks",
        JSON.stringify(books)
      );
      displayBooks(elementId, books);
    }
  }

  function moveBook(sourceBooks, destinationBooks, book, elementId) {
    const index = sourceBooks.indexOf(book);
    if (index !== -1) {
      const movedBook = sourceBooks.splice(index, 1)[0];
      movedBook.isComplete = !movedBook.isComplete;
      destinationBooks.push(movedBook);

      localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
      localStorage.setItem("readBooks", JSON.stringify(readBooks));

      displayBooks("unreadList", unreadBooks);
      displayBooks("readList", readBooks);
    }
  }
});
