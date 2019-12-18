import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { BookEffects } from './book.effects';
import { TestBed } from '@angular/core/testing';
import { BooksComponent } from '../components/books/books.component';
import { BooksDataService } from '../services/books-data.service';
import { Action } from 'rxjs/internal/scheduler/Action';

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

class FakeBooksDataService extends BooksDataService {
  getAllBooks() {
    return of([{ id: '1', title: 'a', author: 'b' }]);
  }
}

class FakeBooksDataServiceIsTheBomb extends BooksDataService {
  getAllBooks() {
    return of([{ id: '1', title: 'a', author: 'b' }]);
  }
}
