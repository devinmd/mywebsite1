


function createBottomNav() {
  for (let i = 0; i < apps.length; i++) {
    let div = document.createElement('div')
    let btn = document.createElement('button')
    btn.title = apps[i].name
    div.className = 'appBtnDiv'
    btn.onclick = function () {
      openApp(i)
      div.classList.add('active')
      changeFocus(i)
    }
    btn.style.backgroundImage = apps[i].image
    div.append(btn)
    document.querySelector('#bottomnav').append(div)
  }
}

function changeFocus(num) {
  focusedApp = num

  if (num == -1) {
    document.title = "Desktop"
    console.log('desktop')
  } else {
    document.title = apps[num].name
  }
}

function createFrame(index) {
  // whole app div
  let div = document.createElement('div')
  div.onclick = function () {
    try {
      document.querySelector('.frameBox.focus').classList.remove('focus')
    } catch {
      console.log('focused element was deleted, no app has focus')
      changeFocus(-1)
    }
    changeFocus(index)
    div.classList.add('focus')
  }
  div.className = 'frameBox focus app' + index
  div.style.top = (15 + openApps.length * 3) + 'vh'
  div.style.left = (15 + openApps.length * 3) + 'vw'

  // close button
  let close = document.createElement('button')
  close.className = 'closeFrameBtn'
  close.onclick = function () {
    div.remove()
    openApps.splice(openApps.indexOf(apps[index]), 1)
    document.querySelectorAll('.appBtnDiv')[index].classList.remove('active')
  }
  // minimize button
  let min = document.createElement('button')
  min.className = 'minimizeFrameBtn'
  min.onclick = function () {
    div.style.display = 'none'
  }

  // app title
  let title = document.createElement('p')
  title.innerHTML = apps[index].name

  // top menu bar
  let top = document.createElement('div')
  top.append(title)
  top.append(close)
  top.append(min)

  // app frame
  let frame = document.createElement('iframe')
  frame.src = 'apps/' + apps[index].source + '.html'
  frame.className = 'frame'

  // push to div
  div.append(top)
  div.append(frame)

  // dragging
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  div.onmousedown = dragMouseDown;
  frame.onmouseover = endDrag;
  div.onmouseup = endDrag;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = endDrag();
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    div.style.top = div.offsetTop - pos2 + "px";
    div.style.left = div.offsetLeft - pos1 + "px";
  }

  function endDrag() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  document.querySelector('#content').append(div)

  openApps.push(index)
}

function openApp(index) {
  if (!openApps.includes(index)) {
    // if not already open
    createFrame(index)
  } else {
    // focus and show it if miniimzed
    document.querySelector('.app' + index).style.display = null
    changeFocus(index)
  }
}






function init() {
  createBottomNav()
  getNavigator()
  console.log(navigator);

  // show app
  document.querySelector('#app').style.opacity = '100%'
  console.log('app initiated')
}









function centerMenu() {
  if (document.querySelector('#center').style.display == 'none') {
    document.querySelector('#center').style.display = null
  } else {
    document.querySelector('#center').style.display = 'none'
  }
}




function getNavigator() {

  navigator.getBattery().then(battery => {
    battery.addEventListener('chargingchange', () => {
      updateBatt()
    });
    battery.addEventListener('levelchange', () => {
      updateBatt()
    });
    function updateBatt() {
      document.querySelector('.batteryInfo').className = 'batteryInfo ' + battery.charging
      document.querySelector('.batteryInfo').innerHTML = battery.charging ? battery.level * 100 + "%↯" : battery.level * 100 + "%"
    }
    updateBatt()
  });
}

init()

function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
      .then(() => console.log("Document Exited from Full screen mode"))
      .catch((err) => console.error(err))
  } else {
    document.documentElement.requestFullscreen();
  }
}