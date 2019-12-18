import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  list$: Observable<string[]>;
  constructor(private service: DataService) { }

  ngOnInit() {
    // this.service.getShoppingList().pipe(
    //   tap(s => console.log(`You need to buy ${s}`))
    // ).subscribe();
    this.list$ = this.service.getShoppingList();
  }

}
