import { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../services/orderService';
import OrderCard from '../components/OrderCard';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-[32px] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Order management</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Review and manage all orders</h1>
      </div>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="card-glass rounded-[32px] p-10 text-slate-300">No orders found.</div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
