import React from 'react'
import {Bar} from 'react-chartjs-2'

const TotalBarChart = ({ data, labels, backgroundColor, borderColor }) => {
    return(
        <Bar
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Q1 (Jan-Mar)",
                        data: data[0],
                        barThickness: 30,
                        backgroundColor: backgroundColor[0],
                        borderColor: borderColor[0],
                        borderWidth: 3
                    },
                    {
                        label: "Q2 (Apr-Jun)",
                        data: data[1],
                        barThickness: 30,
                        backgroundColor: backgroundColor[1],
                        borderColor: borderColor[1],
                        borderWidth: 3
                    },
                    {
                        label: "Q3 (Jul-Sep)",
                        data: data[2],
                        barThickness: 30,
                        backgroundColor: backgroundColor[2],
                        borderColor: borderColor[2],
                        borderWidth: 3
                    },
                    {
                        label: "Q4 (Oct-Dec)",
                        data: data[3],
                        barThickness: 30,
                        backgroundColor: backgroundColor[3],
                        borderColor: borderColor[3],
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
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            padding: 25
                        }
                    }]
                }
            }}
        />
    )
};

export default TotalBarChart;