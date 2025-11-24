import { Component, signal } from '@angular/core';

/**
 * @description Main application component that serves as the root of the application.
 * Provides the main layout structure with navigation and router outlet.
 * @class App
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false,
})
export class App {
  /** @description Application title displayed in the header */
  protected readonly title = signal('mystore');

  /**
   * @description Creates an instance of App component.
   * @constructor
   */
  constructor() {
    console.log('App component initialized');
  }
}
