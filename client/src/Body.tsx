import React, { useState } from "react";
import { type Job } from "./getJobData";
import { useEffect } from "react";
import AppModal from "./AppModal";
import { FilterStatuses } from "./FilterStatuses";

export interface BodyProps {
    modalStatus: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    currentJobData: Job[];
    setCurrentJobData: React.Dispatch<React.SetStateAction<Job[]>>;
    currentFilter: FilterStatuses
}

const Body: React.FC<BodyProps> = ({modalStatus, setModalStatus, currentJobData, setCurrentJobData, currentFilter}) => {
    // Function to handle filter input change
    const closeModal = () => { setModalStatus(false); }

    const handleSelectInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement;
        const [field, id] = target.id.split("-"); // e.g., ['jobTitle', '123']
        const newJobData = [...currentJobData];
        const index = newJobData.findIndex(job => job.id === id);
        if (index !== -1 && field === "applicationStatus") {
            console.log("Updating job data...");
            newJobData[index] = {
                ...newJobData[index],
                [field]: target.value,
            };
            setCurrentJobData(newJobData);
        }
        console.log("Job data updated:", newJobData);
    };

    const handleDivInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const [field, id] = target.id.split("-"); // e.g., ['jobTitle', '123']
        const newJobData = [...currentJobData];
        const index = newJobData.findIndex(job => job.id === id);
        if (index !== -1 && ["jobTitle", "companyName", "applicationDate", "notes"].includes(field)) {
            console.log("Updating job data...");
            newJobData[index] = {
                ...newJobData[index],
                [field]: target.innerText,
            };
            setCurrentJobData(newJobData);
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
                {(currentFilter === FilterStatuses.Nothing 
                && currentJobData.map((job) => (
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
                        {(currentFilter === FilterStatuses.Nothing && ["Offer", "Applied", "Interviewing", "Rejected"]
                            .map((status) => {
                                return (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                );
                            })
                        )}
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
                )))
                ||
                (
                    currentFilter !== FilterStatuses.Nothing &&
                    currentJobData.filter((job) => job.applicationStatus === currentFilter).map((job) => (
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
                        {(["Offer", "Applied", "Interviewing", "Rejected"]
                            .map((status) => {
                                return (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                );
                            })
                        )}
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
                )))
                
                }


                {/* To show modal here */}
                {modalStatus && <AppModal endModal={closeModal} setCurrentJobData={setCurrentJobData} currentJobData={currentJobData}/>}

            </div>
        </div>
        </>
    )

}

export default Body;