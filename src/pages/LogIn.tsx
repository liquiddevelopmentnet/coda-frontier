import logo from '../assets/images/logo.png';
import BackgroundWrapper from '../common/BackgroundWrapper';
import CommonButton from '../components/CommonButton';
import HintWithLinkAfter from '../components/HintWithLinkAfter';

function LogIn() {
  return (
    <div className="w-full h-full flex select-none font-mono">
      <BackgroundWrapper />
      <div className="bg-white m-auto p-7 rounded-[4px] flex flex-col gap-4 items-center z-20 shadow-2xl">
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
        />
        <input
          className="w-[400px] transition-colors duration-200 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-pink-500 mb-12"
          type="password"
          placeholder="Password"
        />
        {/*<ReCAPTCHA
              sitekey="6LeJm2ghAAAAABTf-6uB-MAv7CDoX6v2KIZSFH4Z"
              onChange={onChange}
            />*/}
        <CommonButton type="primary" label="Log in" onClick={() => {}} />
        <HintWithLinkAfter
          hint="No account?"
          linkText="Sign up"
          link="/signup"
        />
      </div>
    </div>
  );
}

export default LogIn;
