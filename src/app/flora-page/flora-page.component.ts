import { Component, NgZone } from '@angular/core';
import { FloraService } from '../services/flora.service';

@Component({
  selector: 'app-flora-page',
  templateUrl: './flora-page.component.html',
  styleUrls: ['./flora-page.component.css']
})
export class FloraPageComponent {
  public floras: any[] = [];
  searchTerm: string = '';
  public loading: boolean = true;

  constructor(
    private flora: FloraService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.getAllFlora();
    });
  }

  filteredFloras() {
    if (!this.searchTerm) {
      return this.floras;
    }
    return this.floras.filter(flora =>
      flora.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      flora.nameIlmiah.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAllFlora() {
    this.flora.getAllFlora().subscribe(
      (floras: any[]) => {
        this.ngZone.run(() => {
          this.floras = floras;
          this.loading = false;
        });
      },
      error => {
        console.error('Error fetching Floras:', error);
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
