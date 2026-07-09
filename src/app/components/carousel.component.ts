import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GalleryCollection } from '../data/gallery.data';

/**
 * Карусель работ. Порт initCarousel из оригинального script.js:
 * стрелки, индикаторы, свайп на тач-устройствах.
 * Ширина трека — n*100%, слайда — 100/n%, сдвиг translateX на current*(100/n)%.
 */
@Component({
  selector: 'app-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [':host { display: block; }'],
  template: `
    <h3 class="carousel-title">{{ collection().title }}</h3>
    <div class="carousel-container">
      <div
        class="carousel-track"
        [style.width.%]="count() * 100"
        [style.transform]="'translateX(-' + current() * (100 / count()) + '%)'"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      >
        @for (slide of collection().slides; track slide.image) {
          <div class="carousel-slide" [style.width.%]="100 / count()">
            <img [src]="slide.image" [alt]="slide.alt" class="carousel-image" />
          </div>
        }
      </div>
      <div class="carousel-indicators">
        @for (slide of collection().slides; track slide.image; let i = $index) {
          <span
            class="carousel-indicator"
            [class.active]="current() === i"
            (click)="goTo(i)"
          ></span>
        }
      </div>
      <div class="carousel-arrow-left" (click)="prev()"></div>
      <div class="carousel-arrow" (click)="next()"></div>
    </div>
  `,
})
export class CarouselComponent {
  readonly collection = input.required<GalleryCollection>();

  protected readonly current = signal(0);
  protected readonly count = computed(() => this.collection().slides.length);

  private startX: number | null = null;
  private moveX: number | null = null;

  goTo(index: number): void {
    this.current.set(index);
  }

  next(): void {
    this.current.update((i) => (i + 1) % this.count());
  }

  prev(): void {
    this.current.update((i) => (i - 1 + this.count()) % this.count());
  }

  onTouchStart(e: TouchEvent): void {
    this.startX = e.touches[0].clientX;
  }

  onTouchMove(e: TouchEvent): void {
    if (this.startX === null) return;
    this.moveX = e.touches[0].clientX;
  }

  onTouchEnd(): void {
    if (this.startX === null || this.moveX === null) return;
    const diff = this.startX - this.moveX;
    if (diff > 50) this.next();
    else if (diff < -50) this.prev();
    this.startX = null;
    this.moveX = null;
  }
}
