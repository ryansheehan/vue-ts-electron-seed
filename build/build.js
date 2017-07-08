require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const { say } = require('cfonts');
const webpack = require('webpack');
const { spawn } = require('child_process');
const Multispinner = require('multispinner');
const config = require('../config');

const rendererConfig = require('./webpack.prod.conf');
const electronConfig = require('./webpack.electron.conf');

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
const isCI = process.env.CI || false

function pack(config) {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                console.log("here 1")
                console.log(err);
                reject(err.stack || err);
            } else if (stats.hasErrors()) {
                let err = '';

                stats.toString(
                    { chunks: false, colors: true }
                ).split(/\r?\n/).forEach(line => {
                    err += `    ${line}\n`
                });

                console.log("here 2")
                console.log(err);

                reject(err);
            } else {
                resolve(stats.toString({
                    chunks: false,
                    colors: true
                }));
            }
        })
    })
}

function build() {
    rm.sync(config.build.assetsRoot);
    const tasks = ['electron', 'renderer'];
    const m = new Multispinner(tasks, {
        preText: 'building',
        postText: 'process'
    });

    let results = '';

    m.on('success', () => {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log(`\n\n${results}`);
        console.log(`${okayLog}take it away ${chalk.yellow('`electron-builder`')}\n`);
        process.exit();
    });

    pack(electronConfig({ production: true })).then(result => {
        results += result + '\n\n';
        m.success('electron');
    }).catch(err => {
        m.error('electron');
        console.log(`\n  ${errorLog}failed to build electron process`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });

    pack(rendererConfig).then(result => {
        results += result + '\n\n';
        m.success('renderer');
    }).catch(err => {
        m.error('renderer');
        console.log(`\n  ${errorLog}failed to build renderer process`);
        console.error(`\n${err}\n`);
        process.exit(1);
    });
}


build();
