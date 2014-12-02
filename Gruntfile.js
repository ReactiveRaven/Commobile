module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            protractor: {
                files: [
                    "www/**/*.html",
                    "www/js/**/*.js",
                    "www/mocks/**/*.js",
                    "test/features/**/*.js",
                    "test/protractor.*.js"
                ],
                tasks: [ "protractor" ],
                options: {
                    spawn: false,
                },
            },
        },
        protractor_webdriver: {
            options: {
                // Task-specific options go here.
                keepAlive: true,
                path: "node_modules/protractor/bin/",
                quiet: true
            },
            all: {
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/example/conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            development: {
                options: {
                    configFile: "test/protractor.standalone.config.js",
                    args: {
                        cucumberOpts: {
                            tags: "@active"
                        }
                    } // Target-specific arguments
                }
            },
        },
    });

    grunt.registerTask("start-protractor", ["protractor_webdriver", "watch:protractor"]);
};
