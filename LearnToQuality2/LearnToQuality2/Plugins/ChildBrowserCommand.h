//
//  PhoneGap ! ChildBrowserCommand
//
//
//  Created by Jesse MacFadyen on 10-05-29.
//  Copyright 2010 Nitobi. All rights reserved.
//

#import <Cordova/CDVPlugin.h>
#import "ChildBrowserViewController.h"

#import "ReaderDemoController.h"
#import "ReaderViewController.h"

@interface ChildBrowserCommand : CDVPlugin <ChildBrowserDelegate, ReaderViewControllerDelegate>  { }

@property (nonatomic, strong) ChildBrowserViewController *childBrowser;
@property (nonatomic, strong) ReaderDemoController *reader;

@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) NSNumber *CLOSE_EVENT;
@property (nonatomic, strong) NSNumber *LOCATION_CHANGE_EVENT;
@property (nonatomic, strong) NSNumber *OPEN_EXTERNAL_EVENT;


-(void) showWebPage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
-(void) onChildLocationChange:(NSString*)newLoc;

-(NSDictionary*) dictionaryForEvent:(NSNumber*)event;

@end