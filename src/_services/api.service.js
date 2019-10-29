import { JwtService } from './jwt.service';

class ApiService extends JwtService {
  constructor (config) {
    super(config);
  }

}

export { ApiService };
