const button = document.getElementById('button');
let audioElement = document.createElement('audio');
const container = document.getElementById('container');
const warningElement = document.getElementById('warning-container')

let jokeTextElement = document.getElementById('joke-text')
const voicerssKey ='69c03f9d48494f86ba442cb959c2386b';
let srcText ='four score and seven years ago'
let setup ='';
let delivery =''


// VoiceRSS Javascript SDK
const VoiceRSS = {
    speech: function(e) {
        this._validate(e),
        this._request(e)
    },
    _validate: function(e) {
        if (!e)
            throw "The settings are undefined";
        if (!e.key)
            throw "The API key is undefined";
        if (!e.src)
            throw "The text is undefined";
        if (!e.hl)
            throw "The language is undefined";
        if (e.c && "auto" != e.c.toLowerCase()) {
            var a = !1;
            switch (e.c.toLowerCase()) {
            case "mp3":
                a = (new Audio).canPlayType("audio/mpeg").replace("no", "");
                break;
            case "wav":
                a = (new Audio).canPlayType("audio/wav").replace("no", "");
                break;
            case "aac":
                a = (new Audio).canPlayType("audio/aac").replace("no", "");
                break;
            case "ogg":
                a = (new Audio).canPlayType("audio/ogg").replace("no", "");
                break;
            case "caf":
                a = (new Audio).canPlayType("audio/x-caf").replace("no", "")
            }
            if (!a)
                throw "The browser does not support the audio codec " + e.c
        }
    },
    _request: function(e) {
        var a = this._buildRequest(e)
          , t = this._getXHR();
        t.onreadystatechange = function() {
            if (4 == t.readyState && 200 == t.status) {
                if (0 == t.responseText.indexOf("ERROR"))
                    // console.log('below is speech api error')

                    throw t.responseText;

    // Audio does not autoplay. So im going to create the audio element manually and insert it.
    // item.setAttribute(item,{
    //     'src': t.responseText,
    //     // autoplay:true,
    // })
    audioElement.src = t.responseText
    container.appendChild(audioElement).play();
    audioElement.controls =true;
    audioElement.hidden= false
    audioElement.play();            }
        }
        ,
        t.open("POST", "https://api.voicerss.org/", !0),
        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
        t.send(a)
    },
    _buildRequest: function(e) {
        var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
        return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true"
    },
    _detectCodec: function() {
        var e = new Audio;
        return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : ""
    },
    _getXHR: function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml3.XMLHTTP")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (e) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {}
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
        throw "The browser does not support HTTP request"
    }
};


function onClick() {
    getJoke();
}

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

 async function getVoice (setup){
     VoiceRSS.speech({
        key: voicerssKey,
        src : setup,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f:'44khz_16bit_stereo',
        ssml: false
    });
};

async function getJoke(){
    console.log('getting joke');
    let response = await fetch('https://v2.jokeapi.dev/joke/Any?type=')
    let json = await response.json()
    console.log(json);
    let textToSend =''
    if(!json.joke){
        console.log('double')
        textToSend = json.setup +'    ' +json.delivery;        
    }else{
        console.log('single')
        textToSend = json.joke;
    }
    jokeTextElement.textContent = textToSend;
    getVoice(textToSend);   
};

 async function checkIP(){
    fetch('https://ipapi.co/json/')
            .then(data=>{
       return data.json()})
       .then(res=>{
            let now = Date.now();
            let timeDate = new Date(now);
            res.timeDate=timeDate;
            res.app ='joke-teller'
            console.log('checkpoint');
           console.log(res);
                   sendIpToFirebase(res)

           getJoke()
       });
}

function sendIpToFirebase(res){
    var firebaseConfig = {
        apiKey: "AIzaSyB61iGOSYQlOCo1rGU0qjc9mYNT9SqNEsM",
        authDomain: "store-ips.firebaseapp.com",
        projectId: "store-ips",
        storageBucket: "store-ips.appspot.com",
        messagingSenderId: "902404946025",
        appId: "1:902404946025:web:ee9e588996640f15614af8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    let db =firebase.firestore()
    db.collection("ips").add({
        ...res
    }).then((docRef)=>{
        // unnimportant. If it fails, it's not important to the function of the app.
    })
    .catch((error =>{
        console.log('error adding doc',error);
    }))
}
    
   

checkIP();
setTimeout(()=>{
    
    warningElement.hidden = true;
}, 8000);