import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'; 
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
    // Decode the token and check expiration
    isTokenExpired(): boolean {
      const token = localStorage.getItem('token');
      if (!token) {
        return true; // No token found, treat as expired
      }
  
      try {
        const decoded: any = jwt_decode(token);
        const expiry = decoded.exp * 1000; // Convert to milliseconds
        const currentTime = new Date().getTime();
  
        // If token expiration is less than current time, it's expired
        return currentTime >= expiry;
      } catch (error) {
        console.error('Token decoding failed:', error);
        return true; // Treat as expired if decoding fails
      }
    }
  
    // Remove token (log out user)
    logout() {
      localStorage.removeItem('token');
      // You can also clear user-related data from localStorage or sessionStorage
    }
}
