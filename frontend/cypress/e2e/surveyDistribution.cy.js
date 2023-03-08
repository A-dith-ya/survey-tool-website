describe("template spec", () => {
  before(() => {});

  it("Anon submits survey results", () => {
    const surveyId = 1;
    cy.visit(`/open/${surveyId}`);

    // Answer survey questions
    cy.get("input[name=choice]").eq(1).check();
    cy.get("textarea").type("Hello World");
    cy.get("select").select("Train");

    cy.contains("Submit").click();
  });

  it("User can see the results of the survey", () => {
    const { username, email, password } = user;

    cy.visit("/");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();

    // View survey results
    cy.get('[data-cy="analyzeSurvey"]').eq(0).click();
  });

  after(() => {
    // Clean up user
    cy.visit("/account");
    cy.get('[data-cy="deleteBtn"]').click();
    cy.url().should("include", "/");
  });
});
