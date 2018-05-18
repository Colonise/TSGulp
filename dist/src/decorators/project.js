"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TSGulp = __importStar(require("../TSGulp"));
const utils_1 = require("../utils");
function Project(_nameOrOptions, _options) {
    const options = utils_1.processNameAndOptions(_nameOrOptions, _options);
    return TSGulp.ProjectDecorator(options);
}
exports.Project = Project;
