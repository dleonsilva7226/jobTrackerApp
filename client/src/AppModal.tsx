import React from 'react';
import { type Job } from "./JobInterface";
import addToJobList from './addToJobList';
import { type CreateJobInterface } from './createJobInterface';
import type { JobUpdateInterface } from './JobUpdateInterface';

export interface AppModalProps {
    endModal: () => void;
    setCurrentJobData: (jobData: JobUpdateInterface, jobAppId: string) => Promise<void>;
    currentJobData: Job[];
}


const AppModal: React.FC<AppModalProps> = ({endModal, setCurrentJobData, currentJobData}) => {

    const addNewJobListing = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newJobData: CreateJobInterface = {
            jobTitle: formData.get("newjobtitle") as string || "",
            companyName: formData.get("newcompany") as string || "",
            applicationStatus: formData.get("newstatus") as string || "",
            applicationDate: formData.get("newdayapplied") as string || "",
            notes: formData.get("newnotes") as string || "",
        };
        addToJobList(newJobData);
    }

    return (

        
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70">
            
            <form onSubmit={addNewJobListing} className="relative w-[500px] h-[700px] bg-[#A9A9A9] rounded-xl gap-[10px] flex flex-col justify-center items-center">
                <button className="absolute top-2 right-2 text-[30px]" onClick={endModal}>[X]</button>
                <div className="text-center font-bold text-[40px]">Add a New Job</div>
                <div className="font-bold text-[25px]">Fill in the details below</div>
                {["Job Title", "Company", "Status", "Day Applied", "Notes"].map((label) => {
                    return (
                        <div key={"new" + label.replace(" ", "").toLowerCase()} className="flex flex-col justify-center items-center border-2 border-gray-400 bg-white rounded-lg gap-[10px]">
                             <label className="flex text-center justify-center items-center h-[30px] w-[200px]">{label}</label>
                             <input type="text" name={"new" + label.replace(" ", "").toLowerCase()} className="bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                    )
                })}
                <button type="submit" className="bg-blue-100 w-[100px] h-[25px] rounded-xl">Submit</button>
            </form>
        </div>
    )
}


export default AppModal;