import * as typescript from 'gulp-typescript';
import * as TSGulp from './src';
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