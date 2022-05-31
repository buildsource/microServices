import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Client, TextContent, IMessage } from '@zenvia/sdk';
import { EmailDto } from './dto/email.dto';
import { PhoneDto } from './dto/phone.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(NotificationEntity)
    private repository: Repository<NotificationEntity>,
    @InjectSendGrid() private readonly sendGrid: SendGridService,
  ) { }

  private zenviaClient = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail({ email, name }: EmailDto): Promise<void> {
    await this.sendGrid
      .send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'User Created',
        text: `Hello ${name}, your user created with success!`,
        html: `<strong>Hello ${name}, your user created with success!</strong>`,
      })
      .then(async (response) => {
        await this.repository.save({
          type: 'email',
          response: JSON.stringify(response),
          status: 'SUCCESS',
        });
      })
      .catch(async (error) => {
        await this.repository.save({
          type: 'email',
          response: JSON.stringify(error),
          status: 'ERROR',
        });
      });
  }

  async sendPhone({ phone, name }: PhoneDto): Promise<void> {
    const type = 'sms';
    const sms = this.zenviaClient.getChannel(type);
    const content = new TextContent(
      `Hello ${name}, your user created with success!`,
    );

    await sms
      .sendMessage(process.env.ZENVIA_KEYWORD, phone, content)
      .then(
        async ({
          channel,
          contents,
          from,
          to,
          direction,
          id: messageId,
        }: IMessage) => {
          const response: any = {
            channel,
            contents,
            from,
            to,
            direction,
            messageId,
          };

          await this.repository.save({
            type,
            response: JSON.stringify(response),
            status: 'SUCCESS',
          });
        },
      )
      .catch(async (error) => {
        await this.repository.save({
          type,
          response: JSON.stringify(error),
          status: 'ERROR',
        });
      });
  }
}
