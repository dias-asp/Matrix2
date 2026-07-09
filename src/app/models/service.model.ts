/** Одна услуга в прайсе. */
export interface Service {
  name: string;
  /** Уточнение в скобках, отображается более мелким шрифтом. */
  description?: string;
  /** Цена как в оригинале, например «от 8000». */
  price: string;
}

/** Категория услуг (СТРИЖКА / ЛЕЧЕНИЕ ВОЛОС / ОКРАШИВАНИЕ). */
export interface ServiceCategory {
  title: string;
  services: Service[];
}
