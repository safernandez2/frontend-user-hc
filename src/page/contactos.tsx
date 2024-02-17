import React from 'react';
import RedSocialCard from '../components/RedsocialCard';


import facebookQR from '../images/facebook.png';
import instagramQR from '../images/instagram.png';
import whatsappQR from '../images/whatsapp (2).png';
import tiktokQR from '../images/tiktok.png';

const Contactos: React.FC = () => {
  return (
    <div className="contactos-page-container">
      <div className="contactos-content">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <RedSocialCard nombre="Facebook" url="https://www.facebook.com/people/Hostería-Capillapamba/61552261378723/?mibextid=9R9pXO" qrCodeImagePath={facebookQR} />
          <RedSocialCard nombre="Instagram" url="https://www.instagram.com/capillapamba?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr" qrCodeImagePath={instagramQR} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <RedSocialCard nombre="WhatsApp" url="https://wa.link/yeyb1w" qrCodeImagePath={whatsappQR} />
          <RedSocialCard nombre="TikTok" url="https://www.tiktok.com/@hosteriacapillapamba?_t=8gVqyDh6aIv&_r=1" qrCodeImagePath={tiktokQR} />
          {/* Puedes agregar más redes sociales según sea necesario */}
        </div>
      </div>

      {/* Pie de página */}
      <div className="footer" style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: '0', fontSize: '1.2em' }}>Hostería Capillapamba</p>
        <p style={{ margin: '0', fontSize: '0.9em' }}>Copyright © 2024, Developed by Pedro Pulgarin & Steven Fernandez.</p>
      </div>
    </div>
  );
};

export default Contactos;
