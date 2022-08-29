import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const userLogged = this.getAccessToken();

    if (!userLogged) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(userLogged.token)) {
      this.setSession(userLogged);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.ok) {
          const newUser = response.data.data;
          resolve(newUser);
          this.emit('onLogin', newUser);
          /* this.setSession(newUser); */
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          name: email,
          pass: password,
        })
        .then((response) => {
          if (response.data.ok) {
            const dadosUsuario = response.data.data;

            const newDataStorage = {
              id: dadosUsuario.userId,
              name: dadosUsuario.userName,
              email: dadosUsuario.userName,
              token: dadosUsuario.token,
            };

            this.setSession(newDataStorage);
            resolve(dadosUsuario);

            this.emit('onLogin', newDataStorage);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    const userLogged = this.getAccessToken();
    if (userLogged) {
      this.setSession(userLogged);
      return {
        ok: true,
        userLogged,
      };
    }
    this.logout();
    const error = 'Failed to login with token.';
    return {
      ok: false,
      error,
    };
  };

  setSession = (userLogged) => {
    if (userLogged) {
      localStorage.setItem('userLogged', JSON.stringify(userLogged));
    } else {
      localStorage.removeItem('userLogged');
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    // jwt_access_token;
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    return userLogged;
  };
}

const instance = new JwtService();

export default instance;
