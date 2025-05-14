import React from 'react';
import { AnalogClock } from '../components/AnalogClock';

const ClockDemo = () => {
  const currentTime = new Date();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Analog Clock Demo
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Default Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Default Clock</h2>
            <AnalogClock currentTime={currentTime} />
          </div>

          {/* Dark Theme Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Dark Theme</h2>
            <AnalogClock
              currentTime={currentTime}
              bgColorClassName="bg-gray-900"
              textColorClassName="text-white"
              handColorHex="#fff"
              accentColorHex="#FF9500"
            />
          </div>

          {/* Custom Theme Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Custom Theme</h2>
            <AnalogClock
              currentTime={currentTime}
              bgColorClassName="bg-purple-900"
              textColorClassName="text-pink-200"
              handColorHex="#FF69B4"
              accentColorHex="#00FF00"
            />
          </div>

          {/* Different Timezone Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Tokyo (+9)</h2>
            <AnalogClock
              currentTime={currentTime}
              city="Tokyo"
              offset={9}
              bgColorClassName="bg-gray-800"
              textColorClassName="text-white"
              handColorHex="#fff"
              accentColorHex="#FF9500"
            />
          </div>

          {/* Large Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Large Clock</h2>
            <div className="scale-150">
              <AnalogClock
                currentTime={currentTime}
                bgColorClassName="bg-gray-800"
                textColorClassName="text-white"
                handColorHex="#fff"
                accentColorHex="#FF9500"
              />
            </div>
          </div>

          {/* Small Clock */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl mb-4">Small Clock</h2>
            <div className="scale-75">
              <AnalogClock
                currentTime={currentTime}
                bgColorClassName="bg-gray-800"
                textColorClassName="text-white"
                handColorHex="#fff"
                accentColorHex="#FF9500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockDemo;
