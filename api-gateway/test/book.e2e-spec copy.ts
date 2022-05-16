// import { Test, TestingModule } from '@nestjs/testing';
// // import { INestApplication } from '@nestjs/common';
// // import { Transport, ClientProxy } from '@nestjs/microservices';
// import { Observable } from 'rxjs';
// import { BookService } from 'src/book/book.service';

// describe('Book Tests (e2e)', () => {
//   // let app: INestApplication;
//   // let client: ClientProxy;
//   const service = BookService;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();

//     app.connectMicroservice({
//       transport: Transport.KAFKA,
//       options: {
//         client: {
//           clientId: 'book',
//           brokers: ['172.17.0.1:9092'],
//         },
//         consumer: {
//           groupId: 'book-consumer',
//           allowAutoTopicCreation: true,
//         },
//       },
//     });

//     await app.startAllMicroservicesAsync();

//     await app.init();

//     client = app.get('create-book');
//     await client.connect();
//   });

//   it('Create', done => {
//     jest.setTimeout(100000);

//     const response: Observable<any> = service.


//     // const response: Observable<any> = client.send(
//     //   { cmd: 'create-book' },
//     //   {
//     //     name: "Book 1",
//     //     abstract: "abstract",
//     //     author: "author",
//     //     year: "2022"
//     //   },
//     // );

//     // response.subscribe(json => {

//     //   done();
//     // });
//   });
// });
