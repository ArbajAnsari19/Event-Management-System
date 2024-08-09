// src/context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';

export const EventContext = createContext("");

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.81.54.8:5000/api/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        throw new Error(data.message || 'Failed to fetch events');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, error, getEvents }}>
      {children}
    </EventContext.Provider>
  );
};
