const bookmarkInput = document.getElementById("bookmarkInput");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");
const bookmarkList = document.getElementById("bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = "";
  bookmarks.forEach((url, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${url}" target="_blank">${url}</a>
      <button class="delete" onclick="deleteBookmark(${index})">X</button>
    `;
    bookmarkList.appendChild(li);
  });
}
window.deleteBookmark = function (index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
};
    

addBookmarkBtn.addEventListener("click", () => {
  const url = bookmarkInput.value.trim();
  if (url) {
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
    bookmarkInput.value = "";
  }
});

renderBookmarks();


// 2

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("password", passwordInput.value);
});

window.addEventListener("DOMContentLoaded", () => {
  usernameInput.value = localStorage.getItem("username") || "";
  passwordInput.value = localStorage.getItem("password") || "";
});


// 3

import template from "./template.hbs";
import { products } from "./data";

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

function renderProducts(filteredProducts) {
  productContainer.innerHTML = template({ products: filteredProducts });
}

renderProducts(products);

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});
