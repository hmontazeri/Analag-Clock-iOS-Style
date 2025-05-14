[![CircleCI](https://dl.circleci.com/status-badge/img/gh/hmontazeri/Analag-Clock-iOS-Style/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/hmontazeri/Analag-Clock-iOS-Style/tree/main)

# Analog Clock iOS Style

A beautiful, customizable analog clock React component that mimics the iOS clock design. This component provides a sleek and modern look while maintaining high performance and flexibility.

Check out the DEMO [here](https://analog-clock-pink-ten.vercel.app/)

![Analog Clock iOS Style](ios-analog-clock.png)

## Features

- 🎨 iOS-style design with smooth animations
- ⚡️ Built with React and TypeScript
- 🎯 Fully customizable colors and sizes
- 📱 Responsive and mobile-friendly
- 🧪 Tested with Jest
- 🎭 Styled with Tailwind CSS
- 📦 Zero dependencies (except React)

## Installation

```bash
npm install analog-clock-ios-style
# or
yarn add analog-clock-ios-style
```

## Usage

```jsx
import { AnalogClock } from 'analog-clock-ios-style';
import 'analog-clock-ios-style/dist/index.css';

function App() {
  const now = new Date();

  return (
    <>
      {/* Example 1: Basic usage with custom size and colors via hex codes */}
      <AnalogClock
        currentTime={now}
        size={200}
        bgColorHex="#f0f0f0"
        textColorHex="#333333"
        handColorHex="#000000"
        accentColorHex="#FF3B30" // iOS Red
      />

      {/* Example 2: Clock for a specific city with offset and Tailwind CSS classes */}
      <AnalogClock
        currentTime={now}
        city="New York"
        offset={-5} // Example: EST (UTC-5)
        size={150}
        bgColorClassName="bg-blue-500"
        textColorClassName="text-white"
        handColorClassName="bg-gray-200"
        accentColorClassName="bg-yellow-400"
        showToday={true}
      />

      {/* Example 3: Smaller clock with minimal props */}
      <AnalogClock currentTime={now} size={100} />

      {/* Example 4: Larger clock with specific hand and accent colors */}
      <AnalogClock
        currentTime={now}
        size={250}
        bgColorHex="#333333"
        textColorHex="#FFFFFF"
        handColorHex="#FFFFFF" // White hands
        accentColorHex="#00FF00" // Green second hand
      />
    </>
  );
}

export default App;
```

## Props

| Prop                   | Type      | Default     | Description                                                                              |
| ---------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------- |
| `currentTime`          | `Date`    | (required)  | The current time to display on the clock.                                                |
| `size`                 | `number`  | `128`       | Size of the clock face in pixels.                                                        |
| `city`                 | `string`  | `undefined` | Optional city name to display below the clock.                                           |
| `offset`               | `number`  | `0`         | Optional timezone offset in hours from UTC.                                              |
| `showToday`            | `boolean` | `true`      | Whether to show "Today" text below the city name.                                        |
| `bgColorClassName`     | `string`  | `undefined` | Tailwind CSS class for the clock background. Overrides `bgColorHex`.                     |
| `textColorClassName`   | `string`  | `undefined` | Tailwind CSS class for the clock numbers. Overrides `textColorHex`.                      |
| `bgColorHex`           | `string`  | `undefined` | Hex color for the clock background. Used if `bgColorClassName` is not set.               |
| `textColorHex`         | `string`  | `undefined` | Hex color for the clock numbers. Used if `textColorClassName` is not set.                |
| `handColorClassName`   | `string`  | `undefined` | Tailwind CSS class for hour/minute hands. Overrides `handColorHex`.                      |
| `handColorHex`         | `string`  | `undefined` | Hex color for hour/minute hands. Used if `handColorClassName` is not set.                |
| `accentColorClassName` | `string`  | `undefined` | Tailwind CSS class for the second hand and center dot. Overrides `accentColorHex`.       |
| `accentColorHex`       | `string`  | `undefined` | Hex color for the second hand and center dot. Used if `accentColorClassName` is not set. |

## Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/analog-clock-ios-style.git
cd analog-clock-ios-style
```

2. Install dependencies:

```bash
npm install
```

3. Start development:

```bash
npm run build
```

## Scripts

- `npm run build` - Build the component
- `npm run test` - Run tests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

### Hamed Montazeri

Made with ❤️ in Heidelberg, Germany
