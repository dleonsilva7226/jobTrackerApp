import { type CreateJobInterface } from "./createJobInterface";
import { type Job } from "./JobInterface";

const addToJobList = async (newJobApp: CreateJobInterface): Promise<void> => {
    try {
        const apiLink = "http://localhost:8000/jobs"
        const response = await fetch(apiLink, 
            {
                method: "POST",
                body: JSON.stringify(newJobApp),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response)
        if (!response.ok) {
            console.error("No response from API POST request to /jobs");
            return;
        }

        const data = await response.json();
        console.log("Data:", data);
    } catch (error: unknown) {
        console.log("Error with API POST request to /jobs");
    }
    
}

export default addToJobList;