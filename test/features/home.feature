Feature: Homepage tasks
    As a logged in user
    I want to have common tasks on my homepage
    So I can check up on things quickly

    Scenario: Browsing artists
        Given I am on the homepage
        Then I should be able to browse all artists

    Scenario: Searching for a known artist
        Given I am on the homepage
        Then I should be able to search for artists

    Scenario: Looking for inspiration
        Given I am on the homepage
        Then I should see a list of featured artworks

    Scenario: Searching for an artwork
        Given I am on the homepage
        Then I should be able to search for artworks

    Scenario: Checking messages
        Given I am on the homepage
        Then I should be able to quickly access my messages
        And I should be able to see a count of unread messages