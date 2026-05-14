import { motion } from 'framer-motion';

const friends = [
  { name: 'Nyx', role: 'Tactician', status: 'online' },
  { name: 'Rift', role: 'Strategist', status: 'away' },
  { name: 'Voxa', role: 'Support', status: 'online' },
  { name: 'Cipher', role: 'Streamer', status: 'offline' },
];

const tournaments = [
  { title: 'Neon Clash', prize: '$50K', date: 'Sep 21', status: 'Live Qualifiers' },
  { title: 'Holo Arena', prize: '$18K', date: 'Oct 5', status: 'Registration open' },
  { title: 'Gravity Rush', prize: '$72K', date: 'Nov 11', status: 'Coming soon' },
];

const Community = () => (
  <section className="space-y-10">
    <div className="glass-panel rounded-[36px] p-10">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Gamer community</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Connect, compete, and craft your crew</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Discover teams, chat with players, and join premium tournaments in a social ecosystem designed for elite gamers.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[0.8fr_0.6fr]">
      <div className="space-y-6">
        <div className="card-glass rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Featured clubs</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <h3 className="font-semibold text-white">Neon Syndicate</h3>
              <p className="mt-2 text-sm text-slate-400">Elite FPS team with nightly raids and exclusive drops.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <h3 className="font-semibold text-white">Circuit Phantoms</h3>
              <p className="mt-2 text-sm text-slate-400">Strategy-focused crew that masters every meta shift.</p>
            </div>
          </div>
        </div>

        <div className="card-glass rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Live chat preview</p>
          <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Nyx</p>
              <p className="text-slate-400">Ready for the midnight raid. Need 1 more DPS and a skilled pilot.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Rift</p>
              <p className="text-slate-400">Holding the flank. Push when the neon wall drops.</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Voxa</p>
              <p className="text-slate-400">Team boost ready. Big reward if we hit 18 kills.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Active players</p>
          <div className="mt-6 space-y-4">
            {friends.map((friend) => (
              <div key={friend.name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div>
                  <h3 className="font-semibold text-white">{friend.name}</h3>
                  <p className="text-sm text-slate-400">{friend.role}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    friend.status === 'online' ? 'bg-emerald-400/15 text-emerald-300' : friend.status === 'away' ? 'bg-amber-400/15 text-amber-300' : 'bg-slate-700/60 text-slate-300'
                  }`}
                >
                  {friend.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-300">Tournament pulse</p>
          <div className="mt-6 space-y-4">
            {tournaments.map((match) => (
              <motion.div
                key={match.title}
                whileHover={{ y: -3 }}
                className="rounded-3xl border border-white/10 bg-slate-950/80 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{match.title}</h3>
                    <p className="text-sm text-slate-400">{match.status}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">{match.date}</span>
                </div>
                <p className="mt-4 text-sm text-slate-400">Prize pool: {match.prize}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Community;
