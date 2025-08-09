import React from 'react';

const leaveData = [
  { id: 1, empId: '101', name: 'Krishna Kumar', designation: 'UI/UX', from: '24/11/2023', to: '02/12/2023', days: 8, type: 'Sick Leave', reason: 'Fever', status: 'Approved' },
  { id: 2, empId: '101', name: 'Krishna Kumar', designation: 'UI/UX', from: '03/12/2023', to: '05/12/2023', days: 2, type: 'Casual Leave', reason: 'Personal', status: 'Rejected' },
];

export default function LeaveRequests() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Sr.No</th>
              <th className="p-2 border">Em.Id</th>
              <th className="p-2 border">Em.Name</th>
              <th className="p-2 border">Designation</th>
              <th className="p-2 border">From Date</th>
              <th className="p-2 border">To Date</th>
              <th className="p-2 border">No. of Days</th>
              <th className="p-2 border">Leave Type</th>
              <th className="p-2 border">Reasons</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={leave.id}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{leave.empId}</td>
                <td className="p-2 border">{leave.name}</td>
                <td className="p-2 border">{leave.designation}</td>
                <td className="p-2 border">{leave.from}</td>
                <td className="p-2 border">{leave.to}</td>
                <td className="p-2 border">{leave.days}</td>
                <td className="p-2 border">{leave.type}</td>
                <td className="p-2 border">{leave.reason}</td>
                <td className={`p-2 border font-bold ${leave.status === 'Approved' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
