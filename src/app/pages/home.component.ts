import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselComponent } from '../components/carousel.component';
import { GALLERY_COLLECTIONS } from '../data/gallery.data';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CarouselComponent],
  template: `
    <div id="main-page" class="page active">
      @for (collection of collections; track $index) {
        <app-carousel [collection]="collection" />
      }
    </div>
  `,
})
export class HomeComponent {
  protected readonly collections = GALLERY_COLLECTIONS;
}
