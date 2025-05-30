import { fetchBooks } from "../api/booksApi";
import { createBookCard } from "../components/BookCard";
import { navigateTo } from "../main";
import { Book } from "../modal/Book";
import { hideLoading, showLoading } from "./Loading";

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

// Initializes and renders the book collection on the page
export async function initBookCollection(): Promise<void> {
  // Show loading indicator while fetching data
  showLoading();
  try {
    // Fetch books from API
    const result = await fetchBooks();
    const bookList = document.getElementById("bookList");

    // Validate DOM element exists
    if (!bookList) {
      throw new Error("Book list element not found");
    }
    // Clear existing content
    bookList.innerHTML = "";
    const books = result.books;

    // Process each book and create cards
    books.forEach((book: Book, index: number) => {
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
  } finally {
    // Always remove loading indicator regardless of success/failure
    hideLoading();
  }
}
