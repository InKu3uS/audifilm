import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { I18nService } from './i18n.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false,
})
export class I18nPipe implements PipeTransform, OnDestroy {
  private readonly sub: Subscription;
  private lastKey: string | null = null;
  private lastParams: any = null;
  //Allow anything because i18next can return objects/arrays
  private translated: string | object | null = null;

  constructor(private readonly i18n: I18nService, private readonly cdr: ChangeDetectorRef) {
    //Subscribe to language changes to invalidate cache
    this.sub = this.i18n.lang$.subscribe(() => {
      this.translated = null;
      this.cdr.markForCheck();
    });
  }

  //Translate a given key using I18nService
  transform(key: string, params?: any): string {
    //Simple cache: return cached translation if key and params did not change
    if (
      this.translated !== null &&
      key === this.lastKey &&
      JSON.stringify(this.lastParams) === JSON.stringify(params)
    ) {
      return this.toString(this.translated);
    }

    this.lastKey = key;
    this.lastParams = params;
    //I18next can return string|object|...
    const res = this.i18n.t(key, params) as unknown;
    this.translated = res as any;
    return this.toString(res);
  }

  //Converts any value returned by i18next into a string
  private toString(value: unknown): string {
    //Empty string if value is null
    if (value == null) return '';
    if (typeof value === 'string') return value;

    // Convert array elements to strings and join with commas; fallback to JSON.stringify on error
    if (Array.isArray(value)) {
      try {
        return value.map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join(', ');
      } catch {
        return JSON.stringify(value);
      }
    }
    // Try to stringify the object; fallback to String() if it fails
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  //Cancel subscription
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
