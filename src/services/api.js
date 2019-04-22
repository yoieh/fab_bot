export const profile = fetch("/api/user/me", {
  credentials: "same-origin"
})
  .then(res => res.json())
  .then(user => this.setState({ user: user }))
  .catch(err => console.error(err));
