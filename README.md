# Laptop Buying Assistant

A responsive HTML, CSS and JavaScript web app for inspecting a second-hand laptop. It includes an inspection checklist with step-by-step instructions, a Windows battery report capacity calculator, target specifications, gaming expectations, and buying-safety tips.

## Features
- Responsive layout for desktop, tablet and mobile.
- Checklist items explain **what to inspect** and **how to inspect it**.
- Checklist progress is saved in the current browser with localStorage.
- Battery health calculator uses:

  `Battery health (%) = Full Charge Capacity / Design Capacity × 100`
- Shows estimated capacity lost and capacity difference.
- Works entirely in the browser; battery values are not uploaded.

## Run locally
Open `index.html` in a browser. No build tools or dependencies are required.

## Publish with GitHub Pages
1. Create a new GitHub repository, for example `laptop-buying-assistant`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the deployment to finish. GitHub will show the published website URL in Settings → Pages.

## Battery report instructions
On the laptop being inspected:
1. Press `Win + R`, type `cmd`, press Enter.
2. Run `powercfg /batteryreport`.
3. Open the HTML report at the path printed in the command output.
4. Under **Installed batteries**, copy **Design Capacity** and **Full Charge Capacity** into the calculator.

## Important notes
- Capacity values should use the same unit, usually mWh.
- The battery report is an estimate; verify real runtime by testing unplugged.
- Battery health thresholds are practical buyer guidelines, not official warranty criteria.
- Always verify the laptop's exact model and configuration with the manufacturer.
