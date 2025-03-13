import React, { useState, useRef } from "react";
import "./App.css"; // https://nerdcave.com/tailwind-cheat-sheet

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  // Manage state inside the main component
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [bedOption, setBedOption] = useState('1 Bed');
  const [petFriendly, setPetFriendly] = useState('No');
  const [smokingFriendly, setSmokingFriendly] = useState('No');
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    alert(`Check-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nBed: ${bedOption}\nPet Friendly: ${petFriendly}\nSmoking Friendly: ${smokingFriendly}`);
  };

  return (
    <div className="container">
      <h1>Room Search</h1>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <label className="text-xl">Check-in Date:</label>
        <input
          type="date"
          id="check-in"
          name="check-in"
          required
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)} // Use state to handle input
        />
        <br />

        <label>Check-out Date:</label>
        <input
          type="date"
          id="check-out"
          name="check-out"
          required
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)} // Use state to handle input
        />
        <br />

        <label>Bed Option:</label>
        <select
          id="bed-option"
          name="bed-option"
          required
          value={bedOption}
          onChange={(e) => setBedOption(e.target.value)} // Use state to handle input
        >
          <option value="1 Bed">1 Bed</option>
          <option value="2 Beds">2 Beds</option>
        </select>
        <br />

        <label>Pet Friendly:</label>
        <select
          id="pet-option"
          name="pet-option"
          required
          value={petFriendly}
          onChange={(e) => setPetFriendly(e.target.value)} // Use state to handle input
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />

        <label>Smoking Friendly:</label>
        <select
          id="smoking-option"
          name="smoking-option"
          required
          value={smokingFriendly}
          onChange={(e) => setSmokingFriendly(e.target.value)} // Use state to handle input
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />
        
        {/* <div className="flex gap-2 justify-center">
          <input ref={inputRef} />
        </div> */}
        
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default App;
