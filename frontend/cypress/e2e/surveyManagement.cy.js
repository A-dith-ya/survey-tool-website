import data from "../../src/data/surveyResponses.json";

describe("template spec", () => {
  before(() => {
    const account = {
      username: "TestCypress",
      email: "TestCypress@example.com",
      password: "TestCypress123",
    };

    // cy.visit("/register");
    cy.visit("/");
    const { username, email, password } = account;
    // cy.get("input[name=username]").type(username);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();
  });

  it("CRUD Survey on Survey Tool Website", () => {
    cy.contains("Create Survey").click();

    cy.get("input[type=text]").eq(0).type("Test Survey");
    cy.get("input[type=text]").eq(1).type("Test Survey Description");

    function fillQuestion(item, curr) {
      cy.get('[data-cy="questionContainer"] input[type="text"]')
        .eq(curr++)
        .type(item.question);

      if (item.options) {
        cy.get('[data-cy="questionContainer"] input[type="text"]')
          .eq(curr++)
          .type(item.options[0]);

        cy.get('[data-cy="questionContainer"] input[type="text"]')
          .eq(curr++)
          .type(item.options[1]);
      }

      return curr;
    }

    for (let i = 0, curr = 0; i < data.length; i++) {
      const item = data[i];

      switch (item.type) {
        case "TEXT":
          cy.contains("Text Question").click();
          curr = fillQuestion(item, curr);
          break;
        case "BOOLEAN":
          cy.contains("True/False").click();
          curr = fillQuestion(item, curr);
          break;
        case "MULTIPLE":
          cy.contains("Multiple Choice").click();
          curr = fillQuestion(item, curr);
          break;
        case "DROPDOWN":
          cy.contains("Dropdown").click();
          curr = fillQuestion(item, curr);
          break;
        case "CHECKBOX":
          cy.contains("Checkbox").click();
          curr = fillQuestion(item, curr);
          break;
      }
    }

    cy.contains("Preview").click();
    cy.wait(1000);

    cy.get('[data-cy="navSurvey"]').click();
    cy.wait(1000);

    // cy.contains("Save").click();
    cy.contains("Dashboard").click();
    cy.wait(1000);

    cy.get('[data-cy="editSurvey"]').click();
  });
});
