"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const log = __importStar(require("fancy-log"));
class BaseLogger {
    constructor(name) {
        this.name = name;
        this.displayName = '';
    }
    log(message) {
        log.default(this.compileMessage(message));
    }
    warn(message) {
        log.warn(this.compileMessage(message));
    }
    createError(message) {
        throw new Error(this.compileMessage(message));
    }
    createTypeError(message) {
        throw new TypeError(this.compileMessage(message));
    }
}
exports.BaseLogger = BaseLogger;
class Logger extends BaseLogger {
    constructor(name) {
        super(name);
        this.displayName = name;
    }
    compileMessage(message) {
        return `${this.displayName}: ${message}`;
    }
}
exports.Logger = Logger;
class DecoratorLogger extends BaseLogger {
    constructor(name) {
        super(name);
        this.displayName = `@TSGulp.${name}()`;
    }
    compileMessage(message) {
        return `${this.displayName}: ${message}`;
    }
}
exports.DecoratorLogger = DecoratorLogger;
function processNameAndOptions(_nameOrOptions, _options) {
    var options = {};
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
exports.processNameAndOptions = processNameAndOptions;
