const { useSelector } = ReactRedux

export function AboutUs() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  let styles

  if (user) {
    styles = {
      color: user.prefs.color,
      backgroundColor: user.prefs.bgColor,
    }
  }

  return (
    <section style={styles}>
      <h2>About Us</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam
        quo veniam velit dolor reprehenderit, laudantium consequatur neque
        numquam labore quae. Accusamus libero perferendis ducimus? Alias unde
        hic quisquam doloremque.
      </p>
    </section>
  )
}
