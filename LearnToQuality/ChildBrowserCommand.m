//
//  Created by Jesse MacFadyen on 10-05-29.
//  Copyright 2010 Nitobi. All rights reserved.
//  Copyright (c) 2011, IBM Corporation
//  Copyright 2011, Randy McMillan
//  Copyright 2012, Andrew Lunny, Adobe Systems
//

#import "ChildBrowserCommand.h"
#import <Cordova/CDVViewController.h>

@implementation ChildBrowserCommand

@synthesize callbackId, childBrowser, CLOSE_EVENT, LOCATION_CHANGE_EVENT, OPEN_EXTERNAL_EVENT;

@synthesize reader;

- (id) initWithWebView:(UIWebView*)theWebView
{
    self = [super initWithWebView:theWebView];

    CLOSE_EVENT = [NSNumber numberWithInt:0];
    LOCATION_CHANGE_EVENT = [NSNumber numberWithInt:1];
    OPEN_EXTERNAL_EVENT = [NSNumber numberWithInt:2];

    return self;
}

/*
- (void) showWebPage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options // args: url
{	
    self.callbackId = [arguments objectAtIndex:0];
	
    if (self.childBrowser == nil) {
#if __has_feature(objc_arc)
        self.childBrowser = [[ChildBrowserViewController alloc] initWithScale:NO];
#else
        self.childBrowser = [[[ChildBrowserViewController alloc] initWithScale:NO] autorelease];
#endif
        self.childBrowser.delegate = self;
        self.childBrowser.orientationDelegate = self.viewController;
    }

    NSLog(@"showLocationBar %d",(int)[[options objectForKey:@"showLocationBar"] boolValue]);

    [self.viewController presentModalViewController:childBrowser animated:YES];
        
    // objectAtIndex 0 is the callback id
    NSString *url = (NSString*) [arguments objectAtIndex:1];
    
    [self.childBrowser resetControls];
    [self.childBrowser loadURL:url];
    if([options objectForKey:@"showAddress"]!=nil)
        [childBrowser showAddress:[[options objectForKey:@"showAddress"] boolValue]];
    if([options objectForKey:@"showLocationBar"]!=nil)
        [childBrowser showLocationBar:[[options objectForKey:@"showLocationBar"] boolValue]];
    if([options objectForKey:@"showNavigationBar"]!=nil)
        [childBrowser showNavigationBar:[[options objectForKey:@"showNavigationBar"] boolValue]];
}*/

- (void)showWebPage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    
    NSString* url = (NSString*)[arguments objectAtIndex:1];
    //if([url hasSuffix:@".pdf"])
    //{
        NSString *phrase = nil; // Document password (for unlocking most encrypted PDF files)
        //ReaderDocument *document = [ReaderDocument withDocumentFilePath:url password:phrase];
        
    
        NSLog(@"PHILDEBUG TEST");
        NSLog(@"PHILDEBUG url: %@", url);
    
        //UIAlertView* alert;
        //alert = [[UIAlertView alloc] initWithTitle:@"Info" message:@"Much more info" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles: nil];
        //[alert show];
        //[alert release];
    
    
    
    
    
    
    
        
        NSString *mypdf = [[NSBundle mainBundle] pathForResource:url ofType:@"pdf" inDirectory:nil];
        
                
        
        
       // NSString *filePath = [pdfs lastObject];
       // assert(filePath != nil); // Path to last PDF file
        
        //NSLog(@"PHILDEBUG:%@",filePath);
        
        
        NSLog(@"PHILDEBUG mypdf: %@", mypdf);

        ReaderDocument *document = [ReaderDocument withDocumentFilePath:mypdf password:phrase];
        NSLog(@"PHILDEBUG ok1");
        
        
        if (document != nil) // Must have a valid ReaderDocument object in order to proceed with things
        {
            NSLog(@"PHILDEBUG ok1.5");
            ReaderViewController *readerViewController = [[ReaderViewController alloc] initWithReaderDocument:document];
            NSLog(@"PHILDEBUG ok2");
            readerViewController.delegate = self; // Set the ReaderViewController delegate to self
            NSLog(@"PHILDEBUG ok2");
            readerViewController.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
            NSLog(@"PHILDEBUG ok3");
            readerViewController.modalPresentationStyle = UIModalPresentationFullScreen;
            NSLog(@"PHILDEBUG ok4");
            [self.viewController presentModalViewController:readerViewController animated:YES];
        }
    //}
    //else
    /*{
        if (self.childBrowser == nil) {
#if __has_feature(objc_arc)
            self.childBrowser = [[ChildBrowserViewController alloc] initWithScale:NO];
#else
            self.childBrowser = [[[ChildBrowserViewController alloc] initWithScale:NO] autorelease];
#endif
            self.childBrowser.delegate = self;
            self.childBrowser.orientationDelegate = self.viewController;
        }
        
        NSLog(@"showLocationBar %d",(int)[[options objectForKey:@"showLocationBar"] boolValue]);
        
        [self.viewController presentModalViewController:childBrowser animated:YES];
        
        // objectAtIndex 0 is the callback id
        //NSString *url = (NSString*) [arguments objectAtIndex:1];
        
        [self.childBrowser resetControls];
        [self.childBrowser loadURL:url];
        if([options objectForKey:@"showAddress"]!=nil)
            [childBrowser showAddress:[[options objectForKey:@"showAddress"] boolValue]];
        if([options objectForKey:@"showLocationBar"]!=nil)
            [childBrowser showLocationBar:[[options objectForKey:@"showLocationBar"] boolValue]];
        if([options objectForKey:@"showNavigationBar"]!=nil)
            [childBrowser showNavigationBar:[[options objectForKey:@"showNavigationBar"] boolValue]];
    }*/
}

-(void)dismissReaderViewController:(ReaderViewController *)viewController{
    NSLog(@"The delegate to dismiss pdf reader was called");
    [self.viewController dismissModalViewControllerAnimated:YES];}


-(void) close:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options // args: url
{
    [self.childBrowser closeBrowser];
	
}

-(void) onClose
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                      messageAsDictionary:[self dictionaryForEvent:CLOSE_EVENT]];
    [result setKeepCallbackAsBool:YES];

    [self writeJavascript: [result toSuccessCallbackString:self.callbackId]];
}

-(void) onOpenInSafari
{
	CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                      messageAsDictionary:[self dictionaryForEvent:OPEN_EXTERNAL_EVENT]];
    [result setKeepCallbackAsBool:YES];

    [self writeJavascript: [result toSuccessCallbackString:self.callbackId]];
}


-(void) onChildLocationChange:(NSString*)newLoc
{
	NSString* tempLoc = [NSString stringWithFormat:@"%@",newLoc];
	NSString* encUrl = [tempLoc stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];

    NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithDictionary:[self dictionaryForEvent:LOCATION_CHANGE_EVENT]];

    [dict setObject:encUrl forKey:@"location"];

    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                      messageAsDictionary:dict];
    [result setKeepCallbackAsBool:YES];

    [self writeJavascript: [result toSuccessCallbackString:self.callbackId]];
}

-(NSDictionary*) dictionaryForEvent:(NSNumber*) event
{
    return [NSDictionary dictionaryWithObject:event forKey:@"type"];
}

#if !__has_feature(objc_arc)
- (void)dealloc
{
    self.childBrowser = nil;

    [super dealloc];
}
#endif

@end
