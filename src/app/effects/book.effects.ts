import { Injectable } from '@angular/core';
import { BooksDataService } from '../services/books-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookActions from '../actions/books.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// Create an effect that turns a loadBooks => (loadBooksSucces | loadBooksFailure)
// Use our BooksDataService.
// Go. This is your final exam. While I go blow my nose.

// then I'll do it.

@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookData),
      switchMap(() => this.service.getAllBooks()
        .pipe(
          map(books => bookActions.booksLoadedSuccessfully({ payload: books })),
          catchError((err) => of(bookActions.booksLoadFailure({ message: 'FAIL!' })))
        )
      )
    )
  );

  constructor(private service: BooksDataService, private actions$: Actions) { }
}
