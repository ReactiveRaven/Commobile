Feature: Login
    As a user
    I want to be able to log in to the app
    So I can access its delicious juices

Scenario: Logged out people can log in
    Given I am logged out
    Then I should be prompted to log in

Scenario: Log in
    Given I am logged out
    When I log in successfully
    Then I should be sent to my homepage

Scenario: Bad log in
    Given I am logged out
    When I log in incorrectly
    Then I should be warned my log in details are bad
