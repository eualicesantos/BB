document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/livros")
        .then(response => response.json())
        .then(books => {
            const booksContainer = document.getElementById("booksContainer");
            booksContainer.innerHTML = ""; // Limpa o conteúdo antes de adicionar
            books.forEach(book => {
                const bookElement = document.createElement("div");
                bookElement.classList.add("book");
                bookElement.innerHTML = `
                    <img src="${book.cover}" alt="${book.title}">
                    <p>${book.title}</p>
                `;
                booksContainer.appendChild(bookElement);
            });
        })
        .catch(error => console.error("Erro ao carregar livros:", error));
});
