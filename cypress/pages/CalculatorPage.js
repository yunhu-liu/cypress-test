// locator to be used for locate iframe
export const iframeLocator =
  'iframe[src="/calculator-widgets/kiwisaver-calculator/?gclid=&referrer=https%3A%2F%2Fwww.westpac.co.nz%2F&parent=3956&host=calculator-embed"]';

export const EMPLOYMENT_STATUS = {
  SELECT: "Select",
  EMPLOYED: "Employed",
  SELF_EMPLOYED: "Self-employed",
  NOT_EMPLOYED: "Not employed",
};

export const RISK_PROFILE = {
  DEFENSIVE: "low",
  CONSERVATIVE: "medium",
  BALANCED: "high",
  GROWTH: "growth",
};

export const VOLUNTARY_CONTRIBUTIONS_FREQUENCY = {
  FREQUENCY: "Frequency",
  WEEKLY: "Weekly",
  FORTNIGHTLY: "Fortnightly",
  MONTHLY: "Monthly",
  ANNUALLY: "Annually",
};

export function checkIconInformation(containerLocator, targetInformationArray) {
  cy.getIframeBody(iframeLocator)
    .then(($body) => {
      cy.wrap($body)
        .find(containerLocator)
        .within(($el) => {
          cy.get(".icon").click();
          cy.get('.field-message')
            .then($el => {
              targetInformationArray.forEach(targetInformation => {
                // cy.log(targetInformation);
                expect($el.html()).to.contains(targetInformation);
              })
            })
        });
    });
}

export function checkLinkInformation(containerLocator, targetInformation, targetLink) {
  cy.getIframeBody(iframeLocator)
    .then(($body) => {
      cy.wrap($body)
        .find(containerLocator)
        .within(($el) => {
          // Click info icon
          cy.get(".icon").click();
          // Check the href value
          cy.contains(targetInformation)
            .should("have.attr", "href", targetLink)
        });
    });
}

export function calculateForCustomer(employmentStatus, customer) {
  switch (employmentStatus) {
    case EMPLOYMENT_STATUS.EMPLOYED:
      cy.getIframeBody(iframeLocator).then(($body) => {
        cy.wrap($body)
          .find("#widget")
          .within(($el) => {
            // Select Employed for Employment Status
            cy.contains(EMPLOYMENT_STATUS.SELECT).click();
            cy.contains(EMPLOYMENT_STATUS.EMPLOYED).click();
            // Make sure the elements already exist in Calculator for Employed Customers
            cy.contains("Salary or wages per year (before tax)");
            cy.contains("KiwiSaver member contribution");
            // Fill current age and salary per year
            cy.get('input[type="text"]').eq(0).type(customer.currentAge);
            cy.get('input[type="text"]').eq(1).type(customer.salaryPerYear);
            // Select corresponding kiwi saver member contribution
            cy.get(
              `input[value="${customer.kiwiSaverMemberContribution}"]`
            ).click();
            // Select corresponding risk profile
            cy.get(
              `input[value="${riskProfileConverter(customer.riskProfile)}"]`
            ).click();
            // Click label of "View your KiwiSaver retirement projections"
            // Check the existence of the lable before and after clicking
            cy.contains("View your KiwiSaver retirement projections")
              .should("be.enabled")
              .click()
              .should("not.be.visible");
            // Make sure the customer can get the KiwiSaver projected balanc by using the calculator
            cy.contains("436,365");
          });
      });
      break;
    case EMPLOYMENT_STATUS.SELF_EMPLOYED:
      cy.getIframeBody(iframeLocator).then(($body) => {
        cy.wrap($body)
          .find("#widget")
          .within(($el) => {
            cy.contains(EMPLOYMENT_STATUS.SELECT).click();
            cy.contains(EMPLOYMENT_STATUS.SELF_EMPLOYED).click();

            cy.contains("Salary or wages per year (before tax)").should("not.be.visible");

            cy.get('input[type="text"]').eq(0).type(customer.currentAge);
            cy.get('input[type="text"]').eq(1).type(customer.currentKiwiSaverBalance);

            cy.get('input[type="text"]').eq(2).type(customer.voluntaryContributions);
            cy.contains(VOLUNTARY_CONTRIBUTIONS_FREQUENCY.FREQUENCY).click();
            cy.contains(customer.frequency).click();            

            cy.get(
              `input[value="${riskProfileConverter(customer.riskProfile)}"]`
            ).click();

            cy.get('input[type="text"]').eq(3).type(customer.savingGoalAtRetrirement);

            cy.contains("View your KiwiSaver retirement projections")
              .should("be.enabled")
              .click()
              .should("not.be.visible");

            cy.contains("259,581");
          });
      });
      break;
    case EMPLOYMENT_STATUS.NOT_EMPLOYED:
      cy.getIframeBody(iframeLocator).then(($body) => {
        cy.wrap($body)
          .find("#widget")
          .within(($el) => {
            cy.contains(EMPLOYMENT_STATUS.SELECT).click();
            cy.contains(EMPLOYMENT_STATUS.NOT_EMPLOYED).click();

            cy.contains("Salary or wages per year (before tax)").should("not.be.visible");

            cy.get('input[type="text"]').eq(0).type(customer.currentAge);
            cy.get('input[type="text"]').eq(1).type(customer.currentKiwiSaverBalance);

            cy.get('input[type="text"]').eq(2).type(customer.voluntaryContributions);
            cy.contains(VOLUNTARY_CONTRIBUTIONS_FREQUENCY.FREQUENCY).click();
            cy.contains(customer.frequency).click();            

            cy.get(
              `input[value="${riskProfileConverter(customer.riskProfile)}"]`
            ).click();

            cy.get('input[type="text"]').eq(3).type(customer.savingGoalAtRetrirement);

            cy.contains("View your KiwiSaver retirement projections")
              .should("be.enabled")
              .click()
              .should("not.be.visible");

            cy.contains("197,679");
          });
      });
      break;
    case EMPLOYMENT_STATUS.SELECT:
      break;
  }
}

//convert the risk profile to the matched properties value
function riskProfileConverter(riskProfile) {
  let convertValue;
  switch (riskProfile) {
    case "Defensive":
      convertValue = RISK_PROFILE.DEFENSIVE;
      break;
    case "Conservative":
      convertValue = RISK_PROFILE.CONSERVATIVE;
      break;
    case "Balanced":
      convertValue = RISK_PROFILE.BALANCED;
      break;
    case "Growth":
      convertValue = RISK_PROFILE.GROWTH;
      break;
  }
  return convertValue;
}
