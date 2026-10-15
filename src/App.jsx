import React, { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin,
  Menu, X, Code2, Database, Globe, Terminal, ExternalLink, Download,
  GraduationCap, BriefcaseBusiness, CheckCircle2, Send, Sparkles, GitCommit,
  CalendarDays, Layers3
} from 'lucide-react'

const GITHUB = 'https://github.com/Pratik10000'
const LINKEDIN = 'https://www.linkedin.com/in/pratik-maurya-ab6358279/'
const PROJECT_REPO = 'https://github.com/pradeep-r04/parkease'
const LIVE_PROJECT = 'https://parkease-frontend-c5ff.onrender.com'
const EMAIL = 'mauryapratik70@gmail.com'
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`

const skills = [
  { title: 'Frontend', icon: Globe, items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'DOM'] },
  { title: 'Backend', icon: Terminal, items: ['Node.js', 'Express.js', 'REST APIs', 'CRUD'] },
  { title: 'Database', icon: Database, items: ['MySQL', 'SQL', 'Relational data'] },
  { title: 'Tools', icon: Code2, items: ['Git', 'GitHub', 'VS Code', 'Postman'] },
]

const certifications = [
  { name: 'Computer System Organisation', provider: 'SWAYAM · NITTTR Chennai', score: '86%', year: '2026', link: 'https://onlinecourses.swayam2.ac.in/ntr26_ed96/certificate?q=DccjUGXqL%2BIWyHHYqBs2tO/HwwJ5JMj2sZlHBGPds2EYduDNcKHoOxISuU2MT/pJ' },
  { name: 'Fundamentals of Computer Systems (CIT-001)', provider: 'SWAYAM · IGNOU', score: '77%', year: '2026', link: 'https://onlinecourses.swayam2.ac.in/nou26_cs01/certificate?q=31Oy00o/5PzMNRlK/5R6TpuSrRq6KARJGqIUmZ69PB36dhjDMb5w/uiGNK2PJGnr' },
  { name: 'Introduction to C Programming', provider: 'SWAYAM · Manipal University Jaipur', score: '74.5%', year: '2026', link: 'https://swayam.gov.in/' },
  { name: 'Software Engineering', provider: 'SWAYAM · Anna University Chennai', score: '64%', year: '2026', link: 'https://swayam.gov.in/' },
]

function SectionHeading({ eyebrow, title, note }) {
  return <div className="section-heading reveal">
    <div><span className="eyebrow">{eyebrow}</span><h2>{title.split("<br/>").map((part, index) => <React.Fragment key={index}>{index > 0 && <br />}{part}</React.Fragment>)}</h2></div>
    {note && <p>{note}</p>}
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [github, setGithub] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState('')
  const [year] = useState(new Date().getFullYear())

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch('https://api.github.com/users/Pratik10000')
      .then(r => { if (!r.ok) throw new Error('GitHub unavailable'); return r.json() })
      .then(setGithub).catch(() => setGithub({ public_repos: null, followers: null }))
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const updateForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  async function submitContact(e) {
    e.preventDefault()
    setSending(true)
    setNotice('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not send message')
      setNotice('Message sent — thanks for reaching out!')
      setForm({ name: '', email: '', message: '' })
    } catch {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      setNotice('Opening your email app as a fallback. You can send the message there.')
    } finally {
      setSending(false)
    }
  }

  const nav = [
    ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'],
    ['Education', '#education'], ['Contact', '#contact']
  ]

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">P<span>.</span></span><span>PRATIK MAURYA</span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        {nav.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot" /> OPEN TO OPPORTUNITIES <span className="availability-line" /></div>
          <h1>Building the web,<br /><span className="gradient-text">one idea at a time.</span></h1>
          <p className="hero-intro">Hey, I'm <strong>Pratik Maurya</strong> — an MCA student and aspiring full-stack developer who enjoys turning practical problems into useful digital experiences.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
            <a className="button button-quiet" href="/resume.pdf" target="_blank" rel="noreferrer">View resume <Download size={16} /></a>
          </div>
          <div className="hero-socials">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" aria-label="Email">
              <Mail size={18} />
            </a>
            <span className="social-divider" /><span className="location"><MapPin size={14} /> Delhi, India</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="code-card">
            <div className="code-top"><div className="window-dots"><i /><i /><i /></div><span>pratik.js</span><span className="code-status">● LIVE</span></div>
            <div className="code-content">
              <div><span className="line-no">01</span><span className="code-purple">const</span> developer = {'{'}</div>
              <div><span className="line-no">02</span>&nbsp;&nbsp;name: <span className="code-green">'Pratik Maurya'</span>,</div>
              <div><span className="line-no">03</span>&nbsp;&nbsp;focus: <span className="code-green">'Full-stack'</span>,</div>
              <div><span className="line-no">04</span>&nbsp;&nbsp;curious: <span className="code-orange">true</span>,</div>
              <div><span className="line-no">05</span>&nbsp;&nbsp;building: <span className="code-green">'what matters'</span></div>
              <div><span className="line-no">06</span>{'}'};</div>
              <div className="code-spacer" />
              <div><span className="line-no">08</span><span className="code-purple">while</span> (learning) {'{'}</div>
              <div><span className="line-no">09</span>&nbsp;&nbsp;build();</div>
              <div><span className="line-no">10</span>&nbsp;&nbsp;improve();</div>
              <div><span className="line-no">11</span>{'}'} <span className="cursor">▍</span></div>
            </div>
            <div className="code-footer"><span><span className="tiny-dot" /> JavaScript</span><span>UTF-8</span><span>Ln 11, Col 2</span></div>
          </div>
          <div className="float-chip chip-top"><Code2 size={15} /> Build with purpose</div>
          <div className="float-chip chip-bottom"><Sparkles size={15} /> Always learning</div>
          <div className="hero-number"><span>01</span><span className="number-rule" /><span>PORTFOLIO / {year}</span></div>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-icon"><ArrowDown size={15} /></span> SCROLL TO EXPLORE</a>
      </section>

      <section className="section-wrap about-section" id="about">
        <SectionHeading eyebrow="01 / A LITTLE ABOUT ME" title="Curious by nature.<br/>Developer by choice." note="I like understanding how things work — then building something useful with that knowledge." />
        <div className="about-grid">
          <div className="about-main reveal">
            <p className="large-copy">I’m developing my skills across the stack, from crafting responsive interfaces to connecting applications with APIs and databases.</p>
            <p>My approach is simple: keep learning, write maintainable code, and focus on experiences that feel clear and intuitive. Through projects like ParkEase, I’m getting hands-on practice with frontend development, backend workflows, relational data, and deployment.</p>
            <a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">More about my journey <ArrowUpRight size={16} /></a>
          </div>
          <div className="stats-grid reveal">
            <div className="stat-card"><span className="stat-icon"><GraduationCap size={18} /></span><strong>MCA</strong><span>CDAC Noida · 2027</span></div>
            <div className="stat-card"><span className="stat-icon"><Layers3 size={18} /></span><strong>Full-stack</strong><span>Growing across the stack</span></div>
            <div className="stat-card"><span className="stat-icon"><Github size={18} /></span><strong>{github?.public_repos ?? '—'}</strong><span>Public repositories{github?.public_repos == null ? ' · loading' : ''}</span></div>
            <div className="stat-card"><span className="stat-icon"><GitCommit size={18} /></span><strong>Learn. Build.</strong><span>Repeat with purpose</span></div>
          </div>
        </div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <SectionHeading eyebrow="02 / MY TOOLKIT" title="Tools I use to make<br/>ideas real." note="A growing toolkit for building, connecting, and shipping web applications." />
        <div className="skill-grid">
          {skills.map(({ title, icon: Icon, items }, i) => <article className="skill-card reveal" key={title} style={{ '--delay': `${i * 90}ms` }}>
            <div className="skill-card-top"><span className="skill-icon"><Icon size={19} /></span><span className="skill-index">0{i + 1}</span></div>
            <h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <SectionHeading eyebrow="03 / SELECTED WORK" title="Projects with a<br/>purpose." note="Learning by building real features, solving real problems, and iterating as I go." />
        <article className="project-card reveal">
          <div className="project-preview">
            <div className="preview-top"><span className="preview-brand"><span className="preview-brand-mark">P</span> ParkEase</span><span className="preview-live"><i /> PROJECT PREVIEW</span></div>
            <div className="parking-scene">
              <div className="parking-label">SMART PARKING <span>↗</span></div>
              <div className="parking-slots">
                <div className="parking-slot"><span className="slot-number">A01</span><div className="car car-one"><i /></div><span className="slot-state">OCCUPIED</span></div>
                <div className="parking-slot slot-free"><span className="slot-number">A02</span><div className="slot-plus">+</div><span className="slot-state">AVAILABLE</span></div>
                <div className="parking-slot"><span className="slot-number">A03</span><div className="car car-two"><i /></div><span className="slot-state">OCCUPIED</span></div>
              </div>
              <div className="preview-bottom"><span>LIVE SLOT OVERVIEW</span><span>03 / 24 SLOTS</span></div>
            </div>
          </div>
          <div className="project-info">
            <div className="project-kicker"><span>FEATURED PROJECT</span><span>01 / TEAM PROJECT</span></div>
            <h3>ParkEase</h3>
            <p>A web-based parking booking experience designed to help users view parking availability and manage bookings, with admin tools for slot management.</p>
            <div className="project-contributions"><span>MY CONTRIBUTIONS</span><ul><li>Frontend interface and responsive layouts</li><li>Backend/API and MySQL data workflows</li><li>Deployment and hosting support</li></ul></div>
            <div className="project-tags"><span>HTML / CSS / JS</span><span>Node.js</span><span>MySQL</span><span>REST API</span></div>
            <div className="project-links"><a className="button button-primary" href={LIVE_PROJECT} target="_blank" rel="noreferrer">Live project <ExternalLink size={15} /></a><a className="button button-outline" href={PROJECT_REPO} target="_blank" rel="noreferrer">Source repository <Github size={16} /></a></div>
          </div>
        </article>
        <div className="project-note reveal"><span className="note-icon"><Sparkles size={16} /></span><p><strong>More projects are in progress.</strong> This portfolio is designed to grow as I build and publish more work.</p><a href={GITHUB} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={15} /></a></div>
      </section>

      <section className="section-wrap education-section" id="education">
        <SectionHeading eyebrow="04 / LEARNING PATH" title="Education &<br/>certifications." note="The academic foundation behind my work, plus continued learning through online courses." />
        <div className="education-grid">
          <div className="timeline">
            <div className="timeline-item reveal"><span className="timeline-dot" /><span className="timeline-date">2025 — 2027 · EXPECTED</span><h3>Master of Computer Applications (MCA)</h3><p>CDAC Noida</p><span className="grade-pill">CGPA 8.22 / 10 · First year</span></div>
            <div className="timeline-item reveal"><span className="timeline-dot" /><span className="timeline-date">2023</span><h3>B.Sc. Physical Sciences</h3><p>University of Delhi</p><span className="grade-pill">CGPA 8.03 / 10</span></div>
          </div>
          <div className="cert-list">
            <div className="cert-list-heading"><h3>SWAYAM courses</h3><span>04 CERTIFICATES</span></div>
            {certifications.map((cert, i) => <a className="cert-item reveal" href={cert.link} target="_blank" rel="noreferrer" key={cert.name}>
              <span className="cert-number">0{i + 1}</span><span className="cert-content"><strong>{cert.name}</strong><small>{cert.provider} · {cert.year}</small></span><span className="cert-score">{cert.score}</span><ArrowUpRight className="cert-arrow" size={16} />
            </a>)}
            <p className="cert-footnote">Certificate links open the provider page. For two courses, a general SWAYAM link is used because a direct verification URL was not available.</p>
          </div>
        </div>
      </section>

      <section className="section-wrap github-section">
        <div className="github-panel reveal">
          <div className="github-copy"><span className="eyebrow">05 / CODE IN PUBLIC</span><h2>Follow the work<br />as it evolves.</h2><p>My GitHub is where projects, experiments, and learning-in-progress come together.</p><a className="button button-primary" href={GITHUB} target="_blank" rel="noreferrer">Visit GitHub <Github size={16} /></a></div>
          <div className="github-visual">
            <div className="github-window"><div className="github-window-bar"><Github size={16} /><span>Pratik10000 / overview</span><span className="window-more">•••</span></div><div className="github-window-body"><div className="gh-line gh-wide" /><div className="gh-line gh-short" /><div className="gh-line gh-medium" /><div className="gh-activity-title">Contribution activity</div><div className="contribution-grid">{Array.from({ length: 84 }, (_, i) => <i key={i} className={`level-${(i * 7 + Math.floor(i / 5) * 3) % 5}`} />)}</div><div className="gh-legend"><span>Less</span>{[0, 1, 2, 3, 4].map(n => <i className={`level-${n}`} key={n} />)}<span>More</span></div></div></div>
            <p className="github-caption"><span className="live-dot" /> GitHub profile data is fetched live when available. The grid above is a decorative illustration, not actual contribution data.</p>
          </div>
        </div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <SectionHeading eyebrow="06 / LET'S CONNECT" title="Have an idea?<br/>Let's talk." note="Open to internships, entry-level opportunities, collaborations, and interesting projects." />
        <div className="contact-grid">
          <div className="contact-left reveal"><p className="large-copy">Good things start with a conversation. Send me a note and let's see what we can build.</p>
            <a className="contact-detail" href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer"><span className="contact-detail-icon"><Mail size={18} /></span><span><small>EMAIL ME</small><strong>{EMAIL}</strong></span><ArrowUpRight size={16} /></a>
            <a className="contact-detail" href={LINKEDIN} target="_blank" rel="noreferrer"><span className="contact-detail-icon"><Linkedin size={18} /></span><span><small>CONNECT ON LINKEDIN</small><strong>Pratik Maurya</strong></span><ArrowUpRight size={16} /></a>
            <div className="contact-location"><MapPin size={15} /> Delhi, India <span>·</span> IST (UTC+5:30)</div>
          </div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <label>Your name<input name="name" value={form.name} onChange={updateForm} placeholder="What should I call you?" required minLength="2" /></label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required /></label>
            <label>Your message<textarea name="message" value={form.message} onChange={updateForm} placeholder="Tell me a little about it..." required minLength="8" rows="4" /></label>
            <button className="button button-primary send-button" type="submit" disabled={sending}>{sending ? 'Preparing…' : 'Send a message'} <Send size={16} /></button>
            {notice && <p className="form-notice" role="status"><CheckCircle2 size={15} /> {notice}</p>}
            <p className="form-hint">If the contact API isn't configured, your email app will open with the message prepared.</p>
          </form>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <a className="brand footer-brand" href="#home"><span className="brand-mark">P<span>.</span></span><span>PRATIK MAURYA</span></a>
      <span>Designed & built with care <span className="heart">♥</span></span>
      <span>© {year} Pratik Maurya</span>
      <a className="back-top" href="#home">BACK TO TOP ↑</a>
    </footer>
  </div>
}

export default App
