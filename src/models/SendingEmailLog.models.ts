import { DataTypes, Model } from 'sequelize';
import config from '../config/config';
import { connectionSequelizeSql } from '../DB/config';
import { ISendigEmailLog } from '@src/interface/SendigEmailLog.Interface';

class SendingEmailLog extends Model<ISendigEmailLog> implements ISendigEmailLog {
	public idSendingEmailsLog!: number;
	public email!: string;
	public messageId!: string;
	public subject!: string;
}

SendingEmailLog.init(
	{
		idSendingEmailsLog: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		messageId: {
			type: DataTypes.STRING,
			allowNull: true
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: connectionSequelizeSql,
		modelName: config.db_table_sending_email_log,
		tableName: config.db_table_sending_email_log,
		timestamps: true,
		updatedAt: true,
		createdAt: true
	}
);

export default SendingEmailLog;
