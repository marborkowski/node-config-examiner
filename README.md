# node-config-examiner

If you use the super useful [node-config](http://onet.pl) module, it can be a helpful solution for you.

**node-config-examiner** will show you all the differences between the default (*default.json*) configuration and the one with which you launched your nodejs application with *NODE_ENV* or *NODE_CONFIG_ENV*.

## Installation
NPM approach
```
npm install node-config-examiner --dev
```

YARN approach
```
yarn add node-config-examiner --dev
```

Now open your main script and call the *examinate* method from node-config-examiner module.

```javascript
const examiner = require('node-config-examiner');
examiner.examinate();
```

By default it will output the result with old schoold console.log but if you want, you can simply attache your favorite logger (e.g. winston):

```javascript
const examiner = require('node-config-examiner');
const winston = require('winston');

examiner.examinate(winston.info);
```


![Terminal](https://raw.githubusercontent.com/marborkowski/node-config-examiner/master/public/terminal.png)

## License
May be freely distributed under the [MIT license](https://raw.githubusercontent.com/lorenwest/node-config/master/LICENSE).
