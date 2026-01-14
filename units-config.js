const UNITS_CONFIG = {
  "length": {
    "name": "Length",
    "icon": "📏",
    "category": "Popular",
    "base": "m",
    "defaults": { "from": "m", "to": "ft" },
    "units": {
      "km": { "name": "Kilometers", "toBase": 1000 },
      "m": { "name": "Meters", "toBase": 1 },
      "cm": { "name": "Centimeters", "toBase": 0.01 },
      "mm": { "name": "Millimeters", "toBase": 0.001 },
      "mi": { "name": "Miles", "toBase": 1609.344 },
      "yd": { "name": "Yards", "toBase": 0.9144 },
      "ft": { "name": "Feet", "toBase": 0.3048 },
      "in": { "name": "Inches", "toBase": 0.0254 },
      "nm": { "name": "Nautical Miles", "toBase": 1852 }
    },
    "funUnits": {
      "smoot": { "name": "Smoots", "toBase": 1.7018, "origin": "MIT prank, 1958 - height of Oliver Smoot" },
      "football": { "name": "Football Fields", "toBase": 91.44 },
      "eiffel": { "name": "Eiffel Towers", "toBase": 330 },
      "whale": { "name": "Blue Whales", "toBase": 30 },
      "banana": { "name": "Bananas", "toBase": 0.178 },
      "bus": { "name": "London Buses", "toBase": 11.23 },
      "giraffe": { "name": "Giraffes", "toBase": 5.5 },
      "statue": { "name": "Statues of Liberty", "toBase": 93 }
    },
    "comparisons": [
      { "max": 0.01, "text": "width of a fingernail", "icon": "💅" },
      { "max": 0.05, "text": "length of a paper clip", "icon": "📎" },
      { "max": 0.3, "text": "length of a ruler", "icon": "📏" },
      { "max": 1.8, "text": "average human height", "icon": "🧍" },
      { "max": 5.5, "text": "height of a giraffe", "icon": "🦒" },
      { "max": 30, "text": "length of a blue whale", "icon": "🐋" },
      { "max": 100, "text": "a football field", "icon": "🏈" },
      { "max": 330, "text": "height of Eiffel Tower", "icon": "🗼" },
      { "max": 1000, "text": "about 10 city blocks", "icon": "🏙️" },
      { "max": 8848, "text": "height of Mount Everest", "icon": "🏔️" },
      { "max": 42195, "text": "a marathon distance", "icon": "🏃" },
      { "max": 384400000, "text": "distance to the Moon", "icon": "🌙" }
    ]
  },
  "weight": {
    "name": "Weight",
    "icon": "⚖️",
    "category": "Popular",
    "base": "kg",
    "defaults": { "from": "kg", "to": "lb" },
    "units": {
      "t": { "name": "Metric Tons", "toBase": 1000 },
      "kg": { "name": "Kilograms", "toBase": 1 },
      "g": { "name": "Grams", "toBase": 0.001 },
      "mg": { "name": "Milligrams", "toBase": 0.000001 },
      "lb": { "name": "Pounds", "toBase": 0.453592 },
      "oz": { "name": "Ounces", "toBase": 0.0283495 },
      "st": { "name": "Stones", "toBase": 6.35029 }
    },
    "funUnits": {
      "elephant": { "name": "African Elephants", "toBase": 6000 },
      "cat": { "name": "House Cats", "toBase": 4.5 },
      "bowling": { "name": "Bowling Balls", "toBase": 6.35 },
      "iphone": { "name": "iPhones", "toBase": 0.206 },
      "bananaW": { "name": "Bananas", "toBase": 0.12 }
    }
  },
  "temperature": {
    "name": "Temperature",
    "icon": "🌡️",
    "category": "Popular",
    "base": "c",
    "defaults": { "from": "c", "to": "f" },
    "type": "temperature",
    "units": {
      "c": { "name": "Celsius" },
      "f": { "name": "Fahrenheit" },
      "k": { "name": "Kelvin" }
    }
  },
  "area": {
    "name": "Area",
    "icon": "📐",
    "category": "Popular",
    "base": "m2",
    "defaults": { "from": "m2", "to": "ft2" },
    "units": {
      "km2": { "name": "Square Kilometers", "toBase": 1000000 },
      "ha": { "name": "Hectares", "toBase": 10000 },
      "m2": { "name": "Square Meters", "toBase": 1 },
      "cm2": { "name": "Square Centimeters", "toBase": 0.0001 },
      "mi2": { "name": "Square Miles", "toBase": 2589988.11 },
      "ac": { "name": "Acres", "toBase": 4046.8564 },
      "ft2": { "name": "Square Feet", "toBase": 0.092903 },
      "in2": { "name": "Square Inches", "toBase": 0.00064516 }
    },
    "funUnits": {
      "footballfield": { "name": "Football Fields", "toBase": 5351 },
      "tenniscourt": { "name": "Tennis Courts", "toBase": 261 },
      "centralpark": { "name": "Central Parks", "toBase": 3410000 },
      "parkingspot": { "name": "Parking Spots", "toBase": 15 }
    }
  },
  "volume": {
    "name": "Volume",
    "icon": "🧊",
    "category": "Popular",
    "base": "l",
    "defaults": { "from": "l", "to": "gal" },
    "units": {
      "m3": { "name": "Cubic Meters", "toBase": 1000 },
      "l": { "name": "Liters", "toBase": 1 },
      "ml": { "name": "Milliliters", "toBase": 0.001 },
      "gal": { "name": "Gallons (US)", "toBase": 3.78541 },
      "qt": { "name": "Quarts (US)", "toBase": 0.946353 },
      "pt": { "name": "Pints (US)", "toBase": 0.473176 },
      "cup": { "name": "Cups (US)", "toBase": 0.236588 },
      "floz": { "name": "Fluid Ounces (US)", "toBase": 0.0295735 },
      "tbsp": { "name": "Tablespoons", "toBase": 0.0147868 },
      "tsp": { "name": "Teaspoons", "toBase": 0.00492892 },
      "ft3": { "name": "Cubic Feet", "toBase": 28.3168 },
      "in3": { "name": "Cubic Inches", "toBase": 0.0163871 }
    },
    "funUnits": {
      "olympicpool": { "name": "Olympic Pools", "toBase": 2500000 },
      "bathtub": { "name": "Bathtubs", "toBase": 300 },
      "teardrop": { "name": "Teardrops", "toBase": 0.000006 }
    }
  },
  "speed": {
    "name": "Speed",
    "icon": "🚀",
    "category": "Science",
    "base": "ms",
    "defaults": { "from": "kmh", "to": "mph" },
    "units": {
      "ms": { "name": "Meters/Second", "toBase": 1 },
      "kmh": { "name": "Kilometers/Hour", "toBase": 0.277778 },
      "mph": { "name": "Miles/Hour", "toBase": 0.44704 },
      "kn": { "name": "Knots", "toBase": 0.514444 },
      "fts": { "name": "Feet/Second", "toBase": 0.3048 },
      "mach": { "name": "Mach", "toBase": 343 }
    },
    "funUnits": {
      "runner": { "name": "Sprinting Humans", "toBase": 10.44 },
      "cheetah": { "name": "Cheetahs", "toBase": 33.5 },
      "sloth": { "name": "Sloths", "toBase": 0.04 },
      "snail": { "name": "Garden Snails", "toBase": 0.001 }
    }
  },
  "time": {
    "name": "Time",
    "icon": "⏱️",
    "category": "Science",
    "base": "s",
    "defaults": { "from": "hr", "to": "min" },
    "units": {
      "yr": { "name": "Years", "toBase": 31536000 },
      "wk": { "name": "Weeks", "toBase": 604800 },
      "d": { "name": "Days", "toBase": 86400 },
      "hr": { "name": "Hours", "toBase": 3600 },
      "min": { "name": "Minutes", "toBase": 60 },
      "s": { "name": "Seconds", "toBase": 1 },
      "ms": { "name": "Milliseconds", "toBase": 0.001 },
      "us": { "name": "Microseconds", "toBase": 0.000001 },
      "ns": { "name": "Nanoseconds", "toBase": 0.000000001 }
    },
    "funUnits": {
      "blink": { "name": "Eye Blinks", "toBase": 0.15 },
      "heartbeat": { "name": "Heartbeats", "toBase": 0.86 },
      "dogyear": { "name": "Dog Years", "toBase": 220752000 }
    }
  },
  "energy": {
    "name": "Energy",
    "icon": "🔋",
    "category": "Science",
    "base": "j",
    "defaults": { "from": "j", "to": "cal" },
    "units": {
      "j": { "name": "Joules", "toBase": 1 },
      "kj": { "name": "Kilojoules", "toBase": 1000 },
      "cal": { "name": "Calories", "toBase": 4.184 },
      "kcal": { "name": "Kilocalories", "toBase": 4184 },
      "wh": { "name": "Watt Hours", "toBase": 3600 },
      "kwh": { "name": "Kilowatt Hours", "toBase": 3600000 },
      "btu": { "name": "BTU", "toBase": 1055.06 },
      "ev": { "name": "Electron Volts", "toBase": 1.60218e-19 }
    },
    "funUnits": {
      "lightning": { "name": "Lightning Bolts", "toBase": 1000000000 },
      "tnt": { "name": "Tons of TNT", "toBase": 4184000000 },
      "aabattery": { "name": "AA Batteries", "toBase": 9360 }
    }
  },
  "power": {
    "name": "Power",
    "icon": "⚡",
    "category": "Science",
    "base": "w",
    "defaults": { "from": "w", "to": "hp" },
    "units": {
      "w": { "name": "Watts", "toBase": 1 },
      "kw": { "name": "Kilowatts", "toBase": 1000 },
      "mw": { "name": "Megawatts", "toBase": 1000000 },
      "hp": { "name": "Horsepower", "toBase": 745.7 },
      "btuh": { "name": "BTU/Hour", "toBase": 0.293071 },
      "ftlbs": { "name": "Foot-Pounds/Second", "toBase": 1.35582 }
    }
  },
  "pressure": {
    "name": "Pressure",
    "icon": "🎚️",
    "category": "Science",
    "base": "pa",
    "defaults": { "from": "bar", "to": "psi" },
    "units": {
      "pa": { "name": "Pascals", "toBase": 1 },
      "kpa": { "name": "Kilopascals", "toBase": 1000 },
      "bar": { "name": "Bar", "toBase": 100000 },
      "psi": { "name": "PSI", "toBase": 6894.76 },
      "atm": { "name": "Atmospheres", "toBase": 101325 },
      "mmhg": { "name": "mmHg", "toBase": 133.322 },
      "torr": { "name": "Torr", "toBase": 133.322 }
    }
  },
  "frequency": {
    "name": "Frequency",
    "icon": "📻",
    "category": "Science",
    "base": "hz",
    "defaults": { "from": "mhz", "to": "ghz" },
    "units": {
      "hz": { "name": "Hertz", "toBase": 1 },
      "khz": { "name": "Kilohertz", "toBase": 1000 },
      "mhz": { "name": "Megahertz", "toBase": 1000000 },
      "ghz": { "name": "Gigahertz", "toBase": 1000000000 },
      "rpm": { "name": "RPM", "toBase": 0.0166667 }
    }
  },
  "data": {
    "name": "Data Storage",
    "icon": "💾",
    "category": "Digital",
    "base": "b",
    "defaults": { "from": "gb", "to": "mb" },
    "units": {
      "b": { "name": "Bytes", "toBase": 1 },
      "kb": { "name": "Kilobytes", "toBase": 1024 },
      "mb": { "name": "Megabytes", "toBase": 1048576 },
      "gb": { "name": "Gigabytes", "toBase": 1073741824 },
      "tb": { "name": "Terabytes", "toBase": 1099511627776 },
      "pb": { "name": "Petabytes", "toBase": 1125899906842624 },
      "bit": { "name": "Bits", "toBase": 0.125 },
      "kbit": { "name": "Kilobits", "toBase": 128 },
      "mbit": { "name": "Megabits", "toBase": 131072 },
      "gbit": { "name": "Gigabits", "toBase": 134217728 }
    },
    "funUnits": {
      "floppy": { "name": "Floppy Disks", "toBase": 1474560 },
      "mp3song": { "name": "MP3 Songs", "toBase": 4194304 },
      "photo": { "name": "iPhone Photos", "toBase": 3145728 },
      "cdrom": { "name": "CD-ROMs", "toBase": 734003200 }
    }
  },
  "angle": {
    "name": "Angle",
    "icon": "📐",
    "category": "Engineering",
    "base": "deg",
    "defaults": { "from": "deg", "to": "rad" },
    "units": {
      "deg": { "name": "Degrees", "toBase": 1 },
      "rad": { "name": "Radians", "toBase": 57.2958 },
      "grad": { "name": "Gradians", "toBase": 0.9 },
      "arcmin": { "name": "Arc Minutes", "toBase": 0.0166667 },
      "arcsec": { "name": "Arc Seconds", "toBase": 0.000277778 },
      "turn": { "name": "Turns", "toBase": 360 }
    }
  },
  "fuel": {
    "name": "Fuel Economy",
    "icon": "⛽",
    "category": "Everyday",
    "base": "kml",
    "defaults": { "from": "mpg", "to": "lper100km" },
    "type": "fuel",
    "units": {
      "kml": { "name": "Km per Liter", "toBase": 1 },
      "mpg": { "name": "Miles per Gallon (US)", "toBase": 0.425144 },
      "mpgimp": { "name": "Miles per Gallon (UK)", "toBase": 0.354006 },
      "lper100km": { "name": "Liters per 100km", "inverse": true }
    }
  }
};
