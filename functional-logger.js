// Test1 file for Test Driven Development practice


function logPass() {
    return logColor('green', 'Pass')
}

function logFail() {
    return logColor('red', '**Fail**')
}

function logColor(color, input) {
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
        case 'blue':
            colorCode = `[34m`
          break;
        case 'magenta':
            colorCode = `[35m`
          break;
        case 'cyan':
            colorCode = `[36m`
            break;
        default:
            colorCode = `[39m`
      }
    return `${beginColor}${colorCode}${input}${reset}`
}

// write function that takes an app function as an input, 
// checks against expected output, and returns a pass/fail
// message, and the expected and actual return
function test(appFunction, input, expectedReturn, expectedFail = false) {
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
    testCount++
    testLogger(message, rawExpect, rawReturn, expectedFail)
}

function testLogger(message, expectedReturn, actualReturn, expectedFail) {
    
    setRed = () => {
        message = logFail()
        resultColor = 'red'
    }
    setGreen = () => {
        message = logPass()
        resultColor = 'green'
    }
    message ? setGreen() : setRed()
    function Result(value, type) {
        this.value = value;
        this.type = type;
    }
    let exp = new Result(expectedReturn, typeof(expectedReturn))
    let act = new Result(actualReturn, typeof(actualReturn))
    let resultTable = {}
    resultTable.expected = exp
    resultTable.actual = act
    expectedFail ? (failValue = logColor('yellow', ' Anticipating error:')) : (failValue = '')
    console.log(logColor(resultColor, `\n\nTest ${testCount}:`))
    console.log(`Results:${failValue} ${message}`)
    if (message === logFail() || expectedFail ) {
        console.table(resultTable)
    }
}

let testCount = 0

function runTests() {
    console.log('\n\033[33mTest Suite Initialized\033[39m')
    testCount = 0

    // 1
    test(inputToOutput, hal(), 'hi hal')

    // 2 - expect failure
    test(inputToOutput, 'hi ash', 'hi dave', true)

    // 3 - expect failure - issue found HERE
    test(returnTypeString, null, "string", true)

    // 4
    test(returnTypeString, null, "string")
    
    // 5
    test(innerFrameGenerator, ['red', 4, 5, 'vertical'], ['Vertical Red Rectangle', 18])

    // 6
    test(innerFrameGenerator, ['greenish', 4, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 18])

    // 7 - expect failure
    test(innerFrameGenerator, ['greenish', 2, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 14])

    // 8 
    test(innerFrameGenerator, ['greenish', 20, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 50])

    // 9 - expect failure - unknown how object will log
    test(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 44 units around.', undefined], true)

    // 10 - duplicate as above without expected fail
    test(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 45 units around.', "[object Object]"])

}

runTests()
















// Mock Application functions

function inputToOutput(input) {
    return input
}

function hal() {
    return 'hi hal'
}

function returnTypeString() {
    let obj = 'This string'
    return typeof(obj)
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