import Pino from 'pino';


export function getLogger() {
    var destination = Pino.destination(process.env.LOG_FILE_PATH)
    return Pino({ level: process.env.LOG_LEVEL || 'info', 
                  sync: false,
                  timestamp: Pino.stdTimeFunctions.isoTime }, destination);
}