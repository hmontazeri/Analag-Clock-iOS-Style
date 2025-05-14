import React, { useEffect, useRef, useState } from 'react';

export interface AnalogClockProps {
  city?: string;
  offset?: number;
  currentTime: Date;
  showToday?: boolean;
  bgColorClassName?: string;
  textColorClassName?: string;
  handColorHex?: string;
  accentColorHex?: string;
  size?: number; // Size in pixels for the clock face
}

export const AnalogClock = ({
  city,
  offset = 0,
  currentTime,
  showToday = true,
  bgColorClassName,
  textColorClassName,
  handColorHex,
  accentColorHex,
  size = 128, // Default size of 128px (32 * 4)
}: AnalogClockProps) => {
  const [currentTimeState, setCurrentTimeState] = useState(
    new Date(currentTime),
  );
  const animationFrameId = useRef<number | null>(null);
  const initialTimeRef = useRef(new Date(currentTime));
  const initialTimestampRef = useRef(performance.now());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update time with smooth animation using requestAnimationFrame
  useEffect(() => {
    // Reset refs when currentTime prop changes
    initialTimeRef.current = new Date(currentTime);
    initialTimestampRef.current = performance.now();
    setCurrentTimeState(new Date(currentTime)); // Ensure immediate update to new prop time

    const updateClock = () => {
      const elapsedMilliseconds =
        performance.now() - initialTimestampRef.current;
      const newDisplayTime = new Date(
        initialTimeRef.current.getTime() + elapsedMilliseconds,
      );
      setCurrentTimeState(newDisplayTime);
      animationFrameId.current = requestAnimationFrame(updateClock);
    };

    animationFrameId.current = requestAnimationFrame(updateClock);

    // Clear animation frame on unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [currentTime]); // Rerun effect if currentTime prop changes

  const getAdjustedTime = () => {
    const adjustedTime = new Date(currentTimeState);
    if (offset !== 0) {
      adjustedTime.setHours(currentTimeState.getHours() + offset);
    }
    return adjustedTime;
  };

  const adjustedTime = getAdjustedTime();
  const hours = adjustedTime.getHours();
  const minutes = adjustedTime.getMinutes();
  const seconds = adjustedTime.getSeconds();

  // Calculate angles for clock hands with millisecond precision for smooth movement
  const milliseconds = adjustedTime.getMilliseconds();
  const secondDegrees = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteDegrees =
    ((minutes + (seconds + milliseconds / 1000) / 60) / 60) * 360;
  const hourDegrees =
    (((hours % 12) + (minutes + (seconds + milliseconds / 1000) / 60) / 60) /
      12) *
    360;

  // Determine if it's day or night for theming
  const propHours = currentTime.getHours();
  const isDayTime = propHours >= 6 && propHours < 18;
  const bgColor = bgColorClassName ?? (isDayTime ? 'bg-white' : 'bg-gray-800');
  const textColor =
    textColorClassName ?? (isDayTime ? 'text-black' : 'text-white');
  const handColor = handColorHex ?? (isDayTime ? '#000' : '#fff');
  const accentColor = accentColorHex ?? '#FF9500'; // iOS orange accent color

  if (!isClient) {
    return '';
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: `${size * 1.5}px` }}
    >
      {/* Clock face */}
      <div
        data-testid="clock-face"
        className={`relative ${bgColor} rounded-full flex items-center justify-center shadow-lg mb-2`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i + 1;
          const angle = num * 30 - 90; // 30 degrees per hour, starting from -90 (12 o'clock)
          const radian = (angle * Math.PI) / 180;
          const x = 50 + 42 * Math.cos(radian);
          const y = 50 + 42 * Math.sin(radian);

          return (
            <div
              key={num}
              className={`absolute font-semibold ${textColor}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${size * 0.1}px`,
              }}
            >
              {num}
            </div>
          );
        })}

        {/* Hour hand */}
        <div
          data-testid="clock-hand"
          className={`absolute rounded-full bg-${textColor} origin-bottom`}
          style={{
            width: `${size * 0.01}px`,
            height: `${size * 0.25}px`,
            bottom: '50%',
            transform: `rotate(${hourDegrees}deg)`,
            backgroundColor: handColor,
          }}
        />

        {/* Minute hand */}
        <div
          data-testid="clock-hand"
          className={`absolute rounded-full bg-${textColor} origin-bottom`}
          style={{
            width: `${size * 0.01}px`,
            height: `${size * 0.38}px`,
            bottom: '50%',
            transform: `rotate(${minuteDegrees}deg)`,
            backgroundColor: handColor,
          }}
        />

        {/* Second hand with smooth transition */}
        <div
          data-testid="clock-hand"
          className="absolute rounded-full origin-bottom"
          style={{
            width: `${size * 0.005}px`,
            height: `${size * 0.4}px`,
            bottom: '50%',
            transform: `rotate(${secondDegrees}deg)`,
            backgroundColor: accentColor,
            transition: 'none',
          }}
        />

        {/* Center dot */}
        <div
          data-testid="center-dot"
          className="absolute rounded-full"
          style={{
            width: `${size * 0.02}px`,
            height: `${size * 0.02}px`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      {/* City name and timezone */}
      <div className="text-center">
        {city && (
          <h3
            className="text-white font-medium"
            style={{ fontSize: `${size * 0.16}px` }}
          >
            {city}
          </h3>
        )}
        {showToday && (
          <p className="text-gray-400" style={{ fontSize: `${size * 0.1}px` }}>
            Today
          </p>
        )}
        {offset !== 0 && (
          <p className="text-gray-400" style={{ fontSize: `${size * 0.1}px` }}>
            {offset >= 0 ? '+' : ''}
            {offset}HRS
          </p>
        )}
      </div>
    </div>
  );
};
