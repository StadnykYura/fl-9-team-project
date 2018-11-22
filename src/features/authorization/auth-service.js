export default class AuthService {
  loggedIn() {
    const token = this.getToken();
    return !!token;
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}
