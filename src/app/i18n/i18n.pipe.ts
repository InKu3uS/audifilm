import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { I18nService } from './i18n.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false,
})
export class I18nPipe implements PipeTransform, OnDestroy {
  private sub: Subscription;
  private lastKey: string | null = null;
  private lastParams: any = null;
  // admitir cualquier cosa porque i18next puede devolver objetos/arrays
  private translated: string | object | null = null;

  constructor(private i18n: I18nService, private cdr: ChangeDetectorRef) {
    this.sub = this.i18n.lang$.subscribe(() => {
      this.translated = null;
      this.cdr.markForCheck();
    });
  }

  transform(key: string, params?: any): string {
    // cache simple
    if (
      this.translated !== null &&
      key === this.lastKey &&
      JSON.stringify(this.lastParams) === JSON.stringify(params)
    ) {
      return this.toString(this.translated);
    }

    this.lastKey = key;
    this.lastParams = params;
    const res = this.i18n.t(key, params) as unknown; // i18next puede devolver string|object|...
    this.translated = res as any;
    return this.toString(res);
  }

  private toString(value: unknown): string {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    // si es array, intentar join si son strings
    if (Array.isArray(value)) {
      try {
        return value.map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).join(', ');
      } catch {
        return JSON.stringify(value);
      }
    }
    // si es objeto, intentar acceder a propiedades comunes o serializar
    try {
      // si el objeto tiene una forma "legible" (por ejemplo, { count: "..." }) intentar stringify
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
