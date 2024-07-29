import { Typography, Button } from 'antd';
import { RoutesEnum } from '../core/routes.enum';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.heroSection}>
      <div style={styles.textSection}>
        <Typography.Title style={styles.heroTitle}>
          Welcome to RuneBridge
        </Typography.Title>
        <Typography.Paragraph style={styles.heroSubtitle}>
          Bring your Runes to Core blockchain
        </Typography.Paragraph>
        <Button type="primary" size="large" onClick={() => navigate(RoutesEnum.Bridge)} style={styles.heroButton}>
          Start Bridging
        </Button>
      </div>
      <div style={styles.videoSection}>
      <video style={styles.heroVideo} autoPlay muted loop>
      <source src="/runes.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const styles: any = {
  heroVideo: {
    width: '100%',
    height: 'auto',
    maxWidth: '600px',
    opacity: 0.25,
    boxShadow: '0 24px 28px rgba(0, 0, 0)', 
    borderRadius: '28px', 
  },

  heroSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
  },
  textSection: {
    flex: 2,
    paddingRight: '20px',
  },
  heroTitle: {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'orange',
  },
  heroSubtitle: {
    fontSize: '24px',
    marginTop: '20px',
    color: '#fff',
  },
  heroButton: {
    marginTop: '40px',
    padding: '10px 40px',
    fontSize: '20px',
  },
  videoSection: {
    flex: 1,
    textAlign: 'right',
  },
};
