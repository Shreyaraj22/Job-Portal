# Job Portal React Application

This project is a simple job portal built using React. It allows users to browse job listings, view job details, and simulate applying for jobs. The application uses the browser's `localStorage` to store and manage job data and application status for demonstration purposes.

## Features

* **Browse Job Listings:** Users can view a list of available job openings on the homepage, loaded from `localStorage`.
* **View Job Details:** Clicking on a job listing takes the user to a dedicated page with more detailed information about the job, retrieved from `localStorage`.
* **Simulated Job Application:** Users can click an "Apply Now" button on the job details page to simulate submitting an application. The job ID of applied jobs is stored in `localStorage`.
* **My Applications Page:** A dedicated page (`/applied-jobs`) displays the jobs that the user has "applied" to by retrieving the applied job IDs from `localStorage` and matching them with the stored job data.
* **Search Functionality:** The navigation bar includes a basic search functionality to filter job listings by title (performed on the data in `localStorage`).
* **About Page:** A simple "About" page provides some information about the portal.
* **404 Not Found Page:** Handles navigation to non-existent routes.

## Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **React Router:** For handling navigation within the application.
* **Local Storage:** Used to store and manage job listing data and track applied jobs.
* **Tailwind CSS:** (Assumed based on class names in the code) A utility-first CSS framework for styling the application.
* **ESLint:** For linting and code style checking.
* **Webpack:** (Underlying React build process) A module bundler.

## Data Storage

This project utilizes the browser's `localStorage` to store and manage job listing data and track which jobs users have applied to. The initial job data is likely seeded into `localStorage` when the application first loads.