import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperBasicComponent } from './components/super-basic/super-basic.component';
import { DefaultsService } from './components/super-basic/defaults.service';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { DataService } from './components/shopping-list/data.service';
import { EnvironmentService } from './services/environment.service';
import { HttpClientModule } from '@angular/common/http';

const serviceToUse = new DefaultsService();
serviceToUse._default = 'PIZZA IS BEST!';

@NgModule({
  declarations: [
    AppComponent,
    SuperBasicComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: DefaultsService, useValue: serviceToUse },
    DataService,
    EnvironmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
