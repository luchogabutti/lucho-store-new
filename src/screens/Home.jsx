import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="style">
            <h1>This is Home Page</h1>
            <Link to='/products'>See Product List</Link>
       </div>
    )
}

export default Home;
