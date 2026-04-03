import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Friends', path: '/friends' },
  ];

  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        background: '#F5F1EB',
        borderRight: '1px solid #e3ddd4',
        padding: '20px 14px',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ margin: '0 0 16px', color: '#6B4F4F' }}>LAMAS</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path, { state: location.state })}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '8px',
                border: isActive ? '1px solid #8d6b4a' : '1px solid #d9d3ca',
                background: isActive ? '#8d6b4a' : '#fff',
                color: '#2E2E2E',
                cursor: 'pointer',
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default SidebarNav;
