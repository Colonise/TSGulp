"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TSGulp = __importStar(require("../TSGulp"));
var utils_1 = require("../utils");
function Project(_nameOrOptions, _options) {
    var options = utils_1.processNameAndOptions(_nameOrOptions, _options);
    return TSGulp.ProjectDecorator(options);
}
exports.Project = Project;
