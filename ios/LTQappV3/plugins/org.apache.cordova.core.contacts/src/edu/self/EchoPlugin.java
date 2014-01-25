package edu.self;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import android.content.Intent;

public class EchoPlugin extends CordovaPlugin {

	private CallbackContext callbackContext;
	public EchoPlugin(){
		System.out.println("create");
	}
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("echo")) {
            String message = args.getString(0);
            this.callbackContext = callbackContext;
            this.echo(message, callbackContext);
            return true;
        }
		return false;
	}
	
    private void echo(String message, CallbackContext callbackContext) {
    	if(this.cordova != null){
    		Intent intent = new Intent("com.google.zxing.client.android.SCAN");
    		System.out.println("111");
    		this.cordova.startActivityForResult((CordovaPlugin) this, intent, 0x0000c0de);
    	}
    }

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		System.out.println(requestCode + " || " + resultCode);
		IntentResult intentResult = IntentIntegrator.parseActivityResult(requestCode, resultCode, intent);
		System.out.println(intentResult.getContents());	
		callbackContext.success(intentResult.getContents());
	}
	

}
