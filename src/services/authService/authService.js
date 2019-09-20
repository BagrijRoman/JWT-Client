import apiService from '../apiService';

class authService {
  storeTokens = ({ token, refreshToken }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  };

  removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  checkToken = () => {};

  getAccessToken = () => localStorage.getItem('token');

  getRefreshToken = () => localStorage.getItem('refreshToken');

  signIn = async ({ email, password }) => {
    const { storeTokens } = this;
    const apiResponse = await apiService.signIn({ email, password });
    const {
      error,
      data: {
        _id,
        name,
        token,
        refreshToken,
      }
    } = apiResponse;

    if (!error) {
      storeTokens({ token, refreshToken });

      return { _id, email, name, error };
    } else {

      // return some error response
    }


  };

  signOut = () => {};
}

export default new authService();
