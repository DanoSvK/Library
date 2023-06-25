const newCard = document.querySelector(".add-book");
const submitCard = document.querySelector(".submit-item");
const submit = document.querySelector(".submit");
const overlay = document.querySelector(".overlay");
const title = document.getElementById("title");
const author = document.getElementById("author");
const genre = document.getElementById("genre");
const totalPages = document.getElementById("totalPages");
const completedPages = document.getElementById("completedPages");
const form = document.querySelector("form");
const itemContainer = document.querySelector(".grid");
const deleteCard = document.querySelector(".delete-img");
const card = document.querySelector(".item");
const errorMessagePages = document.querySelector(".error-message__pages");
const errorMessageTitle = document.querySelector(".error-message__title");
const check = document.querySelector(".check");

let myLibrary = [];
// Book cards object
class Book {
  // prettier-ignore
  constructor(title, author, genre, totalPages, completedPages, completionCheck) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.totalPages = totalPages;
    this.completedPages = completedPages;
    this.completionCheck = completionCheck;
  }
}

// Open modal
const openModal = function () {
  overlay.classList.add("overlay-active");
  submitCard.classList.add("submit-item-active");
};

const closeModal = function () {
  overlay.classList.remove("overlay-active");
  submitCard.classList.remove("submit-item-active");
};

newCard.addEventListener("click", function () {
  openModal();
});

// Close modal when click outside
overlay.addEventListener("click", function () {
  closeModal();
});

// Close modal when hit Escape
window.addEventListener("keydown", function (e) {
  const key = e.code === "Escape";
  if (key) {
    closeModal();
  }
});

// Don't allow spaces as a first character in inputs
document.querySelectorAll(".input").forEach((input) =>
  input.addEventListener("keydown", function (e) {
    if (this.value.length === 0 && e.which === 32) e.preventDefault();
  })
);

// Preserve input animation if text is entered
document.querySelector("form").addEventListener("input", function (e) {
  const target = e.target.closest(".input");

  if (target.value.trim() != "") {
    e.target.previousElementSibling.classList.add("filled");
  } else {
    e.target.previousElementSibling.classList.remove("filled");
  }
});

// Submit book card and render in DOM
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let state = false;
  if (completedPages.value > totalPages.value) {
    return;
  } else {
    const newBook = new Book(
      title.value,
      author.value,
      genre.value,
      totalPages.value,
      completedPages.value,
      check.textContent
    );
    for (i = 0; i < myLibrary.length; i++) {
      if (newBook.title == myLibrary[i].title) {
        state = true;
        break;
      }
    }
    if (data) {
      const book = myLibrary[data.index];
      book.title = newBook.title;
      book.author = newBook.author;
      book.genre = newBook.genre;
      book.completedPages = newBook.completedPages;
      book.totalPages = newBook.totalPages;
      book.completionCheck = newBook.completionCheck;

      const cardContainer = document.querySelector(`[data-id="${data.index}"]`);
      const titleElement = cardContainer.querySelector(".title p");
      const authorElement = cardContainer.querySelector(".title .italic");
      const genreTypeElement = cardContainer.querySelector(".genre p");
      const pagesElement = cardContainer.querySelector(".pages-wrapper .pages");
      const checkElement = cardContainer.querySelector(
        ".pages-wrapper .read-check"
      );

      titleElement.textContent = newBook.title;
      authorElement.textContent = newBook.author;
      genreTypeElement.textContent = newBook.genre;
      pagesElement.textContent = `Pages: ${newBook.completedPages}/${newBook.totalPages}`;
      checkElement.textContent = newBook.completionCheck;

      closeModal();
      // prettier-ignore
      title.value = author.value = genre.value = totalPages.value = completedPages.value = ""
      data = undefined;
      setData();
    } else if (!state) {
      myLibrary.push(newBook);
      closeModal();

      createBook(newBook);
      setData();
      errorMessagePages.classList.remove("error-message__pages-active");
      errorMessageTitle.classList.remove("error-message__title-active");
      // prettier-ignore
      title.value = author.value = genre.value = totalPages.value = completedPages.value = ""

      data = undefined;
    } else if (state) {
      errorMessageTitle.classList.add("error-message__title-active");
      state = false;
    }
  }
});

// Validate numbers
function handleInput() {
  const completed = +completedPages.value;
  const total = +totalPages.value;
  if (completed > total && completed && total) {
    errorMessagePages.classList.add("error-message__pages-active");
  } else {
    errorMessagePages.classList.remove("error-message__pages-active");
  }

  if (completed && total && completed === total) {
    document.querySelector(".check").textContent = "Finished";
  } else if (completed < total) {
    document.querySelector(".check").textContent = "Reading";
  } else {
    document.querySelector(".check").textContent = "";
  }
}

// Add the event listener to both inputs, using the same handler function
totalPages.addEventListener("input", handleInput);
completedPages.addEventListener("input", handleInput);

// Function to re-render data-id (on remove)
const render = function () {
  const cardContainer = document.querySelectorAll(".card");

  for (i = 0; i < myLibrary.length; i++) {
    if (cardContainer[i]) {
      cardContainer[i].dataset.id = i;
    }
  }
};

// Remove book card, re-render data-ids and remove the specific index from myLibrary array that represents the removed card
document.querySelector(".grid").addEventListener("click", function (e) {
  const item = e.target.closest(".delete-img");

  if (item) {
    const index = item.closest(".card").dataset.id;
    item.closest(".card").remove();
    myLibrary.splice(index, 1);
    render();
    setData();
  }
});

/////////////////////////////////////////////////////////

// Function to create book card
const createBook = function (item) {
  const cardContainer = document.createElement("div");
  const title = document.createElement("div");
  const genre = document.createElement("div");
  const pagesWrapper = document.createElement("div");
  const footer = document.createElement("div");
  const bookName = document.createElement("p");
  const author = document.createElement("p");
  const span = document.createElement("span");
  const genreTitle = document.createElement("p");
  const genreType = document.createElement("p");
  const pages = document.createElement("p");
  const check = document.createElement("p");
  const delimiter = document.createElement("hr");
  const imgDelete = document.createElement("img");
  const imgEdit = document.createElement("img");

  // Creating container
  cardContainer.classList.add("item");
  cardContainer.classList.add("card");
  itemContainer.appendChild(cardContainer);
  cardContainer.setAttribute("data-id", myLibrary.indexOf(item));

  // Creating title wrapper
  title.classList.add("title");
  cardContainer.appendChild(title);

  // Creating title
  bookName.textContent = item.title;
  title.appendChild(bookName);
  author.textContent = `by `;
  title.appendChild(author);
  span.textContent = `${item.author}`;
  span.classList.add("italic");
  author.appendChild(span);

  // Creating genre wrapper
  genre.classList.add("genre");
  cardContainer.appendChild(genre);

  // Creating genre wrapper content
  genreType.textContent = item.genre;
  genre.appendChild(genreType);
  genre.appendChild(delimiter);

  // Creating pages wrapper
  pagesWrapper.classList.add("pages-wrapper");
  cardContainer.appendChild(pagesWrapper);

  // Creating pages in pages wrapper
  pages.textContent = `Pages: ${item.completedPages}/${item.totalPages}`;
  pages.classList.add("pages");
  pagesWrapper.appendChild(pages);

  // Creating read-check in pages wrapper
  check.textContent = item.completionCheck;
  check.classList.add("read-check");
  pagesWrapper.appendChild(check);

  // Creating footer container
  footer.classList.add("card-footer");
  cardContainer.appendChild(footer);

  // Creating edit image in container footer
  imgEdit.classList.add("edit-img");
  imgEdit.src = "./edit.svg";
  footer.appendChild(imgEdit);

  // Creating delete image in container footer
  imgDelete.classList.add("delete-img");
  imgDelete.src = "./delete-icon.svg";
  footer.appendChild(imgDelete);
};

let data;
const editCard = function (e) {
  const target = e.target.closest(".edit-img");

  if (!target) return;
  const index = target.closest(".card").dataset.id;

  data = myLibrary[index];
  title.value = data.title;
  author.value = data.author;
  genre.value = data.genre;
  completedPages.value = data.completedPages;
  totalPages.value = data.totalPages;
  check.textContent = data.completionCheck;
  data.index = index;

  const inputs = document.querySelectorAll(".input");
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      inputs[i].previousElementSibling.classList.remove("filled");
    } else {
      inputs[i].previousElementSibling.classList.add("filled");
    }
  }

  openModal();
};
document.querySelector(".grid").addEventListener("click", editCard);

// Handle local storage
const renderCard = function () {
  for (i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
};

function setData() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    renderCard();
  } else {
    let objects = localStorage.getItem("myLibrary"); // gets information from local storage to use in the renderCard loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    renderCard();
  }
}

restore();
