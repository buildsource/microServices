export class NotificationDto {
  type: 'email' | 'sms';
  response: string;
  status: 'SUCCESS' | 'ERROR';
}
