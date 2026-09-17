var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-tb8b1m/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var MAX_NESTING_DEPTH = 32;
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = /* @__PURE__ */ __name((request) => "headers" in request, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value, nestingState);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".", MAX_NESTING_DEPTH + 2);
  if (keys.length > MAX_NESTING_DEPTH + 1) {
    throwNestingLimitExceeded();
  }
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS) {
          throwNestingLimitExceeded();
        }
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");
var throwNestingLimitExceeded = /* @__PURE__ */ __name(() => {
  throw new Error("Nesting limit exceeded");
}, "throwNestingLimitExceeded");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str, "tryDecodeURIComponent");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        const contentType = anyCachedKey === "formData" ? void 0 : raw2.headers.get("content-type");
        return new Response(body, {
          headers: contentType ? { "Content-Type": contentType } : void 0
        })[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count3 = 0;
        for (const k in headers) {
          if (++count3 > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibytes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        const methodName = method.toUpperCase();
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(methodName, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(methodName, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          const methodName = m.toUpperCase();
          for (const handler of handlers) {
            this.#addRoute(methodName, this.#path, handler);
          }
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/utils.js
var createNullObject = /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullObject");

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context2, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context2.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    `^${path.replace(
      /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
      (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ONLY_WILDCARD_REG_EXP_STR : `/:${LABEL_REG_EXP_STR}`
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function findMiddleware(middleware, path) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: createNullObject() };
    this.#routes = { [METHOD_NAME_ALL]: createNullObject() };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap[METHOD_NAME_ALL]) {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*") {
      path = "*";
    }
    const methods = method === METHOD_NAME_ALL ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods) {
        if (!middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        }
      }
      for (const handlerMap of [middleware, routes]) {
        for (const m of methods) {
          for (const p in handlerMap[m]) {
            re.test(p) && handlerMap[m][p].push([handler, path]);
          }
        }
      }
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path2 of paths) {
      for (const m of methods) {
        if (!routes[m][path2]) {
          this.#insertPath(m, path2);
          routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        }
        routes[m][path2].push([handler, path2]);
      }
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) {
      matchers[method] = this.#buildMatcher(method);
    }
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) {
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
          h,
          trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
            map[key] = paramReplacementMap[pathData[1][i][1]];
            return map;
          }, createNullObject())
        ]);
      }
    }
    return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node = new Node2();
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    } else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else {
      return () => "";
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (exposeHeadersStr) {
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        c.res.headers.append("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) {
        set("Access-Control-Allow-Methods", allowMethods);
      }
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
        }
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// node_modules/hono/dist/utils/color.js
function getColorEnabled() {
  const { process, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process !== void 0 ? (
    // eslint-disable-next-line no-unsafe-optional-chaining
    "NO_COLOR" in process?.env
  ) : false;
  return !isNoColor;
}
__name(getColorEnabled, "getColorEnabled");
async function getColorEnabledAsync() {
  const { navigator } = globalThis;
  const cfWorkers = "cloudflare:workers";
  const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
    } catch {
      return false;
    }
  })() : !getColorEnabled();
  return !isNoColor;
}
__name(getColorEnabledAsync, "getColorEnabledAsync");

// node_modules/hono/dist/middleware/logger/index.js
var humanize = /* @__PURE__ */ __name((times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
}, "humanize");
var time3 = /* @__PURE__ */ __name((start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
}, "time");
var colorStatus = /* @__PURE__ */ __name(async (status) => {
  const colorEnabled = await getColorEnabledAsync();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
}, "colorStatus");
async function log3(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${await colorStatus(status)} ${elapsed}`;
  fn(out);
}
__name(log3, "log");
var logger = /* @__PURE__ */ __name((fn = console.log) => {
  return /* @__PURE__ */ __name(async function logger2(c, next) {
    const { method, url } = c.req;
    const path = url.slice(url.indexOf("/", 8));
    await log3(fn, "<--", method, path);
    const start = Date.now();
    await next();
    await log3(fn, "-->", method, path, c.res.status, time3(start));
  }, "logger2");
}, "logger");

// src/routes/api.ts
var api = new Hono2();
async function generateOrderCode(db) {
  const todayPrefix = String.fromCharCode(65 + (/* @__PURE__ */ new Date()).getDate() % 26);
  const result = await db.prepare("SELECT id FROM orders ORDER BY id DESC LIMIT 1").first();
  const nextId = (result?.id || 0) + 1;
  const numSuffix = (100 + nextId % 900).toString();
  return `${todayPrefix}${numSuffix}`;
}
__name(generateOrderCode, "generateOrderCode");
api.get("/menu", async (c) => {
  try {
    const categories = await c.env.DB.prepare("SELECT * FROM categories ORDER BY sort_order ASC").all();
    const items = await c.env.DB.prepare(`
        SELECT m.*, c.name as category_name 
        FROM menu_items m 
        LEFT JOIN categories c ON m.category_id = c.id
        ORDER BY c.sort_order ASC, m.id ASC
      `).all();
    return c.json({
      success: true,
      categories: categories.results,
      items: items.results
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.post("/orders", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.customer_name || !body.items || body.items.length === 0) {
      return c.json({ success: false, error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E41\u0E25\u0E30\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23" }, 400);
    }
    let total = 0;
    for (const item of body.items) {
      total += Number(item.unit_price) * Number(item.quantity);
    }
    const orderCode = await generateOrderCode(c.env.DB);
    const orderInsert = await c.env.DB.prepare(`
        INSERT INTO orders (order_code, customer_name, customer_phone, order_type, table_no, total_amount, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)
      `).bind(
      orderCode,
      body.customer_name.trim(),
      body.customer_phone?.trim() || null,
      body.order_type || "takeaway",
      body.table_no?.trim() || null,
      total,
      body.notes?.trim() || null
    ).run();
    const orderId = orderInsert.meta.last_row_id;
    const itemStatements = body.items.map((item) => {
      return c.env.DB.prepare(`
          INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price, temperature, sweetness, ice, toppings, item_notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
        orderId,
        item.menu_item_id || null,
        item.item_name,
        item.quantity,
        item.unit_price,
        item.temperature || "\u0E40\u0E22\u0E47\u0E19",
        item.sweetness || "100%",
        item.ice || "\u0E1B\u0E01\u0E15\u0E34",
        item.toppings || null,
        item.item_notes || null
      );
    });
    await c.env.DB.batch(itemStatements);
    return c.json({
      success: true,
      message: "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27",
      order: {
        id: orderId,
        order_code: orderCode,
        total_amount: total,
        status: "pending"
      }
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.get("/orders/:code", async (c) => {
  try {
    const code = c.req.param("code").trim().toUpperCase();
    const order2 = await c.env.DB.prepare("SELECT * FROM orders WHERE UPPER(order_code) = ?").bind(code).first();
    if (!order2) {
      return c.json({ success: false, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E19\u0E35\u0E49" }, 404);
    }
    const items = await c.env.DB.prepare("SELECT * FROM order_items WHERE order_id = ?").bind(order2.id).all();
    return c.json({
      success: true,
      order: {
        ...order2,
        items: items.results
      }
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.get("/admin/orders", async (c) => {
  try {
    const statusFilter = c.req.query("status");
    let query = "SELECT * FROM orders";
    const params = [];
    if (statusFilter && statusFilter !== "all") {
      if (statusFilter === "active") {
        query += " WHERE status IN ('pending', 'preparing', 'ready')";
      } else {
        query += " WHERE status = ?";
        params.push(statusFilter);
      }
    }
    query += " ORDER BY CASE status WHEN 'pending' THEN 1 WHEN 'preparing' THEN 2 WHEN 'ready' THEN 3 ELSE 4 END, created_at DESC LIMIT 100";
    const ordersResult = await c.env.DB.prepare(query).bind(...params).all();
    const orders = ordersResult.results;
    if (orders.length > 0) {
      const orderIds = orders.map((o) => o.id);
      const placeholders = orderIds.map(() => "?").join(",");
      const itemsResult = await c.env.DB.prepare(`SELECT * FROM order_items WHERE order_id IN (${placeholders})`).bind(...orderIds).all();
      const itemsByOrderId = {};
      for (const item of itemsResult.results) {
        if (!itemsByOrderId[item.order_id]) {
          itemsByOrderId[item.order_id] = [];
        }
        itemsByOrderId[item.order_id].push(item);
      }
      for (const ord of orders) {
        ord.items = itemsByOrderId[ord.id] || [];
      }
    }
    return c.json({
      success: true,
      orders
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.patch("/admin/orders/:id/status", async (c) => {
  try {
    const orderId = Number(c.req.param("id"));
    const { status } = await c.req.json();
    const validStatuses = ["pending", "preparing", "ready", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return c.json({ success: false, error: "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" }, 400);
    }
    await c.env.DB.prepare("UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(status, orderId).run();
    return c.json({
      success: true,
      message: `\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E40\u0E1B\u0E47\u0E19 ${status} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27`
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.patch("/admin/menu/:id/toggle", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const current = await c.env.DB.prepare("SELECT is_available FROM menu_items WHERE id = ?").bind(id).first();
    if (!current) {
      return c.json({ success: false, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E19\u0E35\u0E49" }, 404);
    }
    const nextState = current.is_available === 1 ? 0 : 1;
    await c.env.DB.prepare("UPDATE menu_items SET is_available = ? WHERE id = ?").bind(nextState, id).run();
    return c.json({
      success: true,
      is_available: nextState,
      message: nextState === 1 ? "\u0E40\u0E1B\u0E34\u0E14\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E40\u0E21\u0E19\u0E39\u0E41\u0E25\u0E49\u0E27" : "\u0E1B\u0E34\u0E14\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E40\u0E21\u0E19\u0E39\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27\u0E41\u0E25\u0E49\u0E27"
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.post("/admin/menu", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.name || body.name.trim() === "") {
      return c.json({ success: false, error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E21\u0E19\u0E39" }, 400);
    }
    if (body.price === void 0 || body.price === null || isNaN(Number(body.price)) || Number(body.price) < 0) {
      return c.json({ success: false, error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E04\u0E32\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" }, 400);
    }
    if (!body.category_id) {
      return c.json({ success: false, error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48" }, 400);
    }
    const defaultImg = "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80";
    const imageUrl = body.image_url?.trim() || defaultImg;
    const isAvailable = body.is_available === 0 ? 0 : 1;
    const result = await c.env.DB.prepare(`
        INSERT INTO menu_items (category_id, name, description, price, image_url, is_available)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
      body.category_id,
      body.name.trim(),
      body.description?.trim() || "",
      Number(body.price),
      imageUrl,
      isAvailable
    ).run();
    return c.json({
      success: true,
      message: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E21\u0E19\u0E39\u0E43\u0E2B\u0E21\u0E48\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27",
      id: result.meta.last_row_id
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.put("/admin/menu/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const body = await c.req.json();
    const existing = await c.env.DB.prepare("SELECT * FROM menu_items WHERE id = ?").bind(id).first();
    if (!existing) {
      return c.json({ success: false, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E19\u0E35\u0E49" }, 404);
    }
    const name = body.name !== void 0 ? body.name.trim() : existing.name;
    const price = body.price !== void 0 ? Number(body.price) : existing.price;
    const categoryId = body.category_id !== void 0 ? Number(body.category_id) : existing.category_id;
    const description = body.description !== void 0 ? body.description.trim() : existing.description;
    const imageUrl = body.image_url !== void 0 ? body.image_url.trim() : existing.image_url;
    const isAvailable = body.is_available !== void 0 ? Number(body.is_available) : existing.is_available;
    if (!name) {
      return c.json({ success: false, error: "\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E21\u0E19\u0E39\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E07\u0E40\u0E1B\u0E25\u0E48\u0E32" }, 400);
    }
    if (isNaN(price) || price < 0) {
      return c.json({ success: false, error: "\u0E23\u0E32\u0E04\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" }, 400);
    }
    await c.env.DB.prepare(`
        UPDATE menu_items 
        SET category_id = ?, name = ?, description = ?, price = ?, image_url = ?, is_available = ?
        WHERE id = ?
      `).bind(categoryId, name, description, price, imageUrl, isAvailable, id).run();
    return c.json({
      success: true,
      message: "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E21\u0E19\u0E39\u0E41\u0E25\u0E30\u0E23\u0E32\u0E04\u0E32\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27",
      item: {
        id,
        category_id: categoryId,
        name,
        description,
        price,
        image_url: imageUrl,
        is_available: isAvailable
      }
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.patch("/admin/menu/:id/price", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const { price } = await c.req.json();
    if (price === void 0 || isNaN(Number(price)) || Number(price) < 0) {
      return c.json({ success: false, error: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E04\u0E32\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" }, 400);
    }
    const res = await c.env.DB.prepare("UPDATE menu_items SET price = ? WHERE id = ?").bind(Number(price), id).run();
    if (res.meta.changes === 0) {
      return c.json({ success: false, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E19\u0E35\u0E49" }, 404);
    }
    return c.json({
      success: true,
      message: `\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E23\u0E32\u0E04\u0E32\u0E40\u0E1B\u0E47\u0E19 \u0E3F${price} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27`,
      price: Number(price)
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.delete("/admin/menu/:id", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const res = await c.env.DB.prepare("DELETE FROM menu_items WHERE id = ?").bind(id).run();
    if (res.meta.changes === 0) {
      return c.json({ success: false, error: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A" }, 404);
    }
    return c.json({
      success: true,
      message: "\u0E25\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27"
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});
api.get("/admin/stats", async (c) => {
  try {
    const stats = await c.env.DB.prepare(`
        SELECT 
          COUNT(CASE WHEN status != 'cancelled' THEN 1 END) as total_orders,
          COALESCE(SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END), 0) as total_revenue,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
          COUNT(CASE WHEN status = 'preparing' THEN 1 END) as preparing_count,
          COUNT(CASE WHEN status = 'ready' THEN 1 END) as ready_count
        FROM orders
        WHERE date(created_at, 'localtime') = date('now', 'localtime')
      `).first();
    return c.json({
      success: true,
      stats: stats || {
        total_orders: 0,
        total_revenue: 0,
        pending_count: 0,
        preparing_count: 0,
        ready_count: 0
      }
    });
  } catch (error3) {
    return c.json({ success: false, error: error3.message }, 500);
  }
});

// src/views/customer.ts
function renderCustomerPage() {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u0E2A\u0E31\u0E48\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C | Crafted Coffee & Tea Cafe</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-amber-50/40 text-stone-800 min-h-screen pb-32">

  <!-- Header -->
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center text-xl shadow-md">
          \u2615
        </div>
        <div>
          <h1 class="font-bold text-lg text-stone-900 leading-tight">Crafted Cafe</h1>
          <p class="text-xs text-amber-700 font-medium flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            \u0E40\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a href="/dashboard" class="text-xs text-amber-900 bg-amber-100/80 hover:bg-amber-200 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1">
          <span>\u2699\uFE0F</span> \u0E41\u0E14\u0E0A\u0E1A\u0E2D\u0E23\u0E4C\u0E14\u0E23\u0E49\u0E32\u0E19
        </a>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="max-w-4xl mx-auto px-4 py-2 overflow-x-auto hide-scrollbar flex space-x-2 text-sm border-t border-amber-50">
      <button onclick="filterCategory(0)" id="cat-btn-0" class="cat-btn active px-4 py-1.5 rounded-full font-medium transition whitespace-nowrap bg-amber-800 text-white shadow-sm">
        \u2728 \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14
      </button>
      <div id="categoryTabs" class="flex space-x-2"></div>
    </div>
  </header>

  <!-- Banner -->
  <div class="max-w-4xl mx-auto px-4 mt-4">
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-white p-5 shadow-lg">
      <div class="relative z-10 max-w-sm">
        <span class="bg-amber-500/30 text-amber-200 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border border-amber-400/30">Fresh Brewed</span>
        <h2 class="text-2xl font-bold mt-2 leading-snug">\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E2A\u0E01\u0E31\u0E14\u0E2A\u0E14<br>\u0E0A\u0E07\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E41\u0E01\u0E49\u0E27\u0E15\u0E48\u0E2D\u0E41\u0E01\u0E49\u0E27</h2>
        <p class="text-amber-100/80 text-xs mt-1">\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E04\u0E27\u0E32\u0E21\u0E2B\u0E27\u0E32\u0E19 \u0E1B\u0E23\u0E31\u0E1A\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07 \u0E41\u0E25\u0E30\u0E17\u0E47\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E0A\u0E2D\u0E1A</p>
      </div>
      <div class="absolute -right-6 -bottom-8 text-9xl opacity-20 select-none pointer-events-none">\u2615</div>
    </div>
  </div>

  <!-- Menu Grid -->
  <main class="max-w-4xl mx-auto px-4 mt-6">
    <div id="menuLoading" class="text-center py-16">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-700 mx-auto"></div>
      <p class="text-sm text-stone-500 mt-3">\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E21\u0E19\u0E39\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21...</p>
    </div>

    <div id="menuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 hidden">
      <!-- Cards rendered via JS -->
    </div>
  </main>

  <!-- Drink Customization Modal -->
  <div id="customModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
      
      <!-- Modal Header with Image -->
      <div class="relative h-48 bg-stone-100 flex-shrink-0">
        <img id="modalImg" src="" alt="" class="w-full h-full object-cover">
        <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition">
          \u2715
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-5 flex-1">
        <div class="flex justify-between items-start">
          <div>
            <h3 id="modalName" class="text-xl font-bold text-stone-900"></h3>
            <p id="modalDesc" class="text-xs text-stone-500 mt-1 line-clamp-2"></p>
          </div>
          <span id="modalBasePrice" class="text-lg font-bold text-amber-700 ml-2"></span>
        </div>

        <form id="customizeForm" class="mt-5 space-y-4">
          <!-- Temperature -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</label>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="\u0E40\u0E22\u0E47\u0E19" checked class="hidden" onchange="updateModalPrice()">
                <span>\u{1F9CA} \u0E40\u0E22\u0E47\u0E19</span>
                <span class="text-[10px] text-stone-400">(\u0E1B\u0E01\u0E15\u0E34)</span>
              </label>
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="\u0E23\u0E49\u0E2D\u0E19" class="hidden" onchange="updateModalPrice()">
                <span>\u2615 \u0E23\u0E49\u0E2D\u0E19</span>
                <span class="text-[10px] text-stone-400">(\u0E23\u0E32\u0E04\u0E32\u0E40\u0E14\u0E34\u0E21)</span>
              </label>
              <label class="cursor-pointer border rounded-xl p-2.5 text-center flex flex-col items-center gap-1 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-50/70 has-[:checked]:font-semibold has-[:checked]:text-amber-800">
                <input type="radio" name="temperature" value="\u0E1B\u0E31\u0E48\u0E19" class="hidden" onchange="updateModalPrice()">
                <span>\u{1F964} \u0E1B\u0E31\u0E48\u0E19</span>
                <span class="text-[10px] text-amber-600 font-medium">(+10\u0E3F)</span>
              </label>
            </div>
          </div>

          <!-- Sweetness -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2B\u0E27\u0E32\u0E19</label>
            <div class="grid grid-cols-4 gap-1.5 text-xs text-center">
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="100% (\u0E1B\u0E01\u0E15\u0E34)" checked class="hidden">
                100%<br><span class="text-[10px] text-stone-400">\u0E1B\u0E01\u0E15\u0E34</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="50% (\u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22)" class="hidden">
                50%<br><span class="text-[10px] text-stone-400">\u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="25% (\u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E32\u0E01)" class="hidden">
                25%<br><span class="text-[10px] text-stone-400">\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E32\u0E01</span>
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="sweetness" value="0% (\u0E44\u0E21\u0E48\u0E2B\u0E27\u0E32\u0E19)" class="hidden">
                0%<br><span class="text-[10px] text-stone-400">\u0E44\u0E21\u0E48\u0E2B\u0E27\u0E32\u0E19</span>
              </label>
            </div>
          </div>

          <!-- Ice Level -->
          <div id="iceSection">
            <label class="block text-xs font-semibold text-stone-700 mb-2">\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07</label>
            <div class="grid grid-cols-3 gap-2 text-xs text-center">
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="\u0E1B\u0E01\u0E15\u0E34" checked class="hidden">
                \u0E1B\u0E01\u0E15\u0E34
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E19\u0E49\u0E2D\u0E22" class="hidden">
                \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07\u0E19\u0E49\u0E2D\u0E22
              </label>
              <label class="cursor-pointer border rounded-lg py-2 hover:border-amber-600 transition has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100 has-[:checked]:font-semibold has-[:checked]:text-amber-900">
                <input type="radio" name="ice" value="\u0E44\u0E21\u0E48\u0E43\u0E2A\u0E48\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07" class="hidden">
                \u0E44\u0E21\u0E48\u0E43\u0E2A\u0E48\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07
              </label>
            </div>
          </div>

          <!-- Toppings -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-2">\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E47\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07 (\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E14\u0E49\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 1 \u0E2D\u0E22\u0E48\u0E32\u0E07)</label>
            <div class="space-y-2 text-xs">
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="\u0E44\u0E02\u0E48\u0E21\u0E38\u0E01\u0E1A\u0E23\u0E32\u0E27\u0E19\u0E4C\u0E0A\u0E39\u0E01\u0E32\u0E23\u0E4C (+10\u0E3F)" data-price="10" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>\u{1F9CB} \u0E44\u0E02\u0E48\u0E21\u0E38\u0E01\u0E1A\u0E23\u0E32\u0E27\u0E19\u0E4C\u0E0A\u0E39\u0E01\u0E32\u0E23\u0E4C\u0E40\u0E04\u0E35\u0E48\u0E22\u0E27</span>
                </div>
                <span class="font-semibold text-amber-700">+10\u0E3F</span>
              </label>
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="\u0E27\u0E48\u0E32\u0E19\u0E2B\u0E32\u0E07\u0E08\u0E23\u0E30\u0E40\u0E02\u0E49 (+10\u0E3F)" data-price="10" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>\u{1F331} \u0E27\u0E48\u0E32\u0E19\u0E2B\u0E32\u0E07\u0E08\u0E23\u0E30\u0E40\u0E02\u0E49\u0E43\u0E19\u0E19\u0E49\u0E33\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21</span>
                </div>
                <span class="font-semibold text-amber-700">+10\u0E3F</span>
              </label>
              <label class="flex items-center justify-between p-2.5 border rounded-xl hover:border-amber-600 cursor-pointer transition">
                <div class="flex items-center gap-2">
                  <input type="checkbox" name="toppings" value="\u0E1A\u0E38\u0E01\u0E04\u0E23\u0E34\u0E2A\u0E15\u0E31\u0E25 (+15\u0E3F)" data-price="15" onchange="updateModalPrice()" class="w-4 h-4 rounded text-amber-700 focus:ring-amber-500">
                  <span>\u2728 \u0E1A\u0E38\u0E01\u0E04\u0E23\u0E34\u0E2A\u0E15\u0E31\u0E25\u0E43\u0E2A\u0E40\u0E04\u0E35\u0E49\u0E22\u0E27\u0E01\u0E23\u0E38\u0E1A</span>
                </div>
                <span class="font-semibold text-amber-700">+15\u0E3F</span>
              </label>
            </div>
          </div>

          <!-- Special Note -->
          <div>
            <label class="block text-xs font-semibold text-stone-700 mb-1">\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21</label>
            <input type="text" id="itemNotes" placeholder="\u0E40\u0E0A\u0E48\u0E19 \u0E02\u0E2D\u0E41\u0E22\u0E01\u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07, \u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22\u0E1E\u0E34\u0E40\u0E28\u0E29" class="w-full text-xs p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
          </div>

          <!-- Quantity -->
          <div class="flex items-center justify-between pt-2 border-t">
            <span class="text-xs font-semibold text-stone-700">\u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E01\u0E49\u0E27</span>
            <div class="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button type="button" onclick="changeModalQty(-1)" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold">-</button>
              <span id="modalQty" class="px-4 py-1.5 font-bold text-sm">1</span>
              <button type="button" onclick="changeModalQty(1)" class="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold">+</button>
            </div>
          </div>
        </form>

        <!-- Add Button -->
        <div class="mt-5">
          <button type="button" onclick="addToCartFromModal()" class="w-full py-3 bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-semibold rounded-2xl shadow-lg transition flex items-center justify-between px-5">
            <span>\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E25\u0E07\u0E43\u0E19\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32</span>
            <span id="modalTotalPrice" class="font-bold">\u0E3F0</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Cart Bottom Bar -->
  <div id="cartBar" class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-100 p-4 shadow-2xl transition-transform duration-300 transform translate-y-full">
    <div class="max-w-4xl mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 cursor-pointer" onclick="openCartModal()">
        <div class="relative bg-amber-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md">
          \u{1F6CD}\uFE0F
          <span id="cartBadge" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">0</span>
        </div>
        <div>
          <p class="text-xs text-stone-500">\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14</p>
          <p id="cartBarTotal" class="text-xl font-extrabold text-amber-900">\u0E3F0</p>
        </div>
      </div>

      <button onclick="openCartModal()" class="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition flex items-center gap-2 text-sm">
        <span>\u0E14\u0E39\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32 & \u0E2A\u0E31\u0E48\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</span>
        <span>\u2192</span>
      </button>
    </div>
  </div>

  <!-- Full Cart / Checkout Drawer -->
  <div id="cartModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in duration-200">
      
      <!-- Drawer Header -->
      <div class="p-5 border-b flex items-center justify-between sticky top-0 bg-white z-10">
        <div class="flex items-center gap-2">
          <span class="text-2xl">\u{1F6CD}\uFE0F</span>
          <h3 class="text-lg font-bold text-stone-900">\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</h3>
        </div>
        <button onclick="closeCartModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold p-1">\u2715</button>
      </div>

      <!-- Drawer Content -->
      <div class="p-5 flex-1 space-y-5">
        <!-- Order Items List -->
        <div id="cartItemsList" class="space-y-3 divide-y divide-stone-100">
          <!-- Filled by JS -->
        </div>

        <!-- Customer Form -->
        <div class="bg-amber-50/60 p-4 rounded-2xl border border-amber-100/80 space-y-3">
          <h4 class="font-bold text-xs uppercase text-amber-900 tracking-wider">\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E2A\u0E31\u0E48\u0E07</h4>
          
          <div class="grid grid-cols-2 gap-2 text-xs">
            <label class="cursor-pointer border border-amber-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 bg-white has-[:checked]:border-amber-700 has-[:checked]:bg-amber-700 has-[:checked]:text-white font-semibold transition">
              <input type="radio" name="orderType" value="takeaway" checked class="hidden" onchange="toggleOrderType()">
              <span>\u{1F964} \u0E2A\u0E31\u0E48\u0E07\u0E01\u0E25\u0E31\u0E1A\u0E1A\u0E49\u0E32\u0E19</span>
            </label>
            <label class="cursor-pointer border border-amber-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 bg-white has-[:checked]:border-amber-700 has-[:checked]:bg-amber-700 has-[:checked]:text-white font-semibold transition">
              <input type="radio" name="orderType" value="dine_in" class="hidden" onchange="toggleOrderType()">
              <span>\u{1F37D}\uFE0F \u0E17\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E49\u0E32\u0E19</span>
            </label>
          </div>

          <div class="space-y-2 text-xs">
            <div>
              <label class="block text-stone-700 mb-1 font-medium">\u0E0A\u0E37\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 <span class="text-red-500">*</span></label>
              <input type="text" id="custName" placeholder="\u0E40\u0E0A\u0E48\u0E19 \u0E04\u0E38\u0E13\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E2B\u0E23\u0E37\u0E2D \u0E19\u0E34\u0E04\u0E40\u0E19\u0E21" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-stone-700 mb-1 font-medium">\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C (\u0E16\u0E49\u0E32\u0E21\u0E35)</label>
                <input type="tel" id="custPhone" placeholder="08X-XXX-XXXX" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
              </div>
              <div id="tableField" class="hidden">
                <label class="block text-stone-700 mb-1 font-medium">\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E15\u0E4A\u0E30 <span class="text-red-500">*</span></label>
                <input type="text" id="tableNo" placeholder="\u0E40\u0E0A\u0E48\u0E19 01, B2" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
              </div>
            </div>

            <div>
              <label class="block text-stone-700 mb-1 font-medium">\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E16\u0E36\u0E07\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32</label>
              <input type="text" id="orderNotes" placeholder="\u0E40\u0E0A\u0E48\u0E19 \u0E02\u0E2D\u0E16\u0E38\u0E07\u0E41\u0E22\u0E01\u0E41\u0E01\u0E49\u0E27, \u0E0A\u0E07\u0E14\u0E48\u0E27\u0E19\u0E44\u0E14\u0E49\u0E44\u0E2B\u0E21\u0E04\u0E23\u0E31\u0E1A" class="w-full p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none">
            </div>
          </div>
        </div>

        <!-- Total Breakdown -->
        <div class="pt-2 border-t space-y-1 text-sm">
          <div class="flex justify-between text-stone-500 text-xs">
            <span>\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</span>
            <span id="cartTotalCups">0 \u0E41\u0E01\u0E49\u0E27</span>
          </div>
          <div class="flex justify-between items-baseline pt-1">
            <span class="font-bold text-stone-800">\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30\u0E2A\u0E38\u0E17\u0E18\u0E34</span>
            <span id="cartDrawerTotal" class="text-2xl font-extrabold text-amber-800">\u0E3F0</span>
          </div>
        </div>

        <!-- Submit Button -->
        <button id="submitOrderBtn" onclick="submitOrder()" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base rounded-2xl shadow-xl transition flex items-center justify-center gap-2">
          <span>\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D</span>
          <span class="text-xl">\u2713</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    let menuData = { categories: [], items: [] };
    let selectedItem = null;
    let selectedCategory = 0;
    let cart = [];
    let modalQty = 1;

    async function loadMenu() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
          menuData = data;
          renderCategories();
          renderMenuItems();
        }
      } catch (err) {
        console.error('Failed to load menu', err);
      } finally {
        document.getElementById('menuLoading').classList.add('hidden');
        document.getElementById('menuGrid').classList.remove('hidden');
      }
    }

    function renderCategories() {
      const container = document.getElementById('categoryTabs');
      container.innerHTML = menuData.categories.map(cat => \`
        <button onclick="filterCategory(\${cat.id})" id="cat-btn-\${cat.id}" class="cat-btn px-4 py-1.5 rounded-full font-medium transition whitespace-nowrap bg-white text-stone-600 hover:bg-amber-100 border border-stone-200">
          \${cat.icon || ''} \${cat.name.split('(')[0]}
        </button>
      \`).join('');
    }

    function filterCategory(catId) {
      selectedCategory = catId;
      document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-amber-800', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-stone-600');
      });
      const activeBtn = document.getElementById(\`cat-btn-\${catId}\`);
      if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-stone-600');
        activeBtn.classList.add('bg-amber-800', 'text-white', 'shadow-sm');
      }
      renderMenuItems();
    }

    function renderMenuItems() {
      const grid = document.getElementById('menuGrid');
      const filtered = selectedCategory === 0 
        ? menuData.items 
        : menuData.items.filter(i => i.category_id === selectedCategory);

      if (filtered.length === 0) {
        grid.innerHTML = \`<div class="col-span-full text-center py-12 text-stone-400">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E21\u0E19\u0E39\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48\u0E19\u0E35\u0E49</div>\`;
        return;
      }

      grid.innerHTML = filtered.map(item => \`
        <div class="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group \${item.is_available ? '' : 'opacity-60 grayscale'}">
          <div>
            <div class="relative h-44 overflow-hidden bg-stone-100">
              <img src="\${item.image_url}" alt="\${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              \${!item.is_available ? \`<span class="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-bold text-sm">\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E2B\u0E21\u0E14\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27</span>\` : ''}
              <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm">
                \${item.category_name || ''}
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-base text-stone-900 group-hover:text-amber-800 transition">\${item.name}</h3>
              <p class="text-xs text-stone-500 mt-1 line-clamp-2">\${item.description || ''}</p>
            </div>
          </div>
          <div class="p-4 pt-0 flex items-center justify-between">
            <span class="text-lg font-bold text-amber-700">\u0E3F\${item.price}</span>
            <button onclick="openCustomizeModal(\${item.id})" \${item.is_available ? '' : 'disabled'} class="bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white px-3.5 py-1.5 rounded-xl font-medium text-xs shadow-sm transition flex items-center gap-1">
              <span>\u0E2A\u0E31\u0E48\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</span>
              <span>+</span>
            </button>
          </div>
        </div>
      \`).join('');
    }

    function openCustomizeModal(itemId) {
      selectedItem = menuData.items.find(i => i.id === itemId);
      if (!selectedItem) return;

      modalQty = 1;
      document.getElementById('modalQty').innerText = modalQty;
      document.getElementById('modalImg').src = selectedItem.image_url;
      document.getElementById('modalName').innerText = selectedItem.name;
      document.getElementById('modalDesc').innerText = selectedItem.description || '';
      document.getElementById('modalBasePrice').innerText = '\u0E3F' + selectedItem.price;
      document.getElementById('itemNotes').value = '';

      // Reset form options
      const form = document.getElementById('customizeForm');
      form.reset();
      updateModalPrice();

      document.getElementById('customModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('customModal').classList.add('hidden');
    }

    function changeModalQty(delta) {
      modalQty = Math.max(1, modalQty + delta);
      document.getElementById('modalQty').innerText = modalQty;
      updateModalPrice();
    }

    function updateModalPrice() {
      if (!selectedItem) return;
      let unitPrice = selectedItem.price;

      // Frappe extra
      const temp = document.querySelector('input[name="temperature"]:checked')?.value;
      if (temp === '\u0E1B\u0E31\u0E48\u0E19') unitPrice += 10;

      // Toppings extra
      document.querySelectorAll('input[name="toppings"]:checked').forEach(t => {
        unitPrice += Number(t.dataset.price || 0);
      });

      const total = unitPrice * modalQty;
      document.getElementById('modalTotalPrice').innerText = '\u0E3F' + total;
      return { unitPrice, total };
    }

    function addToCartFromModal() {
      if (!selectedItem) return;
      const { unitPrice } = updateModalPrice();

      const temp = document.querySelector('input[name="temperature"]:checked')?.value || '\u0E40\u0E22\u0E47\u0E19';
      const sweetness = document.querySelector('input[name="sweetness"]:checked')?.value || '100% (\u0E1B\u0E01\u0E15\u0E34)';
      const ice = document.querySelector('input[name="ice"]:checked')?.value || '\u0E1B\u0E01\u0E15\u0E34';
      
      const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked'))
        .map(t => t.value)
        .join(', ');

      const itemNotes = document.getElementById('itemNotes').value.trim();

      cart.push({
        menu_item_id: selectedItem.id,
        item_name: selectedItem.name,
        quantity: modalQty,
        unit_price: unitPrice,
        temperature: temp,
        sweetness: sweetness,
        ice: ice,
        toppings: toppings || null,
        item_notes: itemNotes || null
      });

      closeModal();
      updateCartUI();
    }

    function updateCartUI() {
      const cartBar = document.getElementById('cartBar');
      const badge = document.getElementById('cartBadge');
      const barTotal = document.getElementById('cartBarTotal');

      const totalCups = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

      if (totalCups > 0) {
        cartBar.classList.remove('translate-y-full');
        badge.innerText = totalCups;
        barTotal.innerText = '\u0E3F' + totalPrice;
      } else {
        cartBar.classList.add('translate-y-full');
        closeCartModal();
      }
    }

    function openCartModal() {
      renderCartItems();
      document.getElementById('cartModal').classList.remove('hidden');
    }

    function closeCartModal() {
      document.getElementById('cartModal').classList.add('hidden');
    }

    function toggleOrderType() {
      const type = document.querySelector('input[name="orderType"]:checked').value;
      const tableField = document.getElementById('tableField');
      if (type === 'dine_in') {
        tableField.classList.remove('hidden');
      } else {
        tableField.classList.add('hidden');
      }
    }

    function removeCartItem(idx) {
      cart.splice(idx, 1);
      renderCartItems();
      updateCartUI();
    }

    function renderCartItems() {
      const container = document.getElementById('cartItemsList');
      const totalCups = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

      document.getElementById('cartTotalCups').innerText = totalCups + ' \u0E41\u0E01\u0E49\u0E27';
      document.getElementById('cartDrawerTotal').innerText = '\u0E3F' + totalPrice;

      if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-stone-400 py-6 text-sm">\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E19\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32</p>';
        return;
      }

      container.innerHTML = cart.map((item, idx) => \`
        <div class="py-3 flex justify-between items-start gap-2">
          <div class="flex-1">
            <h5 class="font-bold text-sm text-stone-900">\${item.item_name}</h5>
            <div class="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
              <p>\u2022 \${item.temperature} | \u0E2B\u0E27\u0E32\u0E19 \${item.sweetness} | \u0E19\u0E49\u0E33\u0E41\u0E02\u0E47\u0E07 \${item.ice}</p>
              \${item.toppings ? \`<p class="text-amber-700">\u2022 \u0E17\u0E47\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07: \${item.toppings}</p>\` : ''}
              \${item.item_notes ? \`<p class="text-stone-400">\u2022 \u0E42\u0E19\u0E49\u0E15: \${item.item_notes}</p>\` : ''}
            </div>
            <p class="text-xs font-bold text-amber-800 mt-1">\u0E3F\${item.unit_price} \xD7 \${item.quantity} = \u0E3F\${item.unit_price * item.quantity}</p>
          </div>
          <button onclick="removeCartItem(\${idx})" class="text-stone-400 hover:text-red-500 text-sm p-1">
            \u{1F5D1}\uFE0F
          </button>
        </div>
      \`).join('');
    }

    async function submitOrder() {
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const orderType = document.querySelector('input[name="orderType"]:checked').value;
      const tableNo = document.getElementById('tableNo').value.trim();
      const notes = document.getElementById('orderNotes').value.trim();

      if (!name) {
        alert('\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32');
        document.getElementById('custName').focus();
        return;
      }

      if (orderType === 'dine_in' && !tableNo) {
        alert('\u0E01\u0E23\u0E13\u0E35\u0E17\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E49\u0E32\u0E19 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E30\u0E1A\u0E38\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E15\u0E4A\u0E30');
        document.getElementById('tableNo').focus();
        return;
      }

      const btn = document.getElementById('submitOrderBtn');
      btn.disabled = true;
      btn.innerHTML = '<span>\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C...</span>';

      try {
        const payload = {
          customer_name: name,
          customer_phone: phone || null,
          order_type: orderType,
          table_no: tableNo || null,
          notes: notes || null,
          items: cart
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success && data.order) {
          // Redirect to tracking page
          window.location.href = '/order/' + data.order.order_code;
        } else {
          alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ' + (data.error || '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E44\u0E14\u0E49'));
          btn.disabled = false;
          btn.innerHTML = '<span>\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D</span><span class="text-xl">\u2713</span>';
        }
      } catch (err) {
        alert('\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E14\u0E49');
        btn.disabled = false;
        btn.innerHTML = '<span>\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D</span><span class="text-xl">\u2713</span>';
      }
    }

    // Initialize
    loadMenu();
  <\/script>
</body>
</html>`;
}
__name(renderCustomerPage, "renderCustomerPage");

// src/views/tracking.ts
function renderTrackingPage(orderCode) {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C #${orderCode} | Crafted Cafe</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(217, 119, 6, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
    }
    .pulse-amber { animation: pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.6, 1); }
    
    @keyframes pulse-ready {
      0% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
      70% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.98); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .pulse-ready { animation: pulse-ready 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1); }
  </style>
</head>
<body class="bg-stone-50 text-stone-800 min-h-screen py-8 px-4 flex flex-col items-center justify-start">

  <div class="w-full max-w-md space-y-5">
    
    <!-- Top Nav -->
    <div class="flex items-center justify-between">
      <a href="/" class="text-xs text-amber-800 hover:text-amber-900 bg-amber-100/70 hover:bg-amber-100 px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1">
        <span>\u2190</span> \u0E2A\u0E31\u0E48\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21 / \u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01
      </a>
      <span class="text-[11px] text-stone-400 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E17\u0E38\u0E01 3 \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35
      </span>
    </div>

    <!-- Main Status Card -->
    <div id="statusCard" class="bg-white rounded-3xl p-6 shadow-xl border border-stone-100 text-center transition-all duration-300">
      
      <!-- Order Code Header -->
      <div class="inline-block bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-3">
        <p class="text-xs font-semibold text-amber-900">\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13</p>
      </div>
      <h1 class="text-5xl font-extrabold text-stone-900 tracking-wider">#${orderCode}</h1>
      
      <p id="customerGreet" class="text-sm text-stone-500 mt-2 font-medium">\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25...</p>

      <!-- Dynamic Status Badge & Icon -->
      <div class="my-6">
        <div id="statusIconWrap" class="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-md transition-all duration-500 bg-amber-100 text-amber-800">
          \u23F3
        </div>
        <h2 id="statusTitle" class="text-2xl font-bold mt-4 text-stone-900">\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E30</h2>
        <p id="statusSubtitle" class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32...</p>
      </div>

      <!-- Stepper Progress Bar -->
      <div class="mt-8 pt-6 border-t border-stone-100">
        <div class="grid grid-cols-4 gap-2 text-center relative">
          <!-- Connector line -->
          <div class="absolute top-4 left-6 right-6 h-1 bg-stone-100 -z-0">
            <div id="progressLine" class="h-full bg-amber-600 transition-all duration-500" style="width: 15%;"></div>
          </div>

          <!-- Step 1: Pending -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-pending" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-600 text-white shadow">
              1
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-600">\u0E23\u0E31\u0E1A\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C</span>
          </div>

          <!-- Step 2: Preparing -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-preparing" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              2
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E07</span>
          </div>

          <!-- Step 3: Ready -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-ready" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              3
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F</span>
          </div>

          <!-- Step 4: Completed -->
          <div class="relative z-10 flex flex-col items-center">
            <div id="step-node-completed" class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500">
              4
            </div>
            <span class="text-[10px] mt-1.5 font-medium text-stone-500">\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ready Alert Banner (Hidden by default, shown when Ready) -->
    <div id="readyBanner" class="hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-3xl shadow-xl pulse-ready text-center">
      <span class="text-3xl">\u{1F389}</span>
      <h3 class="text-xl font-bold mt-1">\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F\u0E41\u0E25\u0E49\u0E27!</h3>
      <p id="pickupNote" class="text-xs text-emerald-100 mt-1">\u0E01\u0E23\u0E38\u0E13\u0E32\u0E41\u0E08\u0E49\u0E07\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02 <strong class="underline font-extrabold text-white">#${orderCode}</strong> \u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</p>
    </div>

    <!-- Order Items Summary Card -->
    <div class="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
      <div class="flex items-center justify-between pb-3 border-b border-stone-100">
        <h4 class="font-bold text-sm text-stone-800">\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21</h4>
        <span id="orderTypeBadge" class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-stone-100 text-stone-600">
          -
        </span>
      </div>

      <div id="itemsContainer" class="py-3 space-y-3 divide-y divide-stone-50">
        <!-- Rendered via JS -->
      </div>

      <div class="pt-3 border-t border-stone-100 flex justify-between items-baseline">
        <span class="text-xs font-medium text-stone-500">\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30</span>
        <span id="totalAmountText" class="text-xl font-bold text-amber-800">\u0E3F0</span>
      </div>
    </div>

    <!-- Help / Footer -->
    <div class="text-center text-xs text-stone-400 pt-2">
      <p>\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E2A\u0E07\u0E2A\u0E31\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32\u0E17\u0E35\u0E48\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C</p>
    </div>

  </div>

  <script>
    const orderCode = '${orderCode}';
    let previousStatus = null;
    let hasPlayedSound = false;

    // Optional audio chime on ready
    function playBeep() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        console.log('Audio not allowed yet without user interaction');
      }
    }

    async function fetchStatus() {
      try {
        const res = await fetch('/api/orders/' + orderCode);
        const data = await res.json();
        if (data.success && data.order) {
          updateUI(data.order);
        } else {
          document.getElementById('statusTitle').innerText = '\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C';
          document.getElementById('statusSubtitle').innerText = data.error || '';
        }
      } catch (err) {
        console.error('Fetch status error', err);
      }
    }

    function updateUI(order) {
      document.getElementById('customerGreet').innerText = 
        '\u0E1C\u0E39\u0E49\u0E2A\u0E31\u0E48\u0E07: ' + order.customer_name + (order.table_no ? ' (\u0E42\u0E15\u0E4A\u0E30 ' + order.table_no + ')' : '');

      const typeBadge = document.getElementById('orderTypeBadge');
      if (order.order_type === 'dine_in') {
        typeBadge.innerText = '\u{1F37D}\uFE0F \u0E17\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E49\u0E32\u0E19 (\u0E42\u0E15\u0E4A\u0E30 ' + (order.table_no || '-') + ')';
        typeBadge.className = 'text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700';
      } else {
        typeBadge.innerText = '\u{1F964} \u0E2A\u0E31\u0E48\u0E07\u0E01\u0E25\u0E31\u0E1A\u0E1A\u0E49\u0E32\u0E19';
        typeBadge.className = 'text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-800';
      }

      document.getElementById('totalAmountText').innerText = '\u0E3F' + order.total_amount;

      // Render items
      if (order.items && order.items.length > 0) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = order.items.map(item => \`
          <div class="pt-2 first:pt-0 flex justify-between items-start text-xs">
            <div>
              <p class="font-bold text-stone-800">\${item.item_name} \xD7 \${item.quantity}</p>
              <p class="text-stone-500 text-[11px] mt-0.5">
                \${item.temperature} | \u0E2B\u0E27\u0E32\u0E19 \${item.sweetness} | \${item.ice}
                \${item.toppings ? ' | <span class="text-amber-700 font-medium">' + item.toppings + '</span>' : ''}
              </p>
              \${item.item_notes ? '<p class="text-stone-400 text-[10px]">\u0E42\u0E19\u0E49\u0E15: ' + item.item_notes + '</p>' : ''}
            </div>
            <span class="font-semibold text-stone-700">\u0E3F\${item.unit_price * item.quantity}</span>
          </div>
        \`).join('');
      }

      const status = order.status;
      const statusIconWrap = document.getElementById('statusIconWrap');
      const statusTitle = document.getElementById('statusTitle');
      const statusSubtitle = document.getElementById('statusSubtitle');
      const readyBanner = document.getElementById('readyBanner');
      const progressLine = document.getElementById('progressLine');

      // Reset nodes
      const nodes = ['pending', 'preparing', 'ready', 'completed'];
      nodes.forEach(n => {
        const el = document.getElementById('step-node-' + n);
        el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-500';
      });

      statusIconWrap.classList.remove('pulse-amber', 'pulse-ready');

      if (status === 'pending') {
        statusIconWrap.innerHTML = '\u{1F4CB}';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-md bg-amber-100 text-amber-800';
        statusTitle.innerText = '\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E41\u0E25\u0E49\u0E27';
        statusSubtitle.innerText = '\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E16\u0E39\u0E01\u0E2A\u0E48\u0E07\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27 \u0E23\u0E2D\u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E07\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48\u0E04\u0E23\u0E31\u0E1A';
        progressLine.style.width = '15%';
        setNodeActive('pending');
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'preparing') {
        statusIconWrap.innerHTML = '\u2615';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-lg bg-amber-500 text-white pulse-amber';
        statusTitle.innerText = '\u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E0A\u0E07...';
        statusSubtitle.innerText = '\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E1B\u0E23\u0E38\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E2A\u0E39\u0E15\u0E23\u0E1E\u0E34\u0E40\u0E28\u0E29\u0E43\u0E2B\u0E49\u0E04\u0E38\u0E13';
        progressLine.style.width = '48%';
        setNodeDone('pending');
        setNodeActive('preparing');
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'ready') {
        statusIconWrap.innerHTML = '\u{1F389}';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl shadow-xl bg-emerald-500 text-white pulse-ready';
        statusTitle.innerText = '\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F\u0E41\u0E25\u0E49\u0E27!';
        statusSubtitle.innerText = '\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E0A\u0E07\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E0A\u0E34\u0E0D\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49\u0E40\u0E25\u0E22\u0E04\u0E23\u0E31\u0E1A';
        progressLine.style.width = '78%';
        setNodeDone('pending');
        setNodeDone('preparing');
        setNodeActive('ready');
        readyBanner.classList.remove('hidden');

        if (previousStatus !== 'ready' && !hasPlayedSound) {
          playBeep();
          hasPlayedSound = true;
        }
      } 
      else if (status === 'completed') {
        statusIconWrap.innerHTML = '\u2705';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl bg-stone-100 text-emerald-600';
        statusTitle.innerText = '\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22';
        statusSubtitle.innerText = '\u0E02\u0E2D\u0E1A\u0E04\u0E38\u0E13\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E02\u0E2D\u0E43\u0E2B\u0E49\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E38\u0E02\u0E01\u0E31\u0E1A\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E41\u0E01\u0E49\u0E27\u0E42\u0E1B\u0E23\u0E14\u0E04\u0E23\u0E31\u0E1A';
        progressLine.style.width = '100%';
        nodes.forEach(n => setNodeDone(n));
        readyBanner.classList.add('hidden');
      } 
      else if (status === 'cancelled') {
        statusIconWrap.innerHTML = '\u2715';
        statusIconWrap.className = 'w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl bg-red-100 text-red-600';
        statusTitle.innerText = '\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E19\u0E35\u0E49\u0E16\u0E39\u0E01\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01';
        statusSubtitle.innerText = '\u0E2B\u0E32\u0E01\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E2A\u0E07\u0E2A\u0E31\u0E22 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E04\u0E32\u0E19\u0E4C\u0E40\u0E15\u0E2D\u0E23\u0E4C';
        readyBanner.classList.add('hidden');
      }

      previousStatus = status;
    }

    function setNodeActive(name) {
      const el = document.getElementById('step-node-' + name);
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-amber-600 text-white shadow-md ring-4 ring-amber-100';
    }

    function setNodeDone(name) {
      const el = document.getElementById('step-node-' + name);
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-600 text-white shadow';
      el.innerHTML = '\u2713';
    }

    // Initial fetch + interval polling every 3s
    fetchStatus();
    setInterval(fetchStatus, 3000);
  <\/script>
</body>
</html>`;
}
__name(renderTrackingPage, "renderTrackingPage");

// src/views/dashboard.ts
function renderDashboardPage() {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u0E41\u0E14\u0E0A\u0E1A\u0E2D\u0E23\u0E4C\u0E14\u0E1A\u0E32\u0E23\u0E34\u0E2A\u0E15\u0E49\u0E32 | Crafted Cafe Dashboard</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Prompt', sans-serif; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-stone-100 text-stone-800 min-h-screen">

  <!-- Top Navbar -->
  <header class="bg-stone-900 text-white sticky top-0 z-30 shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xl shadow">
          \u2615
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-bold text-base sm:text-lg text-white">Barista & Kitchen Dashboard</h1>
            <span class="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-amber-500/30">D1 Live</span>
          </div>
          <p class="text-xs text-stone-400">\u0E23\u0E49\u0E32\u0E19 Crafted Cafe \u2022 \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E04\u0E34\u0E27\u0E41\u0E25\u0E30\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Audio Notification Toggle -->
        <button id="soundToggleBtn" onclick="toggleSound()" class="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-stone-700">
          <span id="soundIcon">\u{1F514}</span>
          <span id="soundText">\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E2A\u0E35\u0E22\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19</span>
        </button>

        <!-- Menu Management Button -->
        <button onclick="openMenuManageModal()" class="text-xs bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow">
          <span>\u{1F4CB}</span> \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39 & \u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E04\u0E32
        </button>

        <!-- Customer Store Link -->
        <a href="/" target="_blank" class="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-xl transition border border-stone-700 hidden sm:flex items-center gap-1">
          <span>\u2197\uFE0F</span> \u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-6 space-y-6">

    <!-- KPI / Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      <!-- Total Orders -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-stone-500">\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49</span>
          <span class="text-base">\u{1F4DD}</span>
        </div>
        <p id="statTotalOrders" class="text-2xl font-extrabold text-stone-900 mt-2">0</p>
      </div>

      <!-- Total Revenue -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-stone-500">\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21</span>
          <span class="text-base">\u{1F4B0}</span>
        </div>
        <p id="statTotalRev" class="text-2xl font-extrabold text-amber-700 mt-2">\u0E3F0</p>
      </div>

      <!-- Pending Queue -->
      <div class="bg-amber-50 p-4 rounded-2xl shadow-sm border border-amber-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-800">\u0E23\u0E2D\u0E23\u0E31\u0E1A\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C</span>
          <span class="text-base">\u23F3</span>
        </div>
        <p id="statPending" class="text-2xl font-extrabold text-amber-700 mt-2">0</p>
      </div>

      <!-- Preparing Queue -->
      <div class="bg-blue-50 p-4 rounded-2xl shadow-sm border border-blue-200">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-blue-800">\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E07</span>
          <span class="text-base">\u2615</span>
        </div>
        <p id="statPreparing" class="text-2xl font-extrabold text-blue-700 mt-2">0</p>
      </div>

      <!-- Ready Queue -->
      <div class="bg-emerald-50 p-4 rounded-2xl shadow-sm border border-emerald-200 col-span-2 sm:col-span-1">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-800">\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F</span>
          <span class="text-base">\u{1F389}</span>
        </div>
        <p id="statReady" class="text-2xl font-extrabold text-emerald-700 mt-2">0</p>
      </div>
    </div>

    <!-- Filter Tabs & Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-stone-200 shadow-sm">
      <div class="flex space-x-1.5 overflow-x-auto hide-scrollbar text-xs">
        <button onclick="setFilter('active')" id="tab-active" class="tab-btn px-4 py-2 rounded-xl font-bold bg-amber-700 text-white shadow-sm transition whitespace-nowrap">
          \u26A1 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23 (<span id="countActive">0</span>)
        </button>
        <button onclick="setFilter('pending')" id="tab-pending" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          \u23F3 \u0E23\u0E2D\u0E23\u0E31\u0E1A (<span id="countPending">0</span>)
        </button>
        <button onclick="setFilter('preparing')" id="tab-preparing" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          \u2615 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E07 (<span id="countPreparing">0</span>)
        </button>
        <button onclick="setFilter('ready')" id="tab-ready" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          \u{1F389} \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F (<span id="countReady">0</span>)
        </button>
        <button onclick="setFilter('all')" id="tab-all" class="tab-btn px-4 py-2 rounded-xl font-medium text-stone-600 hover:bg-stone-100 transition whitespace-nowrap">
          \u{1F4DC} \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14
        </button>
      </div>

      <div class="flex items-center justify-end gap-2 text-xs text-stone-500 px-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>\u0E0B\u0E34\u0E07\u0E01\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E14\u0E17\u0E38\u0E01 4 \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35</span>
        <button onclick="loadDashboardData()" class="p-1 hover:text-stone-800 text-sm" title="\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A\u0E17\u0E31\u0E19\u0E17\u0E35">\u{1F504}</button>
      </div>
    </div>

    <!-- Orders Grid -->
    <div id="ordersGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Order Cards rendered via JS -->
    </div>

    <div id="noOrdersAlert" class="hidden text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300">
      <span class="text-4xl">\u2615</span>
      <h3 class="text-base font-bold text-stone-700 mt-2">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49</h3>
      <p class="text-xs text-stone-400 mt-1">\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E2A\u0E31\u0E48\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21 \u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48\u0E42\u0E14\u0E22\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34</p>
    </div>

  </main>

  <!-- Menu Management & Price Edit Modal -->
  <div id="menuModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white w-full max-w-3xl rounded-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
      
      <!-- Modal Header -->
      <div class="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
        <div>
          <h3 class="font-bold text-base sm:text-lg text-stone-900 flex items-center gap-2">
            <span>\u{1F4CB}</span> \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21 & \u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E04\u0E32
          </h3>
          <p class="text-xs text-stone-500 mt-0.5">\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E21\u0E19\u0E39\u0E43\u0E2B\u0E21\u0E48, \u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E04\u0E32, \u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E34\u0E14/\u0E1B\u0E34\u0E14\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="openEditMenuModal(null)" class="bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5">
            <span>\u2795</span> \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E21\u0E19\u0E39\u0E43\u0E2B\u0E21\u0E48
          </button>
          <button onclick="closeMenuModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold w-8 h-8 rounded-lg flex items-center justify-center transition">\u2715</button>
        </div>
      </div>

      <!-- Category Filter Tabs inside Modal -->
      <div class="px-5 py-3 border-b border-stone-100 flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white text-xs">
        <span class="text-stone-400 text-[11px] whitespace-nowrap">\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48:</span>
        <button onclick="filterManageMenu(0)" id="mcat-0" class="mcat-btn px-3 py-1 rounded-full font-bold bg-amber-800 text-white shadow-sm transition whitespace-nowrap">
          \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14
        </button>
        <button onclick="filterManageMenu(1)" id="mcat-1" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          \u2615 \u0E01\u0E32\u0E41\u0E1F
        </button>
        <button onclick="filterManageMenu(2)" id="mcat-2" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          \u{1F375} \u0E0A\u0E32/\u0E21\u0E31\u0E17\u0E09\u0E30
        </button>
        <button onclick="filterManageMenu(3)" id="mcat-3" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          \u{1F95B} \u0E19\u0E21/\u0E42\u0E01\u0E42\u0E01\u0E49
        </button>
        <button onclick="filterManageMenu(4)" id="mcat-4" class="mcat-btn px-3 py-1 rounded-full text-stone-600 bg-stone-100 hover:bg-stone-200 transition whitespace-nowrap">
          \u{1F379} \u0E42\u0E0B\u0E14\u0E32/\u0E1C\u0E25\u0E44\u0E21\u0E49
        </button>
      </div>

      <!-- Menu Items List -->
      <div class="p-5 overflow-y-auto flex-1 divide-y divide-stone-100 space-y-3" id="menuManageList">
        <!-- Rendered via JS -->
      </div>

    </div>
  </div>

  <!-- Add / Edit Menu Item Form Modal -->
  <div id="editMenuModal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
      
      <div class="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 sticky top-0 z-10">
        <h4 id="editModalTitle" class="font-bold text-base text-stone-900">\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E21\u0E19\u0E39\u0E43\u0E2B\u0E21\u0E48</h4>
        <button onclick="closeEditMenuModal()" class="text-stone-400 hover:text-stone-700 text-xl font-bold">\u2715</button>
      </div>

      <form id="menuItemForm" onsubmit="handleMenuFormSubmit(event)" class="p-5 space-y-4 text-xs">
        <input type="hidden" id="formMenuId" value="">

        <!-- Name -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21 <span class="text-red-500">*</span></label>
          <input type="text" id="formMenuName" required placeholder="\u0E40\u0E0A\u0E48\u0E19 \u0E0A\u0E32\u0E40\u0E02\u0E35\u0E22\u0E27\u0E21\u0E31\u0E17\u0E09\u0E30\u0E19\u0E21\u0E2A\u0E14\u0E40\u0E22\u0E47\u0E19" class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
        </div>

        <!-- Category & Price in 2 columns -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-stone-700 mb-1">\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48 <span class="text-red-500">*</span></label>
            <select id="formMenuCategory" required class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
              <option value="1">\u2615 \u0E01\u0E32\u0E41\u0E1F\u0E2A\u0E14</option>
              <option value="2">\u{1F375} \u0E0A\u0E32\u0E41\u0E25\u0E30\u0E21\u0E31\u0E17\u0E09\u0E30</option>
              <option value="3">\u{1F95B} \u0E19\u0E21\u0E2A\u0E14\u0E41\u0E25\u0E30\u0E0A\u0E47\u0E2D\u0E01\u0E42\u0E01\u0E41\u0E25\u0E15</option>
              <option value="4">\u{1F379} \u0E2D\u0E34\u0E15\u0E32\u0E40\u0E25\u0E35\u0E22\u0E19\u0E42\u0E0B\u0E14\u0E32 & \u0E1C\u0E25\u0E44\u0E21\u0E49</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-amber-800 mb-1">\u0E23\u0E32\u0E04\u0E32\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (\u0E1A\u0E32\u0E17) <span class="text-red-500">*</span></label>
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-stone-400 font-bold">\u0E3F</span>
              <input type="number" id="formMenuPrice" required min="0" step="1" placeholder="50" class="w-full pl-7 pr-3 p-2.5 bg-amber-50/50 border border-amber-300 font-bold text-amber-900 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-sm">
            </div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 / \u0E2A\u0E48\u0E27\u0E19\u0E1C\u0E2A\u0E21</label>
          <textarea id="formMenuDesc" rows="2" placeholder="\u0E23\u0E2A\u0E0A\u0E32\u0E15\u0E34\u0E2B\u0E2D\u0E21\u0E40\u0E02\u0E49\u0E21\u0E02\u0E49\u0E19 \u0E2B\u0E27\u0E32\u0E19\u0E21\u0E31\u0E19\u0E25\u0E07\u0E15\u0E31\u0E27" class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"></textarea>
        </div>

        <!-- Image URL -->
        <div>
          <label class="block font-semibold text-stone-700 mb-1">\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E (Image URL)</label>
          <input type="url" id="formMenuImg" placeholder="https://images.unsplash.com/..." class="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs">
          <p class="text-[10px] text-stone-400 mt-1">\u0E2B\u0E32\u0E01\u0E40\u0E27\u0E49\u0E19\u0E27\u0E48\u0E32\u0E07 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E43\u0E0A\u0E49\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E41\u0E1F\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E43\u0E2B\u0E49\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34</p>
        </div>

        <!-- Availability Status Checkbox -->
        <div class="pt-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="formMenuAvailable" checked class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
            <span class="font-semibold text-stone-800">\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E1B\u0E34\u0E14\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E17\u0E31\u0E19\u0E17\u0E35</span>
          </label>
        </div>

        <!-- Buttons -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
          <button type="button" onclick="closeEditMenuModal()" class="px-4 py-2 text-stone-500 hover:text-stone-800 font-medium transition">
            \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01
          </button>
          <button type="submit" id="saveMenuBtn" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition flex items-center gap-1">
            <span>\u{1F4BE}</span> \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E21\u0E19\u0E39
          </button>
        </div>
      </form>

    </div>
  </div>

  <script>
    let currentFilter = 'active';
    let soundEnabled = false;
    let knownOrderIds = new Set();
    let isFirstLoad = true;

    // Beep synthesizer for new orders
    function playNewOrderSound() {
      if (!soundEnabled) return;
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {
        console.log('Audio autoplay prevented', e);
      }
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('soundIcon');
      const text = document.getElementById('soundText');
      const btn = document.getElementById('soundToggleBtn');
      if (soundEnabled) {
        icon.innerText = '\u{1F514}';
        text.innerText = '\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E2A\u0E35\u0E22\u0E07\u0E41\u0E25\u0E49\u0E27';
        btn.classList.add('bg-emerald-900', 'text-emerald-200', 'border-emerald-600');
        playNewOrderSound();
      } else {
        icon.innerText = '\u{1F515}';
        text.innerText = '\u0E1B\u0E34\u0E14\u0E40\u0E2A\u0E35\u0E22\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19';
        btn.classList.remove('bg-emerald-900', 'text-emerald-200', 'border-emerald-600');
      }
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-700', 'text-white', 'shadow-sm', 'font-bold');
        btn.classList.add('text-stone-600', 'font-medium');
      });
      const activeBtn = document.getElementById('tab-' + filter);
      if (activeBtn) {
        activeBtn.classList.remove('text-stone-600', 'font-medium');
        activeBtn.classList.add('bg-amber-700', 'text-white', 'shadow-sm', 'font-bold');
      }
      loadDashboardData();
    }

    async function loadDashboardData() {
      try {
        // 1. Fetch Stats
        const statsRes = await fetch('/api/admin/stats');
        const statsData = await statsRes.json();
        if (statsData.success && statsData.stats) {
          const s = statsData.stats;
          document.getElementById('statTotalOrders').innerText = s.total_orders;
          document.getElementById('statTotalRev').innerText = '\u0E3F' + Number(s.total_revenue).toLocaleString();
          document.getElementById('statPending').innerText = s.pending_count;
          document.getElementById('statPreparing').innerText = s.preparing_count;
          document.getElementById('statReady').innerText = s.ready_count;

          document.getElementById('countActive').innerText = s.pending_count + s.preparing_count + s.ready_count;
          document.getElementById('countPending').innerText = s.pending_count;
          document.getElementById('countPreparing').innerText = s.preparing_count;
          document.getElementById('countReady').innerText = s.ready_count;
        }

        // 2. Fetch Orders with filter
        const ordersRes = await fetch('/api/admin/orders?status=' + currentFilter);
        const ordersData = await ordersRes.json();
        if (ordersData.success) {
          renderOrders(ordersData.orders);

          // Check for brand new orders to play sound
          let hasNew = false;
          ordersData.orders.forEach(o => {
            if (!knownOrderIds.has(o.id)) {
              knownOrderIds.add(o.id);
              if (!isFirstLoad && o.status === 'pending') {
                hasNew = true;
              }
            }
          });
          if (hasNew) playNewOrderSound();
          isFirstLoad = false;
        }
      } catch (err) {
        console.error('Dashboard load error', err);
      }
    }

    function renderOrders(orders) {
      const grid = document.getElementById('ordersGrid');
      const emptyAlert = document.getElementById('noOrdersAlert');

      if (!orders || orders.length === 0) {
        grid.innerHTML = '';
        emptyAlert.classList.remove('hidden');
        return;
      }

      emptyAlert.classList.add('hidden');

      grid.innerHTML = orders.map(ord => {
        const statusConfig = {
          pending: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-500 text-white', label: '\u0E23\u0E2D\u0E23\u0E31\u0E1A\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C', icon: '\u23F3' },
          preparing: { bg: 'bg-blue-50/70', border: 'border-blue-300', badge: 'bg-blue-600 text-white', label: '\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E07', icon: '\u2615' },
          ready: { bg: 'bg-emerald-50', border: 'border-emerald-400', badge: 'bg-emerald-600 text-white', label: '\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F', icon: '\u{1F389}' },
          completed: { bg: 'bg-stone-50', border: 'border-stone-200', badge: 'bg-stone-600 text-white', label: '\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19', icon: '\u2713' },
          cancelled: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600 text-white', label: '\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01', icon: '\u2715' },
        }[ord.status] || { bg: 'bg-white', border: 'border-stone-200', badge: 'bg-stone-500 text-white', label: ord.status, icon: '\u2022' };

        let formattedTime = '-';
        try {
          const rawDate = ord.created_at ? ord.created_at.replace(' ', 'T') : '';
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            formattedTime = d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
          } else {
            formattedTime = ord.created_at ? ord.created_at.split(' ')[1] || ord.created_at : '-';
          }
        } catch (e) {
          formattedTime = ord.created_at || '-';
        }

        const ordNotes = ord.notes && ord.notes !== 'null' && ord.notes.trim() !== '' ? ord.notes : null;
        const ordTable = ord.table_no && ord.table_no !== 'null' ? ord.table_no : '-';
        const ordPhone = ord.customer_phone && ord.customer_phone !== 'null' ? ord.customer_phone : null;

        return \`
          <div class="rounded-3xl p-5 border-2 shadow-sm flex flex-col justify-between transition-all duration-200 \${statusConfig.bg} \${statusConfig.border}">
            
            <div>
              <!-- Header with Order Code & Badge -->
              <div class="flex items-start justify-between pb-3 border-b border-stone-200/70">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-2xl font-black text-stone-900 tracking-wider">#\${ord.order_code}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full \${statusConfig.badge} flex items-center gap-1">
                      <span>\${statusConfig.icon}</span> \${statusConfig.label}
                    </span>
                  </div>
                  <p class="text-xs text-stone-500 mt-1">\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E31\u0E48\u0E07: \${formattedTime} \u0E19.</p>
                </div>

                <div class="text-right">
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg \${ord.order_type === 'dine_in' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-900'}">
                    \${ord.order_type === 'dine_in' ? '\u{1F37D}\uFE0F \u0E42\u0E15\u0E4A\u0E30 ' + ordTable : '\u{1F964} \u0E01\u0E25\u0E31\u0E1A\u0E1A\u0E49\u0E32\u0E19'}
                  </span>
                </div>
              </div>

              <!-- Customer Details -->
              <div class="py-2.5 flex items-center justify-between text-xs text-stone-600">
                <span class="font-semibold text-stone-800">\u{1F464} \${ord.customer_name}</span>
                \${ordPhone ? \`<span class="text-stone-500">\u{1F4DE} \${ordPhone}</span>\` : ''}
              </div>

              \${ordNotes ? \`
                <div class="bg-amber-100/70 border border-amber-300 text-amber-900 text-xs px-3 py-1.5 rounded-xl mb-3 font-medium">
                  \u{1F4AC} \u0E42\u0E19\u0E49\u0E15: \${ordNotes}
                </div>
              \` : ''}

              <!-- Items List -->
              <div class="space-y-2 py-2">
                \${(ord.items || []).map(item => \`
                  <div class="bg-white/80 p-2.5 rounded-xl border border-stone-200/80 text-xs space-y-1">
                    <div class="flex justify-between font-bold text-stone-900">
                      <span>\${item.item_name}</span>
                      <span class="text-amber-800 font-extrabold">\xD7 \${item.quantity}</span>
                    </div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">\${item.temperature}</span>
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">\u0E2B\u0E27\u0E32\u0E19 \${item.sweetness}</span>
                      <span class="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium">\${item.ice}</span>
                      \${item.toppings ? \`<span class="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">\${item.toppings}</span>\` : ''}
                    </div>
                    \${item.item_notes ? \`<p class="text-[10px] text-stone-400 italic">" \${item.item_notes} "</p>\` : ''}
                  </div>
                \`).join('')}
              </div>
            </div>

            <!-- Bottom Actions -->
            <div class="pt-4 mt-2 border-t border-stone-200/70 space-y-2.5">
              <div class="flex justify-between items-center text-xs">
                <span class="text-stone-500">\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E34\u0E49\u0E19</span>
                <span class="text-base font-extrabold text-amber-900">\u0E3F\${ord.total_amount}</span>
              </div>

              <!-- Action buttons depending on state -->
              <div class="grid grid-cols-1 gap-2 pt-1">
                \${ord.status === 'pending' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'preparing')" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5">
                    <span>\u2615 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E07\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E19\u0E35\u0E49</span>
                  </button>
                  <button onclick="updateOrderStatus(\${ord.id}, 'cancelled')" class="w-full py-1.5 text-stone-400 hover:text-red-600 text-[11px] font-medium transition text-center">
                    \u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C
                  </button>
                \` : ''}

                \${ord.status === 'preparing' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'ready')" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 animate-pulse">
                    <span>\u{1F389} \u0E0A\u0E07\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27 - \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E1F</span>
                  </button>
                \` : ''}

                \${ord.status === 'ready' ? \`
                  <button onclick="updateOrderStatus(\${ord.id}, 'completed')" class="w-full py-2.5 bg-stone-800 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5">
                    <span>\u2713 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E41\u0E25\u0E49\u0E27 (\u0E1B\u0E34\u0E14\u0E07\u0E32\u0E19)</span>
                  </button>
                \` : ''}

                \${ord.status === 'completed' ? \`
                  <span class="text-center text-[11px] text-emerald-700 font-semibold py-1">\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E34\u0E49\u0E19\u0E41\u0E25\u0E49\u0E27</span>
                \` : ''}

                \${ord.status === 'cancelled' ? \`
                  <span class="text-center text-[11px] text-red-600 font-semibold py-1">\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01\u0E41\u0E25\u0E49\u0E27</span>
                \` : ''}
              </div>

            </div>

          </div>
        \`;
      }).join('');
    }

    async function updateOrderStatus(orderId, newStatus) {
      try {
        const res = await fetch('/api/admin/orders/' + orderId + '/status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
          loadDashboardData();
        } else {
          alert('\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ' + (data.error || '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E44\u0E14\u0E49'));
        }
      } catch (err) {
        alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C');
      }
    }

    // ==========================================
    // Menu & Price Management (CRUD)
    // ==========================================
    let manageMenuItems = [];
    let manageSelectedCat = 0;

    async function openMenuManageModal() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
          manageMenuItems = data.items;
          renderManageMenuList();
          document.getElementById('menuModal').classList.remove('hidden');
        }
      } catch (err) {
        console.error('Failed to load menu for management', err);
      }
    }

    function closeMenuModal() {
      document.getElementById('menuModal').classList.add('hidden');
    }

    function filterManageMenu(catId) {
      manageSelectedCat = catId;
      document.querySelectorAll('.mcat-btn').forEach(b => {
        b.classList.remove('bg-amber-800', 'text-white', 'shadow-sm', 'font-bold');
        b.classList.add('text-stone-600', 'bg-stone-100');
      });
      const active = document.getElementById('mcat-' + catId);
      if (active) {
        active.classList.remove('text-stone-600', 'bg-stone-100');
        active.classList.add('bg-amber-800', 'text-white', 'shadow-sm', 'font-bold');
      }
      renderManageMenuList();
    }

    function renderManageMenuList() {
      const list = document.getElementById('menuManageList');
      const filtered = manageSelectedCat === 0
        ? manageMenuItems
        : manageMenuItems.filter(i => i.category_id === manageSelectedCat);

      if (filtered.length === 0) {
        list.innerHTML = '<p class="text-center text-stone-400 py-10 text-xs">\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E21\u0E19\u0E39\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49</p>';
        return;
      }

      list.innerHTML = filtered.map(item => \`
        <div class="pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-stone-50/80 p-2 rounded-2xl transition">
          
          <!-- Image & Name & Description -->
          <div class="flex items-center gap-3">
            <img src="\${item.image_url}" alt="\${item.name}" class="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shadow-sm flex-shrink-0">
            <div>
              <div class="flex items-center gap-2">
                <h5 class="font-bold text-xs sm:text-sm text-stone-900">\${item.name}</h5>
                <span class="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                  \${item.category_name || ''}
                </span>
              </div>
              <p class="text-[11px] text-stone-400 line-clamp-1 mt-0.5">\${item.description || '-'}</p>
            </div>
          </div>

          <!-- Price & Action Buttons -->
          <div class="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
            
            <!-- Price Display & Quick Edit Button -->
            <div class="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
              <span class="text-xs font-bold text-amber-900">\u0E3F\${item.price}</span>
              <button onclick="quickEditPrice(\${item.id}, \${item.price}, '\${item.name}')" class="text-[11px] text-amber-700 hover:text-amber-900 font-semibold underline ml-1" title="\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E32\u0E04\u0E32">
                \u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E04\u0E32
              </button>
            </div>

            <!-- In Stock / Out of Stock Toggle -->
            <button onclick="toggleMenuItem(\${item.id})" class="text-xs px-2.5 py-1 rounded-xl font-bold transition \${item.is_available ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300' : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'}">
              \${item.is_available ? '\u2713 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E02\u0E32\u0E22' : '\u2715 \u0E02\u0E2D\u0E07\u0E2B\u0E21\u0E14'}
            </button>

            <!-- Edit Details Button -->
            <button onclick="openEditMenuModal(\${item.id})" class="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-xl font-medium transition flex items-center gap-1 border border-stone-200">
              <span>\u270F\uFE0F</span> \u0E41\u0E01\u0E49\u0E44\u0E02
            </button>

            <!-- Delete Button -->
            <button onclick="deleteMenuItem(\${item.id}, '\${item.name}')" class="text-xs bg-stone-50 hover:bg-red-50 text-stone-400 hover:text-red-600 p-1.5 rounded-xl transition" title="\u0E25\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E19\u0E35\u0E49">
              \u{1F5D1}\uFE0F
            </button>

          </div>

        </div>
      \`).join('');
    }

    // Quick Edit Price
    async function quickEditPrice(id, currentPrice, name) {
      const newPriceStr = prompt('\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E04\u0E32\u0E43\u0E2B\u0E21\u0E48\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A "' + name + '" (\u0E1A\u0E32\u0E17):', currentPrice);
      if (newPriceStr === null) return; // User cancelled

      const newPrice = Number(newPriceStr.trim());
      if (isNaN(newPrice) || newPrice < 0) {
        alert('\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E23\u0E32\u0E04\u0E32\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07');
        return;
      }

      try {
        const res = await fetch('/api/admin/menu/' + id + '/price', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: newPrice })
        });
        const data = await res.json();
        if (data.success) {
          const item = manageMenuItems.find(i => i.id === id);
          if (item) item.price = newPrice;
          renderManageMenuList();
        } else {
          alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ' + (data.error || '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E04\u0E32\u0E44\u0E14\u0E49'));
        }
      } catch (err) {
        alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C');
      }
    }

    // Toggle stock availability
    async function toggleMenuItem(id) {
      try {
        const res = await fetch('/api/admin/menu/' + id + '/toggle', { method: 'PATCH' });
        const data = await res.json();
        if (data.success) {
          const item = manageMenuItems.find(i => i.id === id);
          if (item) item.is_available = data.is_available;
          renderManageMenuList();
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Open Add or Edit Modal
    function openEditMenuModal(itemId) {
      const modal = document.getElementById('editMenuModal');
      const title = document.getElementById('editModalTitle');
      const form = document.getElementById('menuItemForm');
      form.reset();

      if (itemId) {
        // Edit Mode
        const item = manageMenuItems.find(i => i.id === itemId);
        if (!item) return;

        title.innerText = '\u0E41\u0E01\u0E49\u0E44\u0E02\u0E40\u0E21\u0E19\u0E39: ' + item.name;
        document.getElementById('formMenuId').value = item.id;
        document.getElementById('formMenuName').value = item.name;
        document.getElementById('formMenuCategory').value = item.category_id;
        document.getElementById('formMenuPrice').value = item.price;
        document.getElementById('formMenuDesc').value = item.description || '';
        document.getElementById('formMenuImg').value = item.image_url || '';
        document.getElementById('formMenuAvailable').checked = item.is_available === 1;
      } else {
        // Add Mode
        title.innerText = '\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E21\u0E19\u0E39\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21\u0E43\u0E2B\u0E21\u0E48';
        document.getElementById('formMenuId').value = '';
        document.getElementById('formMenuCategory').value = '1';
        document.getElementById('formMenuPrice').value = '50';
        document.getElementById('formMenuAvailable').checked = true;
      }

      modal.classList.remove('hidden');
    }

    function closeEditMenuModal() {
      document.getElementById('editMenuModal').classList.add('hidden');
    }

    // Handle Add / Edit Form Submission
    async function handleMenuFormSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('formMenuId').value;
      const name = document.getElementById('formMenuName').value.trim();
      const categoryId = Number(document.getElementById('formMenuCategory').value);
      const price = Number(document.getElementById('formMenuPrice').value);
      const description = document.getElementById('formMenuDesc').value.trim();
      const imageUrl = document.getElementById('formMenuImg').value.trim();
      const isAvailable = document.getElementById('formMenuAvailable').checked ? 1 : 0;

      const payload = {
        name,
        category_id: categoryId,
        price,
        description,
        image_url: imageUrl || undefined,
        is_available: isAvailable
      };

      const saveBtn = document.getElementById('saveMenuBtn');
      saveBtn.disabled = true;
      saveBtn.innerText = '\u0E01\u0E33\u0E25\u0E31\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01...';

      try {
        let res;
        if (id) {
          // Update existing
          res = await fetch('/api/admin/menu/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          // Create new
          res = await fetch('/api/admin/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        const data = await res.json();
        if (data.success) {
          closeEditMenuModal();
          // Reload menu
          await openMenuManageModal();
        } else {
          alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ' + (data.error || '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E44\u0E14\u0E49'));
        }
      } catch (err) {
        alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C');
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<span>\u{1F4BE}</span> \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E21\u0E19\u0E39';
      }
    }

    // Delete Menu Item
    async function deleteMenuItem(id, name) {
      if (!confirm('\u0E04\u0E38\u0E13\u0E41\u0E19\u0E48\u0E43\u0E08\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E40\u0E21\u0E19\u0E39 "' + name + '" ? (\u0E01\u0E32\u0E23\u0E25\u0E1A\u0E08\u0E30\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E01\u0E39\u0E49\u0E04\u0E37\u0E19\u0E44\u0E14\u0E49)')) {
        return;
      }

      try {
        const res = await fetch('/api/admin/menu/' + id, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          manageMenuItems = manageMenuItems.filter(i => i.id !== id);
          renderManageMenuList();
        } else {
          alert('\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14: ' + (data.error || '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E25\u0E1A\u0E44\u0E14\u0E49'));
        }
      } catch (err) {
        alert('\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C');
      }
    }

    // Auto-polling dashboard every 4s
    loadDashboardData();
    setInterval(loadDashboardData, 4000);
  <\/script>
</body>
</html>`;
}
__name(renderDashboardPage, "renderDashboardPage");

// src/index.ts
var app = new Hono2();
app.use("*", logger());
app.use("/api/*", cors());
app.route("/api", api);
app.get("/", (c) => {
  return c.html(renderCustomerPage());
});
app.get("/order/:code", (c) => {
  const code = c.req.param("code");
  return c.html(renderTrackingPage(code));
});
app.get("/dashboard", (c) => {
  return c.html(renderDashboardPage());
});
app.notFound((c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
      <meta charset="UTF-8">
      <title>404 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E35\u0E49</title>
      <script src="https://cdn.tailwindcss.com"><\/script>
    </head>
    <body class="bg-stone-50 flex items-center justify-center min-h-screen font-sans text-center p-4">
      <div>
        <h1 class="text-6xl font-black text-amber-700">404</h1>
        <p class="text-lg text-stone-600 mt-2">\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23</p>
        <a href="/" class="mt-4 inline-block bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium">\u0E01\u0E25\u0E31\u0E1A\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01</a>
      </div>
    </body>
    </html>
  `, 404);
});
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-tb8b1m/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-tb8b1m/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
