/**
 * @author Kyle Borg
 * 
 */

function fblogin() {
			var fb = require('com.facebook');

			fb.permissions = ['email', 'public_profile', 'user_friends'];
			fb.authorize();
			//fb.initialize()// Permissions your app needs
			fb.addEventListener('login', function(e) {
				if (e.success) {

					var btvMain_iphoneJS = require('/main_windows/btvMain_iphone');
					new btvMain_iphoneJS(userName).open();

				} else if (e.cancelled) {
					alert('Login Cancelled');
					var btvHomeJS = require('/main_windows/btvHome');
					new btvHomeJS().open();

				} else if (e.error) {
					if (Ti.Platform.name === 'iPhone OS') {
						var loginAlert = Ti.UI.createAlertDialog({
							title : 'Login Error'
						});
						if (e.error.indexOf('OTHER:') !== 0) {
							// guaranteed a string suitable for display to user
							loginAlert.message = e.error;
						} else {
							//alert('Please check your network connection and try again.');
							// after "OTHER:" there may be useful error data, not suitable for user display
							loginAlert.message = 'Please check your network connection and try again';
						}
					}

				}
			});
			
			
 ////Populate user DB
////FB Pull of User Info

/*
	fb.addEventListener('login', function(e) {
		fb.requestWithGraphPath('me', {}, 'GET', function(e) {
			if (e.success) {
				fb.requestWithGraphPath('me', {}, 'GET', function(e) {
					if (e.success) {
						var response = JSON.parse(e.result);
						var userName = response.first_name + '_' + response.last_name;
						var userEmail = response.email;
						var userFirst = response.first_name;
						var userLast = response.last_name;
						var userGender = response.gender;
						var fbId = response.fb_Id;
						var userLocale = response.locale;
						//Ti.API.info(response);
						Ti.API.info('FB =' + userName);
						Ti.API.info('FB =' + userEmail);
						Ti.API.info('FB =' + userFirst);
						Ti.API.info('FB =' + userLast);
						Ti.API.info('FB =' + userGender);
						Ti.API.info('FB =' + userLocale);
						/////Send FB User info to WP
						var xhr = Titanium.Network.createHTTPClient();
						xhr.open("Get", "http://www.biggytv.com/mobile/get_nonce/?controller=user&method=register");
						xhr.send();
						xhr.onload = function() {
							var regId = eval('(' + this.responseText + ')');
							Ti.API.info(regId);
							var user_group = 'social_producer';
							var dbPost = Titanium.Network.createHTTPClient();
							dbPost.open("POST", "http://www.biggytv.com/mobile/user/register/");
							var params = {
								username : userName,
								user_login : userName,
								display_name : userName,
								email : userEmail,
								first_name : response.first_name,
								last_name : response.last_name,
								nonce : regId.nonce,
							};
							dbPost.send(params);
							Ti.API.info(dbPost);
							dbPost.onload = function() {
								var regInfo = eval('(' + this.responseText + ')');
								Ti.API.info(regInfo);
								var status = regInfo.status;
								var errorMsg = regInfo.error;
								if (regInfo.status == 'error') {
									var alertDialog = Titanium.UI.createAlertDialog({
										title : 'Alert',
										message : errorMsg,
										buttonNames : ['Okay']
									});
									alertDialog.show();
								}
								if (regInfo.status == 'ok') {
									var user_id = regInfo.user_id;
									var cookie = regInfo.cookie;
									Ti.API.info(user_id);
									Ti.API.info(cookie);
									////Load Local Database
									var db = Titanium.Database.open('user');
									db.execute('INSERT INTO user (userName, userEmail, userFirst, userLast, userGender, userLocale, wpCookie, wpUser_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', userName, userEmail, userFirst, userLast, userGender, userLocale, cookie, user_id);
									db.close();
								};
							};
						};

						//////End Send FB User info to WP
					}
				});
			};
		});
	}); 


	*/		


}
module.exports = fblogin;