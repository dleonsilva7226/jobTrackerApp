import React from "react";
import { type Job } from "./JobInterface";
import AppModal from "./AppModal";
import { FilterStatuses } from "./FilterStatuses";
import type { JobUpdateInterface } from "./JobUpdateInterface";

export interface BodyProps {
    modalStatus: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    currentJobData: Job[];
    updateCurrentJobData: (jobData: JobUpdateInterface, jobAppId: string) => Promise<void>;
    deleteJobApp: (jobAppId: string) => Promise<void>;
    currentFilter: FilterStatuses;
}

const Body: React.FC<BodyProps> = ({modalStatus, setModalStatus, currentJobData, updateCurrentJobData, deleteJobApp, currentFilter}) => {
    // Function to handle filter input change
    const closeModal = () => { setModalStatus(false); }
    //have it be an overall function for the whole form or smth like that. think about this
    const handleJobAppUpdate = (event: React.SyntheticEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const [field, id] = target.id.split("::"); // e.g., ['jobTitle', '123']
        console.log("Field" + field);
        console.log("ID" + id);
        const newJobData = [...currentJobData];
        console.log(currentJobData)
        const index = newJobData.findIndex(job => job.id === id);
        //checks to see if index exists
        if (index === -1) {
            console.log("No job listing found");
            return;
        }
        let newData: JobUpdateInterface | undefined;
        if (target instanceof HTMLSelectElement) {
            newData = {
                [field]: target.value
            };
        } else if (target instanceof HTMLDivElement) {
            newData = {
                [field]: target.innerText
            };
        }

        //checks to see if the newData has anything initialized to it or not
        if (!newData) {
            console.log("No new data added")
            return;

        }
        updateCurrentJobData(newData, id);
    }

    const handleDelete = async (jobId: string) => {
        await deleteJobApp(jobId);
        console.log("Deleted a job app")
    }

    return (
        <>
        <div className="flex flex-col h-screen bg-gray-300 p-8 gap-1">
            <div className="grid grid-cols-5 gap-1 font-bold text-center">
            {["Job Title", "Company", "Status", "Day Applied", "Notes"].map((label) => (
                <div key={label} className="flex justify-center items-center h-12 border-2 border-gray-400 bg-white rounded-lg">
                    {label}
                </div>
            ))}
            </div>
            <div className="grid grid-cols-5 rows-start gap-1">
                {(currentFilter === FilterStatuses.Nothing 
                && currentJobData.map((job) => (
                <React.Fragment key={job.id}>
                    <div className="flex justify-between items-center px-2 h-20 border-2 border-gray-400 bg-white rounded-lg gap-y-2">
                        <button
                            id={`deleteButton::${job.id}`}
                            className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold hover:bg-red-200 hover:text-red-700 transition flex-shrink-0"
                            onClick={() => handleDelete(job.id)}
                            >
                            {'\u00D7'}
                            </button>
                        <div 
                            id={`jobTitle::${job.id}`}
                            contentEditable={true}
                            onInput={handleJobAppUpdate}
                            suppressContentEditableWarning={true} 
                            className="outline-none w-full"
                        >
                            {job.jobTitle}
                        </div>
                    </div>
                    <div 
                        id={`companyName::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg">
                        {job.companyName}
                    </div>
                    <select 
                    name="jobStatus" 
                    id={`applicationStatus::${job.id}`} 
                    onInput={handleJobAppUpdate}
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
                        id={`applicationDate::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.applicationDate}
                    </div>
                    <div 
                        id={`notes::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
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
                    <div className="flex justify-between items-center px-2 h-20 border-2 border-gray-400 bg-white rounded-lg gap-y-2">
                        <button
                            id={`deleteButton::${job.id}`}
                            className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold hover:bg-red-200 hover:text-red-700 transition flex-shrink-0"
                            onClick={() => handleDelete(job.id)}
                            >
                            {'\u00D7'}
                            </button>
                        <div 
                            id={`jobTitle::${job.id}`}
                            contentEditable={true}
                            onInput={handleJobAppUpdate}
                            suppressContentEditableWarning={true} 
                            className="outline-none w-full"
                        >
                            {job.jobTitle}
                        </div>
                    </div>
                    <div 
                        id={`companyName::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg">
                        {job.companyName}
                    </div>
                    <select 
                    name="jobStatus" 
                    id={`applicationStatus::${job.id}`} 
                    onInput={handleJobAppUpdate}
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
                        id={`applicationDate::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.applicationDate}
                    </div>
                    <div 
                        id={`notes::${job.id}`}
                        contentEditable={true}
                        onInput={handleJobAppUpdate}
                        suppressContentEditableWarning={true} 
                        className="flex text-center justify-center items-center h-20 border-2 border-gray-400 bg-white rounded-lg"
                    >
                        {job.notes}
                    </div>
                </React.Fragment>
                )))
                
                }


                {/* To show modal here */}
                {modalStatus && <AppModal endModal={closeModal} setCurrentJobData={updateCurrentJobData} currentJobData={currentJobData}/>}

            </div>
        </div>
        </>
    )

}

export default Body;