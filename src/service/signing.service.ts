import path from 'node:path';
import {v7 as uuidv7} from 'uuid'; //

// biome-ignore lint/complexity/noStaticOnlyClass: Elysia recommends this
export abstract class SigningService {
	static async storePfx(pfxFile: File) {
		const pfxStorageDirectory = process.env.PFX_STORAGE_PATH;

		// TODO: Fallback to default path in this case
		if (!pfxStorageDirectory) {
			return 'Directory to store pfx files not provided';
		}

		const fileName = uuidv7();

		const arrayBufferFromFile = await pfxFile.arrayBuffer();

		await Bun.write(
			path.resolve(pfxStorageDirectory, `${fileName}.pfx`),
			arrayBufferFromFile,
		);

		return fileName;
	}
}
