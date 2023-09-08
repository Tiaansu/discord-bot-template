import chalk from 'chalk';

enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    DEBUG = 'debug',
    TRACE = 'trace'
};

interface LogOptions {
    level: LogLevel | keyof typeof LogLevel;
    getCallerFile: string;
    args: any[]
};

class Logger {
    public info(...args: any): void {
        this.logToConsole({
            level: LogLevel.INFO,
            getCallerFile: this.getCallerFile(),
            args
        });
    }

    public warn(...args: any): void {
        this.logToConsole({
            level: LogLevel.WARN,
            getCallerFile: this.getCallerFile(),
            args
        });
    }

    public error(...args: any): void {
        this.logToConsole({
            level: LogLevel.ERROR,
            getCallerFile: this.getCallerFile(),
            args
        });
    }

    public debug(...args: any): void {
        this.logToConsole({
            level: LogLevel.DEBUG,
            getCallerFile: this.getCallerFile(),
            args
        });
    }

    public trace(...args: any): void {
        this.logToConsole({
            level: LogLevel.TRACE,
            getCallerFile: this.getCallerFile(),
            args
        });
    }

    private logToConsole(logOptions: LogOptions): void {
        const { level, getCallerFile, args } = logOptions;

        switch (level) {
            case LogLevel.INFO:
                console.log(`[${chalk.gray(new Date().toISOString())}] ${chalk.hex('#9FBC69')(level.toUpperCase())} [${chalk.gray(getCallerFile)}]:`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg).join(', '));
                break;

            case LogLevel.WARN:
                console.log(`[${chalk.gray(new Date().toISOString())}] ${chalk.hex('#F0DB74')(level.toUpperCase())} [${chalk.gray(getCallerFile)}]:`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg).join(', '));
                break;

            case LogLevel.ERROR:
                console.log(`[${chalk.gray(new Date().toISOString())}] ${chalk.hex('#CC5656')(level.toUpperCase())} [${chalk.gray(getCallerFile)}]:`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg).join(', '));
                break;

            case LogLevel.DEBUG:
                console.log(`[${chalk.gray(new Date().toISOString())}] ${chalk.hex('#AF88BA')(level.toUpperCase())} [${chalk.gray(getCallerFile)}]:`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg).join(', '));
                break;

            case LogLevel.TRACE:
                console.log(`[${chalk.gray(new Date().toISOString())}] ${chalk.hex('#6FBDB3')(level.toUpperCase())} [${chalk.gray(getCallerFile)}]:`, args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(', '));
                break;

            default:
                new TypeError(`Invalid log level: ${level}. Allowed log level(s): ${Object.values(LogLevel).join(', ')}`);
                break;
        }
    }

    private getCallerFile(): string {
        const error = new Error();
        const stackTrace = error.stack || '';
        const callerLine = stackTrace.split('\n')[3].trim();
        const fileName = callerLine.replace(/\\/g, '/').split('/').at(-1)!.split(':').at(0)!.replace(/.js/g, '.ts');

        if (fileName) {
            return fileName;
        }

        return 'unknown.ts';
    }
}

export const logger = new Logger();