// TODO. not working with DC node version or something
// require('source-map-support').install();

import logLevel from 'loglevel';
import * as logLevelPrefix from 'loglevel-plugin-prefix';

function getCallerLocation() {
  function getErrorObject() {
    try { throw Error(''); } catch (err) { return err; }
  }

  var err = getErrorObject();
  var lines = err.stack.split('\n').filter(line => line.indexOf('.js:') >= 0);
  var caller_line = lines[4];
  var index = caller_line.indexOf('(');
  var clean = caller_line.slice(index + 1, caller_line.length - 1);
  return clean;
}

function formatLog(level, name, timestamp) {
  return `[EXT] [${timestamp}] ${level} (${getCallerLocation()})`;
}

if (process.env.NODE_ENV === 'production') {
  logLevel.setLevel('info');
} else {
  logLevel.enableAll();
}
logLevelPrefix.reg(logLevel);
logLevelPrefix.apply(logLevel, {
  format: formatLog,
  levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter(name) {
    return name;
  },
  timestampFormatter(date) {
    return date.toISOString();
  },
});

export default class LoggerFactory {

  static createLogger(name) {

    const getScriptName = () => {
      const lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
      const currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
      const error = new Error();
      let source = null;
      source = lastStackFrameRegex.exec(error.stack.trim());
      if (source && source[1] !== '') {
        return source[1];
      }
      source = currentStackFrameRegex.exec(error.stack.trim());
      if (source) {
        return source[1];
      }
      if (error.fileName !== undefined) {
        return error.fileName;
      }
    };

    return logLevel.getLogger(name || getScriptName());
  }
}
