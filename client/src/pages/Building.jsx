import { motion } from 'framer-motion';
import { Download, Cpu, Code2 } from 'lucide-react';

const documents = [
  {
    id: 1,
    title: "Ultimate PC Build Guide",
    desc: "Step-by-step blueprint for assembling high-end gaming rigs. Includes components checklist, wiring guide, and BIOS setup tips.",
    icon: Cpu,
    color: "text-[#00f0ff]",
    borderColor: "border-[#00f0ff]/30",
    hoverBorder: "hover:border-[#00f0ff]",
    glow: "shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]",
    bgColor: "bg-[#00f0ff]",
    file: "/pc-build-guide.pdf",
    fileName: "pc-build-guide.pdf",
    badge: "HARDWARE",
  },
  {
    id: 2,
    title: "How To Build Games 2026",
    desc: "Master next-gen game development. Covers Unreal Engine 5, AI-driven NPCs, ray tracing, cloud gaming, and the developer roadmap.",
    icon: Code2,
    color: "text-[#b026ff]",
    borderColor: "border-[#b026ff]/30",
    hoverBorder: "hover:border-[#b026ff]",
    glow: "shadow-[0_0_20px_rgba(176,38,255,0.3)]",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(176,38,255,0.5)]",
    bgColor: "bg-[#b026ff]",
    file: "/game-dev-guide.pdf",
    fileName: "game-dev-guide.pdf",
    badge: "DEV GUIDE",
  },
];

const Building = () => {
  return (
    <section className="min-h-screen py-32 relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#b026ff] mb-4 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            BUILD ZONE
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg tracking-widest uppercase font-light">
            Download official gaming blueprints and dev guides.
          </p>
        </div>

        {/* Two PDF Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative p-10 rounded-3xl glass-panel border ${doc.borderColor} ${doc.hoverBorder} ${doc.hoverGlow} transition-all duration-500 flex flex-col items-center text-center group overflow-hidden`}
            >
              {/* Background gradient flare */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 ${doc.bgColor} rounded-full blur-[100px] opacity-10 group-hover:opacity-25 transition-opacity duration-500`}></div>

              {/* Badge */}
              <div className={`mb-6 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase border ${doc.borderColor} ${doc.color} ${doc.glow}`}>
                {doc.badge}
              </div>

              {/* Icon */}
              <div className={`w-24 h-24 rounded-2xl bg-black/60 flex items-center justify-center mb-8 border ${doc.borderColor} ${doc.color} ${doc.glow} group-hover:scale-110 transition-all duration-500 relative z-10`}>
                <doc.icon className="w-12 h-12" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide relative z-10">{doc.title}</h3>
              <p className="text-gray-400 mb-10 text-base leading-relaxed relative z-10">{doc.desc}</p>

              {/* Download Button */}
              <a
                href={doc.file}
                download={doc.fileName}
                className={`relative z-10 w-full max-w-xs flex items-center justify-center gap-3 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 ${doc.color} bg-white/5 border ${doc.borderColor} ${doc.hoverBorder} ${doc.hoverGlow} hover:bg-white/10 cursor-pointer`}
              >
                <Download className="w-5 h-5 animate-bounce" />
                DOWNLOAD PDF
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Building;
