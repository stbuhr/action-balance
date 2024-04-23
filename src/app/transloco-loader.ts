import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private location = inject(PlatformLocation);

  getTranslation(lang: string) {
    const baseHref = this.location.getBaseHrefFromDOM();
    console.log('baseHref', baseHref);
    return this.http.get<Translation>(`${baseHref}assets/i18n/${lang}.json`);
  }
}
