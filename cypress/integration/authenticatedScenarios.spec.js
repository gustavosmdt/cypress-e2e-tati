/// <reference types="cypress"/>

describe('Scenarios where authentication is a pre-requirement', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/notes').as('getNotes')
        cy.login()
    })

    it('CRUDs a note', () => {
        const faker = require('faker')
        const noteDescription = faker.lorem.words(4)

        cy.createNote(noteDescription)
        cy.wait(2000)

        const updatedNoteDescription = faker.lorem.words(4)
        const attachFile = true

        cy.editNote(noteDescription, updatedNoteDescription, attachFile)
        cy.wait(2000)

        cy.deleteNote(updatedNoteDescription)
        cy.wait(2000)
    })

    it('successfully submits the form', () => {
        cy.intercept('POST', '**/prod/billing').as('paymentRequest')

        cy.fillSettingsFormAndSubmit()

        cy.wait(2000)
        cy.wait('@paymentRequest').then(response => {
            expect(response.state).to.equal('Complete')
        })
    })

    it('logs out', { tags: '@desktop-and-tablet' }, () => {
        cy.visit('/')
        cy.wait(2000)

        // if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
        //     cy.get('.navbar-toggle.collapsed')
        //         .should('be.visible')
        //         .click()
        // }

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.nav > :nth-child(2) > a').click()
        cy.get('#email').should('be.visible')
        /* ==== End Cypress Studio ==== */
    })
})