import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardBanner.css';

const DashboardBanner = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    };

  return (
    <div className="image-banner" onClick={handleClick}>
      <img
        src="https://cdn.prod.website-files.com/64149f8bba6c132029e75004/66a8aff80b446a54a24af919_CNAPP%20-%20Compressed.webp"
        alt="CNAPP Dashboard Banner"
        className="banner-image"
      />
    </div>
  )
}

export default DashboardBanner