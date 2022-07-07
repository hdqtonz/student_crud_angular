import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CscService {
  constructor(private _http: HttpClient) {}

  //-----------Get All Countries---------//
  getCountry() {
    return this._http.get(`${environment.apiURL}/countries`);
  }
  //-----------Get States By Country Id---------//
  GetStates(ids: any) {
    return this._http.get(`${environment.apiURL}/states?country_id=${ids}`);
  }
  //-----------Get Cities By State Id---------//
  GetCities(id: any) {
    return this._http.get(`${environment.apiURL}/cities?state_id=${id}`);
  }
  //-----------Find State---------//
  findState(id: any) {
    return this._http.get(`${environment.apiURL}/states?state_id=${id}`);
  }
}
