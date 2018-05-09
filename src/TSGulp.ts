import gulp from 'gulp';
import * as _ from 'lodash';
import { DecoratorLogger, Logger } from './utils';
import { ProjectOptions } from './decorators';

export enum TaskType {

}

interface TaskFunc extends Function {
    name: string;
    (done?: (error: any) => void): void;
    customName?: string;
    dependencies?: string[];
}

interface ClassConstructor<TClass> extends Function {
    name: string;
    new(): TClass;
}

const compileLogger = new Logger('TSGulp Compile');

const projectLogger = new DecoratorLogger('Project');
const nameLogger = new DecoratorLogger('Name');
const dependenciesLogger = new DecoratorLogger('Dependencies');
const defaultLogger = new DecoratorLogger('Default');

const projects: _.Dictionary<Project<any, any>> = {};

class Task {
    public readonly name: string;
    public readonly dependencies: string[];

    constructor(public readonly taskFunc: TaskFunc, public readonly propertyName: string) {
        this.name = taskFunc.customName || taskFunc.name || propertyName;
        this.dependencies = taskFunc.dependencies || [];
    }
}

class Project<TClassConstructor extends ClassConstructor<TClass>, TClass> {
    public readonly name: string;
    public readonly instance: TClass;
    public tasks: _.Dictionary<Task> = {};

    constructor(public readonly classFunc: TClassConstructor) {
        this.name = classFunc.name;
        this.instance = new classFunc();
    }

    private addTask(task: Task): void {
        if (this.tasks[task.name]) {
            throw compileLogger.createError(`Duplicate task '${task.name}'.`);
        }

        this.tasks[task.name] = task;
    }

    private gatherTasks(): void {
        this.tasks = {};

        Object.getOwnPropertyNames(this.classFunc.prototype)
            .filter(taskName => taskName !== 'constructor')
            .forEach(taskName => {
                this.addTask(new Task(this.classFunc.prototype[taskName], taskName))
            });
    }

    public compile(projectOptions: ProjectOptions): void {
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

            gulp.task(task.name, task.dependencies, task.taskFunc.bind(this.instance));
        });
    }
}

function getOrCreateProject<T>(target: ClassConstructor<T>): Project<ClassConstructor<T>, T> {
    var project: Project<ClassConstructor<T>, T>;

    if (!projects[target.name]) {
        project = new Project(target);

        projects[project.name] = project;
    }
    else {
        project = <Project<ClassConstructor<T>, T>>projects[target.name];
    }

    return project;
}

export function ProjectDecorator(options: ProjectOptions): ClassDecorator {
    return function (target) {
        const decoratedClass = getOrCreateProject(<any>target);

        decoratedClass.compile(options);
    };
}

export function NameDecorator(name: string): MethodDecorator {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw nameLogger.createTypeError(`Can only decorate functions.`);
        }
        
        (<TaskFunc>(<any>target)[propertyKey]).customName = name;
    };
}

export function DefaultDecorator(): MethodDecorator {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw defaultLogger.createTypeError(`Can only decorate functions.`);
        }
        
        (<TaskFunc>(<any>target)[propertyKey]).customName = 'default';
    };
}

export function DependenciesDecorator(dependencies?: string[]): MethodDecorator {
    return function DependenciesDecorator(target, propertyKey, descriptor) {
        if (!_.isFunction(descriptor.value)) {
            throw dependenciesLogger.createTypeError(`Can only decorate functions.`);
        }
        
        (<TaskFunc>(<any>target)[propertyKey]).dependencies = dependencies;
    };
}
