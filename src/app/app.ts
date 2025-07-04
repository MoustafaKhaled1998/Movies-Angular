import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from "./components/navbar/navbar";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrls:['./app.scss']
})
export class App {

}
