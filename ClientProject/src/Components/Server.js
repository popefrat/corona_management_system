import React from 'react';
import axios from 'axios'

export async function GetAllPersons()
{
    try{
        const response = await axios.get('http://localhost:8080/person/');
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
export async function GetAllCoronaVaccines()
{
    try{
        const response = await axios.get('http://localhost:8080/Corona/')
        return response.data;
    }
    catch (error) {
        console.log(error);
    } 
}
