Feature: Browse artists
    As a consumer
    I want to be able to browse artists
    So I can find new artists and get inspiration

    Scenario: Browsing while logged out
        Given I am logged out
        Then I should be able to browse all artists
    @active
    Scenario: Browsing artists
        Given I am browsing artists
        And there are at least three artists registered
        Then I should see at least 3 artists

    Scenario: Too many artists to display
        Given I am browsing artists
        And there are many artists registered
        Then the artists should be paginated
