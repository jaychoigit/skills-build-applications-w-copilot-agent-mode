import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const records = await fetchCollection('leaderboard', leaderboardEndpoint)
        if (!ignore) {
          setLeaderboard(records)
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

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status-text text-danger">Leaderboard unavailable: {error}</p>
  }

  return (
    <section className="data-panel" aria-labelledby="leaderboard-title">
      <div className="panel-heading">
        <p className="eyebrow">Leaderboard</p>
        <h1 id="leaderboard-title">Top performers</h1>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="rank-row" key={entry._id ?? entry.userEmail}>
            <span className="rank-number">#{entry.rank}</span>
            <div>
              <h2>{entry.displayName}</h2>
              <p>{entry.teamName}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard