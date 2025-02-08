import {swagger} from '@elysiajs/swagger';
import {Elysia} from 'elysia';
import {SigningController} from './controller/signing.controller';

const app = new Elysia()
	.use(swagger())
	.use(SigningController)
	.get('/', () => 'Hello World!')
	.onStart(({ server }) => {
		console.log(`Server started at ${server?.url}`);
	})
	.onStop(() => {
		console.log('Server shutdown complete!');
	})
	.listen(3000);

process.on('SIGINT', async () => {
	console.log('SIGINT: Server shutting down!');
	await app.stop();
	process.exit(0);
});
