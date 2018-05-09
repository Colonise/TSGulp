"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var log = __importStar(require("fancy-log"));
var BaseLogger = (function () {
    function BaseLogger(name) {
        this.name = name;
        this.displayName = '';
    }
    BaseLogger.prototype.log = function (message) {
        log.default(this.compileMessage(message));
    };
    BaseLogger.prototype.warn = function (message) {
        log.warn(this.compileMessage(message));
    };
    BaseLogger.prototype.createError = function (message) {
        throw new Error(this.compileMessage(message));
    };
    BaseLogger.prototype.createTypeError = function (message) {
        throw new TypeError(this.compileMessage(message));
    };
    return BaseLogger;
}());
exports.BaseLogger = BaseLogger;
var Logger = (function (_super) {
    __extends(Logger, _super);
    function Logger(name) {
        var _this = _super.call(this, name) || this;
        _this.displayName = name;
        return _this;
    }
    Logger.prototype.compileMessage = function (message) {
        return this.displayName + ": " + message;
    };
    return Logger;
}(BaseLogger));
exports.Logger = Logger;
var DecoratorLogger = (function (_super) {
    __extends(DecoratorLogger, _super);
    function DecoratorLogger(name) {
        var _this = _super.call(this, name) || this;
        _this.displayName = "@TSGulp." + name + "()";
        return _this;
    }
    DecoratorLogger.prototype.compileMessage = function (message) {
        return this.displayName + ": " + message;
    };
    return DecoratorLogger;
}(BaseLogger));
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
