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
        // Test
        cy.get('input[placeholder="Jane Doe"]')
        cy.get('#exampleInputEmail1[nbinput][type="email"]')
        cy.contains("Send")
        cy.contains('[type="submit"]',"Send")

    })

    it('second test', ()=> {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 
        cy.get('[data-cy="signInButton"]')
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        
        // Up and Down within DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button') //only in use with parent but supports selectors like get does(no text)
            .should('contain', "Sign in") // Assert it has text
            .parents('form') // Go Up
            .find('nb-checkbox') // Search Down
            .click()

        // Up/Down in DOM with Contains
        cy.contains('nb-card',"Horizontal form").find('[type="password"]').click() // Find text in nb-cart and find element Down with exact selector

    })
    it.only('then and wrap', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 

        cy.contains('nb-card', "Horizontal form").then(firstForm =>{ // using then you're switching to the jquery
            const emailFirstForm = firstForm.find('[for="inputEmail3"]').text()
            const pwdFirstForm = firstForm.find('[for="inputPassword3"]').text()
            expect(emailFirstForm).to.equal('Email')
            expect(pwdFirstForm).to.equal('Password')
            cy.contains('nb-card',"Using the Grid").then(secondForm =>{
                const emailSecondForm = secondForm.find('[for="inputEmail1"]').text()
                const pwdSecondForm = secondForm.find('[for="inputPassword2"]').text()
                expect(emailSecondForm).to.equal(emailFirstForm)
                expect(pwdSecondForm).to.equal(pwdFirstForm)
                cy.wrap(pwdSecondForm).should('contain',"Password") // using wrap you're switching back to the cypress mode
            })

    })


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