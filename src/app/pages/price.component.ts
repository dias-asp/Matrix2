import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERVICE_CATEGORIES } from '../data/services.data';

@Component({
  selector: 'app-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="services-page" class="page active">
      <div id="services-catalog" class="services-catalog active">
        @for (category of categories; track category.title) {
          <div class="service-category">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="service-list">
              @for (service of category.services; track $index) {
                <div class="service-row">
                  <span class="service-name"
                    >{{ service.name }}
                    @if (service.description) {
                      <span class="service-description-inline">{{ service.description }}</span>
                    }</span
                  >
                  <span class="service-dots"></span>
                  <span class="service-price">{{ service.price }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class PriceComponent {
  protected readonly categories = SERVICE_CATEGORIES;
}
