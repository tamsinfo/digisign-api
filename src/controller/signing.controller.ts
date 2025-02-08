import {Elysia} from "elysia";
import {SigningModel} from "../model/signing.model";
import {SigningService} from '../service/signing.service'

export const SigningController = new Elysia().use(SigningModel).post(
	'/uploadpfx',
	async ({ body }) => {
		return SigningService.storePfx(body.file);
	},
	{
		body: 'signing.uploadpfx.request.body',
	},
);
