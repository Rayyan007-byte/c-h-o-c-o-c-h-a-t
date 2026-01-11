import { ArcElement, CategoryScale, Chart as ChartJs, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { getLast7Days } from '../../lib/features';
import { bisque, chocolate, goldenSand, goldenSandLight } from '../constants/color';

ChartJs.register(Tooltip, CategoryScale, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {display: false},
        title: {display: false},
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            // display: false
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
            // display: false
        },
    }
}
const LineChart = ({value=[]}) => {
    const data = {
        labels,
        datasets: [
            {
            data: value,
            label: "Revenue",
            fill: true,
            backgroundColor: goldenSandLight,
            borderColor: goldenSand
        },
           /*  {
            data: [1, 22, 45, 6],
            label: "Revenue",
            fill: true,
            backgroundColor: cadetBlueLight,
            borderColor: cadetBlue
            } */
    ]
    }
  return (
   <Line data={data} options={lineChartOptions} />
  )
}

const donoughtChartOptions = {
    responsive: true,
    plugins: {
        legend: {display: true}
    },
    cutout: 50,
}
const DonoughtChart = ({value = [], labels = []}) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: [bisque, chocolate],
                offset: 20
            }
        ]
    }
  return (
    <div>
      <Doughnut data={data} options={donoughtChartOptions} />
    </div>
  )
}

export { DonoughtChart, LineChart };

