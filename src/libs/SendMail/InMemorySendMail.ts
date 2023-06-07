import { SendMail, SendMailParams } from './';

export class InMemorySendMail implements SendMail {
	async SendMail<T>(params: SendMailParams<T>): Promise<void> {
		return Promise.resolve();
	}
}
