import React, { useState } from "react";
import axios from "axios";

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6) {
      setError("Pincode must be 6 digits");
      setData([]);
      setFilteredData([]);
      return;
    }
    setError("");
    setLoading(true);
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((response) => {
        const responseData = response.data[0];
        if (responseData.Status === "Error") {
          setError(responseData.Message);
          setData([]);
          setFilteredData([]);
          setLoading(false);
        } else {
          setData(responseData.PostOffice);
          setFilteredData(responseData.PostOffice);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong!");
        setData([]);
        setFilteredData([]);
        setLoading(false);
      });
  };

  const filterData = () => {
    const filtered = data.filter((d) =>
      d.Name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pincode">Enter Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        <button type="submit">Lookup</button>
      </form>
      {error && <div className="error">{error}</div>}
      {data.length > 0 && (
        <div>
          <input
            type="text"
            id="filter"
            name="filter"
            placeholder="Filter by post office name"
            value={filter}
            onChange={handleFilterChange}
          />
          {filteredData.length === 0 && (
            <div>Couldn’t find the postal data you’re looking for...</div>
          )}
          {filteredData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pincode</th>
                  <th>District</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((d) => (
                  <tr key={d.Name}>
                    <td>{d.Name}</td>
                    <td>{d.Pincode}</td>
                    <td>{d.District}</td>
                    <td>{d.State}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeLookup;
