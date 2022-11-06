console.log("welcome");
let songIndex = 0;
let mainplay = document.getElementById("mainplayy");
let progress = document.getElementById("progress");
let playicon = document.getElementById("mainplay");
let audioElement = new Audio("songs/hosanna.mp3");
let rotatealbum = document.getElementById("rotate");
let currSong = document.getElementsByClassName("curr")[0];
let varcur=document.getElementsByClassName("playsong")[0];
let currnumber=0;

let songs = [
  {
    songname: "Hosanna",
    filepath: "/songs/hosanna.mp3",
    coverpath: "covers/hosanna.jpg",
    duration: "5:31",
  },
  {
    songname: "Make You Mine",
    filepath: "/songs/MakeYouMine.mp3",
    coverpath: "covers/MakeYouMine.jpg",
    duration: "3:16",
  },
  {
    songname: "O Rangrez",
    filepath: "/songs/ORangrez.mp3",
    coverpath: "covers/ORangrez.jpg",
    duration: "6:25",
  },
  {
    songname: "Excuses",
    filepath: "/songs/Excuses.mp3",
    coverpath: "covers/Excuses.jpg",
    duration: "2:56",
  },
  {
    songname: "This Side of Pradise",
    filepath: "/songs/ThisSideOfParadise.mp3",
    coverpath: "covers/ThisSideOfParadise.jpg",
    duration: "4:02",
  },
  {
    songname: "You Belong With Me",
    filepath: "/songs/YouBelongWithMe.mp3",
    coverpath: "covers/YouBelongWithMe.jpg",
    duration: "3:51",
  },
  {
    songname: "Tum Tak",
    filepath: "/songs/TumTak.mp3",
    coverpath: "covers/TumTak.jpg",
    duration: "4:40",
  },
  {
    songname: "Dildaara",
    filepath: "/songs/Dildaara.mp3",
    coverpath: "covers/Dildaara.jpg",
    duration: "4:09",
  },
  {
    songname: "Mast Magan",
    filepath: "/songs/MastMagan.mp3",
    coverpath: "covers/MastMagan.jpg",
    duration: "4:40",
  },
  {
    songname: "Choo Lo",
    filepath: "/songs/ChooLo.mp3",
    coverpath: "covers/ChooLo.jpg",
    duration: "3:53",
  },
];

let songItems = Array.from(document.getElementsByClassName("song"));
let curdiv=songItems[0];

songItems.forEach((element, i) => {
  // console.log(songs[i].songname);
  element.getElementsByClassName("songName")[0].textContent = songs[i].songname;
  element.getElementsByClassName("times")[0].textContent = songs[i].duration;
  element.getElementsByClassName("covers")[0].src = songs[i].coverpath;
});

let durations=Array.from(document.getElementsByClassName('times'));
durations.forEach((element,i) => {
  element.textContent=songs[i].duration;
});

let playButtons = Array.from(document.getElementsByClassName("playsong"));

playButtons.forEach((element, i) => {
  element.addEventListener("click", () => {
    temp=new URL(audioElement.src);
    if(temp.pathname===songs[i].filepath){
      if(audioElement.paused){
        audioElement.play();
        document.title=songs[i].songname;
        currnumber=i;
        playicon.classList.remove("fa-play-circle");
        playicon.classList.add("fa-pause-circle");
        rotatealbum.classList.add("rotate");
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
        curdiv.style.backgroundColor='#1DB954';
      }
      else{
        audioElement.pause();
        playicon.classList.add("fa-play-circle");
        playicon.classList.remove("fa-pause-circle");
        rotatealbum.classList.remove("rotate");
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        document.title='Spotify';
      }
    }
    else{
      audioElement.src = songs[i].filepath;
      document.title=songs[i].songname;
      currnumber=i;
      audioElement.currentTime = 0;
      audioElement.play();
      varcur=element;
      allplays();
      curdiv.style.backgroundColor='antiquewhite';
      curdiv=songItems[i];
      playicon.classList.remove("fa-play-circle");
      playicon.classList.add("fa-pause-circle");
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      rotatealbum.classList.add("rotate");
      curdiv.style.backgroundColor='#1DB954';
      currSong.getElementsByTagName("b")[0].textContent = songs[i].songname;
      rotatealbum.src = songs[i].coverpath;
    }
  });
});

const allplays = () => {
  playButtons.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

mainplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playicon.classList.remove("fa-play-circle");
    varcur.classList.remove("fa-play-circle");
    playicon.classList.add("fa-pause-circle");
    varcur.classList.add("fa-pause-circle");
    rotatealbum.classList.add("rotate");
    curdiv.style.backgroundColor='#1DB954';
    document.title=songs[currnumber].songname;
  } else {
    audioElement.pause();
    playicon.classList.add("fa-play-circle");
    varcur.classList.add("fa-play-circle");
    playicon.classList.remove("fa-pause-circle");
    varcur.classList.remove("fa-pause-circle");
    rotatealbum.classList.remove("rotate");
    document.title='Spotify';
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("timeUpdate");
  console.log(audioElement.duration);
  currprogress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  console.log(currprogress);
  progress.value = currprogress;
});

progress.addEventListener("change", () => {
  audioElement.currentTime = (progress.value * audioElement.duration) / 100;
});

document.getElementsByClassName('fa-step-backward')[0].addEventListener('click',()=>{
  if(currnumber==0){
    currnumber=9;
    playButtons[currnumber].click();
  }
  else{
    currnumber-=1;
    playButtons[currnumber].click();
  }
})

document.getElementsByClassName('fa-step-forward')[0].addEventListener('click',()=>{
  if(currnumber==9){
    currnumber=0;
    playButtons[currnumber].click();
  }
  else{
    currnumber+=1;
    playButtons[currnumber].click();
  }
})
console.log("welcome");
let songIndex = 0;
let mainplay = document.getElementById("mainplayy");
let progress = document.getElementById("progress");
let playicon = document.getElementById("mainplay");
let audioElement = new Audio("songs/hosanna.mp3");
let rotatealbum = document.getElementById("rotate");
let currSong = document.getElementsByClassName("curr")[0];
let varcur=document.getElementsByClassName("playsong")[0];
let currnumber=0;

let songs = [
  {
    songname: "Hosanna",
    filepath: "/songs/hosanna.mp3",
    coverpath: "covers/hosanna.jpg",
    duration: "5:31",
  },
  {
    songname: "Make You Mine",
    filepath: "/songs/MakeYouMine.mp3",
    coverpath: "covers/MakeYouMine.jpg",
    duration: "3:16",
  },
  {
    songname: "O Rangrez",
    filepath: "/songs/ORangrez.mp3",
    coverpath: "covers/ORangrez.jpg",
    duration: "6:25",
  },
  {
    songname: "Excuses",
    filepath: "/songs/Excuses.mp3",
    coverpath: "covers/Excuses.jpg",
    duration: "2:56",
  },
  {
    songname: "This Side of Pradise",
    filepath: "/songs/ThisSideOfParadise.mp3",
    coverpath: "covers/ThisSideOfParadise.jpg",
    duration: "4:02",
  },
  {
    songname: "You Belong With Me",
    filepath: "/songs/YouBelongWithMe.mp3",
    coverpath: "covers/YouBelongWithMe.jpg",
    duration: "3:51",
  },
  {
    songname: "Tum Tak",
    filepath: "/songs/TumTak.mp3",
    coverpath: "covers/TumTak.jpg",
    duration: "4:40",
  },
  {
    songname: "Dildaara",
    filepath: "/songs/Dildaara.mp3",
    coverpath: "covers/Dildaara.jpg",
    duration: "4:09",
  },
  {
    songname: "Mast Magan",
    filepath: "/songs/MastMagan.mp3",
    coverpath: "covers/MastMagan.jpg",
    duration: "4:40",
  },
  {
    songname: "Choo Lo",
    filepath: "/songs/ChooLo.mp3",
    coverpath: "covers/ChooLo.jpg",
    duration: "3:53",
  },
];

let songItems = Array.from(document.getElementsByClassName("song"));
let curdiv=songItems[0];

songItems.forEach((element, i) => {
  // console.log(songs[i].songname);
  element.getElementsByClassName("songName")[0].textContent = songs[i].songname;
  element.getElementsByClassName("times")[0].textContent = songs[i].duration;
  element.getElementsByClassName("covers")[0].src = songs[i].coverpath;
});

let durations=Array.from(document.getElementsByClassName('times'));
durations.forEach((element,i) => {
  element.textContent=songs[i].duration;
});

let playButtons = Array.from(document.getElementsByClassName("playsong"));

playButtons.forEach((element, i) => {
  element.addEventListener("click", () => {
    temp=new URL(audioElement.src);
    if(temp.pathname===songs[i].filepath){
      if(audioElement.paused){
        audioElement.play();
        document.title=songs[i].songname;
        currnumber=i;
        playicon.classList.remove("fa-play-circle");
        playicon.classList.add("fa-pause-circle");
        rotatealbum.classList.add("rotate");
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
        curdiv.style.backgroundColor='#1DB954';
      }
      else{
        audioElement.pause();
        playicon.classList.add("fa-play-circle");
        playicon.classList.remove("fa-pause-circle");
        rotatealbum.classList.remove("rotate");
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        document.title='Spotify';
      }
    }
    else{
      audioElement.src = songs[i].filepath;
      document.title=songs[i].songname;
      currnumber=i;
      audioElement.currentTime = 0;
      audioElement.play();
      varcur=element;
      allplays();
      curdiv.style.backgroundColor='antiquewhite';
      curdiv=songItems[i];
      playicon.classList.remove("fa-play-circle");
      playicon.classList.add("fa-pause-circle");
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      rotatealbum.classList.add("rotate");
      curdiv.style.backgroundColor='#1DB954';
      currSong.getElementsByTagName("b")[0].textContent = songs[i].songname;
      rotatealbum.src = songs[i].coverpath;
    }
  });
});

const allplays = () => {
  playButtons.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

mainplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playicon.classList.remove("fa-play-circle");
    varcur.classList.remove("fa-play-circle");
    playicon.classList.add("fa-pause-circle");
    varcur.classList.add("fa-pause-circle");
    rotatealbum.classList.add("rotate");
    curdiv.style.backgroundColor='#1DB954';
    document.title=songs[currnumber].songname;
  } else {
    audioElement.pause();
    playicon.classList.add("fa-play-circle");
    varcur.classList.add("fa-play-circle");
    playicon.classList.remove("fa-pause-circle");
    varcur.classList.remove("fa-pause-circle");
    rotatealbum.classList.remove("rotate");
    document.title='Spotify';
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("timeUpdate");
  console.log(audioElement.duration);
  currprogress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  console.log(currprogress);
  progress.value = currprogress;
});

progress.addEventListener("change", () => {
  audioElement.currentTime = (progress.value * audioElement.duration) / 100;
});

document.getElementsByClassName('fa-step-backward')[0].addEventListener('click',()=>{
  if(currnumber==0){
    currnumber=9;
    playButtons[currnumber].click();
  }
  else{
    currnumber-=1;
    playButtons[currnumber].click();
  }
})

document.getElementsByClassName('fa-step-forward')[0].addEventListener('click',()=>{
  if(currnumber==9){
    currnumber=0;
    playButtons[currnumber].click();
  }
  else{
    currnumber+=1;
    playButtons[currnumber].click();
  }
})
console.log("welcome");
let songIndex = 0;
let mainplay = document.getElementById("mainplayy");
let progress = document.getElementById("progress");
let playicon = document.getElementById("mainplay");
let audioElement = new Audio("songs/hosanna.mp3");
let rotatealbum = document.getElementById("rotate");
let currSong = document.getElementsByClassName("curr")[0];
let varcur=document.getElementsByClassName("playsong")[0];
let currnumber=0;

let songs = [
  {
    songname: "Hosanna",
    filepath: "/songs/hosanna.mp3",
    coverpath: "covers/hosanna.jpg",
    duration: "5:31",
  },
  {
    songname: "Make You Mine",
    filepath: "/songs/MakeYouMine.mp3",
    coverpath: "covers/MakeYouMine.jpg",
    duration: "3:16",
  },
  {
    songname: "O Rangrez",
    filepath: "/songs/ORangrez.mp3",
    coverpath: "covers/ORangrez.jpg",
    duration: "6:25",
  },
  {
    songname: "Excuses",
    filepath: "/songs/Excuses.mp3",
    coverpath: "covers/Excuses.jpg",
    duration: "2:56",
  },
  {
    songname: "This Side of Pradise",
    filepath: "/songs/ThisSideOfParadise.mp3",
    coverpath: "covers/ThisSideOfParadise.jpg",
    duration: "4:02",
  },
  {
    songname: "You Belong With Me",
    filepath: "/songs/YouBelongWithMe.mp3",
    coverpath: "covers/YouBelongWithMe.jpg",
    duration: "3:51",
  },
  {
    songname: "Tum Tak",
    filepath: "/songs/TumTak.mp3",
    coverpath: "covers/TumTak.jpg",
    duration: "4:40",
  },
  {
    songname: "Dildaara",
    filepath: "/songs/Dildaara.mp3",
    coverpath: "covers/Dildaara.jpg",
    duration: "4:09",
  },
  {
    songname: "Mast Magan",
    filepath: "/songs/MastMagan.mp3",
    coverpath: "covers/MastMagan.jpg",
    duration: "4:40",
  },
  {
    songname: "Choo Lo",
    filepath: "/songs/ChooLo.mp3",
    coverpath: "covers/ChooLo.jpg",
    duration: "3:53",
  },
];

let songItems = Array.from(document.getElementsByClassName("song"));
let curdiv=songItems[0];

songItems.forEach((element, i) => {
  // console.log(songs[i].songname);
  element.getElementsByClassName("songName")[0].textContent = songs[i].songname;
  element.getElementsByClassName("times")[0].textContent = songs[i].duration;
  element.getElementsByClassName("covers")[0].src = songs[i].coverpath;
});

let durations=Array.from(document.getElementsByClassName('times'));
durations.forEach((element,i) => {
  element.textContent=songs[i].duration;
});

let playButtons = Array.from(document.getElementsByClassName("playsong"));

playButtons.forEach((element, i) => {
  element.addEventListener("click", () => {
    temp=new URL(audioElement.src);
    if(temp.pathname===songs[i].filepath){
      if(audioElement.paused){
        audioElement.play();
        document.title=songs[i].songname;
        currnumber=i;
        playicon.classList.remove("fa-play-circle");
        playicon.classList.add("fa-pause-circle");
        rotatealbum.classList.add("rotate");
        element.classList.remove("fa-play-circle");
        element.classList.add("fa-pause-circle");
        curdiv.style.backgroundColor='#1DB954';
      }
      else{
        audioElement.pause();
        playicon.classList.add("fa-play-circle");
        playicon.classList.remove("fa-pause-circle");
        rotatealbum.classList.remove("rotate");
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        document.title='Spotify';
      }
    }
    else{
      audioElement.src = songs[i].filepath;
      document.title=songs[i].songname;
      currnumber=i;
      audioElement.currentTime = 0;
      audioElement.play();
      varcur=element;
      allplays();
      curdiv.style.backgroundColor='antiquewhite';
      curdiv=songItems[i];
      playicon.classList.remove("fa-play-circle");
      playicon.classList.add("fa-pause-circle");
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      rotatealbum.classList.add("rotate");
      curdiv.style.backgroundColor='#1DB954';
      currSong.getElementsByTagName("b")[0].textContent = songs[i].songname;
      rotatealbum.src = songs[i].coverpath;
    }
  });
});

const allplays = () => {
  playButtons.forEach((element) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};

mainplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    playicon.classList.remove("fa-play-circle");
    varcur.classList.remove("fa-play-circle");
    playicon.classList.add("fa-pause-circle");
    varcur.classList.add("fa-pause-circle");
    rotatealbum.classList.add("rotate");
    curdiv.style.backgroundColor='#1DB954';
    document.title=songs[currnumber].songname;
  } else {
    audioElement.pause();
    playicon.classList.add("fa-play-circle");
    varcur.classList.add("fa-play-circle");
    playicon.classList.remove("fa-pause-circle");
    varcur.classList.remove("fa-pause-circle");
    rotatealbum.classList.remove("rotate");
    document.title='Spotify';
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("timeUpdate");
  console.log(audioElement.duration);
  currprogress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  console.log(currprogress);
  progress.value = currprogress;
});

progress.addEventListener("change", () => {
  audioElement.currentTime = (progress.value * audioElement.duration) / 100;
});

document.getElementsByClassName('fa-step-backward')[0].addEventListener('click',()=>{
  if(currnumber==0){
    currnumber=9;
    playButtons[currnumber].click();
  }
  else{
    currnumber-=1;
    playButtons[currnumber].click();
  }
})

document.getElementsByClassName('fa-step-forward')[0].addEventListener('click',()=>{
  if(currnumber==9){
    currnumber=0;
    playButtons[currnumber].click();
  }
  else{
    currnumber+=1;
    playButtons[currnumber].click();
  }
})
