import React, { useState, useEffect, useRef } from 'react';
import { GetAllCoronaVaccines, GetAllPersons } from './Server';
import Chart from 'chart.js/auto';

export default function CoronaSummary() {
  const [vaccinations, setAllVaccinations] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [activePatients, setActivePatients] = useState([]);
  const [allperson, setAllPerson] = useState([]);
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await GetAllPersons();
      setAllPerson(result);
    };
    getData();
  }, []);

  useEffect(() => {
    const getDatavaccinations = async () => {
      const result = await GetAllCoronaVaccines();
      setAllVaccinations(result);
      const total = result.filter((v) => v.DateOfResult != null);
      setTotalPatients(total.length);

      // Calculate the number of active patients for each day in the last month
      const currentDate = new Date();
      const lastMonth = currentDate.getMonth()
      const active = new Array(31).fill(0); // Assuming there are 31 days in the month
      for (let i = 0; i < total.length; i++) {
        const resultDate = new Date(total[i].DateOfResult);
        const recoveryDate = new Date(total[i].DateOfRecovery);
        if(recoveryDate.getMonth()< lastMonth&& recoveryDate.getFullYear()===currentDate.getFullYear())
        {
          for(let i=resultDate.getDate() ;i<recoveryDate.getDate();i++ )
          active[i]++;
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
    const currentDate = new Date()
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const previousMonthName = previousMonth.toLocaleString('en-US', { month: 'long' });
    // Create a new Chart instance
    const newChart = new Chart(myChartRef, {
      
      type: 'bar',
      data: {
        labels: Array.from({ length: 31 }, (_, i) => i + 1 +previousMonthName), // Assuming there are 31 days in the month
        datasets: [
          {
            label: 'Active Patients',
            data: activePatients,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            type: 'category',
          },
        },
      },
    });

    // Store the new Chart instance in state
    setChart(newChart);
  }, []);

  const zeroLengthVaccinations = allperson.length - vaccinations.length;

  return (
    <>
      <p>The number of members of the fund who are not vaccinated: {zeroLengthVaccinations}</p>
      <div>
        {/* <p>Total patients: {totalPatients}</p> */}
        <canvas ref={chartRef} width="400" height="150" />
      </div>
    </>
  );
}