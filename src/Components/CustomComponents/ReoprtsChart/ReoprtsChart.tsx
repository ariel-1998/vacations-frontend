import "./ReoprtsChart.css";
import { Bar } from "react-chartjs-2";
import { Chart as Chartjs, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js/auto';
import { VacationLikeReport } from "../../../models/VacationLikeReport";

interface ReoprtsChartProps {
    chartData: VacationLikeReport[]
}

Chartjs.register(CategoryScale, LinearScale, BarController, BarElement);

function ReoprtsChart({ chartData }: ReoprtsChartProps): JSX.Element {

    const data = {
        labels: chartData.map((v) => `${v.vacationId} - ${v.destination}`),
        datasets: [{
            label: "Likes",
            data: chartData.map((v) => v.likes),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
           
        }]
    }

    return (
        <Bar data={data}style={{
            maxWidth: "90%",
            marginLeft: "5%",
            maxHeight: "calc(100vh - 180px)"
        }} />
    );
}

export default ReoprtsChart;
