import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export const renderView: any = (nameView: string) => {
	const templatePath = path.join(__dirname, `./Templates/${nameView}.hbs`);
	const source = fs.readFileSync(templatePath, 'utf8');
	return handlebars.compile(source);
};
