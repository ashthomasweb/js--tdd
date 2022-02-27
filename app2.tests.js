let importObj = require('./oop-logger.js')

const {
    inputToOutput,
    hal,
    returnTypeString,
    innerFrameGenerator,
    objectFrameGenerator,
    rectGen,
    maxIterate,
    maxIterateApply
} = require('./app2.js')

const TDD = new importObj.Logger()

runTests = () => {
    // // input syntax
    // TDD.takeMyFunc(runThisFunction, [input], expectedReturn, expectedToFail)
    
    testCount = 0

    // 1
    TDD.takeMyFunc(inputToOutput, hal(), 'hi hal')

    // 2 - expect failure
    TDD.takeMyFunc(inputToOutput, 'hi ash', 'hi dave', true)

    // 3 - expect failure 
    TDD.takeMyFunc(returnTypeString, null, "string", true)

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

    // 11 - testing child method - It works! Simply export/import the highest level function
    TDD.takeMyFunc(doublePeri, [2,3], 20)

    // 12 - expect fail, current implementation CANNOT accept value that matches the return of an object
    class Rectangle {
        constructor(length, width, input) {
            this.length = length
            this.width = width
            this.type = input
        }
    }
    // let rect = new Rectangle(2, 4, 'rectangle')
    TDD.takeMyFunc(rectGen, [2, 4, 'rectangle'], new Rectangle(2, 4, 'rectangle'))

    // 13 - unsure of type handling here...
    let array = [3, 2, 45, 4, 56]
    TDD.takeMyFunc(maxIterateApply, [array], [1,2,3,4,2], true)

    // 14 
    TDD.takeMyFunc(maxIterateApply, undefined, 3)

    // 15 - original solution, now tested with input as array
    TDD.takeMyFunc(maxIterate, undefined, 2, true)

    // // 16 - potential refactor model
    // TDD.takeMyFunc(() => maxIterate([1,2,3,4,5,8]), expectedReturn, expectedToFail)

}

TDD.run(runTests)

// END of document 
