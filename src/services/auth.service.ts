import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) { // ✅ Check if running in the browser
      const storedStatus = localStorage.getItem('isSignedIn');
      this.isAuthenticatedSubject.next(storedStatus === 'true');
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { // ✅ Prevents SSR issues
      return localStorage.getItem('isSignedIn') === 'true';
    }
    return false;
  }

  login(email: string, password: string): Observable<boolean> {
    if (email === 'org.admin@gmail.com' && password === '123456') {
      this.isAuthenticatedSubject.next(true);
      if (isPlatformBrowser(this.platformId)) { // ✅ Ensures localStorage is only used in the browser
        localStorage.setItem('isSignedIn', 'true');
      }
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    if (isPlatformBrowser(this.platformId)) { // ✅ Safe check
      localStorage.removeItem('isSignedIn');
    }
    this.router.navigate(['/login']);
  }
}
