import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppService } from './services/app.service';
import { ThemeService } from './services/theme.service';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule,
    HeaderComponent, LoaderComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expense-tracker';
  constructor(public appService: AppService, public themeService: ThemeService) { }
}
