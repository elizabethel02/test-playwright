@requiresLogin @exceptionsPage
Feature: Row CRUD on Test Exceptions Page

Scenario: Perform CRUD operations on Test Exceptions page
  Given I navigate to the "Test Exceptions" page
  When I add a new row
  And I wait for new row is appear
  And I input "Hello World" into the new row and save
  And I edit the row with "Updated Text"
  And I delete the second row
  Then I should see only one row remaining