import path from 'node:path';
import {signPdf} from 'bun-jsignpdf';
import {v7 as uuidv7} from 'uuid'; //

// biome-ignore lint/complexity/noStaticOnlyClass: Elysia recommends this
export abstract class SigningService {
	private static resolvePfxPath(pfxId: string) {
		const pfxStorageDirectory = process.env.PFX_STORAGE_PATH;

		// TODO: Fallback to default path in this case
		if (!pfxStorageDirectory) {
			return 'Directory to store pfx files not provided';
		}

		return path.resolve(pfxStorageDirectory, `${pfxId}.pfx`);
	}

	private static async fetchPfxFromId(pfxId: string) {
		const filePath = SigningService.resolvePfxPath(pfxId);

		const pfxFile = Bun.file(filePath);
		const arrayBufferFromPfxFile = await pfxFile.arrayBuffer();

		return Buffer.from(arrayBufferFromPfxFile);
	}

	static async storePfx(pfxFile: File) {
		const pfxId = uuidv7();
		const filePath = SigningService.resolvePfxPath(pfxId);

		const arrayBufferFromFile = await pfxFile.arrayBuffer();

		await Bun.write(filePath, arrayBufferFromFile);

		return pfxId;
	}

	static async signPdf(pdfFile: File, pfxId: string, options: string) {
		const parsedOptions = JSON.parse(options);
		const pfxFile = await SigningService.fetchPfxFromId(pfxId);

		const signedPdf = await signPdf(
			Buffer.from(await pdfFile.arrayBuffer()),
			pfxFile,
			parsedOptions,
			'emudhra',
		);

		return signedPdf.buffer.slice(
			signedPdf.byteOffset,
			signedPdf.byteOffset + signedPdf.byteLength,
		) as ArrayBuffer;
	}
}
