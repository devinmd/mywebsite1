// public variables and functions
// availible to system & all applications

// apps in taskbar
var apps = [
  { "name": "System Info", "source": "systeminfo", "image": "assets/test.png" },
  { "name": "App Name", "source": "testapp", "image": "assets/test.png" },
  { "name": "Testing Application", "source": "testapp", "image": "assets/test.png" },
  { "name": "App 1", "source": "testapp", "image": "assets/test.png" },
  { "name": "Test App", "source": "testapp", "image": "assets/test.png" },
  { "name": "Test App", "source": "testapp", "image": "assets/test.png" },
  { "name": "Test App", "source": "testapp", "image": "assets/test.png" },
  { "name": "Test App", "source": "testapp", "image": "assets/test.png" }
]

// the current app which is focused (index of apps[])
var focusedApp

// currently open apps (index of apps[])
var openApps = []