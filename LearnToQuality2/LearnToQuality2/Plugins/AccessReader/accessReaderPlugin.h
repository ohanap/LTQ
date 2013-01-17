#import <Foundation/Foundation.h>
#ifdef CORDOVA_FRAMEWORK
#import <Cordova/CDVPlugin.h>
#else
#import <Cordova/CDVPlugin.h>
#endif

#import "ReaderDemoController.h"
#import "ReaderViewController.h"



@interface accessReaderPlugin : CDVPlugin <ReaderViewControllerDelegate> {
    


}

@property (nonatomic, strong) ReaderDemoController *reader;


- (void) accessReader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) logReader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;


@end
