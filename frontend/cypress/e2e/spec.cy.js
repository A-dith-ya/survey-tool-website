describe("My First Test", () => {
  before(() => {
    // cy.exec("cd ../backend && npm start &");
  });

  const account = {
    username: "TestCypress",
    email: "TestCypress@example.com",
    password: "TestCypress123",
  };
  it("CRUD User on Survey Tool Website", () => {
    const { username, email, password } = account;
    // Create a new user
    cy.visit("/register");

    cy.get("input[name=username]").type(username);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();
    cy.wait(1000);
    cy.url().should("include", "/dashboard");

    // Logout, Login
    cy.get('[data-cy="logoutButton"]').click();
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();
    cy.wait(1000);
    cy.url().should("include", "/");

    // Update User
    cy.visit("/account");
    cy.get("input[name=username]").clear().type("CypressTest");
    cy.get("input[name=email]").clear().type(email);
    cy.get("input[name=password]").type(password);
    cy.get('[data-cy="myButton"]').click();
    cy.wait(1000);

    // Delete User
    cy.get('[data-cy="deleteBtn"]').click();
    cy.url().should("include", "/");
  });

  after(() => {
    // cy.exec("pkill node");
  });
});
