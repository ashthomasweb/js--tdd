// Test file for OOP refactor of TDDLogger 

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

    doublePeri = (x, y) => {
        return (x * 4) + (y * 4)
    }
    let rect = new Rectangle(length, width, input)
    return rect
}

module.exports = {
    inputToOutput,
    hal,
    returnTypeString,
    innerFrameGenerator,
    objectFrameGenerator,
    rectGen,
}

// END of document