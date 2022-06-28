import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
<<<<<<< HEAD
  getHello(): string {
    return 'Hello World!';
=======
  getAppStatus(): string {
    return 'Server is running! 🚀\n Please check http://localhost:3333/api for Swagger docs...';
>>>>>>> origin/development
  }
}
