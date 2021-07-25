import { Readable } from 'typeorm/platform/PlatformTools';

export class base64Helper {
    public static imageToBase64(image: any) {
        return image.toString('base64');
    }

    public static base64ToImage(base64: string) {
        const image = Buffer.from(base64, 'base64');
        var filestream = new Readable();

        filestream.push(image);
        filestream.push(null);
        
        return filestream;
    }
}