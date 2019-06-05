/*
 * 
 *
 */

/* 
 * DEPLOYMENT
 * ==========
 * 
 * ! imp: default project is huge in size mainly due to node_modules and a lot of dependencies that are 
 * by default included in project. 
 * 
 * Alternatives: 
 * Remove the node_modules folder and run npm install on server where application is deployed. Problem is
 * this will again swell to a large size due to dependencies the project may not require. 
 * 
 * Best Practices:
 * ---------------
 * 
 * Minification: 
 * Use tools to minify code to remove all unnecessary stuff to reduce actual project size (necessary files)
 * 
 * Uglification: 
 * Use tools to uglify code i.e. reduce variable names size e.g. HomeComponent(private httpRequest) => 
 * HC(private hr). We don't need to worry about this as tools handle conversion and deployed code is read
 * by machine ; )
 * 
 * Bundling: 
 * Bundle (itself a js) is combination of multiple js files. Bundling reduces network trips by getting all 
 * js in one trip rather than segregated js files as we've structured in project. 
 * :wondering: machines are so different from humans : /
 * 
 * Dead Code Elimination:
 * Delete code that is not used anywhere and also libraries that are not required. 
 * 
 * Ahead of time compilation:
 * Pre-compile angular componets before bundling. >> Faster, smaller bundle, catch errors at compile time,
 * better security. Btw this is anti JIT compilation that happens at runtime.
 */