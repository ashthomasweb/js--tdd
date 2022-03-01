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

const uLog = new importObj.uLog()

runTests = () => {
    // // input syntax
    // uLog.test(runThisFunction, [input], expectedReturn, expectedToFail)
    
    // 1
    uLog.test(inputToOutput, hal(), 'hi hal')

    // 2 - expect failure
    uLog.test(inputToOutput, 'hi ash', 'hi dave', true)

    // 3 - expect failure 
    uLog.test(returnTypeString, null, "string", true)

    // 4
    uLog.test(returnTypeString, null, "string")

    // 5
    uLog.test(innerFrameGenerator, ['red', 4, 5, 'vertical'], ['Vertical Red Rectangle', 18])

    // 6
    uLog.test(innerFrameGenerator, ['greenish', 4, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 18])

    // 7 - expect failure
    uLog.test(innerFrameGenerator, ['greenish', 2, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 14])

    // 8 
    uLog.test(innerFrameGenerator, ['greenish', 20, 5, 'diagonal'], ['Diagonal Greenish Rectangle', 50])

    // 9 - expect failure - unknown how object will log
    uLog.test(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 44 units around.', undefined], true)

    // 10 - duplicate as above without expected fail
    uLog.test(objectFrameGenerator, ['blue', 10, 12, 'rectangular'], ['Rectangular Blue shape that is 45 units around.', "[object Object]"])

    // 11 - testing child method - It works! Simply export/import the highest level function
    uLog.test(doublePeri, [2,3], 20)

    // ISSUE
    // 12 - expect fail, current implementation CANNOT accept value that matches the return of an object
    class Rectangle {
        constructor(length, width, input) {
            this.length = length
            this.width = width
            this.type = input
        }
    }
    // let rect = new Rectangle(2, 4, 'rectangle')
    uLog.test(rectGen, [2, 4, 'rectangle'], new Rectangle(2, 4, 'rectangle'), true)
    // END ISSUE

    // 13 - arrays still need to be wrapped in another array. Needs conditional handling in Class definition
    let array = [3, 2, 45, 4, 56] 
    uLog.test(maxIterateApply, [array], [1,2,3,4,2], true)

    // 14 
    uLog.test(maxIterateApply, undefined, 3)

    // 15 - original solution, now tested with input as array in uLog Class
    uLog.test(maxIterate, undefined, 2, true)

    // 16 - comment test
    uLog.test(maxIterateApply, undefined, 3, false, 'This should pass with flying colors!')
    
}

uLog.run(runTests, 'Set of tests for Mock Application')

// END of document 
