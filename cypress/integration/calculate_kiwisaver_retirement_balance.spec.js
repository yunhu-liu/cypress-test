import * as CalculatorPage from '../pages/CalculatorPage';

const customers = {
  employed: {
    currentAge: 30,
    employmentStatus: CalculatorPage.EMPLOYMENT_STATUS.EMPLOYED,
    salaryPerYear: 82000,
    kiwiSaverMemberContribution: 4,
    riskProfile: "Defensive"
  },
  selfEmployed: {
    currentAge: 45,
    employmentStatus: CalculatorPage.EMPLOYMENT_STATUS.SELF_EMPLOYED,
    currentKiwiSaverBalance: 100000,
    voluntaryContributions: 90,
    frequency: CalculatorPage.VOLUNTARY_CONTRIBUTIONS_FREQUENCY.FORTNIGHTLY,
    riskProfile: "Conservative",
    savingGoalAtRetrirement: 290000
  },
  notEmployed: {
    currentAge: 55,
    employmentStatus: CalculatorPage.EMPLOYMENT_STATUS.NOT_EMPLOYED,
    currentKiwiSaverBalance: 140000,
    voluntaryContributions: 10,
    frequency: CalculatorPage.VOLUNTARY_CONTRIBUTIONS_FREQUENCY.ANNUALLY,
    riskProfile: "Balanced",
    savingGoalAtRetrirement: 200000
  }
}

describe('User Story 2: Calculate KiwiSaver projected balance at retirement', () => {
  beforeEach("Open kiwisaver calculator", () => {
    cy.visit("/kiwisaver/calculators/kiwisaver-calculator/");
    // Make sure the loading of the page already finished
    cy.contains("h1", "KiwiSaver Retirement Calculator");
  });

  it('Calculate kiwi saver balance for the employed customer', () => {
    CalculatorPage.calculateForCustomer("Employed", customers.employed);
  })

  it('Calculate kiwi saver balance for the self-employed customer', () => {
    CalculatorPage.calculateForCustomer("Self-employed", customers.selfEmployed);
  })

  it('Calculate kiwi saver balance for the not-employed customer', () => {
    CalculatorPage.calculateForCustomer("Not employed", customers.notEmployed);
  })
})