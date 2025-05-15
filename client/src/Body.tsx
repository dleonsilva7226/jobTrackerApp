import React, { useState } from "react";
import getJobData, { type Job } from "./getJobData";
import { useEffect } from "react";

const Body: React.FC = () => {
    const [jobData, setJobData] = useState<Job[]>([]); // Initialize state to hold job data
    const [filter, setFilter] = useState<string>(""); // Initialize state to hold filter value
    useEffect(() => {
        const getJobs = async () => {
            try {
                const data = await getJobData();
                setJobData(data);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };
        console.log("Fetching job data...");
        getJobs();
    }, []);

    const handleSelectInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement;
        const [field, id] = target.id.split("-"); // e.g., ['jobTitle', '123']
        const newJobData = [...jobData];
        const index = newJobData.findIndex(job => job.id === id);
        if (index !== -1 && field === "applicationStatus") {
            console.log("Updating job data...");
            newJobData[index] = {
                ...newJobData[index],
                [field]: target.value,
            };
            setJobData(newJobData);
        }
        console.log("Job data updated:", newJobData);
    };

    const handleDivInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const [field, id] = target.id.split("-"); // e.g., ['jobTitle', '123']
        const newJobData = [...jobData];
        const index = newJobData.findIndex(job => job.id === id);
        if (index !== -1 && ["jobTitle", "companyName", "applicationDate", "notes"].includes(field)) {
            console.log("Updating job data...");
            newJobData[index] = {
                ...newJobData[index],
                [field]: target.innerText,
            };
            setJobData(newJobData);
        }
        console.log("Job data updated:", newJobData);
    };


    return (
        <>
        <div className="flex flex-col h-screen bg-gray-300 p-8">
            <div className="grid grid-cols-5 rows-start gap-1">
                {["Job Title", "Company", "Status", "Day Applied", "Notes"].map((label) => (
                <div key={label} className="flex justify-center items-center h-12 border-2 border-gray-400 bg-white rounded-lg">
                    {label}
                </div>
                ))}
                {jobData.map((job) => (
                <React.Fragment key={job.id}>
                    <div 
                        id={`jobTitle-${job.id}`}
                        contentEditable={true}
                        onInput={handleDivInput}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.jobTitle}
                    </div>
                    <div 
                        id={`companyName-${job.id}`}
                        contentEditable={true}
                        onInput={handleDivInput}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg">
                        {job.companyName}
                    </div>
                    <select 
                    name="jobStatus" 
                    id={`applicationStatus-${job.id}`} 
                    onInput={handleSelectInput}
                    className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg" >
                        <option value="none">{job.applicationStatus}</option>
                        {["Offer", "Applied", "Interviewing", "Rejected"]
                            .filter(status => status !== job.applicationStatus)
                            .map((status) => {
                                return (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                );
                            })}
                    </select>
                    <div 
                        id={`applicationDate-${job.id}`}
                        contentEditable={true}
                        onInput={handleDivInput}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.applicationDate}
                    </div>
                    <div 
                        id={`notes-${job.id}`}
                        contentEditable={true}
                        onInput={handleDivInput}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.notes}
                    </div>
                </React.Fragment>
                ))}
            </div>
        </div>
        </>
    )

}

export default Body;