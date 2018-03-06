var admobid = {};
if( /(android)/i.test(navigator.userAgent)){
	admobid = { //for Android
		banner: "ca-app-pub-1421905573991338/9119549000",
		interstitial: "ca-app-pub-1421905573991338/8716238601"
	};
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
	admobid = { // for iOS
		banner: "",
		interstitial: ""
	};
} else {
	admobid = { // for Windows Phone
		banner: "",
		interstitial: ""
		};
	}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
	document.addEventListener("deviceready",initApp,false);
} else {
	initApp();
}

function initApp() {
	if ((typeof AdMob === "undefined")) { 
		return; 
	}
	AdMob.createBanner({
		adId: admobid.banner,
		isTesting: false,
		overlap: false,
		offsetTopBar: false,
		position: AdMob.AD_POSITION.BOTTOM_CENTER,
		bgColor: "black"
		});
	AdMob.prepareInterstitial({
		adId: admobid.interstitial,
		autoShow: true
	});
}

