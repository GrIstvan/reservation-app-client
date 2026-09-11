import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './services.css'

interface Service {
    id: number;
    name: string;
    price: number;
    duration: number;
}

function Services() {
    const navigate = useNavigate();

    const location = useLocation();

    const providerId = location.state?.providerId;
    const providerName = location.state?.providerName;

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {

        if (!providerId) {
            return;
        }

        const getServices = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/services/provider/${providerId}`
                );

                setServices(response.data);

            } catch (error) {

                console.error(
                    "Nem sikerült lekérni a szolgáltatásokat:",
                    error
                );

            }

        };

        getServices();

    }, [providerId]);

    return (
        <div className="services-page">
            <button
                type="button"
                className="back-button"
                onClick={() => navigate('/home')}
            >
                ← Vissza
            </button>

            <h1>{providerName} szolgáltatásai</h1>

            <div className="services-list">

                {services.map((service) => (

                    <div
                        className="service-card"
                        key={service.id}
                        onClick={() => {
                            navigate('/booking', {
                                state: {
                                    serviceId: service.id,
                                    serviceName: service.name,
                                    providerId: providerId,
                                    duration: service.duration,
                                    price: service.price
                                }
                            });
                        }}>

                        <h2>{service.name}</h2>
                        <p>
                            Ár: {service.price} Ft
                        </p>
                        <p>
                            Időtartam: {service.duration} perc
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Services;