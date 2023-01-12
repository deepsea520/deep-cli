'use strict';

module.exports = core;

const semver = require('semver')
const colors = require('colors/safe')
const log = require('@deep-cli/log')
const constant = require('./const')
const pkg = require('../package.json')

let args, config

function core() {
  try {
    checkNodeVersion()
    checkPkgVersion()
    checkRoot()
    checkInputArgs()
    checkEnv()
  } catch (error) {
    log.error(error.message)
  }
}

// 查看环境变量
function checkEnv(){
  const dotenv = require('dotenv')
  config = dotenv.config()
  log.verbose('环境变量', config)
}

// 查看输入参数
function checkInputArgs(){
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  checkArgs()
}

function checkArgs(){
  if(args.debug){
    process.env.LOG_LEVEL = 'verbose'
  } else {
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL
}

// 检查 root 权限
function checkRoot(){
  const rootCheck = require('root-check')
  rootCheck()
}


// 检查 node 版本号
function checkNodeVersion(){
  const currentVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VERSION
  // 如果当前版本不是 大于等于 规定最小版本时
  if(!semver.gte(currentVersion, lowestVersion)){
    throw new Error(colors.red(`deep-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`))
  }
}

// 检查版本号
function checkPkgVersion(){
  log.info('pkg version', pkg.version)
}