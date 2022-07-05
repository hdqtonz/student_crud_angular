import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudetnService {
  constructor(private _http: HttpClient) {}

  //-----------Get All Student-----------------//
  getAllStudent() {
    return this._http.get(`${environment.apiURL}/student`);
  }
  //-----------Get Student By Id-----------------//
  getStudentById(id: any) {
    return this._http.get(`${environment.apiURL}/student/${id}`);
  }
  //-----------Delete Student By Id-----------------//
  deleteStudentById(id: any) {
    return this._http.delete(`${environment.apiURL}/student/${id}`);
  }
}
