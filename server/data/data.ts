import { v4 as uuidv4 } from 'uuid';
// This file contains the data for the application. It is used to populate the application with initial data.
export interface Job {
    id: string;
    companyName: string;
    jobTitle: string;
    applicationStatus: string;
    applicationDate: string;
    notes: string;
}


export const jobs: Job[] = [
    {
      "id": uuidv4(),
      "companyName": "OpenAI",
      "jobTitle": "Software Engineer",
      "applicationStatus": "Applied",
      "applicationDate": "2025-05-01",
      "notes": "Applied through the careers page. Waiting to hear back."
    },
    {
      "id": uuidv4(),
      "companyName": "Google",
      "jobTitle": "Backend Developer",
      "applicationStatus": "Interviewing",
      "applicationDate": "2025-04-25",
      "notes": "Completed phone screen, onsite interview scheduled."
    },
    {
      "id": uuidv4(),
      "companyName": "Spotify",
      "jobTitle": "Full Stack Intern",
      "applicationStatus": "Rejected",
      "applicationDate": "2025-03-30",
      "notes": "Rejection email received. Will try again next cycle."
    },
    {
      "id": uuidv4(),
      "companyName": "Stripe",
      "jobTitle": "Frontend Engineer",
      "applicationStatus": "Offer",
      "applicationDate": "2025-04-15",
      "notes": "Received offer, considering salary and role fit."
    }
  ]