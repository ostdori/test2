import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  ngOnInit() {
      firebase.initializeApp({
        apiKey: 'AIzaSyDuE3rpshbu8sAFizFEybHjH1Tm1JhsvJI',
        authDomain: 'recbook-2987f.firebaseapp.com'
      });

    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
