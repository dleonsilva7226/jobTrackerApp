import React from "react";
import Header from './Header.tsx'
import Body from './Body.tsx';
import Footer from './Footer.tsx';
import { useState, useEffect } from 'react';
import { type Job } from "./JobInterface";
import { FilterStatuses } from './FilterStatuses';
import getJobData from './getJobData.tsx';
import updateToJobList from './updateToJobList.tsx';
import deleteFromJobList from './deleteFromJobList.tsx';
import LoginPage from './LoginPage';
import verifyToken from "./verifyToken";
import type { UserFromTokenInterface } from "./UserInterface.tsx";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterStatuses>(FilterStatuses.Nothing); // Initialize state to hold filter value
  const [jobData, setJobData] = useState<Job[]>([]); // Initialize state to hold job data
  const [notLoggedIn, setNotLoggedInStatus] = useState<boolean>(true);


  const createModal = (): void => { setShowModal(true); };

  //for getting user token and updating login status
  useEffect(() => {
        
        const updateLoginStatus = async () => {
          const token: string | null = localStorage.getItem("userToken");
          // console.log("🚀 Token being sent:", token);
          
          if (token === null) {
            console.log("No update to login status");
            return;
          }

          const result: UserFromTokenInterface | undefined = await verifyToken(localStorage.getItem('userToken') || "");
          // console.log("RESULLTSSSS: " + result);
          if (result !== undefined) {
            setNotLoggedInStatus(false);
          } else {
            setNotLoggedInStatus(true);
          }


          
        }

        //re-rendering every 5-secs by calling getJob
        let intervalId = setInterval(()=>{
          console.log("Updating login status...");
          updateLoginStatus();
        }, 5000);


        //cleanup function
        const cleanup = () => {
          clearInterval(intervalId);
        }

        return cleanup;

    }, []);


  //for bringing job data to the homepage
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
        

        //re-rendering every 5-secs by calling getJob
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
      {notLoggedIn && <LoginPage />}

      <div className="flex flex-col h-screen bg-gray-300">
        <Header onAddClick={createModal} setCurrentFilter={setFilter} currentFilter ={filter}/>
        <Body modalStatus={showModal} setModalStatus={setShowModal} currentJobData={jobData} updateCurrentJobData={updateToJobList} deleteJobApp={deleteFromJobList} currentFilter={filter}/> 
        <Footer />
      </div>    
    </>
  );
}

export default App;
