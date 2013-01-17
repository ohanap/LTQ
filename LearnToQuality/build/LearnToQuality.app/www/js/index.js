var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) {
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

var plugin = {
    login: function(emailLoggedIn) {
        var appId = "427184117333764";
        window.plugins.facebookConnect.login({permissions: ["email", "user_about_me"], appId: appId}, function(result) {
                                             
            if(result.cancelled || result.error) {
               document.body.className = 'not_connected'; 
               return;
            } else {
               document.body.className = 'connected'; 
               console.log("result.email:"+result.email);  
                emailLoggedIn.value = result.email;                              
               return;
            }
                                 
            console.log("FacebookConnect.login:" + JSON.stringify(result));
                                             //alert(JSON.stringify(result);                                 
        });
    },
    requestWithGraphPath: function() {
        window.plugins.facebookConnect.requestWithGraphPath("/me/friends", function(result) {
            console.log("FacebookConnect.requestWithGraphPath:" + JSON.stringify(result));
        });
    },
    dialog : function() {
        var dialogOptions = {
            link: 'https://developers.facebook.com/docs/reference/dialogs/',
            picture: 'http://fbrell.com/f8.jpg',
            name: 'Facebook Dialogs',
            caption: 'Reference Documentation',
            description: 'Using Dialogs to interact with users.'
        };

        window.plugins.facebookConnect.dialog('feed', dialogOptions, function(response) {
            console.log("FacebookConnect.dialog:" + JSON.stringify(response));
        });
    },
    logout : function() {
        window.plugins.facebookConnect.logout(function(result) {
            console.log("FacebookConnect.logout:" + JSON.stringify(result));
            document.body.className = 'not_connected';
            console.log("result.email:"+result.email);
                                              
        });
    },
    testPhil : function() {
        console.log("beg of testPhil");
        window.plugins.FBLoginView.init(function(result) {
                                              console.log("FBLoginView.init:" + JSON.stringify(result));
                                              });
        console.log("end of testPhil");
    }
    
    
};
