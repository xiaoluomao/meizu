const {task,src,dest,watch,series,parallel} = require('gulp');
const load = require('gulp-load-plugins')();
const del = require('del');

// 删除dist目录的内容
task('del',async ()=>{
    await del('./dist');
})

// 处理html
task('html',async ()=>{
    src('./src/html/*.html')
    .pipe(dest('./dist/html'))
    .pipe(load.connect.reload())//刷新
});

// 处理img
task('imgs',async ()=>{
    src('./src/imgs/**/*.*')
    .pipe(dest('./dist/imgs'))
    .pipe(load.connect.reload())//刷新
});

// 处理javascript
task('script',async ()=>{
    src('./src/script/*.js')
    .pipe(load.babel({ presets: ['@babel/preset-env']}))//转ES5
    .pipe(dest('./dist/script'))
    .pipe(load.connect.reload())//刷新
})

// 编译sass文件，转成纯css
task('sass',async ()=>{
    src('./src/sass/*.scss')
    .pipe(load.sassChina())// sass编译成css
    .pipe(dest('./dist/css'))
    .pipe(load.connect.reload())//刷新
})

// 处理php文件
task('php',async ()=>{
    src('./src/php/*.php')
    .pipe(dest('./dist/php'))
    .pipe(load.connect.reload())//刷新
})

// 处理data文件
task('data',async ()=>{
    src('./src/data/*.json')
    .pipe(dest('./dist/data'))
    .pipe(load.connect.reload())//刷新
})


// web服务器
task('connect',async ()=>{
    load.connect.server({
        root: './dist',
        livereload: true,
        port: 3000
    });
})

task('watch',async ()=>{
    watch('./src/html/*.html',series('html'));
    watch('./src/imgs/**/*.*',series('imgs'));
    watch('./src/script/*.js',series('script'));
    watch('./src/sass/*.scss',series('sass'));
    watch('./src/php/*.php',series('php'));
    watch('./src/data/*.json',series('data'));
})

// 构建并启动项目，开发版本
task('dev',series('del','html','imgs','script','sass','php','data','connect','watch'));
