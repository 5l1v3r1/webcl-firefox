/*
 * This file is part of WebCL – Web Computing Language.
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 *
 * The Original Contributor of this Source Code Form is
 * Nokia Research Center Tampere (http://webcl.nokiaresearch.com).
 *
 */


try {

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

var Exception = Components.Exception;


Cu.import ("resource://gre/modules/Services.jsm");
Cu.import ("resource://gre/modules/XPCOMUtils.jsm");
Cu.import ("resource://nrcwebcl/modules/logger.jsm");
Cu.import ("resource://nrcwebcl/modules/webclutils.jsm");
Cu.import ("resource://nrcwebcl/modules/base.jsm");

var CLASSNAME =  "WebCLEvent";
var CID =        "{cf7372e6-f2ec-467d-99dc-9eeb756bc3e3}";
var CONTRACTID = "@webcl.nokiaresearch.com/IWebCLEvent;1";


function Event ()
{
  if (!this instanceof Event) return new Event ();

  Base.apply(this);

  this.wrappedJSObject = this;

  this._interfaces = [ Ci.IWebCLEvent,
                       Ci.nsISecurityCheckedComponent,
                       Ci.nsISupportsWeakReference,
                       Ci.nsIClassInfo,
                       Ci.nsISupports
                     ];
}


Event.prototype = Object.create (Base.prototype);


Event.prototype.classDescription = CLASSNAME;
Event.prototype.classID =          Components.ID(CID);
Event.prototype.contractID =       CONTRACTID;
Event.prototype.QueryInterface =   XPCOMUtils.generateQI ([ Ci.IWebCLEvent,
                                                            Ci.nsISecurityCheckedComponent,
                                                            Ci.nsISupportsWeakReference,
                                                            Ci.nsIClassInfo
                                                          ]);


//------------------------------------------------------------------------------
// IWebCLEvent

Event.prototype.getInfo = function (name)
{
  TRACE (this, "getInfo", arguments);

  if (!this._owner) throw new Exception ();

  return this._wrapInternal (this._internal.getInfo (name));
};


Event.prototype.getProfilingInfo = function (name)
{
  TRACE (this, "getProfilingInfo", arguments);

  if (!this._owner) throw new Exception ();

  return this._wrapInternal (this._internal.getProfilingInfo (name));
};


Event.prototype.setCallback = function ()
{
  throw new Exception ("NOT IMPLEMENTED");
};


Event.prototype.release = function ()
{
  TRACE (this, "release", arguments);

  this._unregister ();

  this._internal.release ();
  this._internal = null;
};



//==============================================================================


function UserEvent ()
{
  if (!this instanceof UserEvent) return new UserEvent ();

  Event.apply(this);

  this.wrappedJSObject = this;

  this._interfaces = [ Ci.IWebCLUserEvent,
                       Ci.IWebCLEvent,
                       Ci.nsISecurityCheckedComponent,
                       Ci.nsISupportsWeakReference,
                       Ci.nsIClassInfo,
                       Ci.nsISupports
                     ];
}


UserEvent.prototype = Object.create (Event.prototype);


UserEvent.prototype.classDescription = "WebCLUserEvent";
UserEvent.prototype.classID =          Components.ID("{f353b7e7-03af-41f2-a260-5cbcdaec8ae9}");
UserEvent.prototype.contractID =       "@webcl.nokiaresearch.com/IWebCLUserEvent;1";
UserEvent.prototype.QueryInterface =   XPCOMUtils.generateQI ([ Ci.IWebCLUserEvent,
                                                                Ci.IWebCLEvent,
                                                                Ci.nsISecurityCheckedComponent,
                                                                Ci.nsISupportsWeakReference,
                                                                Ci.nsIClassInfo
                                                              ]);


//------------------------------------------------------------------------------
// IWebCLUserEvent

UserEvent.prototype.setUserEventStatus = function (executionStatus)
{
  TRACE (this, "setUserEventStatus", arguments);

  if (!this._owner) throw new Exception ();

  this._internal.setUserEventStatus (executionStatus);
};



//------------------------------------------------------------------------------
// Internal functions


var NSGetFactory = XPCOMUtils.generateNSGetFactory ([Event, UserEvent]);


} catch(e) { Components.utils.reportError ("event.js: "+EXCEPTIONSTR(e)); }
