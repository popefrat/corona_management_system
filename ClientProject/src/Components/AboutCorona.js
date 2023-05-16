
import React, { useState, useEffect, useRef } from 'react';
import {GetAllCoronaVaccines,GetAllPersons} from './Server'
import Chart from 'chart.js/auto';

export default function CoronaSummary()
{
    const [vaccinations,setAllVaccinations] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [activePatients, setActivePatients] = useState([]);
    const [allperson, setAllPerson] = useState([]);
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const getData = async () => {
          const result = await GetAllPersons();
          setAllPerson(result);
        }
        getData();
      },[]);
      
    useEffect(() => {
        const getDatavaccinations = async () => {
            const result = await GetAllCoronaVaccines();
            setAllVaccinations(result);
            const total = result.filter((v) => v.DateOfResult != null);
            setTotalPatients(total.length);
      
            // Calculate the number of active patients for each month
            const active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < total.length; i++) {
              const resultDate = new Date(total[i].DateOfResult);
              const recoveryDate = new Date(total[i].DateOfRecovery);
      
              // Check if the patient was active during each month
              for (let j = resultDate.getMonth(); j <= recoveryDate.getMonth(); j++) {
                active[j]++;
              }
            }
            setActivePatients(active);
          };
          
          getDatavaccinations();
        }, []);
        useEffect(() => {
            if (chart) {
              // Update the chart data
              chart.data.datasets[0].data = activePatients;
              chart.update();
            }
          }, [activePatients]);
        useEffect(() => {
            const myChartRef = chartRef.current.getContext('2d');
        
            // Destroy the previous Chart instance if it exists
            if (chart !== null) {
              chart.destroy();
            }
        
            // Create a new Chart instance
            const newChart = new Chart(myChartRef, {
              type: 'bar',
              data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
                datasets: [
                  {
                    label: 'Active Patients',
                    data: activePatients,
                    backgroundColor: 'blue'
                  }
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  },
                  x: {
                    type: 'category'
                  }
                }
              }
            });
        
            // Store the new Chart instance in state
            setChart(newChart);
          },[]); 
      const zeroLengthVaccinations = allperson.length - vaccinations.length 
 
      return<>
      <p>The number of members of the fund who are not vaccinated:{zeroLengthVaccinations}</p>
      <div>
      {/* <p>Total patients: {totalPatients}</p> */}
      <canvas ref={chartRef} width="400" height="150" />
    </div>
      </>
}