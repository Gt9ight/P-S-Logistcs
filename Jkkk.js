import React, { useState, useEffect } from 'react';
import './TaskCreator.css'; 
import PopupPosition from './PopupPosition'
import { auth } from "../../utils/firebase/firebase.utils";




const FleetForm = () => {
  const [tasks, setTasks] = useState([]);
  const [unitType, setunitType] = useState('');
  const [unitNumber, setunitNumber] = useState('');
  const [priority, setPriority] = useState('Low');
  const [popupData, setPopupData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userdisplayName, setUserdisplayName] = useState(null);


  const createTask = () => {
    if (unitType && unitNumber) {
      const currentTime = new Date().toLocaleString();
      const newTask = {
        unitType: unitType,
        unitNumber: unitNumber,
        priority: priority,
        users: [...popupData], 
        createdTime: currentTime,

      }

      setTasks([...tasks, newTask]);
      setunitType('');
      setunitNumber('');
      setPriority('Low');
      setPopupData([]);
    } else {
      alert('Please fill out everything.');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserdisplayName(user.displayName);
      } else {
        setUserdisplayName(null);
      }
    });
  
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handlePopupConfirm = (userData) => {
    setPopupData([...popupData, userData]);
    console.log(userData)
  }
  // const sortTasksByPriority = (tasks) => {
  //   return tasks.slice().sort((a, b) => {
  //     const priorityOrder = { Urgent: 1, Medium: 2, Low: 3 };
  //     return priorityOrder[a.priority] - priorityOrder[b.priority];
  //   });
  // };
