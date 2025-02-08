import {swagger} from '@elysiajs/swagger';
import {Elysia} from 'elysia';

const app = new Elysia()
	.use(swagger())
	.get('/', () => 'Hello, World!')
	.listen(3000);

console.log('Server started');

process.on('SIGINT', () => {
	console.log('Server shutting down!');
	process.exit(0);
});
