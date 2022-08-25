import React from 'react';

import LogIn from './LogIn';

import { useSetRecoilState } from 'recoil';
import Taskbar from '../components/Taskbar';
import { electronState } from '../recoil/atoms';
import DesktopHeader from '../components/DesktopHeader';

const Root = () => {
  const setElectron = useSetRecoilState(electronState);

  React.useEffect(() => {
    const isElectron = window.require !== undefined;
    if (isElectron) {
      setElectron({
        is: isElectron,
        ipc: window.require('electron').ipcRenderer,
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <DesktopHeader />
      <LogIn />
      <Taskbar />
    </div>
  );
};

export default Root;
