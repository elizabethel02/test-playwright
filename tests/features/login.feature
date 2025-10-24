@checkLogin
Feature: Login Functionality

@positiveLogin
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should see the secure area page

@negativeLogin
  Scenario: Login fails with invalid credentials
    Given I am on the login page
    When I login with invalid credentials
    Then I should see an error message