import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {
  loading: boolean;
  artista: any = {};
  topTracks: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService) {
    // recupero el id del artista
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {
  }
  getArtista(id: string) {
    this.spotifyService.getArtista(id)
      .subscribe(artista => {

        this.artista = artista;
      })
  }
  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id)
      .subscribe((topTracks: any[]) => {
        this.topTracks = topTracks;
        this.loading = false;
      });
  }

}
