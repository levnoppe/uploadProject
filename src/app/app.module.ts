import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, UploadBottomSheetComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    UploadBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    MatExpansionModule,
    AngularFireModule.initializeApp({
      apiKey: environment.firebaseAPIKey,
      authDomain: 'uploadproject-e53b0.firebaseapp.com',
      databaseURL: 'https://uploadproject-e53b0.firebaseio.com',
      storageBucket: 'gs://uploadproject-e53b0.appspot.com'
    }),
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
