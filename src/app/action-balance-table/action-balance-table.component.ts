import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'kode-action-balance-table',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './action-balance-table.component.html',
  styleUrl: './action-balance-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBalanceTableComponent {}
