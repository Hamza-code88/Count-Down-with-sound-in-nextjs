// Countdown.js
import React, { useState, useEffect } from 'react'; 
// Import React and its hooks: useState for managing state and useEffect for handling side effects.

const Countdown = () => { 
  // Main functional component for the Countdown Timer.

  const [userDate, setUserDate] = useState(''); 
  // State to store the date input provided by the user.
  
  const [userTime, setUserTime] = useState(''); 
  // State to store the time input provided by the user.

  const [targetDate, setTargetDate] = useState(null); 
  // State to store the calculated target date (in milliseconds).

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
  // State to store the remaining time. Initially, all values are set to 0.

  const [isActive, setIsActive] = useState(false); 
  // State to determine if the countdown timer is active.

  useEffect(() => { 
    // Effect to handle the countdown timer logic.

    if (!isActive || !targetDate) return; 
    // If the timer is not active or the target date is not set, do nothing.

    const timer = setInterval(() => { 
      // Set an interval to update the countdown every second.

      const now = new Date().getTime(); 
      // Get the current time in milliseconds.

      const difference = targetDate - now; 
      // Calculate the time difference between the target date and the current time.

      if (difference <= 0) { 
        // If the countdown reaches zero or becomes negative:

        clearInterval(timer); 
        // Stop the timer.

        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
        // Reset the timeLeft state to all zeros.

        setIsActive(false); 
        // Deactivate the timer.

      } else { 
        // If time is still left, calculate the remaining days, hours, minutes, and seconds:

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)), 
          // Calculate the number of full days left.

          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 
          // Calculate the number of full hours left after subtracting days.

          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), 
          // Calculate the number of full minutes left after subtracting hours.

          seconds: Math.floor((difference % (1000 * 60)) / 1000), 
          // Calculate the number of seconds left after subtracting minutes.
        });
      }
    }, 1000); 
    // Run the interval every 1000 milliseconds (1 second).

    return () => clearInterval(timer); 
    // Cleanup the timer when the component unmounts or when the effect re-runs.
  }, [isActive, targetDate]); 
  // Effect dependencies: Runs whenever `isActive` or `targetDate` changes.

  const handleStart = () => { 
    // Function to start the countdown.

    if (!userDate || !userTime) { 
      // Check if both date and time inputs are provided.

      alert('Please select both date and time to start the countdown.'); 
      // Alert the user if inputs are missing.

      return; 
    }

    const calculatedTargetDate = new Date(`${userDate}T${userTime}`).getTime(); 
    // Combine the user-provided date and time into a single timestamp.

    if (calculatedTargetDate <= new Date().getTime()) { 
      // Check if the target date/time is in the past.

      alert('Please select a future date and time.'); 
      // Alert the user about invalid input.

      return; 
    }

    setTargetDate(calculatedTargetDate); 
    // Update the target date state.

    setIsActive(true); 
    // Activate the timer.
  };

  const handleReset = () => { 
    // Function to reset the countdown.

    setUserDate(''); 
    // Clear the user-provided date.

    setUserTime(''); 
    // Clear the user-provided time.

    setTargetDate(null); 
    // Clear the target date.

    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
    // Reset the timeLeft state.

    setIsActive(false); 
    // Deactivate the timer.
  };

  return (
    <div>
      <h1>Customizable Countdown Timer</h1>
      {/* Heading for the component */}

      <div>
        {/* Inputs for user to set date and time */}
        <label>
          Target Date:
          <input
            type="date"
            value={userDate}
            onChange={(e) => setUserDate(e.target.value)} 
            // Update `userDate` state when user changes the date input.
          />
        </label>
        <label>
          Target Time:
          <input
            type="time"
            value={userTime}
            onChange={(e) => setUserTime(e.target.value)} 
            // Update `userTime` state when user changes the time input.
          />
        </label>
        <button onClick={handleStart}>Start Countdown</button> 
        {/* Button to start the countdown */}
        <button onClick={handleReset}>Reset</button> 
        {/* Button to reset the countdown */}
      </div>

      <div>
        {/* Display the countdown timer */}
        <h2>Time Left:</h2>
        <p>
          {isActive 
            ? `${timeLeft.days} Days, ${timeLeft.hours} Hours, ${timeLeft.minutes} Minutes, ${timeLeft.seconds} Seconds`
            : 'Timer is not active.'}
          {/* Show the remaining time or indicate that the timer is not active */}
        </p>
      </div>
    </div>
  );
};

export default Countdown; 
// Export the component so it can be used in other parts of the app.
