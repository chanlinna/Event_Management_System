import React, { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    pending: 0,
    ongoing: 0,
    approved: 0,
  });

  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const [pendingRes, ongoingRes, approvedRes, recentEventsRes] =
          await Promise.all([
            API.get("/events/pending/count", { headers }),
            API.get("/events/ongoing/count", { headers }),
            API.get("/events/approved/count", { headers }),
            API.get("/events/recent", { headers }),
          ]);

        setSummary({
          pending: pendingRes.data.count,
          ongoing: ongoingRes.data.count,
          approved: approvedRes.data.count,
        });

        setRecentEvents(recentEventsRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Dashboard overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card title="Pending Event" count={summary.pending} />
        <Card title="Ongoing Event" count={summary.ongoing} />
        <Card title="Approved Event" count={summary.approved} />
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent requested Event</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="bg-slate-500 text-white">
            <tr>
              <th className="p-3">Event ID</th>
              <th className="p-3">Customer ID</th>
              <th className="p-3">Organization</th>
              <th className="p-3">Phone number</th>
              <th className="p-3">Start date</th>
              <th className="p-3">End date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="p-3">{event.id}</td>
                <td className="p-3">{event.customerId}</td>
                <td className="p-3">{event.organization}</td>
                <td className="p-3">{event.phoneNumber}</td>
                <td className="p-3">{event.startDate}</td>
                <td className="p-3">{event.endDate}</td>
                <td className="p-3">
                  <span className="bg-slate-300 text-slate-800 text-xs font-medium px-2 py-1 rounded-md">
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
            {recentEvents.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No recent events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, count }) {
  return (
    <div className="border border-blue-300 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200">
      <div className="text-4xl font-bold text-blue-700">{count}</div>
      <div className="mt-2 text-lg text-gray-600">{title}</div>
    </div>
  );
}