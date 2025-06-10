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

const searchInput = document.getElementById("searchInput");
const container = document.getElementById("productContainer");
const source = document.getElementById("product-template").innerHTML;
const template = Handlebars.compile(source);

const render = (items) => {
  const html = template({ products: items });
  container.innerHTML = html;
};

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );
  render(filtered);
});

render(products);
