import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Anavbar from './Anavbar';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:4000/users`);
        setUsers(userResponse.data);

        const vendorResponse = await axios.get(`http://localhost:4000/sellers`);
        setVendors(vendorResponse.data);

        const itemResponse = await axios.get(`http://localhost:4000/item`);
        setItems(itemResponse.data);

        const orderResponse = await axios.get(`http://localhost:4000/orders`);
        setOrders(orderResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalUsers = users.length;
  const totalVendors = vendors.length;
  const totalItems = items.length;
  const totalOrders = orders.length;

  const data = [
    { name: 'Users', value: totalUsers, fill: '#2B124C' },
    { name: 'Vendors', value: totalVendors, fill: 'cyan' },
    { name: 'Items', value: totalItems, fill: 'blue' },
    { name: 'Orders', value: totalOrders, fill: 'orange' },
  ];

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Anavbar />
      <h3 className="text-center">Dashboard</h3>
      <Card body style={{ background: "white", width: "80%", margin: "20px auto", height: "580px" }}>
        <div className="flex justify-around items-center p-4">
          <Link to="/users" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-red-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center">
              USERS <br /> <br />{totalUsers}
            </div>
          </Link>
          <Link to="/sellers" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-blue-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center">
              Vendors <br /> <br /> {totalVendors}
            </div>
          </Link>
          <Link to="/items" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-green-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center">
              Items <br /> <br />{totalItems}
            </div>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <div className="w-64 h-32 bg-yellow-500 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800 text-center">
              Total Orders <br /> <br />{totalOrders}
            </div>
          </Link>
        </div>
        <div style={{ paddingLeft: "50px" }}>
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </div>
      </Card>
    </div>
  );
}

export default Ahome;
