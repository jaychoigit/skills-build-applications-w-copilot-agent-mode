import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const records = await fetchCollection('teams', teamsEndpoint)
        if (!ignore) {
          setTeams(records)
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

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading teams...</p>
  }

  if (error) {
    return <p className="status-text text-danger">Teams unavailable: {error}</p>
  }

  return (
    <section className="data-panel" aria-labelledby="teams-title">
      <div className="panel-heading">
        <p className="eyebrow">Teams</p>
        <h1 id="teams-title">Training groups</h1>
      </div>
      <div className="content-grid">
        {teams.map((team) => (
          <article className="summary-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p>{team.city}</p>
            <dl>
              <div>
                <dt>Coach</dt>
                <dd>{team.coach}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} min</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{Array.isArray(team.members) ? team.members.join(', ') : 'None assigned'}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams