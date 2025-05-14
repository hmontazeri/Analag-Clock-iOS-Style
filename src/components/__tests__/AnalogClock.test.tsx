import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnalogClock } from '../AnalogClock';

describe('AnalogClock', () => {
  const mockDate = new Date('2024-03-20T12:00:00');

  it('renders without crashing', () => {
    render(<AnalogClock currentTime={mockDate} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('displays city name when provided', () => {
    render(<AnalogClock currentTime={mockDate} city="New York" />);
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('displays "Today" when showToday is true', () => {
    render(<AnalogClock currentTime={mockDate} showToday={true} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('does not display "Today" when showToday is false', () => {
    render(<AnalogClock currentTime={mockDate} showToday={false} />);
    expect(screen.queryByText('Today')).not.toBeInTheDocument();
  });

  it('displays timezone offset when provided', () => {
    render(<AnalogClock currentTime={mockDate} offset={5} />);
    expect(screen.getByText('+5HRS')).toBeInTheDocument();
  });

  it('displays negative timezone offset correctly', () => {
    render(<AnalogClock currentTime={mockDate} offset={-5} />);
    expect(screen.getByText('-5HRS')).toBeInTheDocument();
  });

  it('applies custom background color when provided', () => {
    render(
      <AnalogClock currentTime={mockDate} bgColorClassName="bg-blue-500" />,
    );
    const clockFace = screen.getByTestId('clock-face');
    expect(clockFace).toHaveClass('bg-blue-500');
  });

  it('applies custom text color when provided', () => {
    render(
      <AnalogClock currentTime={mockDate} textColorClassName="text-red-500" />,
    );
    const clockNumbers = screen.getAllByText(/[1-9]|1[0-2]/);
    clockNumbers.forEach((number: HTMLElement) => {
      expect(number).toHaveClass('text-red-500');
    });
  });

  it('applies custom hand color when provided via handColorHex', () => {
    render(<AnalogClock currentTime={mockDate} handColorHex="#FF0000" />);
    const hands = screen.getAllByTestId('clock-hand');
    hands.slice(0, 2).forEach((hand: HTMLElement) => {
      expect(hand).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
      expect(hand.classList.length).toBe(3); // absolute, rounded-full, origin-bottom
    });
  });

  it('applies custom hand color class when provided via handColorClassName', () => {
    render(
      <AnalogClock
        currentTime={mockDate}
        handColorClassName="bg-custom-hand"
      />,
    );
    const hands = screen.getAllByTestId('clock-hand');
    hands.slice(0, 2).forEach((hand: HTMLElement) => {
      expect(hand).toHaveClass('bg-custom-hand');
      expect(hand.style.backgroundColor).toBe('');
    });
  });

  it('applies custom accent color when provided via accentColorHex', () => {
    render(<AnalogClock currentTime={mockDate} accentColorHex="#00FF00" />);
    const secondHand = screen.getAllByTestId('clock-hand')[2];
    expect(secondHand).toHaveStyle({ backgroundColor: '#00FF00' });
    expect(secondHand.classList.length).toBe(3); // absolute, rounded-full, origin-bottom

    const centerDot = screen.getByTestId('center-dot');
    expect(centerDot).toHaveStyle({ backgroundColor: '#00FF00' });
    expect(centerDot.classList.length).toBe(2); // absolute, rounded-full
  });

  it('applies custom accent color class when provided via accentColorClassName', () => {
    render(
      <AnalogClock
        currentTime={mockDate}
        accentColorClassName="bg-custom-accent"
      />,
    );
    const secondHand = screen.getAllByTestId('clock-hand')[2];
    expect(secondHand).toHaveClass('bg-custom-accent');
    expect(secondHand.style.backgroundColor).toBe('');

    const centerDot = screen.getByTestId('center-dot');
    expect(centerDot).toHaveClass('bg-custom-accent');
    expect(centerDot.style.backgroundColor).toBe('');
  });

  it('displays all clock numbers from 1 to 12', () => {
    render(<AnalogClock currentTime={mockDate} />);
    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('applies day theme during daytime hours', () => {
    const dayTime = new Date('2024-03-20T12:00:00');
    render(<AnalogClock currentTime={dayTime} />);
    const clockFace = screen.getByTestId('clock-face');
    expect(clockFace).toHaveClass('bg-white');
  });

  it('applies night theme during nighttime hours', () => {
    const nightTime = new Date('2024-03-20T23:00:00');
    render(<AnalogClock currentTime={nightTime} />);
    const clockFace = screen.getByTestId('clock-face');
    expect(clockFace).toHaveClass('bg-gray-800');
  });

  describe('size prop', () => {
    it('applies default size of 128px to clock face', () => {
      render(<AnalogClock currentTime={mockDate} />);
      const clockFace = screen.getByTestId('clock-face');
      expect(clockFace).toHaveStyle({ width: '128px', height: '128px' });
    });

    it('applies custom size to clock face', () => {
      render(<AnalogClock currentTime={mockDate} size={200} />);
      const clockFace = screen.getByTestId('clock-face');
      expect(clockFace).toHaveStyle({ width: '200px', height: '200px' });
    });

    it('scales container width proportionally to size', () => {
      render(<AnalogClock currentTime={mockDate} size={200} />);
      const container = screen.getByTestId('clock-face').parentElement;
      expect(container).toHaveStyle({ width: '300px' }); // 200 * 1.5
    });

    it('scales clock numbers proportionally to size', () => {
      render(<AnalogClock currentTime={mockDate} size={200} />);
      const clockNumbers = screen.getAllByText(/[1-9]|1[0-2]/);
      clockNumbers.forEach((number: HTMLElement) => {
        expect(number).toHaveStyle({ fontSize: '20px' }); // 200 * 0.1
      });
    });

    it('scales clock hands proportionally to size', () => {
      render(<AnalogClock currentTime={mockDate} size={200} />);
      const hands = screen.getAllByTestId('clock-hand');

      // Hour hand
      expect(hands[0]).toHaveStyle({
        width: '2px', // 200 * 0.01
        height: '50px', // 200 * 0.25
      });

      // Minute hand
      expect(hands[1]).toHaveStyle({
        width: '2px', // 200 * 0.01
        height: '76px', // 200 * 0.38
      });

      // Second hand
      expect(hands[2]).toHaveStyle({
        width: '1px', // 200 * 0.005
        height: '80px', // 200 * 0.4
      });
    });

    it('scales center dot proportionally to size', () => {
      render(<AnalogClock currentTime={mockDate} size={200} />);
      const centerDot = screen.getByTestId('center-dot');
      expect(centerDot).toHaveStyle({
        width: '4px', // 200 * 0.02
        height: '4px', // 200 * 0.02
      });
    });

    it('scales text elements proportionally to size', () => {
      render(<AnalogClock currentTime={mockDate} size={200} city="New York" />);

      // City name
      const cityName = screen.getByText('New York');
      expect(cityName).toHaveStyle({ fontSize: '32px' }); // 200 * 0.16

      // Today text
      const todayText = screen.getByText('Today');
      expect(todayText).toHaveStyle({ fontSize: '20px' }); // 200 * 0.1
    });
  });
});
