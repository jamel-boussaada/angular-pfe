/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../modules/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url = 'https://127.0.0.1:8000/user';
    constructor(private http: HttpClient) {}

    //TODO afficher tous les utilisateur

    getAllUsers(): Observable<any> {
        return this.http.get<any>(this.url + '/allUser');
    }
    addUser(user: User): Observable<any> {
        return this.http.post(this.url + '/register', user);
    }

    //TODO afficher un seul utilisateur
    getUserByid(id: number) {
        return this.http.get(this.url + '/getUser/'+id);
    }
    getUserTech() {
        return this.http.get(this.url + '/getUserTechnecien');
    }

    updateUser(id: number, user) {
        return this.http.put(this.url + '/updateUser/' + id, user);
    }

    deleteUser(id: number) {
        return this.http.delete<any>(this.url + '/deleteUser/' + id);
    }

    login(logger) {
        return this.http.post<any>(this.url + '/login', logger);
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    getUserPayload() {
        const token = this.getToken();
        if (token) {
            const userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn() {
        const userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }
}
