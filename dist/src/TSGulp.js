"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = __importDefault(require("gulp"));
var _ = __importStar(require("lodash"));
var utils_1 = require("./utils");
var TaskType;
(function (TaskType) {
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var compileLogger = new utils_1.Logger('TSGulp Compile');
var projectLogger = new utils_1.DecoratorLogger('Project');
var nameLogger = new utils_1.DecoratorLogger('Name');
var dependenciesLogger = new utils_1.DecoratorLogger('Dependencies');
var defaultLogger = new utils_1.DecoratorLogger('Default');
var projects = {};
var Task = (function () {
    function Task(taskFunc, propertyName) {
        this.taskFunc = taskFunc;
        this.propertyName = propertyName;
        this.name = taskFunc.customName || taskFunc.name || propertyName;
        this.dependencies = taskFunc.dependencies || [];
    }
    return Task;
}());
var Project = (function () {
    function Project(classFunc) {
        this.classFunc = classFunc;
        this.tasks = {};
        this.name = classFunc.name;
        this.instance = new classFunc();
    }
    Project.prototype.addTask = function (task) {
        if (this.tasks[task.name]) {
            throw compileLogger.createError("Duplicate task '" + task.name + "'.");
        }
        this.tasks[task.name] = task;
    };
    Project.prototype.gatherTasks = function () {
        var _this = this;
        this.tasks = {};
        Object.getOwnPropertyNames(this.classFunc.prototype)
            .filter(function (taskName) { return taskName !== 'constructor'; })
            .forEach(function (taskName) {
            _this.addTask(new Task(_this.classFunc.prototype[taskName], taskName));
        });
    };
    Project.prototype.compile = function (projectOptions) {
        var _this = this;
        compileLogger.log("Compilng project " + projectOptions.name);
        this.gatherTasks();
        var hasDefault = false;
        _.forEach(this.tasks, function (task) {
            if (task.name === 'default') {
                if (hasDefault) {
                    throw new Error('Cannot have more than one default task.');
                }
                else {
                    hasDefault = true;
                }
            }
            gulp_1.default.task(task.name, task.dependencies, task.taskFunc.bind(_this.instance));
        });
    };
    return Project;
}());
function getOrCreateProject(target) {
    var project;
    if (!projects[target.name]) {
        project = new Project(target);
        projects[project.name] = project;
    }
    else {
        project = projects[target.name];
    }
    return project;
}
function ProjectDecorator(options) {
    return function (target) {
        var decoratedClass = getOrCreateProject(target);
        decoratedClass.compile(options);
    };
}
exports.ProjectDecorator = ProjectDecorator;
function NameDecorator(name) {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw nameLogger.createTypeError("Can only decorate functions.");
        }
        target[propertyKey].customName = name;
    };
}
exports.NameDecorator = NameDecorator;
function DefaultDecorator() {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw defaultLogger.createTypeError("Can only decorate functions.");
        }
        target[propertyKey].customName = 'default';
    };
}
exports.DefaultDecorator = DefaultDecorator;
function DependenciesDecorator(dependencies) {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw dependenciesLogger.createTypeError("Can only decorate functions.");
        }
        target[propertyKey].dependencies = dependencies;
    };
}
exports.DependenciesDecorator = DependenciesDecorator;
