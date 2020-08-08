import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string) {

    const url = `${environment.apiSpotify}/${query}`;

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQA4eVMdHdr2ZAT9QrF5-gSca6iRXCllJ9knYgHquRoRwOWThQrpePdKsRg8eTH9l2eQGbStaXdcg3GhrSI'
    // });

//    return this.http.get(url, { headers });
    return this.http.get(url);

  }
  getNewReleases() {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQAjC2Bcg4F-u9u56A_a8iu5rKunqF-RUL1JDkpot7awTazzppRFAvAyDe6ORC4RbMNU_LFUiZTYL4pgjzQ'
    // });

    // return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers});

    return this.getQuery('browse/new-releases?limit=20').pipe(
      map(data => data['albums'].items)
    );
  }
  getArtistas(termino: string) {
    if(termino.length === 0) {
      return of([]);
    }
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map(data => data['tracks']));
  }
}
