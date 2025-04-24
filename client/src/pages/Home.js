import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Healthcare App</h1>
      <p>Book appointments and manage records easily.</p>
      {/* Link to role selection page */}
      <Link to="/auth">Login / Register</Link>
    </div>
  );
};

// const styles = {
//   link: {
//     margin: "0 10px",
//     padding: "10px 20px",
//     backgroundColor: "#1976d2",
//     color: "white",
//     textDecoration: "none",
//     borderRadius: "5px",
//   },
// };

export default Home;
