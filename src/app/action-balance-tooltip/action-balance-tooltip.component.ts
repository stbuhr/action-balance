import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'kode-action-balance-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-balance-tooltip.component.html',
  styleUrl: './action-balance-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBalanceTooltipComponent {
  meaning = input<string>('');
  first = input<string>('');
  second = input<string>('');
  difference = input<number>(0);

  text = computed(() => {
    const template = this.translocoService.translate(
      'trs_action-balance.trk_tooltip',
    );
    const meaning = this.translocoService.translate(
      `trs_action-balance.trk_${this.meaning()}`,
    );
    const first = this.translocoService.translate(
      `trs_action-balance.trk_${this.first()}`,
    );
    const second = this.translocoService.translate(
      `trs_action-balance.trk_${this.second()}`,
    );

    return template
      .replace('[[meaning]]', meaning)
      .replace('[[first]]', first)
      .replace('[[second]]', second)
      .replace('[[difference]]', this.difference().toString());
  });

  constructor(private translocoService: TranslocoService) {}
}
