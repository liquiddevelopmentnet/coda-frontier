import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import logo from '../assets/images/logo.png';
import BackgroundWrapper from '../common/BackgroundWrapper';
import ClassicPanel from '../components/ClassicPanel';
import CommonButton from '../components/CommonButton';
import HintWithLinkAfter from '../components/HintWithLinkAfter';
import ApiWrapper from '../function/ApiWrapper';
import { hostUrlState } from '../recoil/selectors';

function LogIn() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');

  const host = useRecoilValue(hostUrlState);

  return (
    <div className="w-full h-full flex select-none font-mono">
      <BackgroundWrapper />
      <ClassicPanel error={error}>
        <img src={logo} className="w-12 mb-4 my-auto" alt="logo" />
        <div className="text-center">
          <p className="text-black text-3xl font-bold mb-1">Log in</p>
          <p className="text-gray-800 text-base mb-10">
            We're so glad to see you again!
          </p>
        </div>
        <input
          className="w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500"
          type="text"
          placeholder="Username"
          ref={username}
        />
        <input
          className="w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 mb-12"
          type="password"
          placeholder="Password"
          ref={password}
        />
        {/*<ReCAPTCHA
              sitekey="6LeJm2ghAAAAABTf-6uB-MAv7CDoX6v2KIZSFH4Z"
              onChange={onChange}
            />*/}
        <CommonButton
          type="primary"
          label="Log in"
          onClick={() => {
            ApiWrapper.ApiCall(host, ['Gateway', 'LogIn'], 'POST', {
              username: username.current?.value,
              password: password.current?.value,
            })
              .then((res: any) => {
                console.log(res);
              })
              .catch((err: any) => {
                console.log(err);
              })
              .finally(() => {
                console.log('finally');
              });
          }}
        />
        <HintWithLinkAfter
          hint="No account?"
          linkText="Sign up"
          link="/signup"
        />
      </ClassicPanel>
    </div>
  );
}

export default LogIn;
