const button = document.getElementById('button');
// const audioElement = document.getElementById('audio');
let audioElement = document.createElement('audio');
const container = document.getElementById('container');

let jokeTextElement = document.getElementById('joke-text')
const voicerssKey ='69c03f9d48494f86ba442cb959c2386b';
let srcText ='four score and seven years ago'
let setup ='';
let delivery =''


// VoiceRSS Javascript SDK
// const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};


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
     audioElement.play();


                    // console.log('rspones',t.responseText)
                    // new Audio(t.responseText).play();
            //    audioElement.src = t.responseText;
            //    console.log(audioElement)
            //      audioElement.play();
            }
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
//  function test() {
//     // console.log('before', audioElement)

//     VoiceRSS.speech({
//         key: voicerssKey,
//         src: srcText,
//         hl: 'en-au',
//         r: 0,
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     })



// }


function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

 async function getVoice (setup){
    //  audioElement.autoplay = true;
    // console.log('before',audioElement, audioElement.autoplay)

  
     VoiceRSS.speech({
        key: voicerssKey,
        src : setup,
        hl: 'en-au',
        r: 0, 
        c: 'mp3',
        f:'44khz_16bit_stereo',
        ssml: false
    })
//    console.log(audioElement.src);
//         audioElement.autoplay = true;

    console.log('after',audioElement, audioElement.autoplay)


    // console.log('srouce ',audioElement.attributes.);
    // if (audioElement.src)
    //  {console.log('src exists') }
    //  else{
    //      console.log('src missing')
    //  }


    

        
}
async function getJoke(){
    console.log('getting joke');
    let response = await fetch('https://v2.jokeapi.dev/joke/Any?type=')
    let json = await response.json()
    console.log(json);
    let textToSend =''
    if(!json.joke){
        console.log('double')
        textToSend = json.setup +'    ' +json.delivery;
        // setup=json.setup;
        // delivery =json.delivery;
        // getVoice(setup +'....'+delivery)
        
    }else{
        console.log('single')
        textToSend = json.joke;
        // joke=json.joke;
        // getVoice(joke);
    }
    jokeTextElement.textContent = textToSend;
    getVoice(textToSend);


    
};
// getVoice()
getJoke()


