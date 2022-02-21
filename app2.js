// Test file for OOP refactor of TDDLogger 

// import code from another file
const importedModule = require('./oop-logger.js')
let TDD = new importedModule.Logger()

// instantiate new class from imported class assignment export





// Mock "Application" functions to test using imported module

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









// In-file Test suite

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




