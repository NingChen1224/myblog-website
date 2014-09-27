module.exports=function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON("package.json"),
		build_js_root:"js",
		build_css_root:"css",
		js_root:"src/js",
		css_root:"src/css",
		browserify:{
			compile:{
				expand:true,
				cwd:"src/js",
				src:["*.js"],
				dest:"<%= build_js_root %>",
				ext:".js"
			}
		},
		uglify:{
			options:{
				sourceMap:true
			},
			compile:{
				expand:true,
				cwd:'<%= build_js_root %>',
				src:["*.js",'!*.min.js'],
				dest:"<%= build_js_root %>",
				ext:".min.js"
			}
		},
		less:{
			options:{
				compress:true
			},
			page:{
				expand:true,
				cwd:"src/css",
				src:['*.less'],
				dest:'<%= build_css_root %>/',
				ext:'.min.css'
			},
		},
		watch:{
			options:{
				livereload:true
			},
			js:{
				files:['<%= js_root %>/*.js'],
				tasks:['browserify:compile','uglify:compile']
			},
			html:{
				files:['../../static/*.html'],
				tasks:['default']
			},
			css:{
				files:['<%= css_root %>/*.less'],
				tasks:['less:page']
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-less");

	grunt.registerTask("default",['browserify','uglify','less']);
};