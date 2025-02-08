import {Elysia, t} from 'elysia';

const uploadPfxRequestBody = t.Object({
	file: t.File(),
});

export const signingModel = new Elysia().model({
	'signing.uploadpfx.body': uploadPfxRequestBody,
});
