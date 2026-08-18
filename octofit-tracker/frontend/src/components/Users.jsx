import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const records = await fetchCollection('users', usersEndpoint)
        if (!ignore) {
          setUsers(records)
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

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="status-text">Loading users...</p>
  }

  if (error) {
    return <p className="status-text text-danger">Users unavailable: {error}</p>
  }

  return (
    <section className="data-panel" aria-labelledby="users-title">
      <div className="panel-heading">
        <p className="eyebrow">Profiles</p>
        <h1 id="users-title">OctoFit members</h1>
      </div>
      <div className="content-grid">
        {users.map((user) => (
          <article className="summary-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Age</dt>
                <dd>{user.age}</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>{user.fitnessGoal}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users