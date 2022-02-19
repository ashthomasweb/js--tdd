// Test1 file for Test Driven Development practice


// write function that takes an app function as an input, 
// checks against expected output, and returns a pass/fail
// message, and the expected and actual return
function takeMyFunc(appFunction, input, expectedReturn, expectedFail = false) {
    input instanceof Array ? (funcReturn = appFunction(...input)) : (funcReturn = appFunction(input))
    funcReturn instanceof Array && (funcReturn = `${funcReturn}`) // should split variable off so that actual return value is still available
    expectedReturn instanceof Array && (expectedReturn = `${expectedReturn}`)
    funcReturn === expectedReturn & !expectedFail ? (message = "PASS") : (message = "**FAIL**")
    message === "**FAIL**" & expectedFail && (message = "PASS")
    testCount++
    testLogger(message, expectedReturn, funcReturn)
}

function testLogger(message, expectedReturn, funcReturn) {
    console.log(`\n\nTest ${testCount}:`)
    console.log(`Result: ${message}`)
    if (message === '**FAIL**') {
        console.log('Expect value: ' + expectedReturn)
        console.log(`Expect Type: ${typeof(expectedReturn)}`)
        console.log(`Actual value: ${funcReturn}`)
        console.log(`Actual Type: ${typeof(funcReturn)}`)
    }
}

let testCount = 0

function runTests() {
    console.log('\nTest Suite Initialized')
    testCount = 0

    // 1
    takeMyFunc(inputToOutput, hal(), 'hi dave')

    // 2 - expect failure
    takeMyFunc(inputToOutput, 'hi ash', 'hi dave', true)

    // 3 - expect failure - issue found HERE
    takeMyFunc(returnTypeString, null, "integer", true)

    // 4
    takeMyFunc(returnTypeString, null, "string")
    
    // 5
    takeMyFunc(innerFrameGenerator, ['red', 4, 5, 'vertical'], ['Vertical Red Rectangle', 18])

    // 6
    takeMyFunc(innerFrameGenerator, ['greenish', 4, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 18])

    // 7 - expect failure
    takeMyFunc(innerFrameGenerator, ['greenish', 2, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 18], true)

    // 8 
    takeMyFunc(innerFrameGenerator, ['greenish', 20, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 50])

    // 9 - expect failure - unknown how object will log
    takeMyFunc(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 44 units around.', undefined], true)

    // 10 - duplicate as above without expected fail
    takeMyFunc(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 45 units around.', "[object Object]"])

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