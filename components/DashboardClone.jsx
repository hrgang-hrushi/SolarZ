import React from 'react'
import styles from '../styles/DashboardClone.module.css'

export default function DashboardClone() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>Crextio</div>
        <nav className={styles.nav}>
          <a className={styles.active}>Dashboard</a>
          <a>People</a>
          <a>Hiring</a>
          <a>Devices</a>
          <a>Apps</a>
          <a>Salary</a>
          <a>Calendar</a>
          <a>Reviews</a>
        </nav>
        <div className={styles.headerRight}>
          <div className={styles.stat}><div className={styles.statNum}>78</div><div className={styles.statLabel}>Employee</div></div>
          <div className={styles.stat}><div className={styles.statNum}>56</div><div className={styles.statLabel}>Hirings</div></div>
          <div className={styles.stat}><div className={styles.statNum}>203</div><div className={styles.statLabel}>Projects</div></div>
        </div>
      </header>

      <main className={styles.grid}>
        <section className={styles.leftCol}>
          <div className={styles.profileCard}>
            <img src="/images/avatar.svg" alt="avatar" className={styles.avatar} />
            <div className={styles.profileInfo}>
              <div className={styles.name}>Lora Piterson</div>
              <div className={styles.role}>UX/UI Designer</div>
            </div>
            <div className={styles.balance}>$1,200</div>
          </div>

          <div className={styles.smallCard}>
            <div className={styles.cardTitle}>Pension contributions</div>
            <div className={styles.cardList}>
              <div>Devices</div>
              <div className={styles.deviceItem}>MacBook Air <span className={styles.muted}>Version M1</span></div>
              <div>Compensation Summary</div>
              <div>Employee Benefits</div>
            </div>
          </div>
        </section>

        <section className={styles.centerCol}>
          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>Progress</div>
            <div className={styles.big}>6.1h</div>
            <div className={styles.sub}>Work Time this week</div>
            <div className={styles.spark}></div>
          </div>

          <div className={styles.timeTracker}>
            <div className={styles.ttHeader}>Time tracker</div>
            <div className={styles.ttCircle}>
              <div className={styles.ttTime}>02:35</div>
              <div className={styles.ttLabel}>Work Time</div>
            </div>
          </div>

          <div className={styles.calendarCard}>
            <div className={styles.calHeader}>August — September 2024</div>
            <div className={styles.calGrid}>
              <div className={styles.event}>Weekly Team Sync</div>
              <div className={`${styles.event} ${styles.small}`}>Onboarding Session</div>
            </div>
          </div>
        </section>

        <section className={styles.rightCol}>
          <div className={styles.onboardCard}>
            <div className={styles.onboardHeader}>Onboarding <span className={styles.onboardPercent}>18%</span></div>
            <div className={styles.progressPills}>
              <span className={`${styles.pill} ${styles.yellow}`}>Task</span>
              <span className={`${styles.pill} ${styles.dark}`}></span>
              <span className={`${styles.pill} ${styles.gray}`}></span>
            </div>
            <div className={styles.onboardList}>
              <div className={styles.task}>Interview <span className={styles.taskDate}>Sep 15, 08:30</span></div>
              <div className={styles.task}>Team Meeting <span className={styles.taskDate}>Sep 16, 10:30</span></div>
              <div className={`${styles.task} ${styles.done}`}>Project Update <span className={styles.taskDate}>Sep 17, 13:00</span></div>
              <div className={styles.task}>Discuss Q3 Goals <span className={styles.taskDate}>Sep 18, 14:45</span></div>
            </div>
          </div>

          <div className={styles.metricsCard}>
            <div className={styles.metricItem}><strong>15%</strong> Interviews</div>
            <div className={styles.metricItem}><strong>60%</strong> Project time</div>
            <div className={styles.metricItem}><strong>10%</strong> Output</div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>Designed clone — responsive dashboard demo</footer>
    </div>
  )
}
