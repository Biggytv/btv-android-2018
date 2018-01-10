function ApplicationTabGroup() {
	//create module instance
	'use strict';
	var self = Ti.UI.createTabGroup({
		tabsBackgroundColor: '#000000'
	});

    if (Titanium.Network.networkTypeName == 'NONE') {
		alert("'BiggyTV is unable to connect to the Internet.  Please try again later.");
		 

	}



	var btvPlayerhomeJS = require('/main_windows/btvPlayerhome');

	//var btvInfoJS = require('/main_windows/btvinfo');
	
	//var btvScannerJS = require('main_windows/btvScanner');

	//create app tabs
	var win1 = new btvPlayerhomeJS;
	//var win2 = new btvInfoJS;
	//var win3 = new btvScannerJS;

	var tab1 = Ti.UI.createTab({
		title : 'Live Streaming',
		window : win1,
		icon: 'images/entertainmentTab.png',
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: '50%'
            }
	});
	win1.containingTab = tab1;

/*	var tab2 = Ti.UI.createTab({
		title : 'BiggyTV Info',
		window : win2,
		icon: 'images/infoTab.png',
		
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: '50%'
            }
	});
	//win2.containingTab = tab2;
*/
/*
	var tab3 = Ti.UI.createTab({
		title : 'BiggyTV Info',
		window : win3,
		icon: 'images/infoTab.png',
		
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: '50%'
            }
	});
	win3.containingTab = tab3;
*/
	
	self.addTab(tab1);
//	self.addTab(tab2);
//	self.addTab(tab3);

	return self;
}

module.exports = ApplicationTabGroup;
