import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  theCount;
  alarm;
  panel;
  turnOff;
  turnOffHor;
  detonate;

  time;
  cover;
  btn;
  abort;
  reload;
  mute;

  constructor() {}

  ngAfterViewInit() {

    this.alarm = document.getElementById("alarm");
    this.panel = document.getElementById("panel");
    this.turnOff = document.getElementById("turn-off");
    this.turnOffHor = document.getElementById("closing");
    this.detonate = document.getElementById("detonate");
    this.time = document.getElementById("time");

    this.cover = document.getElementById("cover");
    this.cover.addEventListener("click", this.coverClickHandeler.bind(this));

    this.btn = document.getElementById("activate");
    this.btn.addEventListener("click", this.buttonClickHandeler.bind(this));

    this.abort = document.getElementById("abort");
    this.abort.addEventListener("click", this.abortClickHandeler.bind(this));

    this.reload = document.getElementById("restart");
    this.reload.addEventListener("click", this.reloadClickHandeler.bind(this));

    setTimeout(function () {
      this.cover.classList.remove("opened");
    }, 100);

    this.mute = document.getElementById("mute");
    this.mute.addEventListener("click", this.muteClickHandeler.bind(this));
  }

  showCountDown() {
    this.time.innerText = ''+ (+this.time.innerText - 1);
    if (+this.time.innerText == 0) {
      clearInterval(this.theCount);
      this.time.classList.add("crono");
      this.abort.classList.add("hide");
      this.detonate.classList.add("show");
      setTimeout(() => {
        this.turnOff.classList.add("close");
        this.turnOffHor.classList.add("close");
        this.reload.classList.add("show");
        this.alarm.pause();
      }, 1500);
    }
  }

  buttonClickHandeler(event) {
    this.btn.classList.add("pushed");
    this.alarm.load();
    this.alarm.currentTime = 10.1;
    this.alarm.play();

    setTimeout(() => {
      this.panel.classList.add("show");
      this.theCount = setInterval(this.showCountDown.bind(this), 1000);
      this.alarm.load();
      this.alarm.play();
    }, 500);
  }

  coverClickHandeler(event) {
    if (this.cover.className == "box") {
      this.cover.classList.add("opened");
    } else {
      this.cover.classList.remove("opened");
    }
  }

  muteClickHandeler(event) {
    if (this.mute.className == "muted") {
      this.alarm.muted = false;
      this.mute.classList.remove("muted");
    } else {
      this.alarm.muted = true;
      this.mute.classList.add("muted");
    }
  }

  reloadClickHandeler(event) {
    this.panel.classList.remove("show");
    this.turnOff.classList.remove("close");
    this.turnOffHor.classList.remove("close");
    this.abort.classList.remove("hide");
    this.detonate.classList.remove("show");
    this.cover.classList.remove("opened");
    this.btn.classList.remove("pushed");
    this.reload.classList.remove("show");
    this.time.classList.remove("crono");
    this.time.innerText = 9;
  }

  abortClickHandeler(event) {
    this.btn.classList.remove("pushed");
    this.panel.classList.remove("show");
    
    clearInterval(this.theCount);
    this.time.innerText = 9;
    this.alarm.pause();
    this.alarm.currentTime = 10;
    this.alarm.play();
  }
}
