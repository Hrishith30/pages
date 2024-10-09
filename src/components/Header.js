import React from 'react';

const headerStyles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    height: '90px',
    backgroundColor: '#000000',
    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
  },
  logo: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#4a4a4a',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
};

const Header = () => {
  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.logo}>
        <h1>Hrishith</h1>
      </div>
    </header>
  );
};

export default Header;