export interface Job {
    id: string;
    companyName: string;
    jobTitle: string;
    applicationStatus: string;
    applicationDate: string;
    notes: string;
}

const getJobData = async (): Promise<Job[]> => {
    const apiLink = "http://localhost:8000/jobs";
    const response = await fetch(apiLink);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

export default getJobData