import { fetchBookById } from "../api/booksApi";
import { Loading } from "../components/Loading";

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
    <div class="flex flex-col justify-center items-center min-h-screen">
   
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
        <p class="text-gray-700 leading-relaxed">
          ${book.description || "No description available."}
        </p>
        <p class="${
          book.availableStock <= 0
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold"
        }">
          ${
            book.availableStock <= 0
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

      await purchaseBook(Number(bookId));

      const successMessage = document.getElementById("purchaseSuccessMessage");
      if (successMessage) {
        successMessage.classList.remove("hidden");
        successMessage.innerHTML = `
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <div class="flex items-center">
                <span>Congratulations! You've successfully purchased this book!</span>
              </div>
            </div>
          `;
      }
      purchaseBtn.classList.add("hidden");
    } catch (error) {
      // Handle errors
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

async function purchaseBook(id: number): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`http://localhost:8000/books/${id}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Purchase failed");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
