const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { store } from './store/store.js'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <section className="main-layout app">
            <AppHeader />
            <main>
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<AboutUs />} path="/about" />
                <Route element={<TodoIndex />} path="/todo" />
                <Route element={<UserProfile />} path="/profile" />
                <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                <Route path="/todo/edit" element={<TodoEdit />} />
              </Routes>
            </main>
          </section>
        </Router>
      </Provider>
    )
  }
}
