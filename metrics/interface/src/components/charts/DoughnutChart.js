import React from 'react'
import {Doughnut} from 'react-chartjs-2'

const DoughnutChart = ({ data, labels, backgroundColor, borderColor}) => {
    return(
        <Doughnut
            data={{
                labels: labels,
                datasets: [
                    {
                        data: data,
                        barThickness: 30,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 3
                    }
                ]
            }}
            height={400}
            width={800}
            options={{
                hover: true,
                responsive: false,
                legend: {
                    position: 'bottom'
                },
                scales: {
                    display:false
                }
            }}
        />
    )
};

export default DoughnutChart;