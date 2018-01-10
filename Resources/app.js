/**
 * @author BiggyTV
 * @license
 *
 */

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

  	var osname = Ti.Platform.osname;
  	var version = Ti.Platform.version;
	var height = Ti.Platform.displayCaps.platformHeight;
	var width = Ti.Platform.displayCaps.platformWidth;
    
  	Ti.API.info(osname);

  	Ti.API.info(version);


  function checkTablet() {
    var platform = Ti.Platform.osname;

    switch (platform) {
      case 'ipad':
        return true;
      case 'android':
        var psc = Ti.Platform.Android.physicalSizeCategory;
        var tiAndroid = Ti.Platform.Android;
        return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
      default:
        return Math.min(
          Ti.Platform.displayCaps.platformHeight,
          Ti.Platform.displayCaps.platformWidth
        ) >= 400;
    }
  };
  
    var isTablet = checkTablet();

  
// Font Sizing
var curHeight = Titanium.Platform.displayCaps.platformHeight;
var curWidth = Titanium.Platform.displayCaps.platformWidth;



// GA Module
/*var ga = require('ti.ga');
Ti.API.info("module is => " + ga);
ga.setOptOut(false);
ga.setDebug(true);
ga.setDispatchInterval(15);


var tracker = ga.createTracker({
   trackingId:'UA-1915847-26',
   useSecure:true,
   debug:true 
});

Ti.API.info("tracker is => " + JSON.stringify(tracker));

tracker.startSession();
tracker.addScreenView('App Open');

*/

var MontserratBold = 'Montserrat-Bold';
// use the friendly-name on iOS
var MontserratRegular = 'Montserrat-Regular';
	var ApplicationTabGroup = require('ApplicationTabGroup');
	new ApplicationTabGroup().open();
