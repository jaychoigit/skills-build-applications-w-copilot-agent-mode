const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeRecords(payload, resourceName) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[resourceName])) {
    return payload[resourceName]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.results?.[resourceName])) {
    return payload.results[resourceName]
  }

  if (Array.isArray(payload?.data?.[resourceName])) {
    return payload.data[resourceName]
  }

  return []
}

export async function fetchCollection(resourceName, endpoint = `${apiBaseUrl}/${resourceName}/`) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeRecords(payload, resourceName)
}