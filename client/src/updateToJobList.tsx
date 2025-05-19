import type { JobUpdateInterface } from "./JobUpdateInterface";

const updateToJobList = async (jobData: JobUpdateInterface, jobAppId: string): Promise<void> => {
    try {
        const apiLink = `http://localhost:8000/jobs/${jobAppId}`;
        const response = await fetch (apiLink,
            {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(jobData)
            }
        );

        if (!response.ok) {
            console.log("Error in response with PUT API call to /jobs/:id");
            return;
        }

        const data = await response.json();
        console.log("New update", data);
        console.log("API Call Successful");

    } catch (error: unknown) {
        console.log("Error with PUT API call to /jobs/:id");
    }
}

export default updateToJobList;