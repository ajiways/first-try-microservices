import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { REGISTER_PATTERN } from '../../misc/constants';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(REGISTER_PATTERN)
  notificate(@Payload() data) {
    console.log('Just imagine that email was sent :^)');
  }
}
