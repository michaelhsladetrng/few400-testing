import { provideMockActions } from '@ngrx/effects/testing';
import * as actions from '../actions/books.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { BookEffects } from './book.effects';
import { TestBed } from '@angular/core/testing';
import { BooksDataService } from '../services/books-data.service';
describe('book effects', () => {
  let actions$: Observable<Action>;
  let bookEffects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        BookEffects,
        { provide: BooksDataService, useClass: FakeBooksDataService }
      ]
    });
    bookEffects = TestBed.get(BookEffects);
  });

  it('turns loadBooks into loadBooksSuccessfully', () => {
    actions$ = of(actions.loadBookData());
    bookEffects.loadBooks$.subscribe(resultAction => {
      expect(resultAction).toEqual({
        type: actions.booksLoadedSuccessfully.type,
        payload: [{ id: '1', title: 'a', author: 'b' }]
      });
    });

  });
});

describe('book effects with error', () => {
  let actions$: Observable<Action>;
  let bookEffects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        BookEffects,
        { provide: BooksDataService, useClass: FakeBooksDataServiceIsTheBomb }
      ]
    });
    bookEffects = TestBed.get(BookEffects);
  });

  it('turns loadBooks into loadBooksSuccessfully', () => {
    actions$ = of(actions.loadBookData());
    bookEffects.loadBooks$.subscribe(resultAction => {
      expect(resultAction).toEqual({
        type: actions.booksLoadFailure.type,
        message: 'FAIL!'
      });
    });

  });
});

describe('mocking localstorage', () => {
  it('is easy to fake stuff in JavaScript', () => {
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      expect(key).toBe('by');
      expect(value).toBe('100');
    });

    localStorage.setItem('by', '100');


  });
});


class FakeBooksDataService {
  getAllBooks() {
    return of([{ id: '1', title: 'a', author: 'b' }]);
  }
}

class FakeBooksDataServiceIsTheBomb {
  getAllBooks() {
    return new Error('Blammo');
  }
}

