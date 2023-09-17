/// <reference types="cypress" />

describe('JSON Objects in Cypress', () => {

    it('JSON object', () => {
        cy.openHomePage()

        const simpleObject = {"key": "value", "key2": "value2"}

        const simpleArray = ["one", "two", "three"]

        const arrayObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]

        const typesOfData = {"string": "This is a simple string", "number": 10}

        const mix = {
            "FirstName": "Anna", 
            "Lastname": "TrickyDuck",
            "Age": 34,
            "Students": [
                {
                    "FirstName": "UserOne", 
                    "Lastname": "LastnameOne"
                },
                {
                    "FirstName": "UserTwo", 
                    "Lastname": "LastnameTwo"
                }
            ]
        }
        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArray[2])
        console.log(arrayObjects[2].key3)
        console.log(mix.Students[0])

        const firstnameSecondStudent = mix.Students[1].FirstName
        console.log(firstnameSecondStudent)
    })
})