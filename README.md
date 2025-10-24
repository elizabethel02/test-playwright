# 🎭 Playwright Sample Project with BDD, POM, and Custom Reporting

This is a sample automation project built using [Playwright](https://playwright.dev/) to demonstrate a professional QA workflow. It integrates:

- Gherkin-style BDD scenarios (`.feature` files)
- Page Object Model (POM) for modular and maintainable code
- Step-by-step screenshot logging
- Custom HTML and PDF test reports with summary and filtering

---
## Project Structure
project-root/ <br/>
  ├── features/ #Gherkin feature files
  <br/>
  ├── fixtures/ #Test data
  <br/>
  ├── steps/ #Step definitions 
  <br/>
  ├── pages/ #Page Object Models
  <br/>
  ├── hooks/ #Cucumber hooks (AfterStep, After, AfterAll)
  <br/>
  ├── utils/ #Screenshot and report utilities
  <br/>
  ├── screenshots/ #Saved screenshots per step
  <br/>
  └── reports/ #Generated HTML and PDF reports

---
## Test Flow Overview

1. **Scenarios written in Gherkin**  
   Example:
   ```gherkin
   Given I am on the login page 
   When I login with valid credentials 
   Then I should see the secure area page

2. Step Definitions <br/>
    - Each step is mapped to a function using Playwright and POM.
3. Page Object Model (POM) <br/>
    - Pages are abstracted into reusable classes for clarity and reuse.
4. Screenshot Logging <br/>
    - Each step in the test flow automatically captures a screenshot.
    - Screenshots are grouped by scenario and step, with timestamped filenames for audit clarity.
       - `screenshots/steps/[date_folder]/[scenario_name]/step-[scenario-name]-[step_name].png` <br/>
         - `screenshots/steps/2025-10-24/successful-login-with-valid-credentials/step-successful-login-with-valid-credentials-i-am-on-the-login-page-2025-10-24-T14-57-27.png`
5. Custom Report <br/>
    - Custom HTML and PDF reports include:
       - Summary: total tests, passed, failed
       - Grouped entries by status
       - Screenshot preview per step
       - Toggle filters for PASSED/FAILED
       - Auto-hide FAILED section if no failures
       - Reports are saved per date with timestamped filenames
          - `reports/[date_folder]`
            - `reports/2025-10-24/report-perform-crud-operations-on-test-exceptions-page-2025-10-24-T15-08-47.html`
            - `reports/2025-10-24/report-perform-crud-operations-on-test-exceptions-page-2025-10-24-T15-08-47.pdf`
            - <img width="2880" height="6636" alt="image" src="https://github.com/user-attachments/assets/88a90e72-cdb3-406b-9de1-d7a30e192c2e" />


---
## How to Run
```
npm install
npx cucumber-js tests/features/login.feature --tags "@negativeLogin"
```


or use tag-based filtering:
```
npx cucumber-js --tags "@positiveLogin"
npx cucumber-js --tags "@negativeLogin"
npx cucumber-js --tags "@exceptionsPage"
```

---
## Notes
- This project is for learning and demonstration purposes
- Designed with scalability in mind

---
## Author
Created by Elizabeth E — QA Engineer passionate about clean structure, robust logging, and scalable reporting.


