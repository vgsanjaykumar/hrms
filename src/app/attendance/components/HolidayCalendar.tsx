'use client';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Holidays from 'date-holidays';

const hd = new Holidays('IN');

export default function HolidayCalendar() {
  const [value, setValue] = useState(new Date());
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [leaveDays, setLeaveDays] = useState<Date[]>([
    // Example leave days, can be dynamic or fetched from API
    new Date(2025, 1, 12),
    new Date(2025, 1, 16),
  ]);

  useEffect(() => {
    // Fetch holidays for the current year
    const year = value.getFullYear();
    const month = value.getMonth();
    console.log('Calendar year:', year, 'month:', month);

    const allHolidays = hd.getHolidays(year);

    // Debug: log fetched holidays
    console.log('Fetched holidays:', allHolidays);

    // Temporarily remove filter to include all holidays
    const holidayDates = allHolidays
      //.filter(h => h.type === 'public') // Only public holidays
      .map(h => new Date(h.date));

    // Add hardcoded known holidays for testing
    const hardcodedHolidays = [
      new Date(year, 0, 26), // Republic Day
      new Date(year, 7, 15), // Independence Day
      new Date(year, 9, 2),  // Gandhi Jayanti
    ];

    setHolidays([...holidayDates, ...hardcodedHolidays]);
  }, [value]);

  const isHoliday = (date: Date) => {
    // Normalize dates to compare only year, month, day
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return holidays.some(holiday => {
      const d2 = new Date(holiday.getFullYear(), holiday.getMonth(), holiday.getDate());
      const isSame = d1.getTime() === d2.getTime();
      if (isSame) {
        console.log('Holiday matched:', d1.toDateString());
      }
      return isSame;
    });
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday=0, Saturday=6
  };

  const isLeave = (date: Date) => {
    return leaveDays.some(
      leave => leave.toDateString() === date.toDateString()
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (isHoliday(date)) {
       return 'bg-blue text-red-600 font-bold rounded-lg';

      }
      if (isLeave(date)) {
        return 'leave-tile';
      }
      if (isWeekend(date)) {
        return 'weekend-tile';
      }
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Holiday Calendar</h2>
      <Calendar
        onChange={(value, event) => {
          if (value && !Array.isArray(value)) {
            setValue(value);
          }
        }}
        value={value}
        tileClassName={tileClassName}
      />
      {/* Optionally, add a legend */}
      <div className="mt-4 flex space-x-4 justify-center text-sm ">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-300 rounded"></div>
          <span> Holiday</span>
        </div>
      </div>
    </div>
  );
}
