import type { Job } from "./JobInterface";

const getJobData = async (): Promise<Job[]> => {
    try {
        const apiLink = "http://localhost:8000/jobs";
        const response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API Response Successful")
        return data;
    } catch (error: unknown){
        console.log("API Call unsuccessful");
        return [];
    }
    
}

export default getJobData;