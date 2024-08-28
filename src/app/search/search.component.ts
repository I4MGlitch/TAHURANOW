import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloraService } from '../services/flora.service';
import { FaunaService } from '../services/fauna.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  public floras: any[] = [];
  public faunas: any[] = [];
  floraResults: any[] = [];
  faunaResults: any[] = [];
  loading: boolean = true;

  constructor(
    private floraService: FloraService,
    private faunaService: FaunaService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllFlora();
    this.getAllFauna();
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'];
      this.performSearch();
    });
  }

  getAllFlora() {
    this.floraService.getAllFlora().subscribe(
      (floras: any[]) => {
        this.ngZone.run(() => {
          this.floras = floras;
          console.log('Fetched Floras:', this.floras);
          this.performSearch();  // Call performSearch here to ensure search is performed after data fetch
          this.loading = false;
        });
      },
      error => {
        console.error('Error fetching Floras:', error);
        this.loading = false;
      }
    );
  }

  getAllFauna() {
    this.faunaService.getAllFauna().subscribe(
      (faunas: any[]) => {
        this.ngZone.run(() => {
          this.faunas = faunas;
          console.log('Fetched Faunas:', this.faunas);
          this.performSearch();  // Call performSearch here to ensure search is performed after data fetch
          this.loading = false;
        });
      },
      error => {
        console.error('Error fetching Faunas:', error);
        this.loading = false;
      }
    );
  }

  searchFlora(query: string) {
    return this.floras.filter(flora =>
      flora.name.toLowerCase().includes(query.toLowerCase()) ||
      flora.nameIlmiah.toLowerCase().includes(query.toLowerCase())
    );
  }  

  searchFauna(query: string) {
    return this.faunas.filter(fauna =>
      fauna.name.toLowerCase().includes(query.toLowerCase()) ||
      fauna.nameIlmiah.toLowerCase().includes(query.toLowerCase())
    );
  }

  performSearch() {
    this.loading = true;
    this.floraResults = this.searchFlora(this.searchTerm);
    this.faunaResults = this.searchFauna(this.searchTerm);
    console.log('Flora Results:', this.floraResults);
    console.log('Fauna Results:', this.faunaResults);
    this.loading = false;
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
