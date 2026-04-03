import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNav from './SidebarNav';

function FriendsPage() {
  const location = useLocation();

  // Accept initial friends via route state: navigate('/friends', { state: { friends: [...] } })
  const initialFriends = Array.isArray(location.state?.friends) ? location.state.friends : [];

  const [friends, setFriends] = useState(initialFriends);
  const [newFriendName, setNewFriendName] = useState('');

  const addFriend = (e) => {
    e.preventDefault();
    const name = newFriendName.trim();
    if (!name) return;
    setFriends((prev) => [...prev, { name, addedAt: Date.now() }]);
    setNewFriendName('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <SidebarNav />

      <div style={{ flex: 1, padding: '20px' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h2 style={{ margin: 0 }}>Friends</h2>
        </header>

        <form onSubmit={addFriend} style={{ display: 'flex', gap: '10px', marginTop: '16px', maxWidth: '720px' }}>
          <input
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            placeholder="Search by username..."
            aria-label="Friend name"
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: '#8d6b4a',
              color: '#2E2E2E',
              cursor: 'pointer',
            }}
          >
            Add+
          </button>
        </form>

        <div style={{ marginTop: '18px', maxWidth: '720px' }}>
          {friends.length === 0 ? (
            <div style={{ color: '#666' }}>No friends yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {friends.map((friend, value) => (
                <div
                  key={`${friend.name}-${friend.addedAt ?? value}`}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: '#fff',
                    border: '1px solid #e3e3e3',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{friend.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendsPage;
