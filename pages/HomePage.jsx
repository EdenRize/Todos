const { useState } = React
const { useSelector, useDispatch } = ReactRedux

export function HomePage() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  let styles

  if (user) {
    styles = {
      color: user.prefs.color,
      backgroundColor: user.prefs.bgColor,
    }
  }

  return (
    <section className="home-page" style={styles}>
      <h1>Welcome to todos</h1>
    </section>
  )
}
