import * as _ from 'lodash';
import * as log from 'fancy-log';

export abstract class BaseLogger {
    protected displayName: string = '';

    constructor(public readonly name: string) {

    }
    
    protected abstract compileMessage(message: string): string;

    log(message: string) {
        log.default(this.compileMessage(message));
    }

    warn(message: string) {
        log.warn(this.compileMessage(message));
    }

    createError(message: string): TypeError {
        throw new Error(this.compileMessage(message));
    }

    createTypeError(message: string): TypeError {
        throw new TypeError(this.compileMessage(message));
    }
}

export class Logger extends BaseLogger {
    constructor(name: string) {
        super(name);

        this.displayName = name;
    }

    protected compileMessage(message: string) {
        return `${this.displayName}: ${message}`;
    }
}

export class DecoratorLogger extends BaseLogger {
    constructor(name: string) {
        super(name);

        this.displayName = `@TSGulp.${name}()`;
    }

    protected compileMessage(message: string) {
        return `${this.displayName}: ${message}`;
    }
}

export function processNameAndOptions<T extends { name?: string }>(_nameOrOptions?: string | T, _options?: T): T {
    var options: T = <T>{};

    if (_nameOrOptions) {
        if (_.isString(_nameOrOptions)) {
            options = _options || options;
            options.name = _nameOrOptions;
        }
        else {
            options = _nameOrOptions;
        }
    }

    return options;
}