import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../models/product.model';

/** Хост-элемент несёт класс .product-item, чтобы CSS-раскладка (width:48% и т.д.) применялась к flex-элементу. */
@Component({
  selector: 'app-product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'product-item' },
  template: `
    <img [src]="product().image" [alt]="product().title" class="product-image" />
    <div class="product-details">
      <h4>{{ product().title }}</h4>
      @if (product().description) {
        <p>{{ product().description }}</p>
      }
      <p>{{ product().volume }}</p>
    </div>
    <p class="product-price">{{ product().price }}</p>
  `,
})
export class ProductItemComponent {
  readonly product = input.required<Product>();
}
