import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import { SendMail, SendMailParams } from '.';
import { resolve } from 'path';

export class EtherealMail implements SendMail {
	async SendMail<T>(params: SendMailParams<T>): Promise<void> {
		const { to, subject, variables, templatePath } = params;

		const template = resolve(__dirname, '..', '..', 'templates', 'Mail', `${templatePath}.hbs`);

		const templateFileContent = fs.readFileSync(template).toString('utf-8');
		const mailTemplateParse = Handlebars.compile(templateFileContent);
		const html = mailTemplateParse(variables);

		const account = await nodemailer.createTestAccount();
		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const message = await transporter.sendMail({
			from: 'Equipe ADV <account@adv.com>',
			to,
			subject,
			html,
		});

		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}
