import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookEntity } from 'src/app/reducers/books.reducer';
import { Appstate, selectBooksArray } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { loadBookData } from 'src/app/actions/books.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books$: Observable<BookEntity[]>;
  constructor(private store: Store<Appstate>) { }

  ngOnInit() {
    this.books$ = this.store.select(selectBooksArray);
  }

  load() {
    this.store.dispatch(loadBookData());
  }

}
