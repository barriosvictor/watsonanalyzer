/**
 * Copyright 2014-2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
    tradeoffAnalyticsConfig = require('./tradeoff-analytics-config');

var app = express();
var path    = require("path");
app.use('/:data',express.static(__dirname + '/' + 'iot'));

app.get('/:data',function(req,res){
	console.log(app.mountpath);
	app.locals.test='iot';
});

// For local development, copy your service instance credentials here, otherwise you may ommit this parameter
var serviceCredentials = {
   "url": "https://gateway.watsonplatform.net/tradeoff-analytics/api",
    "password": "7Ogr13BHCeqi",
    "username": "219d8c22-ad15-49f6-871a-59c7362f0d34"
}
// When running on Bluemix, serviceCredentials will be overriden by the credentials obtained from VCAP_SERVICES
tradeoffAnalyticsConfig.setupToken(app, serviceCredentials); 

// to communicate with the service using a proxy rather then a token, add a dependency on "body-parser": "^1.15.0" 
// to package.json, and use:
// tradeoffAnalyticsConfig.setupProxy(app, serviceCredentials);

var port = process.env.VCAP_APP_PORT || 2000;
app.listen(port);
console.log('listening at:', port);
