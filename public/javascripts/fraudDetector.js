 
let d = new Date();
let htmlString = "";
let ipString ="";
htmlString = "Tranaction Date is " + d + "</br>"
 
 var md = new MobileDetect(navigator.userAgent);
 console.log( md.mobile() );          // 'Sony'
 
 htmlString = htmlString + "Is Mobile " + md.mobile() + "</br>";
 htmlString = htmlString + "Is Phone is " + md.phone() + "</br>";
 htmlString = htmlString + "Tablet is " + md.tablet() + "</br>";
 htmlString = htmlString + "userAgent is " +  md.userAgent() + "</br>";
 htmlString = htmlString + "OS is" +  md.os() + "</br>";
 htmlString = htmlString + "iPhone is " +  md.is('iPhone') + "</br>";
 htmlString = htmlString + "bot " +  md.is('bot') + "</br>";
 htmlString = htmlString + "Webkit " +  md.is('Webkit') + "</br>";
 htmlString = htmlString + "Build is " +  md.is('Build') + "</br>";
 htmlString = htmlString + "playstation|xbox is " +  md.is('playstation|xbox') + "</br>";
 htmlString = htmlString + "Chrome Version"+ md.versionStr("Chrome")+ "</br>";
 htmlString = htmlString + "Safari Version"+ md.versionStr("Safari")+ "</br>";
 htmlString = htmlString + "Webkit Version"+ md.versionStr("Webkit")+ "</br>";
 htmlString = htmlString + "Webkit Version"+ md.versionStr("Webkit")+ "</br>"; 
 htmlString = htmlString + "Webkit Version"+ md.version("Webkit")+ "</br>"; 
 htmlString = htmlString + "Windows NT"+ md.version("Windows NT")+ "</br>"; 
 htmlString = htmlString + "Windows NT"+ md.versionStr("Windows NT")+ "</br>";


if(navigator.appName) {
	htmlString = htmlString + "appName is " + navigator.appName + "</br>";
}

if(navigator.appCodeName) {
	htmlString = htmlString + "appCodeName is " + navigator.appCodeName + "</br>";
}

if(navigator.userAgent) {
	htmlString = htmlString + "userAgent is " + navigator.userAgent + "</br>";
}

if(navigator.deviceMemory) {
	
htmlString = htmlString + "deviceMemory is " + navigator.deviceMemory + "</br>";	
	
}

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
  document.body.innerHTML = htmlString + "Geolocation is not supported by this browser.";
}



function showPosition(position) {
  document.body.innerHTML = htmlString + "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude + "<br>";
  
  htmlString = document.body.innerHTML ;
}
getUserIP(function(ip){
	
		ipString = ipString + 'IP ! : '  + ip + " <br>";
		 document.body.innerHTML =  htmlString + ipString;
		
});
/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}