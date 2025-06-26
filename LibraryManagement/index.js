let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let notFound = document.getElementById("notFound");
let spinner = document.getElementById("spinner");

function displayItems(result) {
    let { author, imageLink } = result;
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    let imageEl = document.createElement("img");
    imageEl.src = imageLink;

    let authorEl = document.createElement("p");
    authorEl.textContent = author;

    bookContainer.appendChild(imageEl);
    bookContainer.appendChild(authorEl);

    searchResults.appendChild(bookContainer);
}

function appendElements(search_results, name) {
    spinner.classList.add("d-none");
    notFound.classList.add("d-none"); // ✅ Always hide before checking

    let matchedBooks = search_results.filter(item =>
        item.title.toLowerCase().includes(name.toLowerCase())
    );

    if (matchedBooks.length === 0) {
        notFound.classList.remove("d-none"); // ❌ Only show if none found
    } else {
        matchedBooks.forEach(displayItems);
    }
}


function getItems(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.remove("d-none");
        notFound.classList.add("d-none"); // ✅ Hide before checking new results

        let name = searchInput.value.trim();
        if (name !== "") {
            let url = "https://apis.ccbp.in/book-store?title=" + name;

            fetch(url)
                .then(response => response.json())
                .then(result => {
                    let { search_results } = result;
                    appendElements(search_results, name);
                })
                .catch(() => {
                    spinner.classList.add("d-none");
                    notFound.textContent = "Something went wrong";
                    notFound.classList.remove("d-none");
                });
        } else {
            spinner.classList.add("d-none");
        }
    }
}


searchInput.addEventListener("keydown", getItems);
