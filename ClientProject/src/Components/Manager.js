import React, { useEffect, useState } from 'react'
import './style.css'
import {GetAllPersons,GetAllCoronaVaccines} from './Server'
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
    export default function AllMembers()
    {
        const [allpersons,setAllPersons] = useState([]);
        const[vaccinations,setAllVaccinations] = useState([]);
        const [imageUrl,setImageUrl] = useState("/broken-image.jpg");
        useEffect(() => {
            const getData = async () => {
              const result = await GetAllPersons();
              setAllPersons(result);
            }
            getData();
          },[]);
        useEffect(() => {
            const getDatavaccinations = async () => {
              const result = await GetAllCoronaVaccines();
              setAllVaccinations(result);
            }
            getDatavaccinations();
          },[vaccinations]);

          useEffect(() => {
            const fetchImage = async (person) => {
              try {
                const response = await fetch(`http://localhost:8080/person/${person.id}/image`);
                if (response.ok) {
                  const imageBlob = await response.blob();
                  const url = URL.createObjectURL(imageBlob);
                  setImageUrl((prevImageUrls) => ({ ...prevImageUrls, [person.id]: url }));
                }
              } catch (error) {
                console.error('Error fetching person image:', error);
              }
            };
            allpersons.forEach((person) => {
              if (person.image) {
                fetchImage(person);
              }
            });
          }, [allpersons]);
        
    
          return (
            <table className="all-persons-table">
              <thead>
                <tr>
                  <th>Profil</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>IdentityCard</th>
                  <th>DateofBirth</th>
                  <th>Phone</th>
                  <th>MobilePhone</th>
                  <th>Vaccinations</th>
                  <th>ManufacturerVaccine</th>
                  <th>DateOfResult</th>
                  <th>DateOfRecovery</th>
                </tr>
              </thead>
              <tbody >
                {allpersons.map(person => {
                  const personVaccinations = vaccinations.find(v => v.PersonId === person.id);
                  const imageUrls = imageUrl[person.id];
                  return (
                    <tr key={person.id}>
                      <td><Avatar src={imageUrls} style={{ marginLeft: '20px',marginTop:"20px" }}/></td>
                      <td>{person.name}</td>
                      <td>{`${person.Address.city}, ${person.Address.street} ${person.Address.number}`}</td>
                      <td>{person.identityCard}</td>
                      <td>{moment(person.DateOfBirth).format('DD/MM/YYYY')}</td>
                      <td>{person.Phone}</td>
                      <td>{person.MobilePhone}</td>
                      {personVaccinations!=null?(<>
                      <td>
                        <div>{personVaccinations && personVaccinations.DateOfGettingVaccinated.map((index,date)=>  (
                            <div key={date}>
                            <div>{moment(index).format('DD/MM/YYYY')}</div>
                            </div> ))}
                            </div>
                      </td>
                            <td>
                                {personVaccinations.ManufacturerVaccine.map((str,index)=>(
                                <div key={index}>
                                    <div>{str}</div>
                                </div>))}
                            </td>
                            <td>{personVaccinations && moment(personVaccinations.DateOfResult).format('DD/MM/YYYY')}</td>
                            <td>{personVaccinations &&moment(personVaccinations.DateOfRecovery).format('DD/MM/YYYY')}</td></>):(
                            <> <td>This data has not been entered yet</td>
                            <td>This data has not been entered yet</td>
                            <td>This data has not been entered yet</td></>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
    }
