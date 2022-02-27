// Test file for Test Driven Development practice

const fs = require('fs')

let toLog = ''

logColor = (color, input) => {
    let beginColor = '\033'
    let colorCode = ''
    let reset = '\033[39m'
    switch (color) {
        case 'red':
            colorCode = '[31m'
            break;
        case 'green':
            colorCode = `[32m`
            break;
        case 'yellow':
            colorCode = `[33m`
            break;
        case 'magenta':
            colorCode = `[35m`
            break;
        default:
            colorCode = `[39m`
    }
    return `${beginColor}${colorCode}${input}${reset}`
}

logPass = () => {
    return logColor('green', 'Pass')
}

logFail = () => {
    return logColor('red', '**Fail**')
}

exports.Logger = class TDDLogger {
    constructor() {
        // this.testCount = 0
    }

    takeMyFunc = (appFunction, input, expectedReturn, expectedFail = false) => {
        
        function testLogger(message, expectedReturn, actualReturn, expectedFail) {
            let resultColor
            let failValue
            function setRed() {
                message = logFail()
                resultColor = 'red'
            }
            function setGreen() {
                message = logPass()
                resultColor = 'green'
            }

            message ? setGreen() : setRed()
            
            function Result(value, type) {
                this.value = value;
                this.type = type;
            }
            let resultTable = {}
            resultTable.expected = new Result(expectedReturn, typeof (expectedReturn))
            resultTable.actual = new Result(actualReturn, typeof (actualReturn))

            expectedFail ? (failValue = logColor('yellow', ' Anticipating error:')) : (failValue = '')
            
            console.log(logColor(resultColor, `\n\nTest ${testCount}:`))
            console.log(`Results:${failValue} ${message}`)
            if (message === logFail() || expectedFail) {
                console.table(resultTable)
            }
            let content = Date() + 'Test ' + testCount + '\n' + JSON.stringify(resultTable) + '\n' + appFunction + '\n\n'
            fs.writeFile('./newLog.txt', content, { flag: 'a+' }, err => {
                if (err) {
                    console.error(err)
                    return
                  }
                  // file written successfully
            })
        }

        testCount++

        let funcReturn 
        let message
        input instanceof Array ? (funcReturn = appFunction(...input)) : (funcReturn = appFunction(input))
        let rawReturn = funcReturn
        console.log(rawReturn instanceof Array)
        funcReturn instanceof Array && (funcReturn = `${funcReturn}`) // should split variable off so that actual return value is still available
        let rawExpect = expectedReturn
        expectedReturn instanceof Array && (expectedReturn = `${expectedReturn}`)
        funcReturn === expectedReturn ? (message = true) : (message = false)
        if (expectedFail) {
            if (message === false) {
                (message = true)
            } else {
                (message = false)
            }
        }
        testLogger(message, rawExpect, rawReturn, expectedFail)
    }

    run = (input) => {

    console.log(`\n${ansi}[33mTest Suite Initialized${ansi}[39m`)
        
        input()
        console.log(`\n${ansi}[33mTest Suite Finished${ansi}[39m\n\n`)
    
    }

}

let ansi = '\033'

// END of module
