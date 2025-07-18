import { IRequestCreate, ITicketModel } from '../interface/ticket.interface';
import Ticket from '../models/ticket.model';
import EmailNotification from '../models/emailNotification.model';
import { SendEmailServices, IEmailTo } from '../services/send-email.services';
import { renderView } from '@src/utils/Emails/Render.Handlebars';

export const createTicket = async (request: IRequestCreate) => {
	try {
		const data = prepareData(request);
		const ticket = await Ticket.create(data);
		let recordEmail: any = null;
		if (ticket.idClientHoneSolutions != 7) {
			recordEmail = await EmailNotification.findOne({
				where: { idClientHone: ticket.idClientHoneSolutions }
			});
		}
		const adminEmail: any = await EmailNotification.findAll({ where: { idClientHone: 7 } });
		if (recordEmail || data.email) {
			const email = recordEmail ? recordEmail.email : data.email;
			if (emailIsValid(email)) {
				await sendEmail(
					request.idRole,
					'provider',
					[{ email, name: 'User HoneSolutions' }],
					ticket
				);
			}
		}
		if (adminEmail) {
			const adminEmails: IEmailTo[] = adminEmail.map((email: any) => {
				return {
					email: email.email,
					name: 'Admin HoneSolutions'
				};
			});
			await sendEmail(request.idRole, 'admin', adminEmails, ticket);
		}

		return {
			code: 200,
			message: { translationKey: 'ticket.successful' },
			data: ''
		};
	} catch (err: any) {
		console.error('Error: ', err);
		return {
			code: 400,
			message: {
				translationKey: 'ticket.error_server',
				translationParams: { name: 'createTicket' }
			}
		};
	}
};

const sendEmail = async (
	idRole: number,
	type: 'admin' | 'provider',
	emails: IEmailTo[],
	ticket: Ticket
): Promise<boolean> => {
	const sendEmailService = new SendEmailServices();
	const template = getTemplate(ticket, idRole, type);
	try {
		await sendEmailService.sendEmailBySES({
			body: template,
			subject: 'Nuevo Ticket Registrado',
			toArray: emails
		});
		return true;
	} catch (error) {
		console.error('Error sending email: ', error);
		return false;
	}
};

const getTemplate = (ticket: Ticket, idRole?: number, type?: 'admin' | 'provider'): string => {
	let template =
		idRole == 10
			? renderView('TicketForCreatorNuevaEPS.Email')
			: renderView('TicketForCreator.Email');
	if (type === 'admin') template = renderView('TicketForManager.Email');
	return template({
		idTickets: ticket?.idTickets,
		email: ticket?.email,
		observaciones: ticket?.observaciones
	});
};

const prepareData = (request: IRequestCreate): ITicketModel => {
	return {
		linkurl: '',
		nombreSolicitud: request.requestName,
		codigoEmpleado: request.employeeCode,
		fechaSolicitud: formatDate(request.requestDate),
		fechaMaxima: formatDate(request.maxDate),
		observaciones: request.description,
		nombreArchivo: '',
		rutaArchivo: '',
		idTipoSolicitud: request.typeRequest,
		idUsuarios: request.userId,
		email: request.email,
		idClientHoneSolutions: request.idClientHone,
		userLoggedIn: request.userLogged
	};
};

const formatDate = (date = new Date()): string => {
	const d = new Date(date);
	d.setUTCHours(d.getUTCHours() - 5);
	return d.toISOString().slice(0, 19).replace('T', ' ');
};

export const emailIsValid = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};
