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
  const [roomList, setRoomList] = useState<string[]>([]); // State to hold room list
  // Handle form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    
    const searchData = {
      checkInDate,
      checkOutDate,
      bedOption,
      petFriendly,
      smokingFriendly,
    };

    try{
      //call the backend API to fetch available rooms

      const response = await fetch('http://localhost:5000/api/rooms/search',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      if(response.ok){
        const data = await response.json();
        setRoomList(data.rooms);// Update state with the list of available rooms
      }else{
        console.error('Failed to fetch rooms');
      }

    } catch (error) {
      console.error('Failed to fetch rooms', error);
    }
  };

  return (
    <div className="container">
      <h1>Room Search</h1>
      <form onSubmit={handleSearch} action="#" method="POST">
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
