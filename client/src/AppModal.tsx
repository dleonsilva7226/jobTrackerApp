import React from 'react';
import { useState, useEffect } from 'react';
import { type Job } from "./getJobData";

export interface AppModalProps {
    endModal: () => void;
    setCurrentJobData: React.Dispatch<React.SetStateAction<Job[]>>;
    currentJobData: Job[];
}


const AppModal: React.FC<AppModalProps> = ({endModal, setCurrentJobData, currentJobData}) => {
    const updateJobList = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newJobData: Job = {
            id: currentJobData.length.toString() as string,
            jobTitle: formData.get("newjobtitle") as string || "",
            companyName: formData.get("newcompany") as string || "",
            applicationStatus: formData.get("newstatus") as string || "",
            applicationDate: formData.get("newdayapplied") as string || "",
            notes: formData.get("newnotes") as string || "",
        };
        setCurrentJobData([...currentJobData, newJobData]);
        console.log(newJobData);
    }

    return (

        
        <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70">
            
            <form onSubmit={updateJobList} className="relative w-[500px] h-[700px] bg-[#A9A9A9] rounded-xl gap-[10px] flex flex-col justify-center items-center">
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