import React from 'react'
import {Bar} from 'react-chartjs-2'

const TotalBarChart = ({ data, labels }) => {
    return(
        <Bar
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Q1 (Jan-Mar)",
                        data: data[0],
                        barThickness: 30,
                        backgroundColor: "rgba(102,102,102,.5)",
                        borderColor: "#666666",
                        borderWidth: 3
                    },
                    {
                        label: "Q2 (Apr-Jun)",
                        data: data[1],
                        barThickness: 30,
                        backgroundColor: "rgba(102,71,61,.5)",
                        borderColor: "#66473D",
                        borderWidth: 3
                    },
                    {
                        label: "Q3 (Jul-Sep)",
                        data: data[2],
                        barThickness: 30,
                        backgroundColor: "rgba(190,102,75,.5)",
                        borderColor: "#BE664B",
                        borderWidth: 3
                    },
                    {
                        label: "Q4 (Oct-Dec)",
                        data: data[3],
                        barThickness: 30,
                        backgroundColor: "rgba(246,164,142,.5)",
                        borderColor: "#F6A48E",
                        borderWidth: 3
                    }
                ]
            }}
            height={400}
            width={800}
            options={{
                hover: true,
                responsive: true,
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