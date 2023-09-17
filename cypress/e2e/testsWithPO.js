import { NavigationPage, navigateTo } from "../support/pageObjects/navigation"


describe('tests with PO pattern', () => {
    beforeEach('open the app', () => {
        cy.openHomePage()

    })
it('navigate through pages', () => {
    navigateTo.FormLayoutsPage()
    navigateTo.DatePickerPage()
    navigateTo.SmartTablePage()
    navigateTo.ToasterPage()
    navigateTo.ToolTipPage()
})

// it('submit forms and add dates on calendar', () => {
    
// })
})