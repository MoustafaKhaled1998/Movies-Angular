import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , ButtonModule, MenubarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'movie-angular';
  items = [{label:"hello"}]
}
