# TSGulp

[![Greenkeeper badge](https://badges.greenkeeper.io/Colonise/TSGulp.svg)](https://greenkeeper.io/)

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
import * as TSGulp from 'tsgulp';
import gulp from 'gulp';
import del from 'del';


@TSGulp.Project()
class GulpFile {
    distFolder = 'dist';
    tsProject = typescript.createProject('tsconfig.json');

    constructor() {
        this.tsProject.config.exclude = [
            'gulpfile.ts'
        ];
    }

    clean() {
        return del(this.distFolder);
    }

    @TSGulp.Dependencies('clean')
    compile() {
        this.tsProject.src()
            .pipe(this.tsProject())
            .pipe(gulp.dest(this.distFolder));
    }

    @TSGulp.Default()
    @TSGulp.Dependencies('clean', 'compile')
    distribute() { }
}
```
