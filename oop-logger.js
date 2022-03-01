// Main file for uLog 

const fs = require('fs')

let toLog = ''
let ansi = '\033'

logColor = (color, input) => {
    let beginColor = ansi
    let colorCode = ''
    let reset = '\033[39m'
    switch (color) {
        case 'red':
            colorCode = `[31m`
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

exports.uLog = class UnitLogger {
    constructor() {
        this.testCount = 0
    }

    iterateTest = () => {
        this.testCount++
    }

    displayTestCount = () => {
        return this.testCount
    }

    testLogger = (testOutcome, expectedReturn, actualReturn, expectedFail, appFunction, input, comment) => {
        let rawOutcome = testOutcome
        let resultColor
        let anticFail
        function setRed() {
            testOutcome = logFail()
            resultColor = 'red'
            rawOutcome = '**Fail**'
        }
        function setGreen() {
            testOutcome = logPass()
            resultColor = 'green'
            rawOutcome = 'Pass'
        }

        testOutcome ? setGreen() : setRed()
        
        function Result(value, type) {
            this.value = value;
            this.type = type;
        }
        // object instanceof needs to log as appropriate type
        // test output for debug/console
        let resultTable = {}
        resultTable.expected = new Result(expectedReturn, typeof (expectedReturn))
        resultTable.actual = new Result(actualReturn, typeof (actualReturn))

        expectedFail ? (anticFail = logColor('yellow', ' Anticipating error:')) : (anticFail = '')
        console.log(logColor(resultColor, `\n\nTest ${this.displayTestCount()}:`))
        console.log(`Results:${anticFail} ${testOutcome}`)
        if (testOutcome === logFail() || expectedFail) {
            console.table(resultTable)
        }

        // test output template for txt log
        let logComment = comment
        comment ? (logComment = `\n${comment}\n`) : (logComment = '')
        let content = 
`Test ${this.displayTestCount()}
Results    :${expectedFail ? ' Expected to Fail:' : ''} ${rawOutcome}
***********${logComment}
Definition : \n\n${appFunction}\n
Expected   : ${expectedReturn}
w/ type    : ${typeof(expectedReturn)}
Actual     : ${actualReturn}
w/ type    : ${typeof(actualReturn)}
From Input : ${input}
w/ type    : ${typeof(input)}
___________\n\n\n\n\n\n`

        fs.writeFile('./newLog.txt', content, { flag: 'a+' }, err => {
            if (err) {
                console.log(err)
                return
            }
        })
    }
    
    // potential refactor model
    // uLog.test(() => maxIterate([1,2,3,4,5,8]), expectedReturn, expectedToFail)

    test = (appFunction, input, expectedReturn, expectedFail = false, comment) => {
        this.iterateTest()
        let funcReturn 
        let testOutcome
        input instanceof Array ? (funcReturn = appFunction(...input)) : (funcReturn = appFunction(input))
        let rawReturn = funcReturn
        funcReturn instanceof Array && (funcReturn = `${funcReturn}`) // should split variable off so that actual return value is still available
        let rawExpect = expectedReturn
        expectedReturn instanceof Array && (expectedReturn = `${expectedReturn}`)
        funcReturn === expectedReturn ? (testOutcome = true) : (testOutcome = false)
        if (expectedFail) {
            if (testOutcome === false) {
                (testOutcome = true)
            } else {
                (testOutcome = false)
            }
        }
        this.testLogger(testOutcome, rawExpect, rawReturn, expectedFail, appFunction, input, comment)
    }

    run = (input, description) => {
        let spacer = `*** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***\n`
        let title = `\n${spacer}${spacer}${spacer}Block Name : ${description}\nDate Run   : ${Date()}\n\n`
        fs.writeFile('./newLog.txt', title, { flag: 'a+' }, err => {
            if (err) {
                console.log(err)
                return
            }
        })
        console.log(`\n${ansi}[33mTest Suite Initialized${ansi}[39m`)
        input()
        console.log(`\n${ansi}[33mTest Suite Finished${ansi}[39m\n\n`)
    }

}

// END of module
