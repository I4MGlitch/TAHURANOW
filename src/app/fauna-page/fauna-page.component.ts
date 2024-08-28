  import { Component, NgZone } from '@angular/core';
  import { FaunaService } from '../services/fauna.service';

  @Component({
    selector: 'app-fauna-page',
    templateUrl: './fauna-page.component.html',
    styleUrls: ['./fauna-page.component.css']
  })
  export class FaunaPageComponent {
    public faunas: any [] = [];
    searchTerm: string = '';
    public loading: boolean = true;

    constructor(private fauna: FaunaService, private ngZone: NgZone) {

    }

    ngOnInit(): void {
      this.ngZone.runOutsideAngular(() => {
        this.getAllFauna();
      })
    }

    filteredFaunas() {
      if (!this.searchTerm) {
        return this.faunas;
      }
      return this.faunas.filter(fauna =>
        fauna.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fauna.nameIlmiah.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    getAllFauna() {
      this.fauna.getAllFauna().subscribe(
        (faunas: any[]) => {
          this.ngZone.run(() => {
            this.faunas = faunas;
            this.loading = false;
          })
        }, 

        error => {
          console.error('Error fetching Faunas: ', error)
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

    handleImageError(event: any, product: any) {
      console.error('Image loading error', product, event);
      product.errorImage = true;
    }
  }
