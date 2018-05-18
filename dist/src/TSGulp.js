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
const gulp_1 = __importDefault(require("gulp"));
const _ = __importStar(require("lodash"));
const utils_1 = require("./utils");
var TaskType;
(function (TaskType) {
})(TaskType = exports.TaskType || (exports.TaskType = {}));
const compileLogger = new utils_1.Logger('TSGulp Compile');
const projectLogger = new utils_1.DecoratorLogger('Project');
const nameLogger = new utils_1.DecoratorLogger('Name');
const dependenciesLogger = new utils_1.DecoratorLogger('Dependencies');
const defaultLogger = new utils_1.DecoratorLogger('Default');
const projects = {};
class Task {
    constructor(taskFunc, propertyName) {
        this.taskFunc = taskFunc;
        this.propertyName = propertyName;
        this.name = taskFunc.customName || taskFunc.name || propertyName;
        this.dependencies = taskFunc.dependencies || [];
    }
}
class Project {
    constructor(classFunc) {
        this.classFunc = classFunc;
        this.tasks = {};
        this.name = classFunc.name;
        this.instance = new classFunc();
    }
    addTask(task) {
        if (this.tasks[task.name]) {
            throw compileLogger.createError(`Duplicate task '${task.name}'.`);
        }
        this.tasks[task.name] = task;
    }
    gatherTasks() {
        this.tasks = {};
        Object.getOwnPropertyNames(this.classFunc.prototype)
            .filter(taskName => taskName !== 'constructor')
            .forEach(taskName => {
            this.addTask(new Task(this.classFunc.prototype[taskName], taskName));
        });
    }
    compile(projectOptions) {
        compileLogger.log(`Compilng project ${projectOptions.name}`);
        this.gatherTasks();
        var hasDefault = false;
        _.forEach(this.tasks, task => {
            if (task.name === 'default') {
                if (hasDefault) {
                    throw new Error('Cannot have more than one default task.');
                }
                else {
                    hasDefault = true;
                }
            }
            gulp_1.default.task(task.name, task.dependencies, task.taskFunc.bind(this.instance));
        });
    }
}
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
        const decoratedClass = getOrCreateProject(target);
        decoratedClass.compile(options);
    };
}
exports.ProjectDecorator = ProjectDecorator;
function NameDecorator(name) {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw nameLogger.createTypeError(`Can only decorate functions.`);
        }
        target[propertyKey].customName = name;
    };
}
exports.NameDecorator = NameDecorator;
function DefaultDecorator() {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw defaultLogger.createTypeError(`Can only decorate functions.`);
        }
        target[propertyKey].customName = 'default';
    };
}
exports.DefaultDecorator = DefaultDecorator;
function DependenciesDecorator(dependencies) {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw dependenciesLogger.createTypeError(`Can only decorate functions.`);
        }
        target[propertyKey].dependencies = dependencies;
    };
}
exports.DependenciesDecorator = DependenciesDecorator;
