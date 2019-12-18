import { Injectable } from '@angular/core';
import { BooksDataService } from '../services/books-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookActions from '../actions/books.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
