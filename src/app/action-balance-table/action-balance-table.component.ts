import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

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
}

@Component({
  selector: 'kode-action-balance-table',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './action-balance-table.component.html',
  styleUrl: './action-balance-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      });
      lines.push({
        meaning: col.meaning,
        line: 'hi-hv',
        strength: this.calcDifference(col.ideal, col.execution),
      });
      lines.push({
        meaning: col.meaning,
        line: 'hi-hr',
        strength: this.calcDifference(col.ideal, col.result),
      });
      lines.push({
        meaning: col.meaning,
        line: 'he-hv',
        strength: this.calcDifference(col.expectation, col.execution),
      });
      lines.push({
        meaning: col.meaning,
        line: 'he-hr',
        strength: this.calcDifference(col.expectation, col.result),
      });
      lines.push({
        meaning: col.meaning,
        line: 'hv-hr',
        strength: this.calcDifference(col.execution, col.result),
      });
    }

    return lines
      .filter((line) => line.strength !== 'none')
      .filter((line) => !this.isHighLineWithMeaning(lines, line));
  });

  personalSum = computed<number>(() => {
    return this.calcSum('personal');
  });

  activitySum = computed<number>(() => {
    return this.calcSum('activity');
  });

  methodicalSum = computed<number>(() => {
    return this.calcSum('methodical');
  });

  socialSum = computed<number>(() => {
    return this.calcSum('social');
  });

  calcSum(meaning: Meaning): number {
    return this.values()
      .filter((v) => v.meaning == meaning)
      .reduce((acc, val) => acc + this.calcSumOfColumn(val), 0);
  }

  calcSumOfColumn(column: BalanceColumn): number {
    return column.ideal + column.expectation + column.execution + column.result;
  }

  calcDifference(first: number, second: number): string {
    if (Math.abs(first - second) > 3) {
      return 'high';
    }
    if (Math.abs(first - second) == 3) {
      return 'low';
    }
    return 'none';
  }

  isHighLineWithMeaning(lines: BalanceLine[], line: BalanceLine): boolean {
    if (line.strength == 'high') {
      return false;
    }
    return lines.some(
      (l) => l.meaning === line.meaning && l.strength === 'high',
    );
  }
}
