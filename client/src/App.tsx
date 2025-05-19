import Header from './Header.tsx'
import Body from './Body.tsx';
import Footer from './Footer.tsx';
import { useState, useEffect } from 'react';
import { type Job } from "./JobInterface";
import { FilterStatuses } from './FilterStatuses';
import getJobData from './getJobData.tsx';
import updateToJobList from './updateToJobList.tsx';
import deleteFromJobList from './deleteFromJobList.tsx';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<FilterStatuses>(FilterStatuses.Nothing); // Initialize state to hold filter value
  const [jobData, setJobData] = useState<Job[]>([]); // Initialize state to hold job data

  const createModal = (): void => { setShowModal(true); };

  useEffect(() => {
        const getJobs = async () => {

            //trying to get data
            try {
                const data = await getJobData();
                setJobData(data);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };
        

        //re-rendering every 30-secs by calling getJob
        let intervalId = setInterval(()=>{
          console.log("Fetching job data...");
          getJobs();
        }, 5000);


        //cleanup function
        const cleanup = () => {
          clearInterval(intervalId);
        }

        return cleanup;

    }, []);

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-300">
      <Header onAddClick={createModal} setCurrentFilter={setFilter} currentFilter ={filter}/>
      <Body modalStatus={showModal} setModalStatus={setShowModal} currentJobData={jobData} updateCurrentJobData={updateToJobList} deleteJobApp={deleteFromJobList} currentFilter={filter}/> 
      <Footer />
    </div>
    </>
  );
}

export default App;
