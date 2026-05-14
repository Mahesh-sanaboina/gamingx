import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Revenue", value: "₹1,24,500", icon: DollarSign, color: "text-[#0070f3]" },
    { title: "Active Orders", value: "42", icon: ShoppingBag, color: "text-[#b026ff]" },
    { title: "Products Online", value: "156", icon: Activity, color: "text-[#ff0055]" },
    { title: "Total Users", value: "8,921", icon: Users, color: "text-[#1a1a2e]" },
  ];

  const recentOrders = [
    { id: "ORD-001", user: "Mahesh Gaming", amount: "₹2,499", status: "Processing" },
    { id: "ORD-002", user: "Sarah Pro", amount: "₹199", status: "Shipped" },
    { id: "ORD-003", user: "Neon Knight", amount: "₹1,599", status: "Delivered" },
    { id: "ORD-004", user: "Cyber Punk", amount: "₹899", status: "Processing" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/60 text-[10px] font-black uppercase tracking-[0.4em] text-[#0070f3] shadow-sm">
            Ethereal Command // 2026
          </span>
          <h2 className="text-5xl md:text-7xl font-cyber font-black glow-text uppercase">
            ANALYTICS
          </h2>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">
            Monitor the ethereal digital evolution.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 rounded-[2.5rem] group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center mb-8 shadow-sm ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-[#1a1a2e] mb-1 font-cyber">{stat.value}</h3>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-[3rem] w-full max-w-7xl overflow-hidden border-white/80"
      >
        <div className="p-10 border-b border-black/5 bg-white/40">
          <h3 className="text-xl font-black text-[#1a1a2e] uppercase tracking-widest">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/60 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black">
              <tr>
                <th className="p-8">Order ID</th>
                <th className="p-8">Customer</th>
                <th className="p-8">Amount</th>
                <th className="p-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-white/40 transition-colors">
                  <td className="p-8 text-gray-400 font-cyber text-xs">{order.id}</td>
                  <td className="p-8 text-[#1a1a2e] font-black uppercase text-xs tracking-wider">{order.user}</td>
                  <td className="p-8 text-[#0070f3] font-cyber text-xs">{order.amount}</td>
                  <td className="p-8">
                    <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                      order.status === 'Processing' ? 'border-[#b026ff]/30 text-[#b026ff] bg-[#b026ff]/5' :
                      order.status === 'Shipped' ? 'border-[#0070f3]/30 text-[#0070f3] bg-[#0070f3]/5' :
                      'border-green-500/30 text-green-500 bg-green-500/5'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
