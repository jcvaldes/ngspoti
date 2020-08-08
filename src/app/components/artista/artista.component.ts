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

    this.activatedRoute.params.subscribe(params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {
  }
  getArtista(id: string) {
    this.loading = true;
    this.spotifyService.getArtista(id)
      .subscribe(artista => {
        this.loading = false;
        this.artista = artista;
      })
  }
  getTopTracks(id: string) {
    this.spotifyService.getTopTracks(id)
      .subscribe((topTracks: any[]) => {
        debugger
        this.topTracks = topTracks;
      });
  }

}
