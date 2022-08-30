import { Config } from './config.interface';
import { config as configDevelop } from './config-develop';
import { config as configProduction } from './config-production';

export let config: Config;

if (
	process.env.HEAD_HUNTER_STAGE === 'production' ||
	process.argv[2] === 'HEAD_HUNTER_STAGE=production'
)
	config = configProduction;
else config = configDevelop;
