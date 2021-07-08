import appLogo from '../../images/app-logo.png';
import './styles.css';

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="app-logo">
        <img src={appLogo} alt="app logo" />
        <h3>Awesome App</h3>
      </div>
    </div>
  );
}
