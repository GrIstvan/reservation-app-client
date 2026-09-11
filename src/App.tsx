import { useCallback, useEffect, useState } from 'react';
import './App.css'
import TopNav, { type TopNavProps } from "./components/topNav/topNav";
import Home from './pages/home/home';
import Loading from './pages/loading/loading';
import { Route, Routes, useLocation } from 'react-router-dom';
import RegistrationPage from './pages/registration';
import LoginPage from './pages/Login/login';
import { useNavigate } from 'react-router-dom';
import type { ServiceProvider } from './serviceProvider';
import { setAccessToken } from './auth/auth.ts'
import { getAllProviders } from './api/providers.ts';
import ImageUpload from './components/upload.tsx';
import Profile from './pages/profile/profile';
import type { User } from './types/users.ts';
import { UserContext } from './context/userContext.ts';
import Services from './pages/services/services';
import Booking from './pages/booking/booking';

function App() {
  const TopNavProps: TopNavProps = {
    title: 'Booking Manager',
    links: [
      { label: 'Home', href: '/home' },
      { label: 'Login', href: '/login' },
      { label: 'Registration', href: '/registration' }
    ],
  }

  const [serviceProviders, setServiceProviders] = useState<Array<ServiceProvider>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIdx, setPageIdx] = useState(0);
  const [isLastPage, setIsLastlPage] = useState(false);
  const [searchBar, setSearchBar] = useState("")
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {

    const storeToken = localStorage.getItem("accessToken")

    if (storeToken) {
      setAccessToken(storeToken)
      setToken(storeToken)
    }
  }, [token])

  useEffect(() => {

    if (['/login', '/registration'].includes(location.pathname)) {
      setIsLoading(false)
      return
    }
    if (isLastPage == false) {
      setIsLoading(true);
      getAllProviders(pageIdx, searchBar)
        .then((response) => {

          const data = response.data;

          if (pageIdx > 0)
            setServiceProviders(prev => prev.concat(data))
          else
            setServiceProviders(data)

          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            setAccessToken('')
            setToken(null)

            navigate('/login')
          }
          setIsLoading(false)
        });
    }
  }, [pageIdx, isLastPage, searchBar, navigate, location]);

  const loadMoreCallback = useCallback((idx: number) => {
    setPageIdx(idx)
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {(isLoading && pageIdx === 0) ?
        <Loading></Loading>
        :
        <>
          <TopNav {...TopNavProps}>
          </TopNav>
        </>}
      <Routes>
        <Route path='/home' element={
          <Home

            serviceList={serviceProviders}
            loadMoreCallback={loadMoreCallback}
            isLoading={isLoading}
            isLastPage={isLastPage}
            onChangeSearch={(term) => { setPageIdx(0); setIsLastlPage(false); setServiceProviders([]); setSearchBar(term) }}>
            {token && <ImageUpload></ImageUpload>}

          </Home>}></Route>

        <Route path='/registration' element={
          <RegistrationPage></RegistrationPage>
        }></Route>

        <Route path='/login' element={
          <LoginPage onToken={(newToken) => { setAccessToken(newToken); { setToken(newToken) } }}></LoginPage>
        }></Route>

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/services"
          element={<Services />}
        />
        
        <Route
          path="/booking"
          element={<Booking />}
        />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
