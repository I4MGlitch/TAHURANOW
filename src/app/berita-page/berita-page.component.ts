import { Component, NgZone } from '@angular/core';
import { BeritaService } from '../services/berita.service';
declare var Swiper: any;

@Component({
  selector: 'app-berita-page',
  templateUrl: './berita-page.component.html',
  styleUrls: ['./berita-page.component.css']
})
export class BeritaPageComponent {
  public beritas: any[] = [];
  public beritasPopuler: any[] = [];
  public beritasTerkini: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 2; // Adjusted to 2 for each section
  public loading: boolean = true;

  constructor(
    private beritaService: BeritaService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.getAllBerita();
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Initialize swiper1
      const swiper1 = new Swiper('.container1', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination1',
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          968: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1330: {
            slidesPerView: 3,
            spaceBetween: 30,
          }
        }
      });

      // Initialize swiper2
      const swiper2 = new Swiper('.container2', {
        grabCursor: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          968: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1330: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        }
      });

      // Initialize swiper3
      const swiper3 = new Swiper('.container3', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination3',
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1330: {
            slidesPerView: 2,
            spaceBetween: 30,
          }
        }
      });

      // Initialize imgSwiper
      const imgSwiper = new Swiper(".img-Swiper", {
        effect: "cards",
        grabCursor: true,
      });

      // Initialize swiperThumbs
      const swiperThumbs = new Swiper(".mySwiperThumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });

      // Initialize detailswiper
      const detailswiper = new Swiper(".detailSwiper", {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: swiperThumbs,
        },
      });
    });
  }

  getAllBerita() {
    this.beritaService.getAllBerita().subscribe(
      (beritas: any[]) => {
        this.ngZone.run(() => {
          this.beritas = beritas;
          this.loading = false;
          this.populateBeritas();
        });
      },
      error => {
        console.error('Error fetching Beritas:', error);
        this.loading = false;
      }
    );
  }

  getErrorImageUrl(): string {
    return '../../assets/Images/logoTahura.png';
  }

  getImageUrl(imageData: any): string {
    if (imageData && imageData.data) {
      const blob = new Blob([new Uint8Array(imageData.data)], { type: imageData.contentType });
      return URL.createObjectURL(blob);
    }
    return this.getErrorImageUrl();
  }

  handleImageError(event: any, berita: any) {
    console.error('Image loading error for berita:', berita, event);
    berita.errorImage = true;
  }

  get totalPages(): number {
    return Math.ceil(this.beritas.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.populateBeritas();
  }

  shouldShowBerita(index: number): boolean {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage - 1;
    return index >= startIndex && index <= endIndex && index < this.beritas.length;
  }

  populateBeritas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;


    this.beritasPopuler = this.beritas.slice(startIndex, startIndex + this.itemsPerPage);

    const terkiniStartIndex = Math.max(this.beritas.length - (this.currentPage * this.itemsPerPage), 0);

    this.beritasTerkini = this.beritas.slice(terkiniStartIndex, terkiniStartIndex + this.itemsPerPage);
  }
}
