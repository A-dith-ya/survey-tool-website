import data from "../../src/data/surveyResponses.json";
import user from "../../src/data/user.json";

describe("template spec", () => {
  before(() => {
    // User login/register
    const { username, email, password } = user;
    // cy.visit("/register");
    // cy.get("input[name=username]").type(username);
    cy.visit("/");

    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();
  });

  it("User creates previews and publishes survey", () => {
    cy.contains("Create Survey").click();

    cy.get("input[type=text]").eq(0).type("Test Survey");
    cy.get("input[type=text]").eq(1).type("Test Survey Description");

    // Fill the text for the input fields
    function fillQuestion(item, curr) {
      cy.get('[data-cy="questionContainer"] input[type="text"]')
        .eq(curr++)
        .type(item.question);

      if (item.options) {
        // Add more inputs for each option, in addition to the default inputs
        for (let i = 0; i < item.options.length - 2; i++)
          cy.get('[data-cy="questionContainer"] button[type="button"]')
            .eq(addOptionCount)
            .click();

        for (let i = 0; i < item.options.length; i++)
          cy.get('[data-cy="questionContainer"] input[type="text"]')
            .eq(curr++)
            .type(item.options[i]);
      }

      return curr;
    }

    // Track number of button fields
    let addOptionCount = 0;
    // Track number of option fields
    let curr = 0;

    for (let i = 0; i < data.length; i++) {
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
          addOptionCount++;
          break;
        case "DROPDOWN":
          cy.contains("Dropdown").click();
          curr = fillQuestion(item, curr);
          addOptionCount++;
          break;
        case "CHECKBOX":
          cy.contains("Checkbox").click();
          curr = fillQuestion(item, curr);
          addOptionCount++;
          break;
      }
    }

    cy.contains("Preview").click();
    cy.wait(1000);

    cy.get('[data-cy="navSurvey"]').click();
    cy.wait(1000);

    // Saves the form
    cy.contains("Save").click();
    cy.contains("Dashboard").click();
    cy.wait(1000);

    // Navigate created survey
    cy.get('[data-cy="editSurvey"]').eq(0).click();
    cy.contains("Publish").click();
  });
});
