import Header from './Header.tsx'
import Body from './Body.tsx';
import Footer from './Footer.tsx';
import React, { useState, useEffect, use } from 'react';
import getJobData, { type Job } from "./getJobData";
import { FilterStatuses } from './FilterStatuses';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<FilterStatuses>(FilterStatuses.Nothing); // Initialize state to hold filter value
  const [jobData, setJobData] = useState<Job[]>([]); // Initialize state to hold job data

  const createModal = (): void => { setShowModal(true); };

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

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-300">
      <Header onAddClick={createModal} setCurrentFilter={setFilter} currentFilter ={filter}/>
      <Body modalStatus={showModal} setModalStatus={setShowModal} currentJobData={jobData} setCurrentJobData={setJobData} currentFilter={filter}/> 
      <Footer />
    </div>
    </>
  );
}

export default App;
