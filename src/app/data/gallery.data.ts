/** Слайд карусели на главной странице. */
export interface GallerySlide {
  image: string;
  alt: string;
}

/** Коллекция работ (одна карусель с заголовком). */
export interface GalleryCollection {
  title: string;
  slides: GallerySlide[];
}

export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    title: 'Super Sync Collection 2024',
    slides: [
      { image: '/works/supersync/supersync1.jpg', alt: 'Super Sync 1' },
      { image: '/works/supersync/supersync2.jpg', alt: 'Super Sync 2' },
      { image: '/works/supersync/supersync3.jpg', alt: 'Super Sync 3' },
      { image: '/works/supersync/supersync4.jpg', alt: 'Super Sync 4' },
      { image: '/works/supersync/supersync5.JPG', alt: 'Super Sync 5' },
      { image: '/works/supersync/supersync6.JPG', alt: 'Super Sync 6' },
    ],
  },
  {
    title: 'Tonal Control Collection 2024',
    slides: [
      { image: '/works/whitehair/whitehair1.jpg', alt: 'White Hair 1' },
      { image: '/works/whitehair/whitehair2.JPG', alt: 'White Hair 2' },
      { image: '/works/whitehair/whitehair3.jpg', alt: 'White Hair 3' },
    ],
  },
  {
    title: 'Matrix Ambassadors Contest',
    slides: [
      { image: '/works/redhair/redhair1.JPG', alt: 'Red Hair 1' },
      { image: '/works/redhair/redhair2.JPG', alt: 'Red Hair 2' },
      { image: '/works/redhair/redhair3.JPG', alt: 'Red Hair 3' },
      { image: '/works/redhair/redhair4.JPG', alt: 'Red Hair 4' },
      { image: '/works/redhair/redhair5.JPG', alt: 'Red Hair 5' },
      { image: '/works/redhair/redhair6.JPG', alt: 'Red Hair 6' },
    ],
  },
  {
    title: 'Matrix Color Awards 2020',
    slides: [
      { image: '/works/pinkhair/pinkhair1.jpg', alt: 'Pink Hair 1' },
      { image: '/works/pinkhair/pinkhair2.jpg', alt: 'Pink Hair 2' },
      { image: '/works/pinkhair/pinkhair3.jpg', alt: 'Pink Hair 3' },
      { image: '/works/pinkhair/pinkhair5.jpg', alt: 'Pink Hair 5' },
      { image: '/works/pinkhair/pinkhair6.jpg', alt: 'Pink Hair 6' },
    ],
  },
  {
    title: 'Matrix Color Awards 2019',
    slides: [
      { image: '/works/rainbowhair/rainbowhair1.jpg', alt: 'Rainbow Hair 1' },
      { image: '/works/rainbowhair/rainbowhair2.jpg', alt: 'Rainbow Hair 2' },
      { image: '/works/rainbowhair/rainbowhair3.jpg', alt: 'Rainbow Hair 3' },
      { image: '/works/rainbowhair/rainbowhair4.jpg', alt: 'Rainbow Hair 4' },
    ],
  },
  {
    title: 'Matrix Color Awards 2019',
    slides: [
      { image: '/works/nudehair/nudehair1.jpg', alt: 'Nude Hair 1' },
      { image: '/works/nudehair/nudehair2.jpg', alt: 'Nude Hair 2' },
    ],
  },
];
