import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const records = await fetchCollection('activities')
        if (!ignore) {
          setActivities(records)
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading activities...</p>
  }

  if (error) {
    return <p className="status-text text-danger">Activities unavailable: {error}</p>
  }

  return (
    <section className="data-panel" aria-labelledby="activities-title">
      <div className="panel-heading">
        <p className="eyebrow">Activity log</p>
        <h1 id="activities-title">Recent training</h1>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Athlete</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.userEmail}-${activity.completedAt}`}>
                <td>{activity.type}</td>
                <td>{activity.userEmail}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities