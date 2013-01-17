#import "accessReaderPlugin.h"
#import <Cordova/CDVViewController.h>



@implementation accessReaderPlugin



- (void) accessReader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    //NSString* url = (NSString*)[arguments objectAtIndex:1];
    NSString* content = [options valueForKey:@"content"];

    
    NSString *phrase = nil;     
    
    //NSLog(@"PHILDEBUG content: %@", content);
    
    
    NSString *mypdf = [[NSBundle mainBundle] pathForResource:content ofType:@"pdf" inDirectory:nil];
    ReaderDocument *document = [ReaderDocument withDocumentFilePath:mypdf password:phrase];

    if (document != nil) // Must have a valid ReaderDocument object in order to proceed with things
    {

       ReaderViewController *readerViewController = [[ReaderViewController alloc] initWithReaderDocument:document];
       readerViewController.delegate = self; // Set the ReaderViewController delegate to self
       readerViewController.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
       readerViewController.modalPresentationStyle = UIModalPresentationFullScreen;
       [self.viewController presentModalViewController:readerViewController animated:YES];
    }
    
}

- (void) logReader:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	NSLog(@"PHILDEBUG-logReaderPlugin.accessLog");
}


-(void)dismissReaderViewController:(ReaderViewController *)viewController{
    //NSLog(@"The delegate to dismiss pdf reader was called");
    [self.viewController dismissModalViewControllerAnimated:YES];}

@end
