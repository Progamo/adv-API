export interface SendMailParams<T> {
	to: string;
	subject: string;
	variables: T;
	templatePath: 'welcome' | 'passwordRecovery' | 'passwordChanged';
}

export type SendMail = { SendMail: <T>(send: SendMailParams<T>) => Promise<void> };
