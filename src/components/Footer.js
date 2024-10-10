import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      width: '100%',
      backgroundColor: '#000000',
      padding: '20px 0',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px',
    },
    copyright: {
      fontSize: '14px',
      color: '#808080',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.copyright}>&copy; {new Date().getFullYear()} Hrishith. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;