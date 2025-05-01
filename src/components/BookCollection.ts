import { fetchBooks } from "../api/booksApi";
import { createBookCard } from "../components/BookCard";
import { navigateTo } from "../main";

export function BookCollection(): string {
  return `
    <section id="collections" class="py-16 bg-white">
      <div class="max-w-screen-xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-10 text-center">
          Explore Our Collection
        </h2>
        <div id="bookList"
          class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          <!-- Books will be loaded here -->
          ${initBookCollection()}
        </div>
      </div>
    </section>
  `;
}

export async function initBookCollection(): Promise<void> {
  try {
    const books = await fetchBooks();
    const bookList = document.getElementById("bookList");

    if (!bookList) {
      throw new Error("Book list element not found");
    }

    bookList.innerHTML = "";

    books.books.forEach((book: any, index: number) => {
      const card = createBookCard(book, index);

      card.querySelector(".view-details")?.addEventListener("click", (e) => {
        e.preventDefault();
        const bookId = book.id;
        navigateTo(`/books/${bookId}`);
      });

      bookList.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to initialize book collection:", error);
    const bookList = document.getElementById("bookList");
    if (bookList) {
      bookList.innerHTML = `
        <div class="col-span-full text-center py-10">
          <p class="text-red-500">Failed to load books. Please try again later.</p>
        </div>
      `;
    }
  }
}
