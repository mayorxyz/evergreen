import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { PlayArt } from '../components/PlayArt';
import { ABOUT_STORY, PRINCIPLES, ABOUT_STATS, CAREERS } from '../lib/about';

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function AboutPage() {
  return (
    <PageShell
      title="Built by people who love games"
      description="We're a remote-first team building the retention engine for the next generation of free-to-play games."
      tab="About"
      highlight="games"
    >
      <SEO title="About" description="We're building the retention engine for the next generation of games." />

      <div className="max-w-[1120px] mx-auto px-6 pb-[100px]">
        {/* Story */}
        <section className="mb-[100px] max-w-[680px]">
          {ABOUT_STORY.map((para, i) => (
            <p key={i} className="text-[14px] text-secondary leading-relaxed mb-4">{para}</p>
          ))}
        </section>

        {/* Principles */}
        <section className="mb-[100px]">
          <span className="tab-label mb-6 inline-block">PRINCIPLES</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.num}
                className="card p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-2">{p.num}/</div>
                <h3 className="font-[family-name:var(--font-display)] text-[18px] font-medium text-ink mb-2">
                  {p.title}
                </h3>
                <p className="text-[13px] text-secondary leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-[100px]">
          <span className="tab-label mb-6 inline-block">ILLUSTRATIVE FIGURES</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <div className="font-[family-name:var(--font-mono)] text-[32px] font-medium text-ink">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-[100px]">
          <span className="tab-label mb-6 inline-block">SAMPLE TEAM</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {CAREERS.concat(Array(5).fill(null)).slice(0, 8).map((_, i) => {
              const member = [
                { name: 'Alex Chen', role: 'CEO & Co-founder', line: 'Former VP Product at a top-10 mobile publisher' },
                { name: 'Sam Rivera', role: 'CTO & Co-founder', line: 'Built backend systems for 100M+ user games' },
                { name: 'Jordan Park', role: 'Head of Engineering', line: 'Ex-Unity, passionate about SDK design' },
                { name: 'Morgan Lee', role: 'Head of Product', line: '10 years in F2P game design' },
                { name: 'Taylor Kim', role: 'Head of Customer Success', line: 'Obsessed with making onboarding seamless' },
                { name: 'Casey Nguyen', role: 'Head of Design', line: 'Believes dashboards should be beautiful' },
                { name: 'Riley Johnson', role: 'Head of Marketing', line: 'Former game journalist turned marketer' },
                { name: 'Avery Martinez', role: 'Head of Operations', line: 'Keeps the remote team running smoothly' },
              ][i];
              return (
                <motion.div
                  key={i}
                  className="card p-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <PlayArt seed={member.name} kind="avatar" palette="default" width={64} height={64} />
                  </div>
                  <h3 className="text-[14px] font-medium text-ink">{member.name}</h3>
                  <p className="text-[12px] text-purple mt-0.5">{member.role}</p>
                  <p className="text-[12px] text-secondary mt-1">{member.line}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Careers */}
        <section className="mb-[60px]">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] font-medium tracking-[-0.02em] text-ink mb-6">
            Open roles
          </h2>
          <div className="space-y-2">
            {CAREERS.map((role) => (
              <div key={role.title} className="card p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-medium text-ink">{role.title}</h3>
                  <p className="text-[12px] text-muted mt-0.5">{role.location} · {role.team}</p>
                </div>
                <button className="btn-outline text-[12px] px-4 py-2" disabled>
                  Apply <span className="arrow">▸</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
