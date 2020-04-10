import config from './config';
import Axios from 'axios';

export const authenticateWithRefreshToken = async (userAuth) => {
    await Axios.post(
      config.urls.AUTH_SERVICE + "authenticateWithrefreshtoken",
      userAuth
    )
      .then((res) => {
        localStorage.setItem("userAuth", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  export const decodeToken = async (userAuth) => {
    await Axios.post(config.urls.AUTH_SERVICE + "decodeToken", userAuth)
      .then((res) => {
        if (res.data.status === 403) {
          userAuth = {
            refresh_token: JSON.parse(localStorage.getItem("userAuth"))
              .refresh_token,
          };
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const isAuthorized = async () => {
    let userAuth = {
        access_token: JSON.parse(localStorage.getItem("userAuth")).access_token,
      };
      let isAuthorised = decodeToken(userAuth);
      if (!isAuthorised) {
        userAuth = {
          refresh_token: JSON.parse(localStorage.getItem("userAuth"))
            .refresh_token,
        };
        await authenticateWithRefreshToken(userAuth);
        userAuth = {
          access_token: JSON.parse(localStorage.getItem("userAuth")).access_token,
        };
        await decodeToken(userAuth);
      }
      userAuth = {
        access_token: JSON.parse(localStorage.getItem("userAuth")).access_token,
      };
      Axios.defaults.headers.common["Authorization"] =
        "bearer " + userAuth.access_token;
      return true;
}