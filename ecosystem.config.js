module.exports = {
	apps: [
		{
			name: 'backend',
			script: 'src/app.ts', // El archivo TypeScript principal
			interpreter: 'node', // Ejecuta con Node.js
			interpreter_args: '-r ts-node/register', // Usar ts-node para ejecutar archivos .ts
			watch: true, // Opcional, para reiniciar la app cuando los archivos cambien
			ignore_watch: ['node_modules'],
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
}
