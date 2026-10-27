/**
 * Preferred living-room apps for Samsung Tizen (2019 RU8000-era IDs first).
 * Real installs are matched by name via tizen.application.getAppsInfo().
 */
window.TV_HOME_APPS = [
  {
    key: "netflix",
    name: "Netflix",
    mark: "N",
    match: [/netflix/i],
    ids: ["org.tizen.netflixapp", "11101200001", "3201907018807"]
  },
  {
    key: "disney",
    name: "Disney+",
    mark: "D+",
    match: [/disney\+/i, /disney plus/i, /^disney$/i],
    ids: ["MCmYXNxgcu.DisneyPlus", "3201901017640", "3202009021709"]
  },
  {
    key: "youtube",
    name: "YouTube",
    mark: "YT",
    match: [/^youtube$/i],
    ids: ["9Ur5IzDKqV.TizenYouTube", "111299001912"]
  },
  {
    key: "prime",
    name: "Prime Video",
    mark: "Pv",
    match: [/prime video/i, /^amazon$/i],
    ids: ["org.tizen.primevideo", "3201512006785", "3201910019365"]
  },
  {
    key: "appletv",
    name: "Apple TV",
    mark: "tv",
    match: [/apple tv/i, /appletv/i],
    ids: ["com.samsung.tv.ariavideo", "3201807016597"]
  },
  {
    key: "hulu",
    name: "Hulu",
    mark: "hulu",
    match: [/^hulu$/i],
    ids: ["3201601007625"]
  },
  {
    key: "max",
    name: "Max",
    mark: "Max",
    match: [/^max$/i, /hbo max/i],
    ids: ["3201601007230", "3202301029760"]
  },
  {
    key: "spotify",
    name: "Spotify",
    mark: "♪",
    match: [/^spotify$/i],
    ids: ["3201606009684"]
  },
  {
    key: "browser",
    name: "Internet",
    mark: "www",
    match: [/^internet$/i, /samsung internet/i, /^browser$/i],
    ids: ["org.tizen.browser", "3201907018784"]
  }
];
