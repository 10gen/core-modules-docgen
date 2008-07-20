// try: java -jar ../../jsrun.jar runner.js

/**
*      Copyright (C) 2008 10gen Inc.
*  
*    Licensed under the Apache License, Version 2.0 (the "License");
*    you may not use this file except in compliance with the License.
*    You may obtain a copy of the License at
*  
*       http://www.apache.org/licenses/LICENSE-2.0
*  
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BASIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/

load("TestDoc.js");

TestDoc.prove("../frame/Opt.js");
TestDoc.prove("../lib/JSDOC.js");
TestDoc.prove("../frame/String.js");
TestDoc.prove("../lib/JSDOC/DocTag.js");
TestDoc.prove("../lib/JSDOC/DocComment.js");
TestDoc.prove("../lib/JSDOC/TokenReader.js");
TestDoc.prove("../lib/JSDOC/Symbol.js");

TestDoc.report();
