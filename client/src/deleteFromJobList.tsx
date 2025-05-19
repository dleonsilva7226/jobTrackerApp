import getJobData from "./getJobData";

const deleteFromJobList = async (jobAppId: string): Promise<void> => {
    try {
        const apiLink = `http://localhost:8000/jobs/${jobAppId}`;
        const response = await fetch(apiLink, 
            {
                method: "DELETE"
            } 
        );

        if (!response.ok) {
            console.log("Error with getting response from /jobs/:id DELETE API call");
            return;
        }
        //successful deletion
        console.log("Job Application Deleted Successfully");
    } catch (error: unknown) {
        console.log("Error with calling /jobs/:id DELETE API call");
    }

}

export default deleteFromJobList;