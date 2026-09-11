import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './booking.css';

function Booking() {

    const location = useLocation();

    const serviceName = location.state?.serviceName;
    const duration = location.state?.duration;
    const price = location.state?.price;

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const timeSlots = [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00'
    ];

    return (
        <div className="booking-page">

            <div className="booking-card">

                <h1>Foglalás</h1>

                <h2>{serviceName}</h2>


                <div className="calendar-container">

                    <h3>Válassz egy napot</h3>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedTime('');
                        }}
                    />

                </div>

                {selectedDate && (
                    <div className="time-container">

                        <h3>Válassz egy időpontot</h3>

                        <div className="time-slots">

                            {timeSlots.map((time) => (

                                <button
                                    type="button"
                                    key={time}
                                    className={
                                        selectedTime === time
                                            ? 'time-slot selected'
                                            : 'time-slot'
                                    }
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>

                            ))}

                        </div>

                    </div>
                )}

                {selectedDate && selectedTime && (
                    <div className="booking-summary">

                        <h3>Foglalás összegzése</h3>

                        <p>
                            Dátum: {selectedDate}
                        </p>

                        <p>
                            Időpont: {selectedTime}
                        </p>

                        <p>
                            Időtartam: {duration} perc
                        </p>

                        <p>
                            Ár: {price} Ft
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Booking;