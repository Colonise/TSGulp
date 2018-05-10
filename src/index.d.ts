export as namespace TSGulp;

declare const TSGulp: TSGulp.TSGulp;
export = TSGulp;

declare namespace TSGulp {
    interface TSGulp {
        /**
         * Declares a project.
         * 
         * Each method within the project becomes a gulp task.
         */
        Project(): ClassDecorator;
        /**
         * Declares a project.
         * 
         * Each method within the project becomes a gulp task.
         * 
         * @param name Project's name
         */
        Project(name: string): ClassDecorator;
        /**
         * Declares a project.
         * 
         * Each method within the project becomes a gulp task.
         * 
         * @param options The Project's options
         */
        Project(options: ProjectOptions): ClassDecorator;
        /**
         * Declares a project.
         * 
         * Each method within the project becomes a gulp task.
         * 
         * @param name Project's name
         * @param options The Project's options
         */
        Project(name: string, options: ProjectOptions): ClassDecorator;

        /**
         * Declares a task's name.
         * 
         * Shorthand for: gulp.task(name, _, _);
         * 
         * @param name
         */
        Name(name: string): MethodDecorator;

        /**
         * Shorthand for @Name('default')
         */
        Default(): MethodDecorator;

        /**
         * Declares a task's dependencies.
         * 
         * Shorthand for: gulp.task(_, [...dependencies], _);
         * 
         * @param dependencies the names of the tasks this task depends on
         */
        Dependencies(...dependencies: string[]): MethodDecorator;
    }

    /**
     * Project options
     */
    interface ProjectOptions {
        /**
         * Project's name
         */
        name?: string;
    }
}