import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionBalanceTableComponent } from './action-balance-table/action-balance-table.component';

@Component({
  selector: 'kode-root',
  standalone: true,
  imports: [RouterOutlet, ActionBalanceTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'action-balance';
}
