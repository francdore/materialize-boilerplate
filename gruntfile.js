module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'tmp/styles.css': './src/sass/custom.scss'
                }
            }
        },
        cssmin: {
            production: {
                expand: false,
                files: {
                    "css/styles.min.css" : "./tmp/styles.css"
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'images/'
                }]
            }
        },
        copy: {
            fonts: {
                expand: true,
                dot: true,
                cwd: './src/fonts/',
                src: [
                    '**/*'
                ],
                dest: './fonts/'
            }
        },
        concat: {
            basic: {
                src: [
                    "./node_modules/materialize-css/js/initial.js",
                    "./node_modules/materialize-css/js/jquery.easing.1.3.js",
                    "./node_modules/materialize-css/js/animation.js",
                    "./node_modules/materialize-css/js/velocity.min.js",
                    "./node_modules/materialize-css/js/hammer.min.js",
                    "./node_modules/materialize-css/js/jquery.hammer.js",
                    "./node_modules/materialize-css/js/global.js",
                    "./node_modules/materialize-css/js/collapsible.js",
                    "./node_modules/materialize-css/js/dropdown.js",
                    "./node_modules/materialize-css/js/leanModal.js",
                    "./node_modules/materialize-css/js/materialbox.js",
                    "./node_modules/materialize-css/js/parallax.js",
                    "./node_modules/materialize-css/js/tabs.js",
                    "./node_modules/materialize-css/js/tooltip.js",
                    "./node_modules/materialize-css/js/waves.js",
                    "./node_modules/materialize-css/js/toasts.js",
                    "./node_modules/materialize-css/js/sideNav.js",
                    "./node_modules/materialize-css/js/scrollspy.js",
                    "./node_modules/materialize-css/js/forms.js",
                    "./node_modules/materialize-css/js/slider.js",
                    "./node_modules/materialize-css/js/cards.js",
                    "./node_modules/materialize-css/js/chips.js",
                    "./node_modules/materialize-css/js/pushpin.js",
                    "./node_modules/materialize-css/js/buttons.js",
                    "./node_modules/materialize-css/js/transitions.js",
                    "./node_modules/materialize-css/js/scrollFire.js",
                    "./node_modules/materialize-css/js/date_picker/picker.js",
                    "./node_modules/materialize-css/js/date_picker/picker.date.js",
                    "./node_modules/materialize-css/js/character_counter.js",
                    "./node_modules/materialize-css/js/carousel.js"
                ],
                dest: 'tmp/scripts.js',
            },
        },
        uglify: {
            vendorjs: {
                src: './tmp/scripts.js',
                dest: 'js/scripts.min.js'
            },
            appjs: {
                src: './src/js/app.js',
                dest: 'js/app.min.js'
            },
        },
        clean: {
            dev: {
                src: './tmp'
            }
        },
        watch: {
            sass: {
                files: ['./src/sass/**/*'],
                tasks: ['sass', 'cssmin', 'clean']
            },
            imagemin: {
                files: ['./src/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            fonts: {
                files: ['./src/fonts/**/*'],
                tasks: ['copy']
            },
            concat: {
                files: ['./src/js/app.js'],
                tasks: ['concat', 'uglify', 'clean']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks
    grunt.registerTask('default', ['sass', 'copy', 'concat', 'cssmin:production', 'uglify', 'copy:fonts', 'clean', 'watch']);
    grunt.registerTask('build', ['sass', 'copy', 'concat', 'uglify', 'cssmin:production', 'clean', 'watch']);
};