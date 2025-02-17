import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  private apiUrl = 'http://88.222.212.197/ocr/api/ocr/extract';

  constructor(private http: HttpClient) {}

  extractText(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData, {
      headers: new HttpHeaders({
        // No need to set Content-Type, as FormData automatically handles it
      }),
    });
  }
}
