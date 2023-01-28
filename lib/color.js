const chalk = require("chalk")

const color = (text, color) => {
return !color ? chalk.greenBright(text) : chalk.keyword(color)(text)
}

const orange = (text, orange) => {
return !orange ? chalk.yellow(text) : chalk.keyword(yellow)(text)
}

const green = (text, green) => {
return !green ? chalk.green(text) : chalk.keyword(green)(text)
}

const red = (text, red) => {
return !red ? chalk.red(text) : chalk.keyword(red)(text)
}

module.exports = { color, orange, green, red }