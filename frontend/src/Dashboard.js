import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNav from './SidebarNav';

function Dashboard() {
  const location = useLocation();
  const user = location.state?.user; // Retrieve the user data passed from the LoginPage
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // TODO: Implement actual search functionality here later
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <SidebarNav />

      <div style={{ flex: 1, padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h2>LAMAS BOOK REVIEW</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user ? (
              <>
                <span>Welcome, <strong>{user.name}</strong>!</span>
                {user.picture && <img src={user.picture} alt="Profile" style={{ width: '40px', borderRadius: '50%' }} />}
              </>
            ) : (
              <span>Welcome, Guest!</span>
            )}
          </div>
        </header>

        <main style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Search Books or Friends</h3>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Search by title, author, or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
              Search
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;