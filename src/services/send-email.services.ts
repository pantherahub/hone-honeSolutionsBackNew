import * as aws from '@aws-sdk/client-ses';
import dotenv from 'dotenv';
dotenv.config();

export interface IFile {
	path: string;
	filename: string;
	contentType: string;
}

export interface IEmailTo {
	email: string;
	name: string;
}

export interface ISendEmail {
	body: string;
	subject: string;
	toArray: IEmailTo[];
	files?: IFile[];
}

export class SendEmailServices {
	private emailDefault = process.env.EMAIL_TO_TEST || '';
	private sendEmailToAdmin = process.env.EMAIL_SEND_TO_ADMIN || 'no';
	private emailForm = `Hone Solutions <${process.env.EMAIL_EMAIL_SENDER}>`;
	private emailAdmin = `Hone Solutions <${process.env.EMAIL_TO_ADMIN}>`;
	private cloudWatchSet = process.env.EMAIL_CLOUD_WATCH_SET || '';

	private sesClient;

	constructor() {
		this.sesClient = new aws.SESClient({
			region: process.env.EMAIL_AWS_REGION || '',
			credentials: {
				accessKeyId: process.env.EMAIL_AWS_ACCESS_KEY_ID || '',
				secretAccessKey: process.env.EMAIL_AWS_SECRET_ACCESS_KEY || ''
			}
		});
	}

	async sendEmailBySES(options: ISendEmail) {
		const toArray: string[] = this.createToArray(options);
		const subject = this.sendEmailToAdmin == 'yes' ? `[TEST] ${options.subject}` : options.subject;
		const params = {
			Source: this.emailForm,
			Destination: {
				ToAddresses: toArray
			},
			Message: {
				Subject: { Data: subject },
				Body: { Html: { Data: options.body } }
			},
			ConfigurationSetName: this.cloudWatchSet
		};
		try {
			const command = new aws.SendEmailCommand(params);
			await this.sesClient.send(command);
			return true;
		} catch (error) {
			console.error('Error enviando el email:', error);
			return false;
		}
	}

	private createToArray(options: ISendEmail) {
		let toArray: string[] = [];
		if (process.env.APP_ENVIRONMENT != 'production') {
			toArray.push(`test <${this.emailDefault}>`);
		} else {
			for (const to of options.toArray) {
				toArray.push(`${to.name} <${to.email}>`);
			}
		}

		if (this.sendEmailToAdmin === 'yes') {
			toArray.push(this.emailAdmin);
		}
		return toArray;
	}
}
