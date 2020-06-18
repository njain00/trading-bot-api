import Server from './config/server.js';
import diConfig from './config/diConfig.js'

var awilixDI = new diConfig();
var container = awilixDI.InitializeDI();

var server = new Server(container);
server.startup();