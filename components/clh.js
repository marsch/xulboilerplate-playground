/**
 * LICENSE
 * =======
 * Because License is not clear today, this code is not available
 * under any license.
 *
 * Copyright (C) Sourcegarden GmbH, 2006-2011
 * Mail: info@sourcegarden.com
 *
 * @author Mario Scheliga <mario@sourcegarden.com>
 */

// jslint.com configuration options. See: http://www.jslint.com/lint.html
/*jslint
adsafe: false,bitwise: true,browser: false,cap: false,confusion: true,continue: true,debug: true,devel: true,eqeq: false,es5: false,evil: false,forin: false,fragment: false,indent: 2,maxerr: 50,maxlen: 80,newcap: true,node: false,nomen:true,on: false,passfail: false,plusplus: true,rhino: false,safe: false,sloppy: false,sub: false,undef: true,unparam: false,vars: false,white: false,widget: false, windows: false,*/
/*global
*/
var CC = Components.classes,
  CI = Components.interfaces,
  // class_id is just a generated uuid (version 4)
  CLASS_ID = Components.ID('b25b3417-5573-45f5-a917-e236d586ecdf'),
  appHandler;

Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');


function jsdump(str) {
  Components.classes['@mozilla.org/consoleservice;1']
      .getService(Components.interfaces.nsIConsoleService)
      .logStringMessage(str);
}

appHandler = function () {};
appHandler.prototype = {
  classID: CLASS_ID,
  QueryInterface: function clh_QI(aIID) {
    'use strict';

    if (aIID.equals(CI.nsICommandLineHandler) ||
        aIID.equals(CI.nsIFactory) ||
        aIID.equals(CI.nsISupports) ||
        aIID.equals(CI.nsIObserver)) {
      return this;
    }
    throw Components.results.NS_ERROR_NO_INTERFACE;
  },
  handle: function clh_handle(aCmdLine) {
    'use strict';

    jsdump('handle');

    var observerService = CC['@mozilla.org/observer-service;1']
      .getService(CI.nsIObserverService);

    // fire event with specific topic
    observerService.notifyObservers(aCmdLine,
      'commandline-args-changed', null);
  },
  helpInfo: '   -test <value>         A test attribute\n',

  createInstance: function mdh_CI(aOuter, aIID) {
    'use strict';
    if (aOuter !== null) {
      throw Components.results.NS_ERROR_NO_AGGREGATION;
    }
    return this.QueryInterface(aIID);
  
  },
  lockFactory: function mdh_lock(aLock) {
    // no operation here
  }
};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([appHandler]);
