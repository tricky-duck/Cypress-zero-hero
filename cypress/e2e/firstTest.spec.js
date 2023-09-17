// test should start with keyword: describe() or context()
/// <reference types="cypress" />

const { rgb } = require("d3-color")
const { wrap } = require("module")
const { TRUE } = require("sass")

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
    it('second test', () => {
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
            .should('have.class', 'appearance-filled size-medium')
            .parents('form') // Go Up
            .find('nb-checkbox') // Search Down
            .click()

        // Up/Down in DOM with Contains
        cy.contains('nb-card',"Horizontal form").find('[type="password"]').click() // Find text in nb-cart and find element Down with exact selector

    })
    it('then and wrap', () => {
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
    it('invoke', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 
        
        //ex.1 verify text via should
        cy.get('[for="exampleInputEmail1"]')
        .should('contain', "Email address")
        .should('have.class', 'label')
        .and('have.text', 'Email address' )
       
        //ex.2 verify text via then
        cy.get('[for="exampleInputEmail1"]').then(label =>{
        expect(label.text()).to.equal('Email address')
        expect(label).to.have.class('label')
        expect(label).to.have.text('Email address')
       
        //ex.3 with invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
            expect(text).to.contain('Email address')

        //ex.4 verify tag value with invoke
        cy.contains('nb-card', "Basic form")
        .find('[class="custom-checkbox"]')
        .click()
        .invoke('attr', 'class')
        // .should('contain','checked')
        .then(classValue =>{
        expect(classValue).to.contain('checked')
       })
    
    })
    })
    })
    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains("Datepicker").click()

        //with .then, assert the property with invoke
        cy.contains('nb-card', "Common Datepicker")
        .find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-picker').contains('17').click()
            cy.get(input).invoke('prop', 'value').should('contain', "Sep 17, 2023")

        })
        //without .then command
        cy.contains('nb-card', "Common Datepicker")
        .find('input').click()
        .get('nb-calendar-picker').contains('18').click()
        .get('[placeholder="Form Picker"][class="size-medium shape-rectangle"]')
        .invoke('prop', 'value').should('contain', "Sep 18, 2023" )

    })
    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 

        cy.contains('nb-card', "Using the Grid").find('[type="radio"]').then(radiobtn =>{
            cy.wrap(radiobtn)
                .first()  //eq(0)
                .check({force:true})
                .should('be.checked')
            cy.wrap(radiobtn)
                .eq(1)
                .check({force:true})
            cy.wrap(radiobtn)
                .first()
                .should('not.be.checked')
            cy.wrap(radiobtn)
                .eq(2)
                .should('be.disabled')
        })
    
    })
    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click() 

        //cy.get('[type="checkbox"]').check({force:true}) //check checks boxes only, cannot uncheck
        cy.get('[type="checkbox"]').then(aBox => {
            cy.wrap(aBox).eq(0).click({force:true})
            cy.wrap(aBox).eq(1).check({force:true}).should('be.checked')
        })
    })

    it('datePicker improved logic', () => {
        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()    
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
                if(!dateAttr.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)                    
                }
                else {
                    cy.get('nb-calendar-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains("Datepicker").click()

        cy.contains('nb-card', "Common Datepicker").find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value',dateAssert )
        })


    })

    it('dropdowns and list incl styles', () => {
        cy.visit('/')
        // #1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains("Dark").click()
        // cy.get('nav nb-select').should('contain', "Dark")
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //#2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                let itemText = listItem.text().trim()

                const colors = {
                    "Light" : "rgb(255, 255, 255)",
                    "Dark" : "rgb(34, 43, 69)",
                    "Cosmic" : "rgb(50, 50, 89)",
                    "Corporate" : "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3){
                    cy.wrap(dropdown).click()
                }
            })

        })
        //#3
        //user cy.select but only when DOM tag select exists. The test app has no select tags to try it out.
    })

    it('web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click() 
        
        // Ex. 1 update the cell
        cy.get('table').contains('tr', "Larry").then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', "25")
        })

        // Ex. 2 add a row
        cy.get('thead').find('.nb-plus').click()
        cy.get('table-cell-edit-mode').find('[placeholder="First Name"]').type('First Name')
        cy.get('table-cell-edit-mode').find('[placeholder="Last Name"]').type('Last Name')
        cy.get('ng2-st-actions').find('.nb-checkmark').click()
        cy.get('tbody').find('tr').eq(0).then(firstRow => {
            cy.wrap(firstRow).find('td').eq(2).should('contain', 'First Name')
            cy.wrap(firstRow).find('td').eq(3).should('contain', 'Last Name')
        })
        
        // Ex. 2.1 add a row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('First Name')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Last Name')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(firstRow => {
            cy.wrap(firstRow).eq(2).should('contain', 'First Name')
            cy.wrap(firstRow).eq(3).should('contain', 'Last Name')
        
        })

        // ex. 3 filter
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each((tableRow) => {
                if (age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }

            })
        })         
})
// As there's no special handling for the Tooltips in cypress, you can only find the element via Cypress runner and assert is exists
    it('tootip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
        .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it('dialog from the browser', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click() 

        cy.get('tbody tr').first().find('.nb-trash').click()
        
        //1. wont tell you if the window is not shown
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //2.if window is not shown, it fails to check the text
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //3. click Cancel btn in the browser pop-up
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })

})
      
