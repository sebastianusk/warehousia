Feature: Admin Operational
  All Admin Operational

  Background:
    Given the following users exist:
      | username | password | role | warehouse
      | bubur | bubur123 | SUPER_ADMIN |
      | ferdian | ferdian123 | ADMIN | tangerang
      | sebo | sebo123 | ADMIN | tangerang, serpong

  Scenario: Login successful
    Given bubur logged out
    When bubur input password bubur123
    Then bubur logged in

  Scenario: Login failed
    Given ferdian password is ferdian123
    When ferdian input password cuk
    Then ferdian cannot login

  Scenario: Change own password
    Given sebo password is sebo123
    And sebo logged in
    When sebo change my password to sebocuk
    Then sebo cannot login using password sebo123
    But sebo can login using password sebocuk

  Scenario: Add admin
    Given bubur is super admin
    And bubur is logged in
    When bubur add tiyok with password tiyok123 as admin of serpong
    Then tiyok can login using password tiyok123

  Scenario: Super admin change other password
    Given bubur is super admin
    When bubur change ferdian password to ferdiancuk
    Then ferdian cannot login using password ferdian123
    But ferdian can login using password ferdiancuk
