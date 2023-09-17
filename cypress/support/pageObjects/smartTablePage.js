

export class SmartTablePage{

    EditAgeCell(name, age){    
        // Ex. 1 update the cell
        cy.get('table').contains('tr', name).then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        })
    }

    AddNewPerson(firstName, lastName){
        // Ex. 2 add a row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(firstRow => {
            cy.wrap(firstRow).eq(2).should('contain', firstName)
            cy.wrap(firstRow).eq(3).should('contain', lastName)
        
        })
    }
    VerifyFilterByAge(){
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
}
    ClearFilterField(){
        cy.get('thead [placeholder="Age"]').clear()
    }

    DeletetRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTablePage()