// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview Moodle mobile file system lib.
 * @author <a href="mailto:jleyva@cvaconsulting.com">Juan Leyva</a>
 * @version 1.2
 */


/**
 * @namespace Holds all the MoodleMobile file system functionality.
 */
MM.fs = {

    basePath: '',

    init: function(callBack) {
        MM.log('Loading File System', 'FS');

        // This means that or Cordova or the emulator are not yet loaded, so we must delay this.
        if (typeof(LocalFileSystem) == "undefined") {
            MM.errorLog("LocalFileSystem not defined yet", "FS");
            setTimeout(function() {
                MM.fs.init(callBack);
            }, 5000);
            return;
        }

        if (!callBack) {
            callBack = function() {};
        }

        if (MM.fs.loaded()) {
            // The file system is not yet loaded.
            MM.log('The file system was previously loaded', 'FS');
            callBack();
            return;
        }

        if (MM.getOS() == 'android') {
            MM.fs.basePath = 'Android/data/com.moodle.moodlemobile';
        }
        MM.fs.loadFS(callBack);
    },

    loaded: function() {
        return typeof(MM.fs.fileSystemRoot) != 'undefined';
    },

    getRoot: function() {
        if (!MM.fs.fileSystemRoot) {
            MM.fs.loadFS(function() {
                MM.fs.fileSystemRoot.fullPath
            });
        } else {
            var path = MM.fs.fileSystemRoot.fullPath;
            // Android 4.2 and onwards
            path = path.replace("storage/emulated/0", "sdcard");
            return path;
        }
    },

    loadFS: function(callBack) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                MM.fs.fileSystemRoot = fileSystem.root;
                if (MM.getOS() == 'android') {
                    MM.fs.fileSystemRoot.getDirectory(
                        MM.fs.basePath, {create: true, exclusive: false},
                        function(entry) {
                            MM.fs.fileSystemRoot = entry;
                            callBack();
                        },
                        function() {
                            MM.popErrorMessage(
                                'Critical error accessing file system, Android/data/app_id does not exists or can be created'
                            );
                        }
                    );
                } else {
                    callBack();
                }
            }, function() {
                MM.popErrorMessage('Critical error accessing file system');
            }
       );
    },

    fileExists: function(path, successCallback, errorCallback) {
        var directory = path.substring(0, filename.lastIndexOf('/') - 1);
        var filename = path.substr(filename.lastIndexOf('/') + 1);
        MM.fs.fileSystemRoot.getDirectory(
            directory,
            { create: false },
            function(entry) {
                entry.getFile(
                    filename, { create: false },
                    function(entryFile) {
                        successCallback(entryFile.fullPath);
                    },
                    errorCallback
                );
            },
            errorCallback
        );
    },

    createDir: function(path, successCallback, dirEntry) {
        path = path.replace('file:///', '');
        MM.log('FS: Creating full directory ' + path);

        var paths = path.split('/');

        var baseRoot = MM.fs.fileSystemRoot;
        if (dirEntry) {
            baseRoot = dirEntry;
        }

        MM.log('FS: Creating directory ' + paths[0] + 'in' + baseRoot.fullPath);
        baseRoot.getDirectory(
            paths[0],
            {create: true, exclusive: false},
            function(newDirEntry) {
                if (paths.length == 1) {
                    successCallback(newDirEntry);
                    return;
                }
                // Recursively, create next directories
                paths.shift();
                MM.fs.createDir(paths.join('/'), successCallback, newDirEntry);
            },
            function() {
                MM.popErrorMessage('Critical error accessing file system');
            }
        );
    },

    /**
     * Remove recursively a directory
     * @param  {string} path            The relative path of the directory
     * @param  {object} successCallback Success callback function
     * @param  {object} errorCallback   Error callback function
     */
    removeDirectory: function(path, successCallback, errorCallback) {
        MM.log('FS: Removing full directory ' + path);

        var baseRoot = MM.fs.fileSystemRoot;
        baseRoot.getDirectory(
            path,
            {create: false, exclusive: false},
            function(dirEntry) {
                dirEntry.removeRecursively(successCallback, errorCallback);
            },
            errorCallback
        );
    },

    /**
     * Recursive and asynchronous function for calculating the size of a directory.
     * We use several controls global vars in order to know when the algorithm has finished.
     *
     * @param  {string} path                Relative path to the directory
     * @param  {[type]} successCallback     Success Callback
     * @param  {[type]} errorCallback       Error Callback
     */
    directorySize: function(path, successCallback, errorCallback) {
        var baseRoot = MM.fs.fileSystemRoot;
        var fileCounter = 1;    // Are files sizes pending to be retrieved?
        var totalSize = 0;      // Total size of files.
        var running = 0;        // There are async calls pending?
        var directoryReader;

        MM.log('Calculating directory size: ' + path , 'FS');
        var sizeHelper = function(entry) {
            if (entry.isDirectory) {
                fileCounter--;
                running++;
                directoryReader = entry.createReader();
                directoryReader.readEntries(function(entries) {
                    running--;
                    fileCounter += entries.length;
                    var i;
                    for (i=0; i<entries.length; i++) {
                        sizeHelper(entries[i]);
                    }
                }, errorCallback);
            } else if (entry.isFile) {
                entry.file(
                    function(file) {
                        totalSize += file.size;
                        fileCounter--;
                        if (!fileCounter && !running) {
                            MM.log('Directory size for: ' + path + ' is ' + totalSize + ' bytes', 'FS');
                            successCallback(totalSize);
                        }
                    },
                    function() {
                        fileCounter--;
                        if (!fileCounter && !running) {
                            MM.log('Directory size for: ' + path + ' is ' + totalSize + ' bytes', 'FS');
                            successCallback(totalSize);
                        }
                    });
            } else {
                fileCounter--;
            }
        };

        if (baseRoot) {
            baseRoot.getDirectory(
                path,
                {create: false},
                function(entry) {
                    sizeHelper(entry);
                },
                function() {
                    errorCallback();
                }
            );
        } else {
            errorCallback();
        }
    },

    /**
     * This function attemps to calculate the free space in the disck (or sandbox or whatever)
     * Since there is not Phonegap API, what we do is request a file system instance with a minimum size until we get an error
     * We call this function two times for accurate results.
     *
     * @param  {object} callBack        Success callback
     * @param  {object} errorCallback   Error Callback
     * @return {float}                  The estimated free space in bytes
     */
    calculateFreeSpace: function(callBack, errorCallback) {

        var tooMuch = false;
        var tooLessCounter = 0;
        var iterations = 50;

        calculateByRequest = function(size, ratio, iterations, callBack) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, size,
                function() {

                    tooLessCounter++;

                    if (tooMuch) {
                        callBack(size);
                        return;
                    }
                    // This is to prevent infinite loops.
                    if (tooLessCounter > iterations) {
                        return;
                    }
                    calculateByRequest(size * ratio, ratio, iterations, callBack);
                },
                function() {
                    tooMuch = true;
                    calculateByRequest(size / ratio, ratio, iterations, callBack);
                }
            );
        };

        if (window.requestFileSystem) {
            // General calculation, base 1MB and increasing factor 1.3.
            calculateByRequest(1048576, 1.3, iterations, function(size) {
                tooMuch = false;
                tooLessCounter = 0;
                iterations = 10;
                // More accurate. Factor is 1.1.
                calculateByRequest(size, 1.1, iterations, callBack);
            });
        } else {
            errorCallback();
        }
    }

};