import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Layout from '../../components/shared/Layout'
import PageHeader from '../../components/shared/PageHeader'
import Button from '../../components/shared/Button'
import busSchedule from '../../data/busSchedule.json'
import styles from './Mammogram.module.css'

export default function BusSchedule() {
  const { setBookingDetails, confirmBooking } = useApp()
  const navigate = useNavigate()

  function handleSelect(bus) {
    const details = {
      type: 'bus',
      clinicId: bus.id,
      date: bus.displayDates,
      time: bus.times,
    }
    setBookingDetails(details)
    confirmBooking(details)
    navigate('/mammogram/confirmed')
  }

  return (
    <Layout>
      <PageHeader title="Mobile screening bus" />
      <div className={styles.page}>
        <p className={styles.subtitle} style={{ paddingTop: 0 }}>
          No appointment needed. Walk in any time during operating hours.
        </p>

        <div className={styles.busList}>
          {busSchedule.map(bus => (
            <div key={bus.id} className={styles.busCard}>
              <div className={styles.busHeader}>
                <span className={styles.busLocation}>{bus.location}</span>
                <span className={styles.busDates}>{bus.displayDates}</span>
              </div>
              <p className={styles.busAddress}>{bus.address}</p>
              <p className={styles.busTimes}>{bus.times}</p>
              <div className={styles.busFooter}>
                {bus.walkIn && <span className={styles.walkinBadge}>Walk-ins welcome</span>}
                <span className={styles.langList}>{bus.languages.join(' · ')}</span>
              </div>
              <div className={styles.busSelectBtn}>
                <Button variant="primary" size="md" fullWidth onClick={() => handleSelect(bus)}>
                  I'll go here
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          No registration required. Just show up.
        </p>
      </div>
    </Layout>
  )
}
