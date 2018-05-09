import * as TSGulp from '../TSGulp';

export function Name(name: string): MethodDecorator {
    return TSGulp.NameDecorator(name);
}