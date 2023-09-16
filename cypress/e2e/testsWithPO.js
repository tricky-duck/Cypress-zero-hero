import { NavigationPage, navigateTo } from "../support/pageObjects/navigation"


describe('tests with PO pattern', () => {
    beforeEach('open the app', () => {
        cy.visit('/')

    })
it('navigate through pages', () => {
    navigateTo.FormLayoutsPage()
    navigateTo.DatePickerPage()
    navigateTo.SmartTablePage()
    navigateTo.ToasterPage()
    navigateTo.ToolTipPage()
})
})