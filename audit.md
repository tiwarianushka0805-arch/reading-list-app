# Project Audit Report — Reading List Application

## 1. Project Overview

**Project Name:** Reading List Application  
**Purpose:** A responsive web application that helps students organize books by reading status.  
**Technologies Used:** HTML, CSS, JavaScript, GitHub, Vercel

## 2. Feature Audit

| Feature | Expected Result | Status |
|---|---|---|
| Add books | Add a book with a title and reading status. | Passed |
| Change reading status | Switch between Want to Read, Reading, and Finished. | Passed |
| Filter books | Filter the list by reading status. | Passed |
| Empty-list message | Display the required message when no books exist. | Passed |
| Duplicate prevention | Reject duplicate titles regardless of capitalization or extra spaces. | Passed |
| Title length validation | Reject titles longer than 60 characters. | Passed |
| Delete books | Remove only the selected book. | Passed |
| Summary counts | Update Total Books, Currently Reading, and Finished counts. | Passed |
| Responsive design | Support desktop and mobile screen sizes. | To be verified |

## 3. Validation Audit

- Duplicate book titles are rejected with the required error message.
- Titles longer than 60 characters are rejected with the required error message.
- Existing book management and filtering features are retained.

## 4. Data Storage

The application stores book data in the browser. It does not require user accounts, authentication, external APIs, or a cloud database.

## 5. Conclusion

The Reading List Application demonstrates front-end development, form validation, status filtering, book deletion, and dynamic summary counts. The application is deployed through Vercel, with final live-site and responsive-layout checks to be completed.

