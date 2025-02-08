import {Elysia} from "elysia";
import {SigningModel} from "../model/signing.model";
import {SigningService} from '../service/signing.service'

export const SigningController = new Elysia()
	.use(SigningModel)
	.post(
		'/uploadpfx',
		async ({ body }) => {
			return SigningService.storePfx(body.file);
		},
		{
			body: 'signing.uploadpfx.request.body',
		},
	)
	.post(
		'/signpdf',
		async ({ set, body }) => {
			const signedPdf = await SigningService.signPdf(
				body.file,
				body.pfxId,
				body.options,
			);

			set.headers['content-type'] = 'application/pdf';
			return signedPdf;
		},
		{
			body: 'signing.signpdf.request.body',
		},
	);
