# 🐾 SansaPet - 8-Bit Virtual Pet Simulator

![SansaPet Preview](https://img.shields.io/badge/Status-Playable-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-Java%20%7C%20HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue)

**SansaPet** is a retro-arcade virtual pet simulator inspired by classic Tamagotchis, featuring custom 8-bit SVG pixel art inspired by a real puppy named Sansa.

🎮 **[Play the Live Game Here!](https://Quintral4.github.io/SansaPet/)**

---

## QA & Testing Documentation

As part of this project's lifecycle, manual functional testing (E2E) was executed to ensure the correct logic of the interactive interface. Below is an excerpt of the documented test cases:

### Test Case 01: Validate state interaction (Positive Path)
* **Description:** Verify that interacting with the main action button (e.g., "Feed" or "Play") properly updates Sansa's status bars.
* **Preconditions:** The user has accessed the game URL via GitHub Pages and the application is fully loaded.
* **Steps:**
  1. Observe the current level of the "Hunger/Energy" bar.
  2. Click the corresponding action button.
  3. Observe the interface's reaction.
* **Expected Result:** The status bar increases its numerical/visual value, and the animation or text confirming Sansa's action is successfully triggered.
* **Status:** ✅ Passed

### Test Case 02: Validate state boundaries (Negative Path / Boundary Value)
* **Description:** Verify that the system correctly handles boundary values and does not allow stats to exceed 100% or drop below 0%.
* **Preconditions:** The game is running and ready for interaction.
* **Steps:**
  1. Click the "Feed" button repeatedly until the bar reaches the maximum limit (100%).
  2. Click the same button one more time.
* **Expected Result:** The status bar does not exceed 100%. The system gracefully prevents logical front-end errors (optionally displaying a message indicating Sansa is already full).
* **Status:** ✅ Passed

## ✨ Features

* **Dual Implementation:**
  * **Java Console Application (`SansaPet.java`):** Terminal-based simulator with ASCII art and interactive CLI loop.
  * **Web Arcade Edition (`index.html`, `style.css`, `script.js`):** Responsive pastel retro-arcade cabinet with custom 8-bit SVG animations.
* **Interactive Moods & Animations:** Sansa reacts dynamically (playing, eating, sleeping, getting tired) with tail wags, ribbons, and expressive pixel art.
* **Game Mechanics & State Management:**
  * `Hunger` (0 - 10)
  * `Energy` (0 - 10)
  * `Social` (0 - 10)
* **Keyboard & Click Controls:** Fully playable via mouse clicks or hotkeys (`[P]`, `[E]`, `[S]`, `[R]`).

---

## 🕹️ Controls & Rules

| Action | Key | Stat Effects | Condition |
| :--- | :---: | :--- | :--- |
| **Play** | `P` | `+3 Social`, `-2 Hunger`, `-2 Energy` | Requires Energy $\ge 2$ |
| **Eat** | `E` | `+3 Hunger`, `-1 Energy` | Only if Hunger $< 10$ |
| **Sleep** | `S` | Full Energy, `-2 Hunger`, `-1 Social` | Only if Energy $< 10$ |
| **Reset** | `R` | Restores all stats to 10 | Available anytime |

---


## 🛠️ Tech Stack

* **Core Logic:** Java 
* **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
* **Graphics:** Pixel-art Scalable Vector Graphics (SVG)
* **Deployment:** GitHub Pages

