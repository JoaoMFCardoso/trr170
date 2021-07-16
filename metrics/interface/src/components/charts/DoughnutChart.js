import React from 'react'
import {Doughnut} from 'react-chartjs-2'

const DoughnutChart = ({ chart_data, chart_labels }) => {
    return(
        <Doughnut
            data={{
                labels: chart_labels,
                datasets: [
                    {
                        data: chart_data[0][1],
                        barThickness: 30,
                        backgroundColor: ["rgba(102,102,102,.5)","rgba(102,71,61,.5)","rgba(190,102,75,.5)","rgba(246,164,142,.5)"],
                        borderColor: ["#666666","#66473D","#BE664B","#F6A48E"],
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
                    display:false
                }
            }}
        />
    )
};

export default DoughnutChart;