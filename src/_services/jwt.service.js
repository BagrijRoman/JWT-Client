import { TokenService } from './token.service';

class JwtService extends TokenService {
  constructor (config) {
    super(config);
  }

}

export { JwtService };
