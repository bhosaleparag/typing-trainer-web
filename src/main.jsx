import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { 
  RouterProvider,
  Route,
  defer,
  createRoutesFromElements,
  createBrowserRouter 
} from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './Layout'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Setting from './components/Setting'
import Tips from './components/Tips'
import Feedback from './components/Feedback'
import WordTyping from './components/games/WordTyping'
import WordRace from './components/games/WordRace'
import SpellingChecker from './components/games/SpellingChecker'
import { requireAuth } from "./utils"
import Logout from './components/Logout'
import { store, persistor } from './store/store';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="signIn" element={<SignIn/>}/>
    <Route path="logout" element={<Logout/>}/>
    <Route path="signUp" element={<SignUp/>}/>
    <Route path="dashboard" element={<Dashboard/>} 
      loader={async () => {return await requireAuth()}}
    />
    <Route path="setting" element={<Setting />}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="tips" element={<Tips/>}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="feedback" element={<Feedback/>}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="WordTyping" element={<WordTyping/>}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="wordRace" element={<WordRace/>}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="spellingChecker" element={<SpellingChecker/>}
      loader={async () => {return await requireAuth()}}
    />
    <Route path="*" element={<NotFound/>}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
