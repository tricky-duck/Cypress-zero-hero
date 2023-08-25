// test should start with keyword: describe() or context()
/// <reference types="cypress" />
describe('Our first suite', () => { //open callback function

    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get('input') //by tag name
        cy.get('#inputEmail1') //by ID
        cy.get('.input-full-width') //by class name
        cy.get('[placeholder]') // by atribute name
        cy.get('[placeholder="Email"]') // by attribute name and value
        cy.get('[class="input-full-width size-medium shape-rectangle"]') // by class value
        cy.get('input[placeholder="Email"]')  //by tag name and attribute with value
        cy.get('[placeholder="Email"][fullwidth][type="email"]') //by different attributes
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width') // by tag name, attribute with value, ID and class name
        // The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    it.only('second test', ()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 
        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', "Sign in")
            .parents('form')
            .find('nb-checkbox')
            .click()
    })  
})
 
// describe('Our first suite', () => { //opencallback function

//     describe ('Our suite section',() => {
//         beforeEach('Code before each test', ()=>{
//             //repetetive code, like log in. related only to 'Our suite section'
//         })
//         it('some test name1', ()=>{

//         })
//         it('some test name2', ()=>{

//         })
//         it('some test name3', ()=>{

//         })

//     })

//     it('first test', () => {

//     })
//     it('second test', () => {
        
//     })
//     it('third test', () => {
        
//     })

// })