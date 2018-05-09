import * as TSGulp from '../TSGulp';

export function Dependencies(...dependencies: string[]): MethodDecorator {
    return TSGulp.DependenciesDecorator(dependencies);
}