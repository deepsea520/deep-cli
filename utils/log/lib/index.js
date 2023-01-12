'use strict';


const log = require('npmlog')


// log.level = 'verbose' 能显示的模式
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info' 

// 提示命令最前面添加文本
log.heading = '[deepsea]'
// 样式也可以修改
log.headingStyle = { fg: 'white', bg: 'black' }

// 增加自定义命令
log.addLevel('success', 2000, { fg: 'green', bold: true })


module.exports = log

