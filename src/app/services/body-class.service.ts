import { DOCUMENT, Injectable, inject } from '@angular/core';

/**
 * Управляет классами на <body>, которые оригинальный сайт вешал при навигации
 * (main-page-active / products-page-active) — от них зависят размеры шрифта
 * и часть раскладки в глобальном styles.css.
 */
@Injectable({ providedIn: 'root' })
export class BodyClassService {
  private readonly document = inject(DOCUMENT);
  private readonly pageClasses = ['main-page-active', 'products-page-active'];

  /** Устанавливает ровно один page-класс на body, снимая остальные. */
  setPageClass(className: 'main-page-active' | 'products-page-active' | null): void {
    const body = this.document.body;
    this.pageClasses.forEach((c) => body.classList.remove(c));
    if (className) {
      body.classList.add(className);
    }
  }
}
