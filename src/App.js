import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const ENDPOINT = 'https://realtime-chart-1.herokuapp.com/';

const connectionOptions = {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 10000,
  "transports": ["websocket"]
};
function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    console.log("hello");
    const socket = socketIOClient(ENDPOINT, connectionOptions);
    socket.on('FromAPI', data => {
      setResponse(response => [...response, data]);
    });
  }, [])
  return (
    <div>
      <h1>Bitcoin</h1>
      <LineChart width={500} height={300} data={response}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="doge" stroke="#8884d8" />
        <Line dataKey="btc" stroke="#82ca9d" />

      </LineChart>
    </div>
  );
}

export default App;
