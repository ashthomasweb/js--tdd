// App1 file for Test Driven Development practice

let importedObj = require('./oop-logger.js')

importedObj.myFunc('hi')

let newClass = new importedObj.Logger()
newClass.print('hi ash')

function simpleLog(input) {
    return input
}

newClass.print(simpleLog('hi ashley'))

// END of document
