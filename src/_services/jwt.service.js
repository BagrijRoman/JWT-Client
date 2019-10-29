import { TokenService } from './token.service';

class JwtService extends TokenService {
  constructor (config) {
    super(config);
  }

  // sign in + callback for this
  // sign out + callback for this
  // refresh token

}

export { JwtService };
