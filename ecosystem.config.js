module.exports = {
	apps: [
		{
			name: 'prestadores-back',
			script: 'dist/app.js',
			interpreter: 'node',
			node_args: '-r newrelic --max-old-space-size=512',
			autorestart: true,
			watch: true,
			time: true,
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
			ignore_watch: ['node_modules', 'src', 'newrelic_agent.log'],
			env: { NODE_ENV: 'development' },
			env_production: { NODE_ENV: 'production' }
		}
	]
};
