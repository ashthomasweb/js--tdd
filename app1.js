// App1 file for Test Driven Development practice

let importedObj = require('./node_modules/export-test1.js')



function simpleLog(input) {
    return input
}

importedObj.myFunc('hi')

let newClass = new importedObj.Logger()

newClass.print('hi ash')
// myLogger(simpleLog('hi ash'))