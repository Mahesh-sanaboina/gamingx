import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getOrders } from '../services/orderService';
import OrderCard from '../components/OrderCard';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadOrders();
  }, []);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[32px] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Profile</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Welcome back, {user?.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Manage your account, review past orders, and keep track of the latest inventory and community events.
          </p>
        </div>
        <div className="glass-panel rounded-[32px] p-8">
          <h2 className="text-2xl font-semibold text-white">Account details</h2>
          <div className="mt-6 space-y-4 text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Email</p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Membership</p>
              <p>Standard Gamer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Your orders</p>
        {orders.length === 0 ? (
          <div className="card-glass rounded-[32px] p-8 text-slate-300">No orders yet. Place your first order to upgrade your rig.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
