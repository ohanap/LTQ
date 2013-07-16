function accessReaderPlugin() {}

accessReaderPlugin.prototype.accessReader = function(content) {
	var options = {content:content};
   // alert("call access reader 1");
	
    var exec = cordova.require('cordova/exec');
    exec.setJsToNativeBridgeMode(exec.jsToNativeModes.IFRAME_NAV);
    

    exec("accessReaderPlugin.accessReader",options);
    //alert("call access reader 2");

};

accessReaderPlugin.prototype.logReader = function(content) {
	var options = {content:content};
    //alert("fff");
    //var exec = cordova.require('cordova/exec');
    //cordova.exec.setJsToNativeBridgeMode(exec.jsToNativeModes.IFRAME_NAV);
    //alert("yoyo1");
    
    var exec = cordova.require('cordova/exec');
    exec.setJsToNativeBridgeMode(exec.jsToNativeModes.IFRAME_NAV);
    
    
	//cordova.exec("accessReaderPlugin.logReader",options);
    exec("accessReaderPlugin.logReader",options);
    //alert("yoyo2");
};

cordova.addConstructor(function() {
  if(!window.plugins) window.plugins = {};
  window.plugins.accessReaderPlugin = new accessReaderPlugin();
});
