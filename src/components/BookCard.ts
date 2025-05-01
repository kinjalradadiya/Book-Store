export function createBookCard(book: any, index: number) {
  const card = document.createElement("div");
  card.className = "w-full p-6 border border-gray-400 rounded-sm shadow-md";

  const bgColors = [
    "bg-yellow-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-green-100",
    "bg-blue-100",
  ];
  const bgColor = bgColors[index % bgColors.length];
  card.innerHTML = `
    <div class="relative w-full h-60">
      <div class="absolute inset-0 bg-gray-300 rounded-lg shadow-lg"></div>

      <div class="absolute inset-0 ${bgColor} rounded-lg shadow-xl origin-left transform hover:skew-y-[8deg] hover:-rotate-y-24 transition-all duration-500">
        <div class="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 class="text-2xl font-bold mb-2">${book.title}</h2>
            <p class="text-gray-600">by ${book.author}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5 flex flex-col gap-3">
      <p class="text-2xl text-yellow-600 font-semibold">$${book.price.toFixed(
        2
      )}</p>
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
      <a
        href="javascript:void(0)"
        data-id="${book.id}"
        class="view-details font-bold inline-block text-center px-4 py-2 text-sm text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-600 hover:text-white transition duration-200"
      >
        View Details
      </a>
    </div>
  `;

  return card;
}
