import apiService from '../apiService';

class authService {
  storeTokens = () => {};

  checkToken = () => {};

  getAccessToken = () => {};

  getRefreshToken = () => {};

  signIn = async ({ email, password }) => {
    const apiResponse = await apiService.signIn({ email, password });

    debugger;
  };

  signOut = () => {};
}

export default new authService();
