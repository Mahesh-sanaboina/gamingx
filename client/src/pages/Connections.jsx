import { motion } from 'framer-motion';

const connections = [
  {
    id: 1,
    name: "Steam",
    desc: "The world's largest gaming platform. Browse 50,000+ games, community hubs, and reviews.",
    url: "https://store.steampowered.com",
    emoji: "🎮",
    color: "#1b9ef7",
    border: "hover:border-[#1b9ef7]/60",
    glow: "hover:shadow-[0_0_40px_rgba(27,158,247,0.3)]",
    bg: "from-[#1b9ef7]/10",
    label: "Open Steam →",
  },
  {
    id: 2,
    name: "Discord Gaming",
    desc: "Join 50k+ active gamers. Voice channels, LFG, tournaments, and exclusive drops.",
    url: "https://discord.com/invite/gaming",
    emoji: "🟣",
    color: "#5865F2",
    border: "hover:border-[#5865F2]/60",
    glow: "hover:shadow-[0_0_40px_rgba(88,101,242,0.3)]",
    bg: "from-[#5865F2]/10",
    label: "Join Discord →",
  },
  {
    id: 3,
    name: "Reddit Gaming",
    desc: "The front page of gaming. Discuss titles, setups, memes, news and leaks.",
    url: "https://www.reddit.com/r/gaming",
    emoji: "🔴",
    color: "#ff4500",
    border: "hover:border-[#ff4500]/60",
    glow: "hover:shadow-[0_0_40px_rgba(255,69,0,0.3)]",
    bg: "from-[#ff4500]/10",
    label: "Visit Reddit →",
  },
  {
    id: 4,
    name: "Epic Games Store",
    desc: "Free weekly games, exclusives, and massive seasonal sales from Epic Games.",
    url: "https://store.epicgames.com",
    emoji: "⚡",
    color: "#00f0ff",
    border: "hover:border-[#00f0ff]/60",
    glow: "hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]",
    bg: "from-[#00f0ff]/10",
    label: "Open Epic →",
  },
  {
    id: 5,
    name: "YouTube Gaming",
    desc: "Watch live streams, gaming reviews, walkthroughs and esports highlights.",
    url: "https://www.youtube.com/gaming",
    emoji: "📺",
    color: "#ff0000",
    border: "hover:border-[#ff0000]/60",
    glow: "hover:shadow-[0_0_40px_rgba(255,0,0,0.3)]",
    bg: "from-[#ff0000]/10",
    label: "Go to YouTube →",
  },
  {
    id: 6,
    name: "IGN Gaming",
    desc: "Latest gaming news, game reviews, trailers and exclusive first-looks.",
    url: "https://www.ign.com",
    emoji: "📰",
    color: "#b026ff",
    border: "hover:border-[#b026ff]/60",
    glow: "hover:shadow-[0_0_40px_rgba(176,38,255,0.3)]",
    bg: "from-[#b026ff]/10",
    label: "Visit IGN →",
  },
];

const Connections = () => {
  return (
    <section className="min-h-screen py-32 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff0055] mb-4 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            CONNECTIONS
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff0055] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg tracking-widest uppercase font-light">Connect with the global gaming network.</p>
        </div>

        {/* 6 Gaming Connection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {connections.map((conn, index) => (
            <motion.a
              key={conn.id}
              href={conn.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`flex flex-col items-center text-center p-10 rounded-3xl glass-panel border border-white/5 ${conn.border} ${conn.glow} transition-all duration-400 group relative overflow-hidden cursor-pointer`}
            >
              {/* Hover BG Flare */}
              <div className={`absolute inset-0 bg-gradient-to-b ${conn.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Emoji Icon */}
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500 relative z-10 drop-shadow-lg">
                {conn.emoji}
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-white mb-3 tracking-wide relative z-10 group-hover:text-white transition-colors">
                {conn.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-8 relative z-10 leading-relaxed">
                {conn.desc}
              </p>

              {/* Connect Button */}
              <span
                className="relative z-10 font-bold text-sm tracking-[0.2em] uppercase transition-all flex items-center gap-2 group-hover:gap-4 px-6 py-2 rounded-full border"
                style={{ color: conn.color, borderColor: `${conn.color}40` }}
              >
                {conn.label}
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Connections;
