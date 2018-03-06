angular.module("aneka_resep_kue", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","aneka_resep_kue.controllers", "aneka_resep_kue.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Aneka Resep Kue" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.1" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-1421905573991338/9119549000",
					interstitial: "ca-app-pub-1421905573991338/8716238601",
					rewardvideo: "ca-app-pub-1421905573991338/8632900897"
				};
				$timeout(function(){
					
					AdMob.createBanner({
						adId: admobid.banner,
						overlap: false,
						autoShow: true,
						offsetTopBar: false,
						position: AdMob.AD_POSITION.BOTTOM_CENTER,
						bgColor: "black"
					});
					
					AdMob.prepareInterstitial({
						adId: admobid.interstitial,
						autoShow: true,
					});
					
					AdMob.prepareRewardVideoAd({
						adId: admobid.rewardvideo,
						autoShow: true,
					});
					
				}, 1000);;
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "aneka_resep_kue",
				storeName : "aneka_resep_kue",
				description : "The offline datastore for Aneka Resep Kue app"
			});


			//required: cordova plugin add cordova-plugin-network-information --save
			$interval(function(){
				if ( typeof navigator == "object" && typeof navigator.connection != "undefined"){
					var networkState = navigator.connection.type;
					if (networkState == "none") {
						$window.location = "retry.html";
					}
				}
			}, 5000);

			//required: cordova plugin add cordova-plugin-fcm --save
			if(window.cordova && FCMPlugin){
				FCMPlugin.getToken(function (token) {
				}, function (err) {
				});
				FCMPlugin.onNotification(function (data){
					if (data.wasTapped) {
					}else {
					}
				}, function (msg) {
				}, function (err) {
				});
			}    


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})





.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("top");
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("aneka_resep_kue",{
		url: "/aneka_resep_kue",
		abstract: true,
		templateUrl: "templates/aneka_resep_kue-tabs.html",
	})

	.state("aneka_resep_kue.resep_kue", {
		url: "/resep_kue",
		cache:false,
		views: {
			"aneka_resep_kue-resep_kue" : {
						templateUrl:"templates/aneka_resep_kue-resep_kue.html",
						controller: "resep_kueCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("aneka_resep_kue.resep_singles", {
		url: "/resep_singles/:id",
		cache:false,
		views: {
			"aneka_resep_kue-resep_kue" : {
						templateUrl:"templates/aneka_resep_kue-resep_singles.html",
						controller: "resep_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/aneka_resep_kue/resep_kue");
});
