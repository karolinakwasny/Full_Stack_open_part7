export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Date.now() / 1000
    return payload.exp < now
  } catch (error) {
    console.error('Failed to decode token', error)
    return true
  }
}
