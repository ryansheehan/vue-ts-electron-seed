const path = require('path');
const chalk = require('chalk');
const { say } = require('cfonts')
const { spawn } = require('child_process')
const express = require('express');
const webpack = require('webpack');
const electron = require('electron');
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../config');
const rendererConfig = require('./webpack.dev.conf');
const electronConfig = require('./webpack.electron.conf')({});
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const connectHistoryApiFallback = require('connect-history-api-fallback');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

function logStats(proc, data) {
    let log = ''

    log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
    log += '\n\n'

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n'
        })
    } else {
        log += `  ${data}\n`
    }

    log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

    console.log(log)
}

const port = process.env.PORT || config.dev.port;
const proxyTable = config.dev.proxyTable;
let hotMiddleware;
function startRenderer() {
    return new Promise(resolve => {
        const app = express();
        const compiler = webpack(rendererConfig);

        const devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: rendererConfig.output.publicPath,
            quiet: true
        });

        hotMiddleware = webpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500
        });
        // force page reload when html-webpack-plugin template changes
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
                hotMiddleware.publish({ action: 'reload' })
                cb()
            })
        });
        compiler.plugin('done', stats => {
            logStats('Renderer', stats)
        });

        // proxy api requests
        Object.keys(proxyTable).forEach(function (context) {
            let options = proxyTable[context];
            if (typeof options === 'string') {
                options = { target: options };
            }
            app.use(proxyMiddleware(options.filter || context, options));
        });

        // handle fallback for HTML5 history API
        app.use(connectHistoryApiFallback());

        // serve webpack bundle output
        app.use(devMiddleware);

        // enable hot-reload and state-preserving
        // compilation error display
        app.use(hotMiddleware);

        // serve pure static assets
        const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
        app.use(staticPath, express.static('./static'));

        const uri = `http://localhost:${port}`;

        console.log('> Starting dev server...');
        devMiddleware.waitUntilValid(() => {
            console.log('> Listening at ' + uri + '\n');
            resolve();
        })

        const server = app.listen(port);
    })
}

let electronProcess = null;
let manualRestart = false;
function startMain() {
    return new Promise(resolve => {
        rendererConfig.entry.main = [path.join(__dirname, '../src/electron/index.dev.js')].concat(electronConfig.entry.main)

        const compiler = webpack(electronConfig);

        compiler.plugin('watch-run', (compilation, done) => {
            logStats('Main', chalk.white.bold('compiling...'))
            hotMiddleware.publish({ action: 'compiling' })
            done();
        });

        compiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }

            logStats('Main', stats);

            if (electronProcess && electronProcess.kill) {
                manualRestart = true;
                process.kill(electronProcess.pid);
                electronProcess = null;
                startElectron();

                setTimeout(() => manualRestart = false, 5000);
            }

            resolve();
        })
    });
}

function electronLog(data, color) {
    let log = ''
    data = data.toString().split(/\r?\n/)
    data.forEach(line => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        console.log(
            chalk[color].bold('┏ Electron -------------------') +
            '\n\n' +
            log +
            chalk[color].bold('┗ ----------------------------') +
            '\n'
        )
    }
}

function startElectron() {
    electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')]);

    electronProcess.stdout.on('data', data => electronLog(data, 'blue'));
    electronProcess.stderr.on('data', data => electronLog(data, 'red'));

    electronProcess.on('close', () => {
        if (!manualRestart) {
            process.exit();
        }
    });
}

async function init() {
    try {
        await Promise.all([startRenderer(), startMain()]);
        startElectron();
    } catch (err) {
        console.error(err);
    }
}

init();
