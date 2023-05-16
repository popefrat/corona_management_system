import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './style.css';
import moment from 'moment';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

function User() {
  
    const [CoronaVaccinesById,setCoronaVaccinesById] = useState()
    const {state} = useLocation();
    const {findPerson} = state;
    const [file, setFile] = useState('');
    const [imageUrl,setImageUrl] = useState("/broken-image.jpg");

  useEffect(()=>{
    const getData = async ()=>{
      const response =await axios.get(`http://localhost:8080/Corona/${findPerson.id}`)
      setCoronaVaccinesById(response.data);
    }
    getData();
  },[])
  useEffect(() => {
    if(findPerson.image){
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/person/${findPerson.id}/image`); // הנתיב לשרת יכול להיות שונה בהתאם למיקום השרת שלך
        console.log(response)
        if (response.ok) {
          const imageBlob = await response.blob();
          const url = URL.createObjectURL(imageBlob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error fetching person image:', error);
      }
    };
    fetchImage();}
  }, []);
  const handleFileChange = (event) => {
    setImageUrl(URL.createObjectURL(event.target.files[0]));
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

  return (<>
            <div className="user-profile">
            <div className="user-photo-container">
            <div className="personal-area-text">Personal Area</div>
            </div>
            </div>
            <table className="all-persons-table">
                <thead>
                  <th>Profil</th>
                  <th>Name</th>
                  <th>identityCard</th>
                  <th>DateOfBirth</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>MobilePhone</th>
                  <th>Vaccinations</th>
                  <th>ManufacturerVaccine</th>
                  <th>DateOfResult</th>
                  <th>DateOfRecovery</th>
                </thead>
                <tbody>
                <tr>
                    <td>{imageUrl && (
                        <Avatar src={imageUrl} style={{ marginLeft: '20px',marginTop:"20px" }} />
                    )}</td>
                    <td>{findPerson.name}</td> 
                    <td>{findPerson.identityCard}</td>
                    <td>{moment(findPerson.DateOfBirth).format('DD/MM/YYYY')}</td>
                    <td>{`${findPerson.Address.city},${findPerson.Address.street},${findPerson.Address.number}`}</td>
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
    
