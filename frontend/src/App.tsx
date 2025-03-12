import "./App.css"; // https://nerdcave.com/tailwind-cheat-sheet

function App() {
  return (
    <div className="container">
      <h1>Room Search</h1>
      <form action="#" method="POST">
        <label className="text-xl">Check-in Date:</label>
        <input type="date" id="check-in" name="check-in" required />
        <br />

        <label>Check-out Date:</label>
        <input type="date" id="check-out" name="check-out" required />
        <br />

        <label>Bed Option:</label>
        <select id="bed-option" name="bed-option" required>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
        </select>
        <br />

        <label>Pet Friendly:</label>
        <select id="pet-option" name="pet-option" required>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <br />

        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default App;

{
  /* <div></div>
<p></p> */
}
