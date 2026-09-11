import './profile.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';

function Profile() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("UserContext hiba");
    }
    
    const { user, setUser } = context;
   

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        userName: user?.userName || '',
        email: user?.email || ''
    });

    const profileChange = async () => {

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/${user!.id}`,
                formData
            );
    
            const updatedUser = response.data;

            localStorage.setItem(
                'user',
                JSON.stringify(updatedUser)
            );
    
            setUser(updatedUser);
    
            setIsEditing(false);
    
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return <p>Nincs bejelentkezett felhasználó.</p>;
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-image-container">
                    <img
                        className="profile-image"
                        src={user.profileImage? `${import.meta.env.VITE_BACKEND_URL}${user.profileImage}`: "/profile.png"}
                        alt="Profilkép"
                    />
                </div>

                <h1>{user.userName}</h1>

                <div className="profile-info">

                    <div>
                        <strong>Felhasználónév:</strong>

                        {isEditing ? (
                            <input
                                value={formData.userName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        userName: e.target.value
                                    })
                                }
                            />
                        ) : (
                            <p>{user.userName}</p>
                        )}
                    </div>

                    <div>
                        <strong>Email:</strong>

                        {isEditing ? (
                            <input
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        ) : (
                            <p>{user.email}</p>
                        )}
                    </div>

                    <div>
                        <strong>Vezetéknév:</strong>

                        {isEditing ? (
                            <input
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        lastName: e.target.value
                                    })
                                }
                            />
                        ) : (
                            <p>{user.lastName}</p>
                        )}
                    </div>

                    <div>
                        <strong>Keresztnév:</strong>

                        {isEditing ? (
                            <input
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        firstName: e.target.value
                                    })
                                }
                            />
                        ) : (
                            <p>{user.firstName}</p>
                        )}
                    </div>

                </div>

                <div className="profile-actions">

                    <button
                        type="button"
                        className="edit-profile-button"
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        Profil szerkesztése
                    </button>

                    {isEditing && (
                        <button
                        type="button"
                        className="save-profile-button"
                        onClick={profileChange}
                    >
                        Mentés
                    </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;