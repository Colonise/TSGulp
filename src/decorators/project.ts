import * as TSGulp from '../TSGulp';
import { processNameAndOptions } from '../utils';

export interface ProjectOptions {
    name?: string;
}

export function Project(): ClassDecorator;
export function Project(name: string): ClassDecorator;
export function Project(options: ProjectOptions): ClassDecorator;
export function Project(name: string, options: ProjectOptions): ClassDecorator;
export function Project(_nameOrOptions?: string | ProjectOptions, _options?: ProjectOptions): ClassDecorator {
    const options = processNameAndOptions(_nameOrOptions, _options);

    return TSGulp.ProjectDecorator(options);
}