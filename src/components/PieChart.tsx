"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChartComponent({chartdata}:{chartdata:any[]}){
    console.log(chartdata.filter((i)=>i.isActive))
    const data = {
        labels: [ 'Inactive', 'Active'],
        datasets: [
          {
            label: 'Active vs Inactive',
            data: [chartdata.filter((i)=>i.isActive!=true).length,chartdata.filter((i)=>i.isActive).length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 182, 235, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      return(
        <Pie style={{color:'white'}} data={data} />
      )
}