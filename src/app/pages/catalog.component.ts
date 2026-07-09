import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductLineComponent } from '../components/product-line.component';
import { computeCatalogView } from '../data/catalog-filter';
import { Gamma, HairType, ProductCategory } from '../models/product.model';

/**
 * Каталог продукции. Активный фильтр берётся из query-параметров
 * (?gamma= / ?category= / ?hairType=) и определяет режим отображения:
 * аккордеон линеек или плоская сетка товаров.
 */
@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductLineComponent],
  template: `
    <div id="products-page" class="page active">
      <div id="products-catalog" class="products-catalog active">
        @if (view().mode === 'accordion') {
          @for (line of view().lines; track line.gamma) {
            <app-product-line [line]="line" [initiallyExpanded]="view().expanded" />
          }
        } @else {
          @for (group of view().groups; track group.line.gamma) {
            <app-product-line
              [line]="group.line"
              [products]="group.products"
              [showHeader]="false"
              [initiallyExpanded]="true"
            />
          }
        }
      </div>
    </div>
  `,
})
export class CatalogComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly view = computed(() => {
    const qp = this.params();
    return computeCatalogView({
      gamma: (qp.get('gamma') as Gamma | null) ?? null,
      category: (qp.get('category') as ProductCategory | null) ?? null,
      hairType: (qp.get('hairType') as HairType | null) ?? null,
    });
  });
}
