# Canvas Module Bar

A browser extension designed to improve navigation within the Canvas LMS by adding a dedicated sidebar or top bar for quick module access.

## Features
* **Quick Navigation**: Jump between course modules without returning to the home page.
* **Dynamic Loading**: Automatically detects modules on the current course page.
* **Collapsible UI**: Hide or show the bar to maximize screen real estate.
* **Persistent View**: Keeps your place in the module list as you browse.

## Installation

### For Developers / Manual Loading
1.  **Download** the repository as a ZIP or clone it via Git.
2.  Open your browser's extension management page:
    * **Chrome/Edge**: `chrome://extensions`
    * **Brave**: `brave://extensions`
3.  Enable **Developer mode** (top right toggle).
4.  Click **Load unpacked** and select the folder containing the extension files.

## Usage
1.  Log in to your **Canvas LMS** account.
2.  Navigate to any course.
3.  The **Module Bar** will automatically appear on the side of the page.
4.  Click any module item to navigate directly to that content.

## Permissions
* `storage`: To remember the bar's collapsed/expanded state.
* `host permissions`: Access to `*.instructure.com/*` (or your specific Canvas domain) to inject the navigation bar.
