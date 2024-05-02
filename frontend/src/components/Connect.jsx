import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function Connect({ setUserEmail }) {
  const [user, setUser] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyDD4182TBa5M_rzWfkaMG4SLPDf4Uu4bUw",
    authDomain: "coding-class-caa09.firebaseapp.com",
    projectId: "coding-class-caa09",
    storageBucket: "coding-class-caa09.appspot.com",
    messagingSenderId: "995668943755",
    appId: "1:995668943755:web:4241bce66134af90db858e",
    measurementId: "G-N2ST2XZQVY"
   };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, [auth, setUserEmail]);

  const connectWallet = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setUserEmail(result.user.email);
      console.log(result);
    } catch (error) {
      console.error('Google authentication error:', error.message);
    }
  };

  useEffect(() => {
    const addStudent = async (user) => {
      try {
        const response = await fetch('http://localhost:5000/api/addstudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: user.email, name: user.displayName })
        });
        const data = await response.json();
        console.log(data); // Log response from backend (optional)
      } catch (error) {
        console.error('Error adding student:', error.message);
      }
    };

    if (user) {
      addStudent(user);
    }
  }, [user]);

  const disconnectWallet = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserEmail(null);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div className='pt-2'>
      {user ? (
        <button className='border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400' onClick={disconnectWallet}>Logout</button>
      ) : (
        <button className='border-2 border-gray-900 shadow-lg p-2 px-4 rounded-full w-fit font-semibold bg-gradient-to-tr from-cyan-400 via-cyan-200 to-cyan-100 hover:from-cyan-100 hover:via-cyan-200 hover:to-cyan-400' onClick={connectWallet}>Sign Up</button>
      )}
    </div>
  );
}

export default Connect;
