import SearchBar from '../../components/searchbar';
import ServiceList from '../../components/serviceList';
import type { ServiceProvider } from '../../serviceProvider';
import ServiceDiscription from '../../components/serviceDescription/serviceDescription';
import './home.css';
import { useCallback, useState, useEffect, useContext, } from 'react';
import CustomButton from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../auth/auth';
import { useLocation } from 'react-router-dom';
import { Modal } from '../../components/popUp';
import ImageUpload from '../../components/upload';
import { UserContext } from '../../context/userContext';


function Home({ serviceList, loadMoreCallback, isLastPage, onChangeSearch, }:
    {
        serviceList: Array<ServiceProvider>,
        loadMoreCallback: (pageIdx: number) => void,
        isLoading: boolean, isLastPage: boolean
        onChangeSearch: (term: string) => void
        children?: React.ReactNode
    },) {
    const [selectedSProvider, setSelectedSProvider] = useState<ServiceProvider | null>(null);

    const selectSProviderCallback = useCallback((sProvider: ServiceProvider) => {
        setSelectedSProvider(sProvider);
        console.log(sProvider)
    }, [])

    const navigate = useNavigate();

    const context = useContext(UserContext);

    if (!context) {
        throw new Error("UserContext hiba");
    }

    const { setUser } = context;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user")
        setUser(null)
        setAccessToken("");
        navigate("/login");
    };
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(
        location.state?.loginSuccess ?? false
    );

    useEffect(() => {
        if (location.state?.loginSuccess) {
            navigate('/home', {
                replace: true,
                state: {}
            });
        }
    }, [location.state, navigate]);

    return (
        <div className="home-page">

            <div className="search-bar-container">
                <SearchBar onChange={onChangeSearch} />

                <div className='logout-button'>
                    <CustomButton onClick={handleLogout}>
                        Logout
                    </CustomButton>
                </div>
            </div>

            <ImageUpload />

            <Modal
                open={isModalOpen}
                className='loginSuccessModal'
                cancelFn={() => setIsModalOpen(false)}
                titleContent={<h3>Sikeres bejelentkezés</h3>}
                content={<p>Üdv újra!</p>}
            />

            <div className='service-list-container'>
                <ServiceList
                    serviceList={serviceList}
                    selectCallback={selectSProviderCallback}
                    loadMoreCallback={loadMoreCallback}
                    isLastPage={isLastPage}
                />
            </div>

            <div className='description-container'>
                <ServiceDiscription
                    serviceProvider={selectedSProvider}
                />
                <button
                    type="button"
                    className="services"
                    onClick={() => {
                        if (selectedSProvider) {
                            navigate('/services', {
                                state: {
                                    providerId: selectedSProvider.id,
                                    providerName: selectedSProvider.name
                                }
                            });
                        }
                    }}
                >
                    Szolgáltatások
                </button>


            </div>

        </div>

    )
}

export default Home