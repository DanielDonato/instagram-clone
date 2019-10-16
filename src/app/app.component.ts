import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit(): void {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

}
