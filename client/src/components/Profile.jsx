import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser(); 
  console.log('User:', user)
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(user?.profile_pic || ''); 
  const [showGallery, setShowGallery] = useState(false);

  const profilePics = [
    'https://cdnb.artstation.com/p/assets/images/images/019/525/577/large/j-j-adx-illustration2.jpg?1563889037',
    'https://marketplace.canva.com/EAFGTFnp6Ao/4/0/1600w/canva-orange-pixel-game-controller-twitch-logo-0o_UWEjzvz4.jpg',
    'https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg',
    'https://i.pinimg.com/550x/75/a9/f6/75a9f6f51174e81d54d67cb88bd82712.jpg',
    'https://static.vecteezy.com/ti/vecteur-libre/p1/21587308-pixel-monstre-dragon-diriger-pixelise-dragon-la-magie-animal-contes-de-fees-pour-le-pixel-art-jeu-et-icone-pour-site-internet-vectoriel.jpg',
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8aa8e709-a80c-437a-96d2-206821c105fa/dfbnl9m-9b79729e-0577-4de2-b288-3ee9735439bf.png/v1/fill/w_1280,h_1190,q_80,strp/dragon_pixel_art_by_craftyglitch_dfbnl9m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTE5MCIsInBhdGgiOiJcL2ZcLzhhYThlNzA5LWE4MGMtNDM3YS05NmQyLTIwNjgyMWMxMDVmYVwvZGZibmw5bS05Yjc5NzI5ZS0wNTc3LTRkZTItYjI4OC0zZWU5NzM1NDM5YmYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-ynuPvY_cn5u4UlDxrn_Ilm5fTsZmkC_0_S9ZVWcAVk',
    'https://images.hdqwalls.com/wallpapers/iron-man-8bit-z7.jpg',
    'https://i.pinimg.com/474x/8c/2f/49/8c2f49b6ea1caeba6977446ab1b26873.jpg',
    'https://img.itch.zone/aW1nLzE4NDEzMDc3LnBuZw==/315x250%23c/24VLF6.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIkK0CWNZNhxYwfGvYnjkfxrFzvjMS7e0FSNYgBITWV4rpYgYjgfAOs1A1qyluTsk1v7Q&usqp=CAU'
];

    useEffect(() => {
    // Fetch the user's profile picture from the server when the component mounts or user changes
    const fetchProfilePic = async () => {
      if (user?.userId) {
        console.log(user)

        const apiUrl = process.env.NODE_ENV === 'production' 
          ? 'https://null-labs-oejq.onrender.com/api/get-user-profile' 
          : 'http://localhost:4000/api/get-user-profile';

        `API URL: ${apiUrl}?userId=${user.userId}`

        try {
          const response = await fetch(`${apiUrl}?userId=${user.userId}`);
          const data = await response.json();
          console.log(data);

          if (data.profile_pic) {
            setProfilePic(data.profile_pic);  
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    };

    fetchProfilePic();
  }, [user]);

  const handleProfilePicSelect = async (selectedPic) => {
    const userId = user.userId;


    console.log('Selected Pic:', selectedPic);
    console.log('User ID:', userId);

    const apiUrl = process.env.NODE_ENV === 'production' 
    ? 'https://null-labs-oejq.onrender.com/api/update-profile-pic' 
    : 'http://localhost:4000/api/update-profile-pic';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePic: selectedPic,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }

      const data = await response.json();
      console.log('Server response', data);

      if (data.message === 'Profile picture updated successfully!') {
        setProfilePic(selectedPic); 
        setShowGallery(false);
        alert('Profile picture updated successfully');
      } else {
        alert('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update profile picture');
    }
  };

  if (!user) {
    return (
      <div className="no-user-container">
        <h2>You are not signed in</h2>
        <p>Please sign in or create an account to view your profile.</p>
        <div className="auth-buttons">
          <button onClick={() => navigate('/signin')} className="auth-button">
            Sign In
          </button>
          <button onClick={() => navigate('/createaccount')} className="auth-button">Create Account</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>{user?.username}</h1>

      <div className="profile-pic-section">
        <h3>Profile Picture</h3>
        <img
          src={profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
        <button
          className="change-pic-button"
          onClick={() => setShowGallery(!showGallery)}
        >
          Change Profile Picture
        </button>
        {showGallery && (
          <div className="profile-pic-gallery">
            {profilePics.map((pic, index) => (
              <div
                key={index}
                className="profile-pic-option"
                onClick={() => handleProfilePicSelect(pic)}
              >
                <img
                  src={pic}
                  alt={`Profile ${index + 1}`}
                  className="profile-pic-thumbnail"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;