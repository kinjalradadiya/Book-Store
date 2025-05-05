import { Book, BooksApiResponse } from "../modal/Book";
import { api } from "./api";

// Fetches all books from the API
export async function fetchBooks(): Promise<BooksApiResponse> {
  return api.get<BooksApiResponse>("/");
}
// Fetches a single book by its ID
export async function fetchBookById(id: number): Promise<{ book: Book }> {
  return api.get<{ book: Book }>(`/${id}`);
}
// Purchases a book by its ID
export async function purchaseBook(
  id: number
): Promise<{ message: string; book: Book }> {
  return api.post<{ message: string; book: Book }>(`/${id}/purchase`, {
    id: id,
  });
}
