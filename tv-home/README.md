# Custom TV Home (Samsung UN65RU8000FXZA)

A simple full-screen **landing page** for your Samsung TV — big tiles for Netflix, Disney+, YouTube, Prime Video, and friends. It is **not** connected to Family Finance.

When installed, you open **Home** from Smart Hub (or put it first in the app row). Use the remote arrows and **OK** to launch an app.

## What this is / isn’t

| Can do | Cannot do (stock firmware) |
| --- | --- |
| Custom look with your favorite apps | Fully replace Samsung Smart Hub without advanced tooling |
| Launch Netflix, Disney+, etc. if installed | Remove Samsung’s built-in home permanently by itself |
| Run as a normal Tizen app on the RU8000 | Work as Ambient Mode wallpaper |

Samsung’s own Smart Hub still exists underneath. This app is your cleaner front door.

## Preview on a computer

Open `index.html` in Chrome. You’ll see the landing UI; app launches only work on the TV.

## Install on the UN65RU8000FXZA

### 1. One-time: Developer Mode on the TV

1. TV and PC on the **same Wi‑Fi**.
2. Remote → **Smart Hub** → **Apps**.
3. On the Apps screen, enter **12345** on the remote.
4. Turn **Developer mode** **On**.
5. Enter your **PC’s IP address**.
6. **Power off/on** the TV (hold power on the remote a couple seconds).
7. Open **Apps** again — you should see **Develop Mode** at the top.

### 2. Tools on your PC

1. Install [Tizen Studio](https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/installing-tv-sdk.html) with **TV Extensions** and **Samsung Certificate Extension**.
2. **Certificate Manager** → create a **Samsung** certificate profile. You’ll need the TV’s **DUID** (Device Manager → right‑click the TV → DUID).
3. **Device Manager** → Remote Device Manager → add the TV’s IP (port **26101**). Connect, then **Permit to install applications**.

### 3. Package and install this project

From Tizen Studio (or CLI):

1. Import / open the `tv-home` folder as a Tizen **Web** TV project (`config.xml` is already here).
2. Sign with your Samsung certificate.
3. **Run As → Tizen Web Application** on the connected TV.

CLI sketch (paths vary by install):

```bash
tizen package -t wgt -s YourCertProfile -- tv-home
tizen install -n TvHome.wgt -t <TV_NAME>
```

### 4. Put it on the landing row

1. Press **Home** on the remote.
2. Find **Home** (this app) in Apps / Downloaded.
3. Long‑press **OK** → **Add to Home** (wording varies slightly by firmware).
4. Long‑press again → **Move** it to the **far left** of the app row so it’s the first thing you see.

Optional: **Settings → General → Smart Features** (or Smart Hub / Smart Screen options) → try **Autorun last app** so powering on returns to whatever you used last (often this Home app after you’ve opened it).

## Customizing the app row

Edit `js/apps.js` to add/remove tiles. On the TV, apps are matched by **name** from the installed list; the numeric IDs are fallbacks for 2019-era firmware.

## If you only want to tidy Samsung’s own screen

You don’t need this project for that:

1. **Home** → highlight an app → long‑press **OK** → **Move** / **Remove**.
2. Put Netflix, Disney+, etc. first.
3. From **Apps**, add any missing apps to Home the same way.

This repo’s `tv-home` app is for when you want a **custom** full-screen landing look instead of Samsung’s stock strip.
