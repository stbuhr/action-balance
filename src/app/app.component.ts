import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ActionBalanceTableComponent,
  BalanceColumn,
} from './action-balance-table/action-balance-table.component';

@Component({
  selector: 'kode-root',
  standalone: true,
  imports: [RouterOutlet, ActionBalanceTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'action-balance';
  balance = signal<BalanceColumn[]>([
    { meaning: 'personal', ideal: 7, expectation: 6, execution: 5, result: 7 },
    { meaning: 'activity', ideal: 8, expectation: 6, execution: 7, result: 10 },
    {
      meaning: 'methodical',
      ideal: 9,
      expectation: 11,
      execution: 10,
      result: 8,
    },
    { meaning: 'social', ideal: 6, expectation: 7, execution: 8, result: 5 },
  ]);
}
