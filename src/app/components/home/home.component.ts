import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    spotify.getNewReleases()
      .subscribe((data: any) => {
        console.log(data);
        // this.nuevasCanciones = data.albums.items;
        this.loading = false;
        this.nuevasCanciones = data;
      }, ( err ) => {
        this.loading = false;
        this.error = true;
        console.log(err);
        this.mensajeError = err.error.error.message;

      });
  }

  ngOnInit(): void {
  }

}
