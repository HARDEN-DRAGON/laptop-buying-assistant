const checklistData = [
  {
    title: "Verify laptop & specifications", icon: "💻", summary: "Confirm model, CPU, RAM, storage and Windows.",
    items: [
      ["Confirm the exact model number", "Turn the laptop over and read the model code on the label. Compare it with the invoice and Samsung's official specifications."],
      ["Verify processor is Intel Core i5-1335U", "Open Settings → System → About, or press Ctrl + Shift + Esc → Performance → CPU. Confirm the processor name."],
      ["Verify installed RAM is 16 GB", "Open Settings → System → About and read Installed RAM. Task Manager → Performance → Memory also shows total memory."],
      ["Verify SSD is approximately 512 GB", "Right-click Start → Disk Management, or open Task Manager → Performance → Disk. Remember a marketed 512 GB drive appears smaller in Windows."],
      ["Check Windows activation", "Open Settings → System → Activation. Make sure Windows reports it is activated."],
      ["Match serial number and invoice", "Compare the serial number on the laptop label or BIOS with the invoice where possible. Ask for the original bill."],
      ["Check warranty status", "Ask for proof of purchase and check warranty with Samsung support using the serial number. Do not rely only on the seller's claim."]
    ]
  },
  {
    title: "Battery health (very important)", icon: "🔋", summary: "Generate the report, calculate wear and test unplugged.",
    items: [
      ["Generate a Windows battery report", "Press Win + R, type cmd, press Enter. Run: powercfg /batteryreport. Open the HTML path shown in the command output."],
      ["Find Design Capacity", "In the report, find Installed batteries. Copy Design Capacity exactly, usually shown in mWh."],
      ["Find Full Charge Capacity", "In the same section, copy Full Charge Capacity. Enter both values in the Battery Health Calculator on this page."],
      ["Check recent battery usage", "In the report, review Recent usage and Battery usage for unusual drops or unexpected shutdowns."],
      ["Test the laptop unplugged for 10–15 minutes", "Charge it first, unplug the adapter and use a browser or video. Note the percentage drop; screen brightness and workload affect the result."],
      ["Check for sudden percentage drops", "Watch the battery indicator during the test. Sudden jumps, shutdowns or warnings can indicate a battery problem."],
      ["Inspect charging and adapter", "Plug in the original or correct-rated charger. Confirm Windows shows charging and that the connector is not loose."]
    ]
  },
  {
    title: "Screen, keyboard & body", icon: "🖥️", summary: "Look for defects and test all controls.",
    items: [
      ["Test for dead pixels and display marks", "Open solid white, black, red, green and blue full-screen images or a dead-pixel test page. Look for dots, lines, pressure marks or bright patches."],
      ["Check brightness and flicker", "Raise and lower brightness, view light and dark backgrounds, and gently adjust the screen angle."],
      ["Test every keyboard key", "Open Notepad and type every letter, number, punctuation mark and function key you can. Check backlight if fitted."],
      ["Test touchpad and clicks", "Move the pointer, click both sides, scroll with two fingers and test gestures."],
      ["Inspect hinges and chassis", "Open and close the lid gently. Look for cracks, uneven gaps, bent corners, missing screws or signs of liquid damage."],
      ["Test webcam, microphone and speakers", "Open the Camera app, record a short voice clip or use Sound settings, then play audio at low and high volume."]
    ]
  },
  {
    title: "SSD & performance", icon: "⚡", summary: "Check storage health, heat and everyday responsiveness.",
    items: [
      ["Check SSD health", "If allowed, use CrystalDiskInfo from its official website. Check Health Status and warnings; avoid unknown download sites."],
      ["Open Task Manager", "Press Ctrl + Shift + Esc → Performance. Check memory, disk and CPU are detected normally."],
      ["Try your normal coding workload", "Open VS Code, a few browser tabs and a small project. Look for freezes, long delays or unexpected restarts."],
      ["Play a 1080p video", "Play a YouTube video for a few minutes. Check playback, speakers, Wi-Fi and whether the laptop stutters."],
      ["Check Device Manager", "Right-click Start → Device Manager. Look for yellow warning icons or unknown devices."],
      ["Listen to fans and check heat", "Run a short normal workload. Listen for grinding/rattling and check for severe heat, throttling or sudden shutdowns."]
    ]
  },
  {
    title: "Gaming & everyday use", icon: "🎮", summary: "Test the games and apps you actually use.",
    items: [
      ["Try one of your actual small games", "Run a game you know for about 10 minutes while plugged in. Check frame rate, stutter and controls."],
      ["Try low or medium graphics settings", "Start at 1080p low settings and adjust. The integrated graphics are much weaker than your ASUS RTX 3050."],
      ["Check Wi-Fi and Bluetooth", "Connect to a Wi-Fi network and pair a Bluetooth device if available. Confirm the connections stay stable."],
      ["Test every port", "Connect a USB device, HDMI display if possible, headphones and any other ports you need. Wiggle connectors gently to check for looseness."],
      ["Confirm sleep and wake work", "Close the lid or choose Sleep, wait briefly, then wake the laptop. Check it resumes without freezing."]
    ]
  },
  {
    title: "Seller & payment safety", icon: "🛡️", summary: "Protect yourself before handing over money.",
    items: [
      ["Ask why the seller is selling", "Ask directly and check whether the explanation is consistent with the device's condition and age."],
      ["Check for BIOS password or company management", "Restart and enter BIOS only with the seller's permission; check for an unknown BIOS password. In Windows, check Settings → Accounts → Access work or school. Do not buy a company-managed device unless properly released."],
      ["Confirm the seller can reset Windows", "Ask the seller to remove personal accounts and reset the device. Confirm Windows setup can start normally before payment."],
      ["Get a written receipt", "Record seller contact details, model, serial number, price, date and any included charger/accessories."],
      ["Avoid advance payments", "Inspect the exact laptop in person. Do not pay a deposit just to reserve it before you have verified the device."],
      ["Negotiate based on issues", "Use battery health, missing invoice, cosmetic damage, warranty and SSD health as reasons to negotiate or walk away."]
    ]
  }
];

const storageKey = "laptopBuyingAssistantChecklistV1";
let checkedItems = {};
try { checkedItems = JSON.parse(localStorage.getItem(storageKey) || "{}") || {}; } catch { checkedItems = {}; }

const groupsContainer = document.getElementById("checklist-groups");
const totalItems = checklistData.reduce((sum, group) => sum + group.items.length, 0);
document.getElementById("progress-count").textContent = `0 / ${totalItems}`;

function saveChecklist() {
  try { localStorage.setItem(storageKey, JSON.stringify(checkedItems)); } catch {}
}
function updateProgress() {
  const count = Object.values(checkedItems).filter(Boolean).length;
  document.getElementById("progress-count").textContent = `${count} / ${totalItems} checked`;
  document.getElementById("progress-bar").style.width = `${(count / totalItems) * 100}%`;
}
function renderChecklist() {
  groupsContainer.innerHTML = "";
  checklistData.forEach((group, groupIndex) => {
    const details = document.createElement("details");
    details.className = "check-group";
    const done = group.items.filter((_, itemIndex) => checkedItems[`${groupIndex}-${itemIndex}`]).length;
    const summary = document.createElement("summary");
    summary.className = "group-header";
    summary.innerHTML = `<span class="group-icon" aria-hidden="true">${group.icon}</span><span class="group-heading"><strong>${groupIndex + 1}. ${group.title}</strong><small>${group.summary}</small></span><span class="group-meta">${done}/${group.items.length}</span><span class="chevron" aria-hidden="true">⌄</span>`;
    details.appendChild(summary);
    const itemList = document.createElement("div");
    itemList.className = "group-items";
    group.items.forEach(([title, how], itemIndex) => {
      const key = `${groupIndex}-${itemIndex}`;
      const row = document.createElement("div");
      row.className = `check-item ${checkedItems[key] ? "done" : ""}`;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = `check-${key}`;
      input.checked = Boolean(checkedItems[key]);
      input.addEventListener("change", () => {
        checkedItems[key] = input.checked;
        if (!input.checked) delete checkedItems[key];
        saveChecklist();
        row.classList.toggle("done", input.checked);
        const currentCount = group.items.filter((_, i) => checkedItems[`${groupIndex}-${i}`]).length;
        summary.querySelector(".group-meta").textContent = `${currentCount}/${group.items.length}`;
        updateProgress();
      });
      const label = document.createElement("label");
      label.htmlFor = input.id;
      const titleEl = document.createElement("strong");
      titleEl.textContent = title;
      const howEl = document.createElement("span");
      howEl.className = "how";
      howEl.textContent = `How to check: ${how}`;
      label.append(titleEl, howEl);
      row.append(input, label);
      itemList.appendChild(row);
    });
    details.appendChild(itemList);
    groupsContainer.appendChild(details);
  });
  updateProgress();
}
renderChecklist();

document.getElementById("expand-all").addEventListener("click", () => {
  const groups = [...document.querySelectorAll(".check-group")];
  const shouldExpand = groups.some(group => !group.open);
  groups.forEach(group => group.open = shouldExpand);
  document.getElementById("expand-all").textContent = shouldExpand ? "Collapse all" : "Expand all";
});
document.getElementById("reset-checklist").addEventListener("click", () => {
  if (!confirm("Clear all checklist ticks?")) return;
  checkedItems = {};
  saveChecklist();
  renderChecklist();
});

const designInput = document.getElementById("design-capacity");
const fullInput = document.getElementById("full-capacity");
const errorEl = document.getElementById("calc-error");
function setHealthResult(health, design, full) {
  const rounded = Math.round(health * 10) / 10;
  const clamped = Math.max(0, Math.min(100, health));
  document.getElementById("health-number").textContent = `${rounded.toFixed(1)}%`;
  document.getElementById("gauge").style.setProperty("--health", `${clamped * 3.6}deg`);
  document.getElementById("capacity-lost").textContent = `${(100 - health).toFixed(1)}%`;
  document.getElementById("capacity-difference").textContent = `${Math.round(design - full).toLocaleString()} mWh`;
  const status = document.getElementById("health-status");
  const message = document.getElementById("health-message");
  status.className = "tag";
  if (health >= 90) {
    status.classList.add("green"); status.textContent = "Excellent";
    message.textContent = "A strong reading for a used laptop. Still test it unplugged and check for sudden battery drops.";
  } else if (health >= 80) {
    status.classList.add("blue"); status.textContent = "Good";
    message.textContent = "Generally a reasonable result. Compare the price and actual unplugged runtime.";
  } else if (health >= 70) {
    status.classList.add("yellow"); status.textContent = "Negotiate";
    message.textContent = "Capacity has noticeably declined. Ask for a lower price and consider future battery replacement cost.";
  } else {
    status.classList.add("red"); status.textContent = "Caution";
    message.textContent = "The battery has lost substantial capacity. Avoid paying full price unless you are comfortable replacing it.";
  }
}
document.getElementById("calculate").addEventListener("click", () => {
  const design = Number(designInput.value);
  const full = Number(fullInput.value);
  errorEl.hidden = true;
  if (!Number.isFinite(design) || !Number.isFinite(full) || design <= 0 || full <= 0) {
    errorEl.textContent = "Enter both capacities as positive numbers from the battery report.";
    errorEl.hidden = false; return;
  }
  if (full > design * 1.2) {
    errorEl.textContent = "Full Charge Capacity is much higher than Design Capacity. Recheck the values and units.";
    errorEl.hidden = false; return;
  }
  const health = (full / design) * 100;
  setHealthResult(health, design, full);
});
document.getElementById("fill-example").addEventListener("click", () => {
  designInput.value = 54000;
  fullInput.value = 48600;
  document.getElementById("calculate").click();
});
[designInput, fullInput].forEach(input => input.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("calculate").click();
}));

// Highlight the active section in the compact navigation.
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, {rootMargin: "-15% 0px -70% 0px"});
  sections.forEach(section => observer.observe(section));
}
