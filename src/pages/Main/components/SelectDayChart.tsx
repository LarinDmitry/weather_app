import type {FC} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {ForecastDay} from '../MainTypes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  selectedDay: ForecastDay | null;
}

const SelectDayChart: FC<Props> = ({selectedDay}) => {
  const hoursData = selectedDay?.hour || [];

  const chartData = {
    labels: hoursData.map((h: any) => dayjs(h.time).format('HH:00')),
    datasets: [
      {
        label: 'Value',
        data: hoursData.map((h: any) => h.temp_c),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {display: false},
    },
    scales: {
      y: {
        ticks: {color: 'rgba(255, 255, 255, 0.7)'},
        grid: {color: 'rgba(255, 255, 255, 0.1)'},
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          callback: (_val: any, index: number) => (index % 2 === 0 ? chartData.labels[index] : ''),
        },
        grid: {display: false},
      },
    },
  };

  return (
    <Wrapper>
      {hoursData.length > 0 ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <NoData>There is no data to display</NoData>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
`;

const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.5);
`;

export default SelectDayChart;
