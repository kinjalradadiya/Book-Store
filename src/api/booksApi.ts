export async function fetchBooks() {
  const response = await fetch("http://localhost:8000/books");
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
}

export async function fetchBookById(id: number) {
  const response = await fetch(`http://localhost:8000/books/${id}`);
  if (!response.ok) throw new Error("Failed to fetch book");
  return response.json();
}

export async function purchaseBook(id: number) {
  const response = await fetch(`http://localhost:8000/purchase/${id}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Purchase failed");
  return response.json();
}
