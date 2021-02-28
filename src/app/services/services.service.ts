import { Injectable } from '@angular/core';
import  {urlapi} from '../../environments/environment';
import  {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor( public http: HttpClient) { }

  BestHistorys(): Observable<any> {
    return this.http.get(urlapi + 'beststories.json?print=pritty').pipe( map ( data => data));
  }

  InfoHistory(id): Observable<any> {
    return this.http.get(urlapi + 'item/' + id + '.json?print=pretty').pipe( map ( data => data));
  }

  InfoComents(id): Observable<any> {
    return this.http.get(urlapi + 'item/' + id + '.json?print=pretty').pipe(map (data => data));
  }



}
