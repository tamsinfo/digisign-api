import {Elysia, t} from 'elysia';

const uploadPfxRequestBody = t.Object({
	file: t.File(),
});

export const SigningModel = new Elysia().model({
	'signing.uploadpfx.body': uploadPfxRequestBody,
});
