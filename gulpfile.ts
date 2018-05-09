import * as typescript from 'gulp-typescript';
import * as TSGulp from './src';
import del from 'del';
var gulp = require('gulp');


@TSGulp.Project()
class GulpFile {
    distFolder = 'dist';
    tsProject = typescript.createProject('tsconfig.json');

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
    distribute() {
        gulp.src(['index.d.ts'])
            .pipe(gulp.dest(this.distFolder));
    }
}