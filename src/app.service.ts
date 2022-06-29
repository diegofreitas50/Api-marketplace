import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check https://apiuser-h4vg.onrender.com/api for Swagger docs...';
  }
}
