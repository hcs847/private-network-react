import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // check if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // retrieves the user's token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // saves user's token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    logout() {
        // clear user's token and profile data from localStorage
        localStorage.removeItem('id_token');
        // reaload the page and reset the state of the app
        window.location.assign('/');
    }
}

export default new AuthService();