import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Revenue", value: "$124,500", icon: DollarSign, color: "text-[#00f0ff]" },
    { title: "Active Orders", value: "42", icon: ShoppingBag, color: "text-[#b026ff]" },
    { title: "Products Online", value: "156", icon: Activity, color: "text-[#ff0055]" },
    { title: "Total Users", value: "8,921", icon: Users, color: "text-white" },
  ];

  const recentOrders = [
    { id: "ORD-001", user: "Alex Gaming", amount: "$2,499", status: "Processing" },
    { id: "ORD-002", user: "Sarah Pro", amount: "$199", status: "Shipped" },
    { id: "ORD-003", user: "Neon Knight", amount: "$1,599", status: "Delivered" },
    { id: "ORD-004", user: "Cyber Punk", amount: "$899", status: "Processing" },
  ];

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5 min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-cyber font-bold text-white mb-2"
          >
            SYSTEM COMMAND
          </motion.h2>
          <p className="text-gray-400">Admin Analytics & Orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 font-mono">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-gray-300 font-mono">{order.id}</td>
                    <td className="p-4 text-white font-medium">{order.user}</td>
                    <td className="p-4 text-[#00f0ff] font-mono">{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        order.status === 'Processing' ? 'border-[#b026ff] text-[#b026ff] bg-[#b026ff]/10' :
                        order.status === 'Shipped' ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10' :
                        'border-[#25D366] text-[#25D366] bg-[#25D366]/10'
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
    </section>
  );
};

export default AdminDashboard;
