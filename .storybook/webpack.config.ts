import path from 'path';

module.exports = ({ config }) => {
	config.resolve.alias = {
		...config.resolve.alias,
		'@/src': path.resolve(__dirname, '../src'),
		'@/components': path.resolve(__dirname, '../src/components'),
		'@/app': path.resolve(__dirname, '../src/app'),
		'@/utils': path.resolve(__dirname, '../src/utils'),
		'@/constants': path.resolve(__dirname, '../src/constants'),
		public: path.resolve(__dirname, '../public'),
	};
	return config;
};
