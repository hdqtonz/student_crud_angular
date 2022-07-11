import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //--------File Upload----------//
  FileUpload(fileData: any) {
    return this.http.post(`${environment.apiURL}/file`, fileData);
  }

  multipleFileUpload(filesData: any) {
    return this.http.post(`${environment.apiURL}/multiplefiles`, filesData);
  }
}
