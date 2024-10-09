import React from 'react';

const Footer = () => {
    const styles = {
      footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#000000',
        padding: '10px 0',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
      },
      footerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        height: '100%',
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