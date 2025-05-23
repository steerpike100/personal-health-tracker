// src/components/ActivityGraph.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type Props = {
  data: {
    start_date: string;
    distance_km: string;
  }[];
};

export const ActivityGraph: React.FC<Props> = ({ data }) => {
  // Sort and format the data
 const chartData = data
  .map(act => ({
    date: new Date(act.start_date), // Keep as real Date
    label: new Date(act.start_date).toLocaleDateString(), // For display
    distance: parseFloat(act.distance_km),
  }))
  .sort((a, b) => a.date.getTime() - b.date.getTime()); // ✅ oldest to newest


  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis label={{ value: 'km', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="distance" stroke="#60a5fa" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
