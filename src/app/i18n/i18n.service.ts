import { Injectable } from '@angular/core';
import i18next from 'i18next';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  currentLang = i18next.language || 'en';

  private readonly langSubject = new BehaviorSubject<string>(i18next.language || 'en');
  lang$ = this.langSubject.asObservable();

  constructor() {
    i18next.on('languageChanged', (lng) => {
      this.langSubject.next(lng);
    });
  }

  t(key: string, options?: any) {
    return i18next.t(key, options);
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    return i18next.changeLanguage(lang);
  }
}
