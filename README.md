# Converter

A simple, fast unit converter that runs entirely in the browser.

![Converter Screenshot](https://img.shields.io/badge/No_Dependencies-Vanilla_JS-yellow)

## Features

- **15+ conversion types** — Currency, Length, Weight, Temperature, Area, Volume, Speed, Time, Energy, Power, Pressure, Frequency, Data Storage, Angle, Fuel Economy
- **Live currency rates** — Real-time exchange rates via [Frankfurter API](https://www.frankfurter.app/)
- **Fun units** — Toggle quirky measurements like Smoots, Football Fields, and Blue Whales 🐋
- **Instant conversions** — No delay for local unit calculations
- **Works offline** — All unit conversions work without internet (except currency)

## Usage

Just open `index.html` in your browser. No build step, no dependencies.

```bash
# Clone and open
git clone https://github.com/yourusername/convertor.git
cd convertor
open index.html
```

## Project Structure

```
convertor/
├── index.html        # Page structure
├── app.js            # Conversion logic & UI
├── style.css         # Styling
└── units-config.js   # Unit definitions & conversion factors
```

## Adding New Units

Edit `units-config.js` to add new unit types or individual units:

```javascript
"length": {
  "name": "Length",
  "icon": "📏",
  "units": {
    "m": { "name": "Meters", "toBase": 1 },
    "ft": { "name": "Feet", "toBase": 0.3048 }
  }
}
```

## License

MIT
