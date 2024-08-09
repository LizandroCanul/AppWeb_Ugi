import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private defaultUser = { username: 'defaultUser', password: 'defaultPass' };

  getUsers(): { username: string, password: string }[] {
    return [
      { username: 'JimmyPantoja@42', password: 'Liz123' },
      { username: 'Gaby@43', password: 'Liz123' },
      { username: 'Ieremmy@55', password: 'Liz123' },
      { username: 'Diane@58', password: 'Liz123' },
      { username: 'Fernando@Villafaña', password: 'Liz123' },
      { username:  'Liz@CanLona', password: 'Liz123'},
      this.defaultUser
    ];
  }

  

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.username === username && user.password === password);
  }
}
