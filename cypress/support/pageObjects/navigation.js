function selectkMenuGroup(page){
    cy.contains('a', page).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if (attr.includes('left')){
                cy.wrap(menu).click()
            }
    })
    })
}



export class NavigationPage{

    FormLayoutsPage(){
//       cy.contains('Forms').click()
        selectkMenuGroup('Forms')
        cy.contains('Form Layouts').click()
    }

    DatePickerPage(){
        selectkMenuGroup('Forms')
        cy.contains("Datepicker").click()
    }

    ToasterPage(){
        selectkMenuGroup('Modal & Overlays')
        cy.contains('Toastr').click() 
    }
    
    ToolTipPage(){
        selectkMenuGroup('Modal & Overlays')
        cy.contains('Tooltip').click()
    }

    SmartTablePage(){
        selectkMenuGroup('Tables & Data')
        cy.contains('Smart Table').click() 
    }



}

export const navigateTo = new NavigationPage()