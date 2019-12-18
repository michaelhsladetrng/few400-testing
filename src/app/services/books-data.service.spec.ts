import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BooksDataService, ResponseFromServer, BookListItem } from './books-data.service';
import { EnvironmentService } from './environment.service';

describe('books data service', () => {
  let client: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BooksDataService;

  beforeEach(() => {

    const fakeEnvironment: any = {
      apiUrl: 'http://minecraft.com'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BooksDataService,
        { provide: EnvironmentService, useValue: fakeEnvironment }
      ]
    });

    client = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(BooksDataService);
  });

  it('gets and transforms the data', (done) => {
    const testData: ResponseFromServer = {
      books: [
        { id: '1', title: 'Walden', author: 'Thoreau', yearPublished: 1853 },
        { id: '2', title: 'Nature', author: 'Emerson', yearPublished: 1837 }
      ]
    };

    const expectedResponse: BookListItem[] = [
      { id: '1', title: 'Walden', author: 'Thoreau' },
      { id: '2', title: 'Nature', author: 'Emerson' }
    ];

    service.getAllBooks().subscribe(books => {
      expect(books).toEqual(expectedResponse);
      done();
    });

    const req = httpTestingController.expectOne('http://minecraft.com/books');
    expect(req.request.method).toBe('GET');
    req.flush(testData);

  });
  it('failure result', () => {
    service.getAllBooks().subscribe(
      (data) => fail('You should not be getting this.'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(401);
      }
    );

    const req = httpTestingController.expectOne('http://minecraft.com/books');

    const fakeError = new ErrorEvent('Network Error');

    req.error(fakeError, { status: 401 });

  });
});
