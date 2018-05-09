import * as TSGulp from '../TSGulp';
import { processNameAndOptions } from '../utils';

export function Default(): MethodDecorator {
    return TSGulp.DefaultDecorator();
}