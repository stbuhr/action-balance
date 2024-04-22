import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ActionBalanceTooltipComponent } from '../action-balance-tooltip/action-balance-tooltip.component';

export type Meaning = 'personal' | 'activity' | 'methodical' | 'social';
export type BalanceType = 'ideal' | 'expectation' | 'execution' | 'result';

export interface BalanceColumn {
  meaning: Meaning;
  ideal: number;
  expectation: number;
  execution: number;
  result: number;
}

interface BalanceLine {
  meaning: string;
  line: string;
  strength: string;
  difference: number;
  first: string;
  second: string;
}

@Component({
  selector: 'kode-action-balance-table',
  standalone: true,
  templateUrl: './action-balance-table.component.html',
  styleUrl: './action-balance-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslocoModule, ActionBalanceTooltipComponent],
})
export class ActionBalanceTableComponent {
  values = input<BalanceColumn[]>([]);

  isValueHigh(value: number): boolean {
    return value >= 10;
  }
  isValueMedium(value: number): boolean {
    return value >= 6 && value < 10;
  }

  lines = computed<BalanceLine[]>(() => {
    const lines: BalanceLine[] = [];

    for (const col of this.values()) {
      lines.push({
        meaning: col.meaning,
        line: 'hi-he',
        strength: this.calcDifference(col.ideal, col.expectation),
        difference: Math.abs(col.ideal - col.expectation),
        first: 'ideal',
        second: 'expectation',
      });
      lines.push({
        meaning: col.meaning,
        line: 'hi-hv',
        strength: this.calcDifference(col.ideal, col.execution),
        difference: Math.abs(col.ideal - col.execution),
        first: 'ideal',
        second: 'execution',
      });
      lines.push({
        meaning: col.meaning,
        line: 'hi-hr',
        strength: this.calcDifference(col.ideal, col.result),
        difference: Math.abs(col.ideal - col.result),
        first: 'ideal',
        second: 'result',
      });
      lines.push({
        meaning: col.meaning,
        line: 'he-hv',
        strength: this.calcDifference(col.expectation, col.execution),
        difference: Math.abs(col.expectation - col.execution),
        first: 'expectation',
        second: 'execution',
      });
      lines.push({
        meaning: col.meaning,
        line: 'he-hr',
        strength: this.calcDifference(col.expectation, col.result),
        difference: Math.abs(col.expectation - col.result),
        first: 'expectation',
        second: 'result',
      });
      lines.push({
        meaning: col.meaning,
        line: 'hv-hr',
        strength: this.calcDifference(col.execution, col.result),
        difference: Math.abs(col.execution - col.result),
        first: 'execution',
        second: 'result',
      });
    }

    return lines.filter((line) => line.strength !== 'none');
  });

  calcDifference(first: number, second: number): string {
    if (Math.abs(first - second) > 3) {
      return 'high';
    }
    if (Math.abs(first - second) == 3) {
      return 'low';
    }
    return 'none';
  }
}
