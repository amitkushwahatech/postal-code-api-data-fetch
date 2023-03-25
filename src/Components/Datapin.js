import React, { useState } from "react";

const Datapin = () => {
    const [pincode, setPincode] = useState(""); // for Pincode input
    const [data, setData] = useState([]); // for Serached pincode data 
    const [filter, setFilter] = useState(""); // for filter the input
    const [loading, setLoading] = useState(false); // showing laoding spiner 
    const [error, setError] = useState("");
    const [message, setmessage] = useState("") // dispaly message of how many pincode getting 
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`); // fetching data from api 
            const resdata = await response.json();
            
            if (resdata[0].Status === "Error") { // If pincode not found
                setmessage("");
                setData([]);
                setLoading(false);
                setError("Pincode not found. Please enter a valid pincode.");
            } else {
                setmessage(resdata[0]);
                setData(resdata[0].PostOffice);
                setLoading(false);
                setError("");
            }
    
        } catch (error) {

            setData([]);
            setLoading(false);
            setError("Error fetching data. Please try again later."); // setting the error
        }
    };

    const handleFilterChange = (event) => { // if filter update change the showing results
        setFilter(event.target.value);
    };
  
    // Apply filter
    const filteredData = data.filter((item) =>  
        item.Name.toLowerCase().includes(filter.toLowerCase())
    );
 
    // chcek pincode validtion
    const submitForm = (event) => {
        event.preventDefault();
        if (pincode.length !== 6) {
            setError("Please enter a valid 6-digit pincode.");
            setData([]);
        } else {
            fetchData();
        }
    };
   
    return (
        <div className="container my-3">
            <form onSubmit={submitForm}> 
                <label htmlFor="pincode" className="label m-3">Enter a 6-digit pincode:</label>
                <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="form-control in12345"
                    placeholder="Enter Pincode"
                />
                <button className="btn btn-dark my-3 bt12345" type="submit">Lookup</button>
            </form>
            {loading && <div className=" spinner-border text-danger lds-heart lds-hourglass" role="status"><div></div>
                <span className="visually-hidden">Loading.....</span>
            </div>}
            {error && <div className="error text-danger">{error}</div>}
            {data.length > 0  && (
                <div >
                    <div className="postCard">
                        <h4>Pincode :  <span style={{color:"red"}}>{pincode}</span></h4>
                        <h4 style={{color: "blue"}}>{message.Message}</h4>
                    </div>
                    <label htmlFor="filter" className="label my-2">Filter by post office name:</label>
                    <input
                        type="text"
                        id="filter"
                        value={filter}
                        className="form-control my-2"
                        placeholder="Filter"
                        onChange={handleFilterChange}
                        style={{boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"}}
                    />
                    {filteredData.length > 0 ? (
                        <div className="row" style={{justifyContent: "space-between"}}>
                            {filteredData.map((pincode) => (
                                <div className='col-md-4 my-3 postCard'>
                                    <div className='card border border-primary'>
                                        <h5 className='card-title text-center my-2'>Pincode Details</h5>
                                        <div className='card-body'>
                                            <p> Post Office Name : <span style={{color:"red"}}>{pincode.Name}</span> </p>
                                            <p >Pincode : <span style={{color:"red"}}> {pincode.Pincode}</span></p>
                                            <p>Deleviry Ststus : <span style={{color:"red"}}> {pincode.DeliveryStatus}</span></p>
                                            <p>District : <span style={{color:"red"}}>{pincode.District}</span></p>
                                            <p>State : <span style={{color:"red"}}>{pincode.State}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-danger">Couldn’t find the postal data you’re looking for...</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Datapin;