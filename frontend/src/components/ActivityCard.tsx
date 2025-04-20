import React from "react";

type Activity = {
  name: string;
  type: string;
  distance_km: string;
  moving_time_min: number;
  start_date: string;
};

const typeIcons: Record<string, string> = {
  Ride: "🚴‍♂️",
  Run: "🏃‍♀️",
  Walk: "🚶‍♂️",
  Swim: "🏊‍♂️",
};

export const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { name, type, distance_km, moving_time_min, start_date } = activity;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700 transition hover:shadow-md">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {typeIcons[type] || "🏋️‍♂️"} {name}
        </h3>
        <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full uppercase">
          {type}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-medium">{distance_km}</span> km in{" "}
        <span className="font-medium">{moving_time_min}</span> min
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {new Date(start_date).toLocaleString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};
