///Preview Player//
function btvPlayerhome() {
    'use strict';

    var osname = Ti.Platform.osname;
    var channel = "MAINweb";
    var barColor = "#EDD7D7";
    var title = "101-Preview Channel";
    var channelheader = [];
    channelheader = "101-Preview Channel";
    var channeldataArray = "";
    var btvPlayer = Titanium.UI.createWindow({
        backgroundColor: '#0000',
        layout: 'vertical'
    });

    if (Titanium.Network.networkTypeName == 'NONE') {
        alert("'BiggyTV is unable to connect to the Internet.  Please try again later.");
    };
    

//GA Screen View

/*    btvPlayer.addEventListener('open', function(evt) {
        tracker.addScreenView('101-Preview/Featured');
    });
 */  
    btvPlayer.orientationModes = [
        Ti.UI.PORTRAIT

    ];


    
    var header = Ti.UI.createView({
		backgroundColor : '#000000',
		height : '10%',



    });

    var body = Ti.UI.createView({
        backgroundColor: '#000000',
        height: '40%',



    });

    var info = Ti.UI.createView({
        backgroundColor:  '#000000',
        height: '10%',
        layout: 'vertical'



    });

    var channels = Ti.UI.createView({
        backgroundColor: '#000000',
        height: '40%',


    });
    
/*    var adspace = Ti.UI.createView({
    	    	
        backgroundColor: '#ff0000',
        height: 150,
        top: 600,
        left: 0,

    });
 */  
    
    var headerImage = Ti.UI.createImageView({
        image: '/images/btv-logo-rectangle.png',
        width: '25%',
        top: '2%',
        left: '1%',

    });

    var titleView = Ti.UI.createView({
        backgroundColor: 'transparent',
        //top: '2%',

    });
    
    var titleText = Ti.UI.createLabel({
        text: title,
        color: '#ffffff',
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontsize: '15dp'
        }
    });
    
/*     var fullopenButton = Ti.UI.createButton({
 		image: "/images/Fullscreen-icon-125.png",
 		backgroundColor:"transparent",
        top: '1%',
        right: '3%',
        zIndex: '1200'
  	
 }); 
*/
    

    titleView.add(titleText);
    header.add(headerImage);
    //header.add(fullopenButton);
    header.add(titleView);
    btvPlayer.add(header);

    function btvPlayerLoad(channel) {

        //////////////////////PLAYER START/////

        var streamHeader = "http://btvcdneast1.biggytv.com:8081/live/";
        var streamSuffix = "/playlist.m3u8";
        var contentURL = streamHeader + channel + streamSuffix;
       // Ti.API.info(contentURL);
        var wp = Titanium.Media.createVideoPlayer({
            top: 2,
            //height: Ti.UI.SIZE,
            //width: Ti.UI.Fill,
            url: contentURL,
            backgroundColor: '#000000',
            barColor: '#A7D6FF',
            scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
            mediaTypes: Titanium.Media.VIDEO_MEDIA_TYPE_VIDEO,
            sourceType: Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING,
              fullscreen: false,
            	  volume: 0.3,
            	autoplay: true,
        });

        wp.orientationModes = [
            Ti.UI.PORTRAIT
        ];

        var actindImage = Ti.UI.createImageView({
            layout: 'horizontal',
            gif: '/appImages/BTV_Loading_Indicator_01_150.gif',
            top: '35%',
            width: '20%'
        });
        
        body.add(wp);
        //body.add(actindImage);
        //wp.play();

        //Pause video player when other tabs are selected
        Ti.App.addEventListener('video_pause', function() {
            wp.pause();
        });


        //When application is put on pause do this  Application closed//
        Ti.App.addEventListener('pause', function() {
            wp.pause();
            //btvPlayer.close();
            //clearInterval(timer);
        });

        //When application resumes.
        Ti.App.addEventListener('resume', function() {
            wp.play();
            btvPlayerLoad(channel);
        });

        //Remove player when changing channels
        Ti.App.addEventListener('remove', function() {
            body.remove(wp);
        });

    }






    btvPlayerLoad(channel);




    //////////////PLAYER END/////////////
    
/////////FullScreen PLAYER START///////
/*
function fullscreenPlayer(channel){
	Titanium.UI.setBackgroundColor('#000');
	var fullplayerWin = Titanium.UI.createWindow({
    backgroundColor : '#fff',
    exitOnClose : true,
    orientationModes: {
    	
    }
});
	
		var streamHeader = "http://www.biggytv.com:1935/live/";
        //var streamHeader = "rtmp://54.80.36.248:1935/live/";
        var streamSuffix = "/playlist.m3u8";
       // var streamSuffix = ".mp4";
        //var contentURL = streamHeader + channel;
        var contentURL = streamHeader + channel + streamSuffix;
       // Ti.API.info(contentURL);
       
         var fullScreenwp = Titanium.Media.createVideoPlayer({
            top: 2,
            height: Ti.UI.SIZE,
            width: Ti.UI.Fill,
            url: contentURL,
            backgroundColor: '#000000',
            barColor: '#A7D6FF',
    		mediaControlStyle : Titanium.Media.VIDEO_CONTROL_NONE,
    		scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
              fullscreen: true,
            	  volume: 0.3,
            	autoplay: true,
        });  
        
        fullScreenwp.orientationModes = [
            Ti.UI.LANDSCAPE_RIGHT,
            Ti.UI.LANDSCAPE_LEFT
        ];

  	
    var closeButton = Ti.UI.createButton({
        image: "/images/exit-button-125.png",
        top : "1%",
        right : "10%",
 		backgroundColor:"transparent",
    });
	
	   closeButton.addEventListener('click', function() {
        fullScreenwp.hide();
        fullScreenwp.release();
        fullScreenwp = null;
        btvPlayer.orientation = "PORTRAIT";
        wp.play();
    });
	
	fullScreenwp.add(closeButton);
	
}


///////FullScreen PLAYER END /////
fullopenButton.addEventListener('click', function() {
		fullscreenPlayer(channel);
    });

*/




    
    
    
    /////////////SHOW INFO START///////
    function refreshView(channel) {
 
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET",
            "http://cms.biggytv.com/mobile_resources/btvnowPlaying_web.php?cid=" +
            channel);
        xhr.setTimeout(5000);
        xhr.send();
        xhr.onload = function() {
            var programInfo = JSON.parse(this.responseText);
//            Ti.API.info(programInfo.description);
            Ti.API.info(programInfo.copyright);
            Ti.API.info(programInfo.title);
//            Ti.API.info(programInfo.twitter);                                    
//            Ti.API.info(programInfo.facebook);
//            Ti.API.info(programInfo.program);
//            Ti.API.info(titleText.text);
            
// Google Event
/*		tracker.addEvent({
			category: "10SecPlay",
			action: titleText.text,
			label: programInfo.program,
			value: 1
					});
*/

//Infosection
	

            var titleLabel = Ti.UI.createLabel({
                text: programInfo.title,
        		color: '#ffffff',
        		top: '0dp',
        		width: Ti.UI.FILL,
        		wordWrap: true,
        		font: {
          		  fontFamily: 'MontserratBold',
          		  fontWeight: 'bold',
         		   fontsize: '7dp'
      		  }
   		 });


            
            var copyrightLabel = Ti.UI.createLabel({
                text: 'Presented by: ' +programInfo.copyright,
        		color: '#ffffff',
        		//top: '48dp',
        		//height: '20dp',
        		//width: Ti.UI.FILL,
        		//height: Ti.UI.SIZE,
        		//wordWrap: true,
                font: {
                    fontFamily: 'MontserratRegular',
                    fontWeight: 'bold',
         		   fontsize: '10dp'


                }
            });



	info.add(titleLabel);
	info.add(copyrightLabel);

	};
	


	}


    ///////////////Add Showinfo End/////////////////////
    //perform initial table refresh
    refreshView(channel);
    //check every 2 seconds for updates
    var timer = setInterval(function() {
        refreshView(channel);
    }, 15000);

var thumbDir="https://dnbl0is1p0z28.cloudfront.net/mobilethumbs/";
    ////////BTV Channels
    function channelLoad() {
        var channelList = Titanium.Network.createHTTPClient();
        channelList.open("GET",
            "https://www.biggytv.com/btvChannels/showinfo/btvChannelsjsonmobile.php"
        );
        channelList.setTimeout(5000);
        channelList.send();
        channelList.onload = function() {
            var channelJSON = JSON.parse(this.responseText);
            Ti.API.info(channelJSON[i]);

            var channeldataArray = [];
            for (var i = 0; i < channelJSON.length; i++) {
            	var program = channelJSON[i].program;
                var channelnumber = channelJSON[i].channel_number;
                var channeltitle = channelJSON[i].channel_title;
                var appcategory = channelJSON[i].appCategory;
                var rating = channelJSON[i].dart_rating;
                var xml_playlist = channelJSON[i].xml_playlist;
                var parenttitle = channelJSON[i].parent_title;
                //var current = channelJSON[i].current;
                var channelColor = channelJSON[i].channel_color;
                var channelThumb = channelJSON[i].thumbnail_2;
                var programTitle = channelJSON[i].program_title;
                //Ti.API.info("Channel Number: " + channel);
                //            Ti.API.info(parenttitle);
                /////////Channel Number View
                var channelRow = Ti.UI.createTableViewRow({
                	
                	//height: Ti.UI.FILL,
                    //width: Ti.UI.SIZE,
                    //image: channelThumb,
                    number: channelnumber,
                    channel: channeltitle,
                    playlist: xml_playlist,
                    category: appcategory,
                    nowplaying: programTitle,
                    backgroundColor: '#000000',
                    backgroundSelectedColor: '#efefef',
                    selectedColor: '#000000',
                    




                });


                var channelView = Ti.UI.createView({
                    backgroundColor: 'transparent',
                    width: '70%',
                    layout: 'vertical'


                });
                


				var channelImage = Ti.UI.createImageView({
					image: thumbDir+channelThumb,
					//width: Ti.UI.FILL,
					height: '70%'

					});
				
                var channelLabel = Ti.UI.createLabel({

                    text: channelnumber + "-" + appcategory +
                        "/" + channeltitle + " " +
                        ": " + rating,
                    color: '#ffffff',
                    top: '1%',
                    //left: '3%',
                    font: {
                        fontFamily: 'MontserratRegular',
                        fontWeight: 'bold',
                        fontSize: '10dp'
                    },
                    allowsSelection: 'true',
                    touchEnabled: 'false'
                });
                
                var channelOnnow = Ti.UI.createLabel({
                	text: programTitle,
                	color: '#ffffff',
                    wordWrap: true,
                    top: '1%',
                    //left: '3%',
                    font: {
                        fontFamily: 'MontserratRegular',
                        fontWeight: 'bold',
                        fontSize: '15dp'
                    },
                    allowsSelection: 'true',
                    touchEnabled: 'false'
                		
                });
                	
                	

				channelView.add(channelImage);
				channelView.add(channelLabel);
				channelView.add(channelOnnow);


                channelRow.add(channelView);

                channeldataArray.push(channelRow);

            }
            //Ti.API.info(channeldataArray);
            channelTable.setData(channeldataArray);
        };
        var channelTable = Ti.UI.createTableView({
            backgroundColor: 'transparent',
            separatorColor: '#969090',
            //layout: 'horizontal',
            borderColor: '#969090',
            borderRadius: 3,
            borderWidth: 2,
            minRowHeight: '20dp',
            allowsSelection: 'true'
        });

        channelTable.addEventListener('click', function(e) {
            var channelheader = [];
            channelheader = e.rowData.number + "-" + e.rowData.category +
                "/" + e.rowData.channel;

            //Ti.API.info(e.rowData.number + "-" + e.rowData.category + "/" + e.rowData.parent + ":" + e.rowData.channeltitle);
            //Ti.API.info(e.rowData.playlist);
            Ti.App.fireEvent('remove', {});
            channel = e.rowData.playlist;
            refreshView(channel);
            btvPlayerLoad(e.rowData.playlist);
            Ti.API.info(channel);///01-11 Start Here Program Info not changing on channel selection
            titleText.text = channelheader;

// TODO Add event here for channel selections

					//Ti.API.info(channelheader);
	//	        tracker.addScreenView(channelheader);
		        


        });



        channels.add(channelTable);
    }

    //perform initial table refresh
    channelLoad();
    //check every 120 seconds for updates / Removed until V2.2
    var channelTimer = setInterval(function() {
        channelLoad();
    }, 3600000);
    ////////////CHANNEL LOAD END/////////
    btvPlayer.add(header);
    btvPlayer.add(body);
    btvPlayer.add(info);
    btvPlayer.add(channels);
   
 
   

   
///Orientation landscape to full screen

/*	Ti.App.addEventListener('orient', function(evt) {
		if(evt.protrait===true) {
    ///////////Load in layout
   btvPlayer.add(header);
   btvPlayer.add(body);
   btvPlayer.add(info);
  btvPlayer.add(channels);
   //btvPlayer.add(adspace);
  } else {
  	btvPlayer.add(body);
  	wp.fullscreen = true;
  	}
  	
		
	});  

*/

    return btvPlayer;
}
module.exports = btvPlayerhome;