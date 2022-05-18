import { HttpStatus, Logger } from '@nestjs/common';
import { Book } from '../src/book/interfaces/book.interface';
import * as request from 'supertest';
import { BookAssessments } from '../src/book/interfaces/bookAssessments.interface';
import { StarEnum } from '../src/book/enum/start.enum';

describe('BookController (e2e)', () => {
  const uri = `http://localhost:3000`;

  describe('/book (POST)', () => {
    it('it should return a book by id', async () => {
      const responseBook: request.Response = await request(uri).post(`/book`)
      .send(
        {
          "name": "Book " + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
          "abstract": "abstract",
          "author": "author",
          "year": "2022"
      }
      );

      const { id, name, author, abstract, year }: Book = responseBook.body;

      expect(typeof id).toBe('number');
      expect(typeof name).toBe('string');
      expect(typeof author).toBe('string');
      expect(typeof abstract).toBe('string');
      expect(typeof year).toBe('string');
      expect(HttpStatus.CREATED);
    });
  });

  describe('/books (GET)', () => {
    it('it should return a list of books', async () => {
      const books: request.Response = await request(uri).get('/book');

      expect(Object.values(books).length > 0).toBeTruthy();
      expect(HttpStatus.OK);
    });
  });

  describe('/book/:ID (GET)', () => {
    it('it should return a book by id', async () => {
      const responseBooks: request.Response = await request(uri).get('/book');
      const { id, name, author, abstract }: Book = responseBooks.body[0];

      const responseBook: request.Response = await (await request(uri).get(`/book/${id}`));
      const book: Book = responseBook.body;

      expect(typeof book.id).toBe('number');
      expect(book.name).toEqual(name);
      expect(book.author).toEqual(author);
      expect(book.abstract).toEqual(abstract);
      expect(HttpStatus.OK);
    });
  });

  describe('/book/assessments (POST)', () => {
    it('it should return a book by id', async () => {
      const responseBooks: request.Response = await request(uri).get('/book');
      const { id }: Book = responseBooks.body[0];
      Logger.debug(id);

      const responseAssessments: request.Response = await request(uri).post(`/book/assessments`)
      .send(
        {
          "userId": "2",
          "start": "Two",
          "comment": "",
          "book": id
        }
      );

      const { userId, start, comment, book }: BookAssessments = responseAssessments.body;

      expect(typeof userId).toBe('string');
      expect(start).toEqual(StarEnum.Two);
      expect(typeof comment).toBe('string');
      expect(typeof book).toBe('number');
      expect(HttpStatus.CREATED);
    });
  });
});