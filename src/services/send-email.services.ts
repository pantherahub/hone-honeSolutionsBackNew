import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import dotenv from 'dotenv';
dotenv.config();

export interface IEmailTo {
	email: string;
	name: string;
}

export interface ISendEmail {
	body: string;
	subject: string;
	toArray: IEmailTo[];
}

export class SendEmailServices {
	async sendEmailBySES(options: ISendEmail) {
		const toArray: string[] = this.createToArray(options);

		const sesClient = new SESClient({
			region: process.env.EMAIL_AWS_REGION || '',
			credentials: {
				accessKeyId: process.env.EMAIL_AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.EMAIL_AWS_SECRET_ACCESS_KEY || ''
			}
		});

		const params = {
			Source: `Hone Solutions <${process.env.EMAIL_EMAIL_SENDER}>`,
			Destination: {
				ToAddresses: toArray
			},

			Message: {
				Subject: { Data: options.subject },
				Body: { Html: { Data: options.body } }
			}
		};

		try {
			const command = new SendEmailCommand(params);
			const response = await sesClient.send(command);
			console.log('Email enviado exitosamente:', response);
		} catch (error) {
			console.error('Error enviando el email:', error);
		}

		return options.body;
	}

	private createToArray(options: ISendEmail) {
		let toArray: string[] = [];
		for (const to of options.toArray) {
			toArray.push(`${to.name} <${to.email}>`);
		}

		return toArray;
	}
}
