import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser(); 
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(user?.profilePic || ''); 
  const [previewPic, setPreviewPic] = useState('');

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save the profile picture
  const handleSaveProfilePic = () => {
    
    if (previewPic) {
      setProfilePic(previewPic);
      alert('Profile picture updated!');
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
      <h2>{user?.username}</h2>

      <div className="profile-pic-section">
        <h3>Profile Picture</h3>
        <img
          src={profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-pic"
        />
        <div className="file-input-container">
            <input
                type="file"
                accept="image/*"
                id="profile-pic-input"
                onChange={handleProfilePicChange}
                className="file-input-hidden"
            />
            <label htmlFor="profile-pic-input" className="file-input-label">
                Choose File
            </label>
            <span className="file-chosen-text">
                {previewPic ? "File selected" : "No file chosen"}
            </span>
        </div>
        {previewPic && (
          <div>
            <h4>Preview:</h4>
            <img src={previewPic} alt="Preview" className="profile-pic-preview" />
            <button onClick={handleSaveProfilePic} className="save-button">
              Save Profile Picture
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;