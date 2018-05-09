export as namespace TSGulp;

declare const TSGulp: TSGulp.TSGulp;
export = TSGulp;

declare namespace TSGulp {
    interface TSGulp {
        /**
         * Declares a project.
         * Each method within the project 
         * 
         * @since 1.0.0
         * 
         * @param name Project's name
         * @param options @see ProjectOptions
         */
        Project(): ClassDecorator;
        Project(name: string): ClassDecorator;
        Project(options: ProjectOptions): ClassDecorator;
        Project(name: string, options: ProjectOptions): ClassDecorator;

        /**
         * Declares a task's name.
         * 
         * Shorthand for: gulp.task(name, _, _);
         * 
         * @requires Project on class
         * @since 1.0.0
         * 
         * @param name
         */
        Name(name: string): MethodDecorator;

        /**
         * Shorthand for @Name('default')
         * 
         * @requires Project on class
         * @since 1.0.0
         */
        Default(): MethodDecorator;

        /**
         * Declares a task's dependencies.
         * 
         * Shorthand for: gulp.task(_, [...dependencies], _);
         * 
         * @requires Project on class
         * @since 1.0.0
         * 
         * @param dependencies the names of the tasks this task depends on
         */
        Dependencies(...dependencies: string[]): MethodDecorator;
    }

    /**
     * Project options
     * 
     * @since 1.0.0
     */
    interface ProjectOptions {
        /**
         * Project name
         */
        name?: string;
    }
}