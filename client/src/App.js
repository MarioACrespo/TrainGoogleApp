import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:4000/verify", {
        credential: credentialResponse.credential,
      });

      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div
        style={{
          maxWidth: "400px",
          margin: "100px auto",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Google Login Demo</h1>

        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        ) : (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <p>{user.email}</p>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4285F4",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
