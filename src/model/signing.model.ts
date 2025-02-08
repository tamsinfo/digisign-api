import {Elysia, t} from 'elysia';

const uploadPfxRequestBody = t.Object({
	file: t.File(),
});

const signPdfRequestBody = t.Object({
	file: t.File(),
	pfxId: t.String(),
	password: t.Optional(t.String()),
	options: t.Object({
		append: t.Optional(t.Boolean()),
		bgPath: t.Optional(t.String()),
		bgScale: t.Optional(t.Number()),
		contact: t.Optional(t.String()),
		fontSize: t.Optional(t.Number()),
		imgPath: t.Optional(t.String()),
		location: t.Optional(t.String()),
		signatureText: t.Optional(t.String()),
		pageNumber: t.Optional(t.Number()),
		reason: t.Optional(t.String()),
		visible: t.Optional(t.Boolean()),
		signatureBox: t.Optional(
			t.Tuple([t.Number(), t.Number(), t.Number(), t.Number()]),
		),
		certificationLevel: t.Optional(
			t.Enum({
				0: 'NOT_CERTIFIED',
				1: 'CERTIFIED_NO_CHANGES_ALLOWED',
				2: 'CERTIFIED_FORM_FILLING',
				3: 'CERTIFIED_FORM_FILLING_AND_ANNOTATIONS',
			}),
		),
		renderMode: t.Optional(
			t.Enum({
				0: 'DESCRIPTION_ONLY',
				1: 'GRAPHIC_AND_DESCRIPTION',
				2: 'SIGNAME_AND_DESCRIPTION',
			}),
		),
	}),
});

export const SigningModel = new Elysia().model({
	'signing.uploadpfx.request.body': uploadPfxRequestBody,
	'signing.signpdf.request.body': signPdfRequestBody,
});
