import {Elysia} from "elysia";
import {signingModel} from "../model/signing.model";

export const signingController = new Elysia().use(signingModel).post(
	'/uploadpfx',
	async ({ body }) => {
		console.log(body);
	},
	{
		body: 'signing.uploadpfx.body',
	},
);
