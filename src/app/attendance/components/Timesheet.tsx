import React from 'react';

const timesheetData = [
  { date: '05/08/2025', in: '9:30 AM', out: '6:00 PM', status: 'Present' },
  { date: '04/08/2025', in: '9:35 AM', out: '5:55 PM', status: 'Present' },
];

export default function Timesheet() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Timesheet</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Logged In</th>
            <th className="p-2 border">Logged Out</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheetData.map((t, index) => (
            <tr key={index}>
              <td className="p-2 border">{t.date}</td>
              <td className="p-2 border">{t.in}</td>
              <td className="p-2 border">{t.out}</td>
              <td className="p-2 border">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
