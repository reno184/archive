module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            less: {
                files: 'assets/less/*.less',
                tasks: ['less']
            }
        },
        less: {
            development: {
                files: {
                    "assets/css/style.css": "assets/less/style.less"
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'assets/css/test.css': ['assets/css/test.css']
                }
            }
        },
        serve: {
            options: {
                port: 9000
            }
        }
    });
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //lancer grunt serve, puis une fois le server lancé, il faut faire ctr + c pour lancer le watcher...  
    grunt.registerTask('server', ['serve', 'watch']);
}
