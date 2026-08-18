import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const records = await fetchCollection('workouts', workoutsEndpoint)
        if (!ignore) {
          setWorkouts(records)
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

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading workouts...</p>
  }

  if (error) {
    return <p className="status-text text-danger">Workouts unavailable: {error}</p>
  }

  return (
    <section className="data-panel" aria-labelledby="workouts-title">
      <div className="panel-heading">
        <p className="eyebrow">Workout library</p>
        <h1 id="workouts-title">Suggested plans</h1>
      </div>
      <div className="content-grid">
        {workouts.map((workout) => (
          <article className="summary-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
              <div>
                <dt>Exercises</dt>
                <dd>{Array.isArray(workout.exercises) ? workout.exercises.join(', ') : 'Coming soon'}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts