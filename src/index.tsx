import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './pages/Root';
import { RecoilRoot } from 'recoil';
import SilentSettings from './function/SilentSettings';
import './assets/thirdParty/devtools';

window.addEventListener('devtoolschange', (event: any) => {
  const open: boolean = event.detail.isOpen;
  if (open) {
    for (var i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log(
          '%cHold up!',
          'color: #ed1a13; font-size: 5rem;',
          '\n',
          'If someone told you to paste something here, its probably a try to scam you. Do not paste something here if you are not exactly sure what you are doing!'
        );
        console.log('\n');
      }, 500 * i);
    }
  }
});

SilentSettings.init();

const root = ReactDOM.createRoot(document.getElementById('codaMount')!);
root.render(
  <>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </>
);
