import { useState } from 'react';

const useFormInputStates = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [property, setProperty] = useState('');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([
    { label: 'Preapproval Process', name: 'task1', status: 'NYS' },
    { label: 'Home Searching/Showings', name: 'task2', status: 'NYS' },
    { label: 'Submit an Offer', name: 'task3', status: 'NYS' },
    { label: 'Contract Ratification', name: 'task4', status: 'NYS' },
    { label: 'Schedule Closing', name: 'task5', status: 'NYS' },
    { label: 'Schedule Final Walkthrough', name: 'task6', status: 'NYS' },
    { label: 'Attend Closing', name: 'task7', status: 'NYS' },
    { label: "You're a home owner!", name: 'task8', status: 'NYS' },
    { label: 'Submit a Review', name: 'task9', status: 'NYS' },
  ]);
  return {
    fname: fname,
    setFname: setFname,
    lname: lname,
    setLname: setLname,
    property: property,
    setProperty: setProperty,
    email: email,
    setEmail: setEmail,
    tasks: tasks,
    setTasks: setTasks,
  };
};
export default useFormInputStates;
