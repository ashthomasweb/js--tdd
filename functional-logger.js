// Test1 file for Test Driven Development practice

// class TDDHelper() {


// }
// let TDD = new TDDHelper()


// write function that takes an app function as an input, 
// checks against expected output, and returns a pass/fail
// message, and the expected and actual return


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


class TDDLogger {
    constructor() {
        this.testCount = 0
    }

    // var testCount = 0
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
        }
        testCount++

        let funcReturn
        let message
        input instanceof Array ? (funcReturn = appFunction(...input)) : (funcReturn = appFunction(input))
        let rawReturn = funcReturn
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

    run = (input) => {input()}
}

const TDD = new TDDLogger()


function runTests() {
    console.log('\n\033[33mTest Suite Initialized\033[39m')
    testCount = 0

    // 1
    TDD.takeMyFunc(inputToOutput, hal(), 'hi hal')

    // 2 - expect failure
    TDD.takeMyFunc(inputToOutput, 'hi ash', 'hi dave', true)

    // 3 - expect failure 
    TDD.takeMyFunc(returnTypeString, null, "number", true)

    // 4
    TDD.takeMyFunc(returnTypeString, null, "string")

    // 5
    TDD.takeMyFunc(innerFrameGenerator, ['red', 4, 5, 'vertical'], ['Vertical Red Rectangle', 18])

    // 6
    TDD.takeMyFunc(innerFrameGenerator, ['greenish', 4, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 18])

    // 7 - expect failure
    TDD.takeMyFunc(innerFrameGenerator, ['greenish', 2, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 14])

    // 8 
    TDD.takeMyFunc(innerFrameGenerator, ['greenish', 20, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 50])

    // 9 - expect failure - unknown how object will log
    TDD.takeMyFunc(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 44 units around.', undefined], true)

    // 10 - duplicate as above without expected fail
    TDD.takeMyFunc(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 45 units around.', "[object Object]"])


    console.log('\n\033[33mTest Suite Finished\033[39m\n\n')
}

TDD.run(runTests)
















// Mock Application functions

function inputToOutput(input) {
    return input
}

function hal() {
    return 'hi hal'
}

function returnTypeString() {
    let obj = 'This string'
    return typeof (obj)
}

function innerFrameGenerator(color, length, width, orientation) {
    let colorValue = color[0].toUpperCase() + color.substring(1)
    let position = orientation[0].toUpperCase() + orientation.substring(1)
    let description = `${position} ${colorValue} Rectangle`
    let perimeter = length * 2 + width * 2
    let output = [description, perimeter]
    return output
}

function objectFrameGenerator(color, length, width, type) {
    let shape = rectGen(length, width, type)
    let colorValue = color[0].toUpperCase() + color.substring(1)
    let shapeType = shape.type[0].toUpperCase() + shape.type.substring(1)
    let perimeter = length * 2 + width * 2
    let description = `${shapeType} ${colorValue} shape that is ${perimeter} units around.`
    return [description, shape]
}

function rectGen(length, width, input) {
    class Rectangle {
        constructor(length, width, input) {
            this.length = length
            this.width = width
            this.type = input
        }
    }
    let rect = new Rectangle(length, width, input)
    return rect
}


// ISSUE - expect failure conditional is not conditional, it's absolute. If it expects failure and it's correct, it still fails.