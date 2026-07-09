import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CATEGORY_MENU, GAMMA_MENU, HAIR_TYPE_MENU, STYLING_MENU } from '../data/menu.data';

type SubKey = 'gamma' | 'category' | 'hairType' | 'styling';

/**
 * Гамбургер-меню и выпадающая панель. Порт initMenu / setupSubmenuToggle:
 * клик по «Продукция Matrix» открывает каталог, клик по стрелке — раскрывает
 * подменю; фильтры ведут на /catalog с query-параметрами.
 */
@Component({
  selector: 'app-header-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="menu-icon" [class.active]="menuOpen()" (click)="toggleMenu($event)">
      <div class="menu-icon-bar"></div>
      <div class="menu-icon-bar"></div>
      <div class="menu-icon-bar"></div>
    </div>

    <div class="menu-dropdown" [class.active]="menuOpen()">
      <ul>
        <li><a routerLink="/" (click)="closeMenu()">Главная</a></li>
        <li><a routerLink="/price" (click)="closeMenu()">Price</a></li>
        <li>
          <a href="#" class="has-submenu" (click)="onProductsClick($event)">Продукция Matrix</a>
          <ul class="submenu" [class.active]="productsOpen()">
            <li class="submenu-category">
              <a href="#" class="submenu-category-link has-submenu" (click)="toggleSub('gamma', $event)">Гамма</a>
              <ul class="submenu-items" [class.active]="openSub() === 'gamma'">
                @for (item of gammaMenu; track item.value) {
                  <li>
                    <a href="#" [routerLink]="['/catalog']" [queryParams]="{ gamma: item.value }" (click)="closeMenu()">{{ item.label }}</a>
                  </li>
                }
              </ul>
            </li>
            <li class="submenu-category">
              <a href="#" class="submenu-category-link has-submenu" (click)="toggleSub('category', $event)">Тип продукта</a>
              <ul class="submenu-items" [class.active]="openSub() === 'category'">
                @for (item of categoryMenu; track item.value) {
                  <li>
                    <a href="#" [routerLink]="['/catalog']" [queryParams]="{ category: item.value }" (click)="closeMenu()">{{ item.label }}</a>
                  </li>
                }
              </ul>
            </li>
            <li class="submenu-category">
              <a href="#" class="submenu-category-link has-submenu" (click)="toggleSub('hairType', $event)">Тип волос</a>
              <ul class="submenu-items" [class.active]="openSub() === 'hairType'">
                @for (item of hairTypeMenu; track item.value) {
                  <li>
                    <a href="#" [routerLink]="['/catalog']" [queryParams]="{ hairType: item.value }" (click)="closeMenu()">{{ item.label }}</a>
                  </li>
                }
              </ul>
            </li>
            <li class="submenu-category">
              <a href="#" class="submenu-category-link has-submenu" (click)="toggleSub('styling', $event)">Styling</a>
              <ul class="submenu-items" [class.active]="openSub() === 'styling'">
                @for (item of stylingMenu; track item.value) {
                  <li>
                    <a href="#" [routerLink]="['/catalog']" [queryParams]="{ gamma: item.value }" (click)="closeMenu()">{{ item.label }}</a>
                  </li>
                }
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <div class="whatsapp-text">
        Для записи и приобретения профессионального ухода Matrix обращаться в WhatsApp
      </div>

      <div class="social-icons">
        <a href="https://wa.me/77058881285" target="_blank">
          <img src="/images/whatsapp-icon.svg" alt="WhatsApp" class="whatsapp-menu-icon" />
        </a>
        <a
          href="https://www.instagram.com/tstafievskaya?igsh=eTR4eXVxZGp1Ymh0&utm_source=qr"
          class="social-icon instagram"
          target="_blank"
        >
          <img src="/images/instagram-icon.svg" alt="Instagram" />
        </a>
      </div>
    </div>
  `,
})
export class HeaderMenuComponent {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly gammaMenu = GAMMA_MENU;
  protected readonly categoryMenu = CATEGORY_MENU;
  protected readonly hairTypeMenu = HAIR_TYPE_MENU;
  protected readonly stylingMenu = STYLING_MENU;

  protected readonly menuOpen = signal(false);
  protected readonly productsOpen = signal(false);
  /** Какое из подменю категорий раскрыто (одно за раз, как в оригинале визуально). */
  protected readonly openSub = signal<SubKey | null>(null);

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen.update((v) => !v);
    if (!this.menuOpen()) this.closeSubmenus();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.closeSubmenus();
  }

  private closeSubmenus(): void {
    this.productsOpen.set(false);
    this.openSub.set(null);
  }

  /** Клик по «Продукция Matrix»: по стрелке (правые 30px) — раскрыть, иначе — перейти в каталог. */
  onProductsClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const isClickOnArrow = event.clientX > rect.right - 30;
    if (isClickOnArrow) {
      this.productsOpen.update((v) => !v);
    } else {
      this.router.navigate(['/catalog']);
      this.closeMenu();
    }
  }

  toggleSub(key: SubKey, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.openSub.update((cur) => (cur === key ? null : key));
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }
}
