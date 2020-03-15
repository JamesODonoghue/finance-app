import * as jwtJsDecode from 'jwt-js-decode';

class Auth {
    authenticated: boolean;
    constructor() {
        this.authenticated = false;
    }

    async login(cb: () => any) {
        this.authenticated = true;
        // let result = await fetch('http://localhost:5000/auth/google');
        window.location.href = 'http://localhost:5000/auth/google';
        cb();
    }

    setToken(token: string) {
        window.localStorage.setItem('token', token);
    }

    getToken() {
        return window.localStorage.getItem('token');
    }

    clearToken() {
        window.localStorage.removeItem('token');
    }

    decodeToken(token: string) {
        return jwtJsDecode.jwtDecode(token);
    }
}

export default new Auth();
