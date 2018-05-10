# TSGulp

Helpful Typescript Decorators for Gulp


# Installation

* NPM: `npm install tsgulp --save-dev`

*Note: It's recommended to additionally install ts-node to allow gulp to read Typescript files*

* NPM: `npm install ts-node --save-dev`

# Documentation

Coming soon!

# Example `gulpfile.ts`

```ts
import * as typescript from 'gulp-typescript';
import { Project, Dependencies, Default } as TSGulp from 'tsgulp';
import gulp  from 'gulp';
import del from 'del';


@Project()
class GulpFile {
    distFolder = 'dist';
    tsProject = typescript.createProject('tsconfig.json');

    clean() {
        return del(this.distFolder);
    }

    @Dependencies('clean')
    compile() {
        this.tsProject.src()
            .pipe(this.tsProject())
            .pipe(gulp.dest(this.distFolder));
    }

    @Default()
    @Dependencies('clean', 'compile')
    distribute() { }
}
```
