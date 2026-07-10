# AI Prompts – Documentation and Summary

## Entry 1 — README and project-info

- **Prompt:** Create readme and project-info per QA Practical Assessment submission template.
- **AI Response Summary:** Generated `readme.md` with setup, run commands, AC mapping, and report locations. Generated `project-info.md` with AI workflow answers and tool list.
- **Edits You Made:** Added concrete file paths under `Assement/` and `prism_playwright/` for reviewer navigation.
- **Reason for Edits:** Assessment requires executable instructions without manual inference.

## Entry 2 — Manual test CSV

- **Prompt:** Create FunctionalTestCase.csv with UI and API cases mapped to automation.
- **AI Response Summary:** 27 manual cases covering positive, negative, edge, and non-functional scenarios with Sanity/Regression tags and automation file mapping.
- **Edits You Made:** Split AC1 registration/login/profile into separate CSV rows while keeping one automated E2E for AC1.
- **Reason for Edits:** Manual suite should show granular coverage; automation stays maintainable with one flow per AC.

## Entry 3 — npm scripts

- **Prompt:** Provide smoke and regression commands in readme.
- **AI Response Summary:** Added `test:smoke`, `test:regression`, `test:ui:ac1`, `test:ui:ac2`, `test:api:ac1`, `test:api:ac2` to `package.json`.
- **Edits You Made:** Configured `testcases_regression` as the Prism-standard Playwright project name; added smoke/regression npm scripts.
- **Reason for Edits:** Aligns with original Prism framework conventions while keeping Toolshop AC scope clear for reviewers.

## Entry 4 — Submission summary

- **Prompt:** Summarize deliverables for QA assessment submission.
- **AI Response Summary:** Deliverables include Prism automation (4 spec files / 7 tests), manual CSV (27 cases), project-info, readme, ai-prompts history, and HTML/Allure report evidence after execution.
- **Edits You Made:** Documented double-confirm invoice requirement explicitly in readme and AC2 spec comments.
- **Reason for Edits:** Called out in assessment doc as easy-to-miss application behavior.

## Entry 5 — Submission template polish

- **Prompt:** Align readme and ai-prompts with QA Practical Assessment.docx submission template (Project Information section, AI Prompts folder structure, updated paths).
- **AI Response Summary:** Restructured `readme.md` with `## Project Information` and `## AI Prompts Folder and History` sections. Updated stale paths in ai-prompts (`tests/UI Test/`, `tests/API Test/`, `testcases_regression`, 27 CSV cases).
- **Edits You Made:** Added explicit smoke/regression labels, report locations, and per-file entry format descriptions in readme.
- **Reason for Edits:** Matches doc template headings exactly for reviewer checklist compliance.
