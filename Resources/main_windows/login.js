function login() {

    var winLogin = Titanium.UI.createWindow({
        backgroundImage: 'images/btvMain_Default.png',

    });


    winLogin.addEventListener('open', function(evt) {
        tracker.send(
            MapBuilder
            .createAppView()
            .set(Fields.SCREEN_NAME, 'login')
            .build()
        );
    });

    winLogin.orientationModes = [
        Ti.UI.PORTRAIT,
    ];

    var header = Ti.UI.createView({
        backgroundColor: 'transparent',
        height: '15%',
        top: '2%'

    });



    var body = Ti.UI.createView({
        backgroundColor: 'transparent',
        height: '55%',
        top: '20%'

    });


    var footer = Ti.UI.createView({
        backgroundColor: 'transparent',
        height: '20%',
        top: '75%'

    });

    var headerImage = Ti.UI.createImageView({
        image: '/images/btvMain_Logo.png',
        width: '60%',
        top: '15%'

    });


    var headerLabel = Ti.UI.createLabel({
        text: "Login",
        textAlign: 'center',
        top: '80%',
        color: '#02d174',
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: fontsize1
        }

    });

    header.add(headerImage);
    header.add(headerLabel);


    winLogin.add(header);

    var userName = Titanium.UI.createTextField({
        color: '#336699',
        top: '20%',
        left: '5%',
        width: '90%',
        height: '25%',
        hintText: 'User Name',
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: fontsize1
        },

    });
    body.add(userName);


    var password = Titanium.UI.createTextField({
        color: '#336699',
        top: '50%',
        left: '5%',
        width: '90%',
        height: '25%',
        hintText: 'Password',
        passwordMask: true,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        font: {
            fontFamily: 'MontserratBold',
            fontWeight: 'bold',
            fontSize: fontsize1
        },
    });
    body.add(password);


    var loginBtn = Ti.UI.createImageView({
            image: '/appImages/Login_Button.png',
            top: '5%',
            width: '60%'
       });

        var cancelBtn = Ti.UI.createImageView({
            image: '/appImages/Cancel_Button.png',
            top: '70%',
            width: '40%'
       });



    footer.add(loginBtn);
    footer.add(cancelBtn);

    winLogin.add(header);
    winLogin.add(body);
    winLogin.add(footer);

    var createReq = Titanium.Network.createHTTPClient();


    //Onload
    createReq.onload = function() {
        if (this.responseText == "That username does not exists, please register") {
            alert(this.responseText);
        } else {
            var regInfo = eval('(' + this.responseText + ')');

            Ti.API.info(regInfo);

            var status = regInfo.status;
            var errorMsg = regInfo.error;


            if (regInfo.status == 'error') {
                var alertDialog = Titanium.UI.createAlertDialog({
                    title: 'Alert',
                    message: errorMsg,
                    buttonNames: ['Okay']
                });
                alertDialog.show();
            }
            if (regInfo.status == 'ok') {

                Ti.API.info(regInfo.id);
                Ti.API.info(regInfo.cookie);

                var db = Titanium.Database.open('user');
                db.execute('INSERT INTO user (userName,userEmail,wpCookie,wpUser_id,password) VALUES (?, ?, ?, ?, ?)', userName.value, regInfo.email, regInfo.cookie, regInfo.id, password.value);

            	

        		winLogin.close();
        		var btvHomeJS = require('/main_windows/btvHome');
        		new btvHomeJS().open();
            
            }
        }



    };


    loginBtn.addEventListener('click', function(e) {
        if (userName.value != '' && password.value != '') {

            var xhr = Titanium.Network.createHTTPClient();
            xhr.open("Get", "http://www.biggytv.com/mobile/get_nonce/?controller=auth&method=generate_auth_cookie");
            xhr.send();

            xhr.onload = function()

            {

                var regId = eval('(' + this.responseText + ')');

                Ti.API.info(regId);

                var user_group = 'social_producer';
                //createBtn.enabled = false;
                //createBtn.opacity = 0.3;
                createReq.open("POST", "http://www.biggytv.com/mobile/auth/generate_auth_cookie/");
                var params = {
                    username: userName.value,
                    password: password.value,
                    nonce: regId.nonce,
                };
                createReq.send(params);

            };
        }




    });
    cancelBtn.addEventListener('click', function(e) {
        winLogin.close();

    });


    //End Call to DB with Cookie to verify registration



    return winLogin;

};
module.exports = login;