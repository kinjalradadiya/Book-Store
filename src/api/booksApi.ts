import { Book, BooksApiResponse } from "../modal/Book";
import { api } from "./api";

export async function fetchBooks(): Promise<BooksApiResponse> {
  return api.get<BooksApiResponse>("/");
}

export async function fetchBookById(id: number): Promise<{ book: Book }> {
  return api.get<{ book: Book }>(`/${id}`);
}

export async function purchaseBook(
  id: number
): Promise<{ message: string; book: Book }> {
  return api.post<{ message: string; book: Book }>(`/${id}/purchase`, {
    id: id,
  });
}
