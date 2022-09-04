export class Logger {

    log(message: string, data: any | undefined = undefined) {
        console.log(message, data);
    }

    error(message: string, data: any | undefined = undefined) {
        console.error(`ERROR! ${message}`, data);
    }
}