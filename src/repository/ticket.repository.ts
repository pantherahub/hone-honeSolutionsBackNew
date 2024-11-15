import config from '../config/config';
import { IRequestCreate, ITicketModel } from '../interface/ticket.interface';
import Ticket from '../models/ticket.model';
import EmailNotification from '../models/emailNotification.model';
import { basicTemplate } from './templates/ticket/html.template';
import { SendEmailServices } from '../services/send-email.services';

export const createTicket = async (request: IRequestCreate) => {
	try {
		const data = prepareData(request);
		const ticket = await Ticket.create(data);
		const recordEmail = await EmailNotification.findOne({
			where: { idClientHone: ticket.idClientHoneSolutions }
		});
		const adminEmail = await EmailNotification.findOne({ where: { idClientHone: 7 } });

		if (recordEmail) {
			await sendEmail(request.idRole, recordEmail.email, ticket);
		}
		if (adminEmail) {
			await sendEmail(request.idRole, adminEmail.email, ticket);
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

const sendEmail = async (idRole: number, email: string, ticket?: Ticket): Promise<boolean> => {
	const sendEmailService = new SendEmailServices();
	const template = getTemplate(idRole, ticket);
	try {
		await sendEmailService.sendEmailBySES({
			body: template,
			typeBody: 'html',
			subject: 'Nuevo Ticket Registrado',
			userName: 'Admin HoneSolutions',
			userEmail: email
		});
		return true;
	} catch (error) {
		console.error('Error sending email: ', error);
		return false;
	}
};

const getTemplate = (idRole: number, ticket?: Ticket): string => {
	const newData = {
		idTickets: ticket?.idTickets,
		email: ticket?.email,
		observaciones: ticket?.observaciones
	};
	return basicTemplate(newData);
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
