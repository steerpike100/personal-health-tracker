import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    start_date: string;
    distance_km: string;
  }[];
};

export const ActivityGraph: React.FC<Props> = ({ data }) => {
  const chartData = data
    .map((act) => ({
      date: new Date(act.start_date),
      label: new Date(act.start_date).toLocaleDateString(),
      distance: parseFloat(act.distance_km),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="h-64 bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" stroke="#9ca3af" />
          <YAxis
            label={{ value: "km", angle: -90, position: "insideLeft", fill: "#6b7280" }}
            stroke="#9ca3af"
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="distance"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: "#6366f1" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
