import { onDatePickerPage } from "../support/pageObjects/datePickerPage"
import { onFormLayoutsPage } from "../support/pageObjects/formLayoutsPage"
import { navigateTo } from "../support/pageObjects/navigation"
import { onSmartTablePage } from "../support/pageObjects/smartTablePage"



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

it.only('should submit Inline and Basic forms, select dates in calendars and update the table', () => {
    navigateTo.FormLayoutsPage()
    onFormLayoutsPage.SubmitDataInlineForm('anna', 'email@test.com')
    onFormLayoutsPage.SubmitDataBasicForm('email@test.com', 'password')
    navigateTo.DatePickerPage()
    onDatePickerPage.SelectDateInCommonDatepicker()
    onDatePickerPage.SelectDatesInDatepickerWithRange(7, 12)
    navigateTo.SmartTablePage()
    onSmartTablePage.EditAgeCell('Jacob', 20)
    onSmartTablePage.AddNewPerson('first name', 'last name')
    onSmartTablePage.VerifyFilterByAge()
    onSmartTablePage.ClearFilterField()
    onSmartTablePage.DeletetRowByIndex(1)
})
})