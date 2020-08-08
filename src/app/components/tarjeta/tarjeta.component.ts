import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent implements OnInit {
  @Input() items: any[] = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  verArtista(item) {
    let artistId;
    if ( item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistId]);
  }
}
