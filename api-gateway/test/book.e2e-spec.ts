import { HttpStatus, Logger } from '@nestjs/common';
import { BookDto } from '../src/book/dto/book.dto';
import * as request from 'supertest';
import { BookAssessmentsDto } from '../src/book/dto/bookAssessments.dto';
import { StarEnum } from '../src/book/enum/start.enum';
import { TokenDto } from 'src/auth/dto/token.dto';

const uri = `http://localhost:3000`;

const getToken = async () => {
  const responseAuth: request.Response = await request(uri)
    .post(`/auth/login`)
    .send({
      username: 'claudinei',
      password: '123456',
    });

  const response: TokenDto = responseAuth.body;

  return `Bearer ${response.access_token}`;
};

describe('BookController (e2e)', () => {
  describe('/book (POST)', () => {
    it('it should create a book', async () => {
      const responseBook: request.Response = await request(uri)
        .post(`/book`)
        .set({ Authorization: await getToken() })
        .send({
          name:
            'Book ' +
            Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, '')
              .substr(0, 5),
          abstract: 'abstract',
          author: 'author',
          year: '2022',
        });

      Logger.debug('responseBook: ' + JSON.stringify(responseBook.body));

      const { id, name, author, abstract, year }: BookDto = responseBook.body;

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
      const books: request.Response = await request(uri)
        .get('/book')
        .set({ Authorization: await getToken() });

      Logger.debug('books: ' + JSON.stringify(books.body));

      expect(Object.values(books).length > 0).toBeTruthy();
      expect(HttpStatus.OK);
    });
  });

  describe('/book/:ID (GET)', () => {
    it('it should return a book by id', async () => {
      const responseBooks: request.Response = await request(uri)
        .get('/book')
        .set({ Authorization: await getToken() });

      const { id, name, author, abstract }: BookDto = responseBooks.body[0];

      const responseBook: request.Response = await request(uri)
        .get(`/book/${id}`)
        .set({ Authorization: await getToken() });

      Logger.debug('responseBook: ' + JSON.stringify(responseBook.body));

      const book: BookDto = responseBook.body;

      expect(typeof book.id).toBe('number');
      expect(book.name).toEqual(name);
      expect(book.author).toEqual(author);
      expect(book.abstract).toEqual(abstract);
      expect(HttpStatus.OK);
    });
  });

  describe('/book/assessments (POST)', () => {
    it('it should create assessments', async () => {
      const responseBooks: request.Response = await request(uri)
        .get('/book')
        .set({ Authorization: await getToken() });

      const { id }: BookDto = responseBooks.body[0];

      const responseAssessments: request.Response = await request(uri)
        .post(`/book/assessments`)
        .set({ Authorization: await getToken() })
        .send({
          userId: '2',
          start: 'Two',
          comment: '',
          book: { id },
        });

      Logger.debug(
        'responseAssessments: ' + JSON.stringify(responseAssessments.body),
      );

      const { userId, start, comment, book }: BookAssessmentsDto =
        responseAssessments.body;

      expect(typeof userId).toBe('string');
      expect(start).toEqual(StarEnum.Two);
      expect(typeof comment).toBe('string');
      expect(typeof book.id).toBe('number');
      expect(HttpStatus.CREATED);
    });
  });
});
