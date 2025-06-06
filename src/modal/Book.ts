export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  price: number;
  availableStock: number;
}
export interface BooksApiResponse {
  books: Book[];
}
