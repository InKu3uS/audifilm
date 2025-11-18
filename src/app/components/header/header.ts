import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink, I18nPipe],
  templateUrl: './header.html',
})
export class Header {
  currentLang = 'en';

  constructor(private i18n: I18nService) {
    this.currentLang = this.i18n.currentLang || 'en';
  }

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLang = lang;
    this.i18n.changeLanguage(lang);
  }
}
