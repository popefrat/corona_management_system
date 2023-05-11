import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './style.css';
import moment from 'moment';
import axios from 'axios';

function User() {
    const [CoronaVaccinesById,setCoronaVaccinesById] = useState()
    const {state} = useLocation();
    const {findPerson} = state;
    const [file, setFile] = useState('');
  
  useEffect(()=>{
    const getData = async ()=>{
      const response =await axios.get(`http://localhost:8080/Corona/${findPerson.id}`)
      setCoronaVaccinesById(response.data);
    }
    getData();
  },[])
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch(`http://localhost:8080/person/${findPerson.id}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
    //  const base64String = (String.fromCharCode(...new Uint8Array(findPerson.image.data)))
  return (<>
            {/* <img src={`http://localhost:8080${findPerson.image}`} alt="profil"/> */}
            <img src = {findPerson.image} alt = "profil"/>
            <div className="user-profile">
            <div className="user-photo-container">
            <div className="personal-area-text">Personal Area</div>
                {/* <img src={`http://localhost:8080/${findPerson?.image}`} alt={'profil'} className="user-photo" /> */}
                {/* <img src={`http://localhost:8080/uploads`} alt={'profil'} className="user-photo" /> */}
                {/* <img src={`data:${findPerson.image.contentType};base64,${base64String}`} alt={'profil'} className="user-photo" /> */}

            </div>
            </div>
            <table className="all-persons-table">
                <thead>
                  {/* <th>Profil</th> */}
                  <th>Name</th>
                  <th>identityCard</th>
                  <th>DateOfBirth</th>
                  <th>Address</th>
                  <th>DateofBirth</th>
                  <th>Phone</th>
                  <th>MobilePhone</th>
                  <th>Vaccinations</th>
                  <th>ManufacturerVaccine</th>
                  <th>DateOfResult</th>
                  <th>DateOfRecovery</th>
                </thead>
                <tbody>
                <tr>
                    <td>{findPerson.name}</td> 
                    <td>{findPerson.identityCard}</td>
                    <td>{moment(findPerson.DateOfBirth).format('DD/MM/YYYY')}</td>
                    <td>{findPerson.Address.city}</td>
                    <td>{findPerson.Address.street}{""}{findPerson.Address.number}</td>
                    <td>{findPerson.Phone}</td>
                    <td>{findPerson.MobilePhone}</td>
                    {CoronaVaccinesById?(<>
                      <td>
                        <div>{CoronaVaccinesById && CoronaVaccinesById.DateOfGettingVaccinated.map((index,date)=>  (
                            <div key={date}>
                            <div>{moment(index).format('DD/MM/YYYY')}</div>
                            </div> ))}
                            </div>
                      </td>
                    <td>{CoronaVaccinesById.ManufacturerVaccine.map((date,index)=>(
                        <div key={index}>
                        <div>{date}</div>
                        </div>))}
                    </td>
                    <td>{moment(CoronaVaccinesById.DateOfResult).format('DD/MM/YYYY')}</td>
                    <td>{moment(CoronaVaccinesById.DateOfRecovery).format('DD/MM/YYYY')}</td>
                  </>):(<><td>This data has not been entered yet</td>
                          <td>This data has not been entered yet</td>
                          <td>This data has not been entered yet</td>
                          <td>This data has not been entered yet</td></>)}
                </tr>
                </tbody>
            </table>
            <form onSubmit={handleSubmit} className="form1">
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    </>
  );
}
 export default User;
    
