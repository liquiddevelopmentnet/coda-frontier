import { useEffect, useState } from 'react';

function TextTime() {
  const [time, setTime] = useState('00:00');

  const updateTime = () => {
    let date = new Date();
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    setTime(hours + ':' + minutes);
  };

  useEffect(() => {
    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return <p className="text-white text-sm">{time}</p>;
}

export default TextTime;
