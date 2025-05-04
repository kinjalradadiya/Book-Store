import { fetchBookById, purchaseBook } from "../api/booksApi";
import { Loading } from "../components/Loading";
import { Book } from "../modal/Book";

export async function renderBookPage(id: number): Promise<string> {
  let content = `
    <div class="p-6 text-center max-w-xl mx-auto">
      ${Loading().replace("fixed", "relative").replace("inset-0", "")}
    </div>
  `;

  try {
    const result = await fetchBookById(id);
    const book = result.book;

    content = `
    <div class="flex flex-col justify-center items-center mt-[100px]"  data-book-id="${
      book.id
    }">
   
         <div class="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8 items-start">
      <div class="relative w-64 h-80">
       
        <div
          class="absolute inset-0 bg-white rounded-lg shadow-2xl"
        >
          <div class="p-6 flex flex-col justify-between h-full">
            <div>
              <h2 class="text-2xl font-bold mb-2">To Kill a Mockingbird</h2>
              <p class="text-gray-600">by Harper Lee</p>
            </div>
            <div>
              <p class="text-xl font-semibold">$10.99</p>
              <p class="text-green-600 text-sm">Stock: 15</p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-left space-y-4">
       <div id="purchaseSuccessMessage" class="hidden mb-4"></div>
        <h1 class="text-4xl font-bold text-gray-900">${book.title}</h1>
        <p class="text-gray-600 text-lg">
          by <span class="font-semibold">${book.author}</span>
        </p>

        <p class="text-sm text-gray-500">ISBN: ${book.isbn}</p>

        <p class="text-2xl text-green-600 font-extrabold">$${book.price}</p>
        <p class="stock-display ${
          book.availableStock <= 0
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold"
        }">
          ${
            book.availableStock === 0
              ? "Out of Stock"
              : `In Stock: ${book.availableStock}`
          }
        </p>
        
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
        >
        ${
          book.availableStock > 0
            ? `<button
                id="purchaseBtn"
                data-book-id="${id}"
                class="bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-bold py-3 px-8 rounded-full shadow-md transition-all duration-200 cursor-pointer"
              >
                Buy Now
              </button>`
            : ""
        }
         
          <button
            data-navigate="/"
            class="text-yellow-600 hover:underline text-sm cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
     </div>
    `;
  } catch (error) {
    content = `
      <div class="p-6 text-center text-red-500">
        <p>Failed to load book details. Please try again later.</p>
        <button data-navigate="/" class="text-blue-500 hover:underline mt-4">
          ← Back to Home
        </button>
      </div>
    `;
  }

  return content;
}

export function setupPurchaseButton() {
  const purchaseBtn = document.getElementById("purchaseBtn");
  if (!purchaseBtn || !(purchaseBtn instanceof HTMLButtonElement)) return;

  purchaseBtn.addEventListener("click", async () => {
    try {
      purchaseBtn.disabled = true;
      purchaseBtn.textContent = "Processing...";

      const bookId = purchaseBtn.dataset.bookId;
      if (!bookId) throw new Error("No book ID found");

      const result = await purchaseBook(Number(bookId));

      purchaseBtn.textContent = "Purchased!";
      purchaseBtn.classList.remove("cursor-pointer");
      purchaseBtn.classList.add("cursor-no-drop");
      updateBookCard(result.book, result.message, purchaseBtn);
    } catch (error) {
      console.error("Purchase error:", error);
      purchaseBtn.textContent = "Buy Now";
      purchaseBtn.disabled = false;

      alert(
        error instanceof Error
          ? error.message
          : "Purchase failed. Please try again."
      );
    }
  });
}

function updateBookCard(
  book: Book,
  message: string,
  purchaseBtn: HTMLButtonElement
) {
  if (book.availableStock === 0) {
    purchaseBtn.classList.remove("cursor-pointer");
    purchaseBtn.classList.add("cursor-no-drop");
  }
  purchaseBtn.textContent = "Purchased!";

  const successMessage = document.getElementById("purchaseSuccessMessage");
  if (successMessage) {
    successMessage.classList.remove("hidden");
    successMessage.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <div class="flex items-center">
                <span>Congratulations! ${message}</span>
              </div>
            </div>
          `;
  }

  const stockElement = document.querySelector(
    `[data-book-id="${book.id}"] .stock-display`
  );
  if (!stockElement) return;

  stockElement.className = `${
    book.availableStock === 0
      ? "text-red-600 font-semibold"
      : "text-green-600 font-semibold"
  } stock-display`;

  stockElement.textContent =
    book.availableStock === 0
      ? "Out of Stock"
      : `In Stock: ${book.availableStock}`;
}
