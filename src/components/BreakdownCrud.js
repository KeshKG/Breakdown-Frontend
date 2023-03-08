import React from 'react';
import axios from "axios";
import { useEffect,useState } from "react";
// import './BreakdownCrud.css';

function BreakdownCrud() {

    const [BreakdownID, setBreakdownID] = useState("");
    const [CompName, setCompName] = useState("");
    const [DriverName, setDriverName] = useState("");
    const [RegNo, setRegNo] = useState("");
    const [BreakDate, setBreakDate] = useState("");
    const [breakdowns, setUsers] = useState([]);
      useEffect(() => {
        (async () => await Load())();
      }, []);
      async function Load() {
        
        const result = await axios.get("https://localhost:7261/api/Breakdown/GetBreakdown/");
        setUsers(result.data);
        console.log(result.data);
      }
      async function save(event) {
      
        event.preventDefault();
        try {
          await axios.post("https://localhost:7261/api/Breakdown/AddBreakdown", {
            
            CompName: CompName,
            DriverName: DriverName,
            RegNo: RegNo,
            BreakDate: BreakDate,
          
          });
          alert("Breakdown Registation Successfully");
              setBreakdownID("");
              setCompName("");
              setDriverName("");
              setRegNo("");
              setBreakDate("");
          
        
          Load();
        } catch (err) {
          alert(err);
        }
      }
     
      async function UpdateBreakdown(breakdowns) {
        setCompName(breakdowns.CompName);
        setDriverName(breakdowns.DriverName);
        setRegNo(breakdowns.RegNo);
        setBreakDate(breakdowns.BreakDate);
      
        setBreakdownID(breakdowns.BreakdownID);
      }
     
      async function DeleteBreakdown(BreakdownID) {
      await axios.delete("https://localhost:7195/api/Breakdown/DeleteBreakdown/" + BreakdownID);
       alert("Breakdown deleted Successfully");
       setBreakdownID("");
       setCompName("");
       setDriverName("");
       setRegNo("");
       setBreakDate("");
       Load();
      }
     
      async function update(event) {
        event.preventDefault();
        try {
     
      await axios.patch("https://localhost:7261/api/Breakdown/UpdateBreakdown/"+ breakdowns.find((u) => u.BreakdownID === BreakdownID).BreakdownID || BreakdownID,
            {
            BreakdownID: BreakdownID,
            CompName: CompName,
            DriverName: DriverName,
            RegNo: RegNo,
            BreakDate: BreakDate,
     
            }
          );
          alert("Breakdown Updated");
          setBreakdownID("");
          setCompName("");
          setDriverName("");
          setRegNo("");
          setBreakDate("");
        
          Load();
        } catch (err) {
          alert(err);
        }
      }

    return (
      <div className='main' style={{background:"#373737", color:"white"}}>
        <h1 style={{textAlign: 'center', fontSize: 60, color:"red"}}>Breakdown Details</h1>
      <div className="container mt-4" style={{textAlign: 'center', paddingBottom:20}}>
        <form>
          <div class="form-group" style={{marginLeft: -10}}>
          <label>Breakdown ID</label>
            <input
              type="text"
              className="form-control"
              id="BreakdownID"
              value={BreakdownID}
              onChange={(event) => {
                setBreakdownID(event.target.value);
              }}
            />
            </div>
            <div className="container mt-4" style={{marginLeft: -26}}>
            <label>Company Name</label>
            <input
              type="text"
              className="form-control"
              id="CompName"
              value={CompName}
              onChange={(event) => {
                setCompName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              className="form-control"
              id="DriverName"
              value={DriverName}
              onChange={(event) => {
                setDriverName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Reg Number</label>
            <input
              type="text"
              className="form-control"
              id="RegNo"
              value={RegNo}
              onChange={(event) => {
                setRegNo(event.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{marginLeft: 55}}>
            <label>Date</label>
            <input
              type="DateTime"
              className="form-control"
              id="BreakDate"
              value={BreakDate}
              onChange={(event) => {
                setBreakDate(event.target.value);
              }}
            />
          </div>
          <div style={{marginTop: 20}}>
            <button className="btn btn-primary mt-4" style={{width: 75, height:30, marginLeft:88 }} onClick={save}>
              Add 
            </button>
            <button className="btn btn-warning mt-4" style={{width: 75, height:30  }} onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
 
      <table className="table table-dark" align="center">
        <thead>
          <tr >
            <th scope="col" style={{padding:30}}>Breakdown ID</th>
            <th scope="col" style={{padding:30}}>Company Name</th>
            <th scope="col" style={{padding:30}}>Driver Name</th>
            <th scope="col" style={{padding:30}}>Reg Number</th>
            <th scope="col" style={{padding:30}}>Date</th>
        
            <th scope="col" style={{padding:30, color:"red"}}>Option</th>
          </tr>
        </thead>
        {breakdowns.map(function fn(breakdown) {
          return (
            <tbody>
              <tr>
                <th scope="row">{breakdown.BreakdownID} </th>
                <td>{breakdown.CompName}</td>
                <td>{breakdown.DriverName}</td>
                <td>{breakdown.RegNo}</td>
                <td>{breakdown.BreakDate}</td>
                
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    style={{background:"green", marginLeft:15}}
                    onClick={() => UpdateBreakdown(breakdown)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{background:"red"}}
                    onClick={() => DeleteBreakdown(breakdown.BreakdownID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default BreakdownCrud;