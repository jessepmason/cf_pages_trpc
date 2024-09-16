// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/codes-c924c3db.mjs
function invert(obj) {
  const newObj = /* @__PURE__ */ Object.create(null);
  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }
  return newObj;
}
var TRPC_ERROR_CODES_BY_KEY = {
  /**
  * Invalid JSON was received by the server.
  * An error occurred on the server while parsing the JSON text.
  */
  PARSE_ERROR: -32700,
  /**
  * The JSON sent is not a valid Request object.
  */
  BAD_REQUEST: -32600,
  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,
  // Implementation specific errors
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNPROCESSABLE_CONTENT: -32022,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099
};
var TRPC_ERROR_CODES_BY_NUMBER = invert(TRPC_ERROR_CODES_BY_KEY);

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/index-f91d720c.mjs
var TRPC_ERROR_CODES_BY_NUMBER2 = invert(TRPC_ERROR_CODES_BY_KEY);
var JSONRPC2_TO_HTTP_CODE = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501
};
function getStatusCodeFromKey(code) {
  return JSONRPC2_TO_HTTP_CODE[code] ?? 500;
}
function getHTTPStatusCode(json) {
  const arr = Array.isArray(json) ? json : [
    json
  ];
  const httpStatuses = new Set(arr.map((res) => {
    if ("error" in res) {
      const data = res.error.data;
      if (typeof data.httpStatus === "number") {
        return data.httpStatus;
      }
      const code = TRPC_ERROR_CODES_BY_NUMBER2[res.error.code];
      return getStatusCodeFromKey(code);
    }
    return 200;
  }));
  if (httpStatuses.size !== 1) {
    return 207;
  }
  const httpStatus = httpStatuses.values().next().value;
  return httpStatus;
}
function getHTTPStatusCodeFromError(error) {
  return getStatusCodeFromKey(error.code);
}
var noop = () => {
};
function createInnerProxy(callback, path) {
  const proxy = new Proxy(noop, {
    get(_obj, key) {
      if (typeof key !== "string" || key === "then") {
        return void 0;
      }
      return createInnerProxy(callback, [
        ...path,
        key
      ]);
    },
    apply(_1, _2, args) {
      const isApply = path[path.length - 1] === "apply";
      return callback({
        args: isApply ? args.length >= 2 ? args[1] : [] : args,
        path: isApply ? path.slice(0, -1) : path
      });
    }
  });
  return proxy;
}
var createRecursiveProxy = (callback) => createInnerProxy(callback, []);
var createFlatProxy = (callback) => {
  return new Proxy(noop, {
    get(_obj, name) {
      if (typeof name !== "string" || name === "then") {
        return void 0;
      }
      return callback(name);
    }
  });
};

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/getCauseFromUnknown-2d66414a.mjs
function isObject(value) {
  return !!value && !Array.isArray(value) && typeof value === "object";
}
var UnknownCauseError = class extends Error {
};
function getCauseFromUnknown(cause) {
  if (cause instanceof Error) {
    return cause;
  }
  const type = typeof cause;
  if (type === "undefined" || type === "function" || cause === null) {
    return void 0;
  }
  if (type !== "object") {
    return new Error(String(cause));
  }
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }
  return void 0;
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/TRPCError-98d44758.mjs
function getTRPCErrorFromUnknown(cause) {
  if (cause instanceof TRPCError) {
    return cause;
  }
  if (cause instanceof Error && cause.name === "TRPCError") {
    return cause;
  }
  const trpcError = new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    cause
  });
  if (cause instanceof Error && cause.stack) {
    trpcError.stack = cause.stack;
  }
  return trpcError;
}
var TRPCError = class extends Error {
  constructor(opts) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? opts.code;
    super(message, {
      cause
    });
    this.code = opts.code;
    this.name = "TRPCError";
    if (!this.cause) {
      this.cause = cause;
    }
  }
};

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/config-d5fdbd39.mjs
function getDataTransformer(transformer) {
  if ("input" in transformer) {
    return transformer;
  }
  return {
    input: transformer,
    output: transformer
  };
}
var defaultTransformer = {
  _default: true,
  input: {
    serialize: (obj) => obj,
    deserialize: (obj) => obj
  },
  output: {
    serialize: (obj) => obj,
    deserialize: (obj) => obj
  }
};
var defaultFormatter = ({ shape }) => {
  return shape;
};
function omitPrototype(obj) {
  return Object.assign(/* @__PURE__ */ Object.create(null), obj);
}
var procedureTypes = [
  "query",
  "mutation",
  "subscription"
];
function isRouter(procedureOrRouter) {
  return "router" in procedureOrRouter._def;
}
var emptyRouter = {
  _ctx: null,
  _errorShape: null,
  _meta: null,
  queries: {},
  mutations: {},
  subscriptions: {},
  errorFormatter: defaultFormatter,
  transformer: defaultTransformer
};
var reservedWords = [
  /**
  * Then is a reserved word because otherwise we can't return a promise that returns a Proxy
  * since JS will think that `.then` is something that exists
  */
  "then"
];
function createRouterFactory(config) {
  return function createRouterInner(procedures) {
    const reservedWordsUsed = new Set(Object.keys(procedures).filter((v) => reservedWords.includes(v)));
    if (reservedWordsUsed.size > 0) {
      throw new Error("Reserved words used in `router({})` call: " + Array.from(reservedWordsUsed).join(", "));
    }
    const routerProcedures = omitPrototype({});
    function recursiveGetPaths(procedures2, path = "") {
      for (const [key, procedureOrRouter] of Object.entries(procedures2 ?? {})) {
        const newPath = `${path}${key}`;
        if (isRouter(procedureOrRouter)) {
          recursiveGetPaths(procedureOrRouter._def.procedures, `${newPath}.`);
          continue;
        }
        if (routerProcedures[newPath]) {
          throw new Error(`Duplicate key: ${newPath}`);
        }
        routerProcedures[newPath] = procedureOrRouter;
      }
    }
    recursiveGetPaths(procedures);
    const _def = {
      _config: config,
      router: true,
      procedures: routerProcedures,
      ...emptyRouter,
      record: procedures,
      queries: Object.entries(routerProcedures).filter((pair) => pair[1]._def.query).reduce((acc, [key, val]) => ({
        ...acc,
        [key]: val
      }), {}),
      mutations: Object.entries(routerProcedures).filter((pair) => pair[1]._def.mutation).reduce((acc, [key, val]) => ({
        ...acc,
        [key]: val
      }), {}),
      subscriptions: Object.entries(routerProcedures).filter((pair) => pair[1]._def.subscription).reduce((acc, [key, val]) => ({
        ...acc,
        [key]: val
      }), {})
    };
    const router2 = {
      ...procedures,
      _def,
      createCaller(ctx) {
        return createCallerFactory()(router2)(ctx);
      },
      getErrorShape(opts) {
        const { path, error } = opts;
        const { code } = opts.error;
        const shape = {
          message: error.message,
          code: TRPC_ERROR_CODES_BY_KEY[code],
          data: {
            code,
            httpStatus: getHTTPStatusCodeFromError(error)
          }
        };
        if (config.isDev && typeof opts.error.stack === "string") {
          shape.data.stack = opts.error.stack;
        }
        if (typeof path === "string") {
          shape.data.path = path;
        }
        return this._def._config.errorFormatter({
          ...opts,
          shape
        });
      }
    };
    return router2;
  };
}
function callProcedure(opts) {
  const { type, path } = opts;
  if (!(path in opts.procedures) || !opts.procedures[path]?._def[type]) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No "${type}"-procedure on path "${path}"`
    });
  }
  const procedure = opts.procedures[path];
  return procedure(opts);
}
function createCallerFactory() {
  return function createCallerInner(router2) {
    const def = router2._def;
    return function createCaller(ctx) {
      const proxy = createRecursiveProxy(({ path, args }) => {
        if (path.length === 1 && procedureTypes.includes(path[0])) {
          return callProcedure({
            procedures: def.procedures,
            path: args[0],
            rawInput: args[1],
            ctx,
            type: path[0]
          });
        }
        const fullPath = path.join(".");
        const procedure = def.procedures[fullPath];
        let type = "query";
        if (procedure._def.mutation) {
          type = "mutation";
        } else if (procedure._def.subscription) {
          type = "subscription";
        }
        return procedure({
          path: fullPath,
          rawInput: args[0],
          ctx,
          type
        });
      });
      return proxy;
    };
  };
}
var isServerDefault = typeof window === "undefined" || "Deno" in window || globalThis.process?.env?.NODE_ENV === "test" || !!globalThis.process?.env?.JEST_WORKER_ID || !!globalThis.process?.env?.VITEST_WORKER_ID;

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/transformTRPCResponse-1153b421.mjs
function getErrorShape(opts) {
  const { path, error, config } = opts;
  const { code } = opts.error;
  const shape = {
    message: error.message,
    code: TRPC_ERROR_CODES_BY_KEY[code],
    data: {
      code,
      httpStatus: getHTTPStatusCodeFromError(error)
    }
  };
  if (config.isDev && typeof opts.error.stack === "string") {
    shape.data.stack = opts.error.stack;
  }
  if (typeof path === "string") {
    shape.data.path = path;
  }
  return config.errorFormatter({
    ...opts,
    shape
  });
}
function transformTRPCResponseItem(config, item) {
  if ("error" in item) {
    return {
      ...item,
      error: config.transformer.output.serialize(item.error)
    };
  }
  if ("data" in item.result) {
    return {
      ...item,
      result: {
        ...item.result,
        data: config.transformer.output.serialize(item.result.data)
      }
    };
  }
  return item;
}
function transformTRPCResponse(config, itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map((item) => transformTRPCResponseItem(config, item)) : transformTRPCResponseItem(config, itemOrItems);
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/contentType-9fd995d3.mjs
function getRawProcedureInputOrThrow(opts) {
  const { req } = opts;
  try {
    if (req.method === "GET") {
      if (!req.query.has("input")) {
        return void 0;
      }
      const raw = req.query.get("input");
      return JSON.parse(raw);
    }
    if (!opts.preprocessedBody && typeof req.body === "string") {
      return req.body.length === 0 ? void 0 : JSON.parse(req.body);
    }
    return req.body;
  } catch (cause) {
    throw new TRPCError({
      code: "PARSE_ERROR",
      cause
    });
  }
}
var deserializeInputValue = (rawValue, transformer) => {
  return typeof rawValue !== "undefined" ? transformer.input.deserialize(rawValue) : rawValue;
};
var getJsonContentTypeInputs = (opts) => {
  const rawInput = getRawProcedureInputOrThrow(opts);
  const transformer = opts.router._def._config.transformer;
  if (!opts.isBatchCall) {
    return {
      0: deserializeInputValue(rawInput, transformer)
    };
  }
  if (rawInput == null || typeof rawInput !== "object" || Array.isArray(rawInput)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: '"input" needs to be an object when doing a batch call'
    });
  }
  const input = {};
  for (const key in rawInput) {
    const k = key;
    const rawValue = rawInput[k];
    const value = deserializeInputValue(rawValue, transformer);
    input[k] = value;
  }
  return input;
};

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/resolveHTTPResponse-2fc435bb.mjs
var HTTP_METHOD_PROCEDURE_TYPE_MAP = {
  GET: "query",
  POST: "mutation"
};
var fallbackContentTypeHandler = {
  getInputs: getJsonContentTypeInputs
};
function initResponse(initOpts) {
  const { ctx, paths, type, responseMeta, untransformedJSON, errors = [] } = initOpts;
  let status = untransformedJSON ? getHTTPStatusCode(untransformedJSON) : 200;
  const headers = {
    "Content-Type": "application/json"
  };
  const eagerGeneration = !untransformedJSON;
  const data = eagerGeneration ? [] : Array.isArray(untransformedJSON) ? untransformedJSON : [
    untransformedJSON
  ];
  const meta = responseMeta?.({
    ctx,
    paths,
    type,
    data,
    errors,
    eagerGeneration
  }) ?? {};
  for (const [key, value] of Object.entries(meta.headers ?? {})) {
    headers[key] = value;
  }
  if (meta.status) {
    status = meta.status;
  }
  return {
    status,
    headers
  };
}
async function inputToProcedureCall(procedureOpts) {
  const { opts, ctx, type, input, path } = procedureOpts;
  try {
    const data = await callProcedure({
      procedures: opts.router._def.procedures,
      path,
      rawInput: input,
      ctx,
      type
    });
    return {
      result: {
        data
      }
    };
  } catch (cause) {
    const error = getTRPCErrorFromUnknown(cause);
    opts.onError?.({
      error,
      path,
      input,
      ctx,
      type,
      req: opts.req
    });
    return {
      error: getErrorShape({
        config: opts.router._def._config,
        error,
        type,
        path,
        input,
        ctx
      })
    };
  }
}
function caughtErrorToData(cause, errorOpts) {
  const { router: router2, req, onError } = errorOpts.opts;
  const error = getTRPCErrorFromUnknown(cause);
  onError?.({
    error,
    path: errorOpts.path,
    input: errorOpts.input,
    ctx: errorOpts.ctx,
    type: errorOpts.type,
    req
  });
  const untransformedJSON = {
    error: getErrorShape({
      config: router2._def._config,
      error,
      type: errorOpts.type,
      path: errorOpts.path,
      input: errorOpts.input,
      ctx: errorOpts.ctx
    })
  };
  const transformedJSON = transformTRPCResponse(router2._def._config, untransformedJSON);
  const body = JSON.stringify(transformedJSON);
  return {
    error,
    untransformedJSON,
    body
  };
}
async function resolveHTTPResponse(opts) {
  const { router: router2, req, unstable_onHead, unstable_onChunk } = opts;
  if (req.method === "HEAD") {
    const headResponse = {
      status: 204
    };
    unstable_onHead?.(headResponse, false);
    unstable_onChunk?.([
      -1,
      ""
    ]);
    return headResponse;
  }
  const contentTypeHandler = opts.contentTypeHandler ?? fallbackContentTypeHandler;
  const batchingEnabled = opts.batching?.enabled ?? true;
  const type = HTTP_METHOD_PROCEDURE_TYPE_MAP[req.method] ?? "unknown";
  let ctx = void 0;
  let paths;
  const isBatchCall = !!req.query.get("batch");
  const isStreamCall = isBatchCall && unstable_onHead && unstable_onChunk && req.headers["trpc-batch-mode"] === "stream";
  try {
    ctx = await opts.createContext();
    if (opts.error) {
      throw opts.error;
    }
    if (isBatchCall && !batchingEnabled) {
      throw new Error(`Batching is not enabled on the server`);
    }
    if (type === "subscription") {
      throw new TRPCError({
        message: "Subscriptions should use wsLink",
        code: "METHOD_NOT_SUPPORTED"
      });
    }
    if (type === "unknown") {
      throw new TRPCError({
        message: `Unexpected request method ${req.method}`,
        code: "METHOD_NOT_SUPPORTED"
      });
    }
    const inputs = await contentTypeHandler.getInputs({
      isBatchCall,
      req,
      router: router2,
      preprocessedBody: opts.preprocessedBody ?? false
    });
    paths = isBatchCall ? decodeURIComponent(opts.path).split(",") : [
      opts.path
    ];
    const promises = paths.map((path, index) => inputToProcedureCall({
      opts,
      ctx,
      type,
      input: inputs[index],
      path
    }));
    if (!isStreamCall) {
      const untransformedJSON = await Promise.all(promises);
      const errors = untransformedJSON.flatMap((response) => "error" in response ? [
        response.error
      ] : []);
      const headResponse1 = initResponse({
        ctx,
        paths,
        type,
        responseMeta: opts.responseMeta,
        untransformedJSON,
        errors
      });
      unstable_onHead?.(headResponse1, false);
      const result = isBatchCall ? untransformedJSON : untransformedJSON[0];
      const transformedJSON = transformTRPCResponse(router2._def._config, result);
      const body = JSON.stringify(transformedJSON);
      unstable_onChunk?.([
        -1,
        body
      ]);
      return {
        status: headResponse1.status,
        headers: headResponse1.headers,
        body
      };
    }
    const headResponse2 = initResponse({
      ctx,
      paths,
      type,
      responseMeta: opts.responseMeta
    });
    unstable_onHead(headResponse2, true);
    const indexedPromises = new Map(promises.map((promise, index) => [
      index,
      promise.then((r) => [
        index,
        r
      ])
    ]));
    for (const _ of paths) {
      const [index, untransformedJSON1] = await Promise.race(indexedPromises.values());
      indexedPromises.delete(index);
      try {
        const transformedJSON1 = transformTRPCResponse(router2._def._config, untransformedJSON1);
        const body1 = JSON.stringify(transformedJSON1);
        unstable_onChunk([
          index,
          body1
        ]);
      } catch (cause) {
        const path = paths[index];
        const input = inputs[index];
        const { body: body2 } = caughtErrorToData(cause, {
          opts,
          ctx,
          type,
          path,
          input
        });
        unstable_onChunk([
          index,
          body2
        ]);
      }
    }
    return;
  } catch (cause1) {
    const { error, untransformedJSON: untransformedJSON2, body: body3 } = caughtErrorToData(cause1, {
      opts,
      ctx,
      type
    });
    const headResponse3 = initResponse({
      ctx,
      paths,
      type,
      responseMeta: opts.responseMeta,
      untransformedJSON: untransformedJSON2,
      errors: [
        error
      ]
    });
    unstable_onHead?.(headResponse3, false);
    unstable_onChunk?.([
      -1,
      body3
    ]);
    return {
      status: headResponse3.status,
      headers: headResponse3.headers,
      body: body3
    };
  }
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/batchStreamFormatter-fc1ffb26.mjs
function getBatchStreamFormatter() {
  let first = true;
  function format(index, string) {
    const prefix = first ? "{" : ",";
    first = false;
    return `${prefix}"${index}":${string}
`;
  }
  format.end = () => "}";
  return format;
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/toURL-8f0ea228.mjs
function toURL(urlOrPathname) {
  const url = urlOrPathname.startsWith("/") ? `http://127.0.0.1${urlOrPathname}` : urlOrPathname;
  return new URL(url);
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/adapters/fetch/index.mjs
var trimSlashes = (path) => {
  path = path.startsWith("/") ? path.slice(1) : path;
  path = path.endsWith("/") ? path.slice(0, -1) : path;
  return path;
};
async function fetchRequestHandler(opts) {
  const resHeaders = new Headers();
  const createContext = async () => {
    return opts.createContext?.({
      req: opts.req,
      resHeaders
    });
  };
  const url = toURL(opts.req.url);
  const pathname = trimSlashes(url.pathname);
  const endpoint = trimSlashes(opts.endpoint);
  const path = trimSlashes(pathname.slice(endpoint.length));
  const req = {
    query: url.searchParams,
    method: opts.req.method,
    headers: Object.fromEntries(opts.req.headers),
    body: opts.req.headers.get("content-type")?.startsWith("application/json") ? await opts.req.text() : ""
  };
  let resolve;
  const promise = new Promise((r) => resolve = r);
  let status = 200;
  let isStream = false;
  let controller;
  let encoder;
  let formatter;
  const unstable_onHead = (head, isStreaming) => {
    for (const [key, value] of Object.entries(head.headers ?? {})) {
      if (typeof value === "undefined") {
        continue;
      }
      if (typeof value === "string") {
        resHeaders.set(key, value);
        continue;
      }
      for (const v of value) {
        resHeaders.append(key, v);
      }
    }
    status = head.status;
    if (isStreaming) {
      resHeaders.set("Transfer-Encoding", "chunked");
      resHeaders.append("Vary", "trpc-batch-mode");
      const stream = new ReadableStream({
        start(c) {
          controller = c;
        }
      });
      const response = new Response(stream, {
        status,
        headers: resHeaders
      });
      resolve(response);
      encoder = new TextEncoder();
      formatter = getBatchStreamFormatter();
      isStream = true;
    }
  };
  const unstable_onChunk = ([index, string]) => {
    if (index === -1) {
      const response = new Response(string || null, {
        status,
        headers: resHeaders
      });
      resolve(response);
    } else {
      controller.enqueue(encoder.encode(formatter(index, string)));
    }
  };
  resolveHTTPResponse({
    req,
    createContext,
    path,
    router: opts.router,
    batching: opts.batching,
    responseMeta: opts.responseMeta,
    onError(o) {
      opts?.onError?.({
        ...o,
        req: opts.req
      });
    },
    unstable_onHead,
    unstable_onChunk
  }).then(() => {
    if (isStream) {
      controller.enqueue(encoder.encode(formatter.end()));
      controller.close();
    }
  }).catch(() => {
    if (isStream) {
      controller.close();
    }
  });
  return promise;
}

// ../node_modules/.pnpm/@trpc+server@10.45.2/node_modules/@trpc/server/dist/index.mjs
function getParseFn(procedureParser) {
  const parser = procedureParser;
  if (typeof parser === "function") {
    return parser;
  }
  if (typeof parser.parseAsync === "function") {
    return parser.parseAsync.bind(parser);
  }
  if (typeof parser.parse === "function") {
    return parser.parse.bind(parser);
  }
  if (typeof parser.validateSync === "function") {
    return parser.validateSync.bind(parser);
  }
  if (typeof parser.create === "function") {
    return parser.create.bind(parser);
  }
  if (typeof parser.assert === "function") {
    return (value) => {
      parser.assert(value);
      return value;
    };
  }
  throw new Error("Could not find a validator fn");
}
function mergeWithoutOverrides(obj1, ...objs) {
  const newObj = Object.assign(/* @__PURE__ */ Object.create(null), obj1);
  for (const overrides of objs) {
    for (const key in overrides) {
      if (key in newObj && newObj[key] !== overrides[key]) {
        throw new Error(`Duplicate key ${key}`);
      }
      newObj[key] = overrides[key];
    }
  }
  return newObj;
}
function createMiddlewareFactory() {
  function createMiddlewareInner(middlewares) {
    return {
      _middlewares: middlewares,
      unstable_pipe(middlewareBuilderOrFn) {
        const pipedMiddleware = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [
          middlewareBuilderOrFn
        ];
        return createMiddlewareInner([
          ...middlewares,
          ...pipedMiddleware
        ]);
      }
    };
  }
  function createMiddleware(fn) {
    return createMiddlewareInner([
      fn
    ]);
  }
  return createMiddleware;
}
function isPlainObject(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}
function createInputMiddleware(parse) {
  const inputMiddleware = async ({ next, rawInput, input }) => {
    let parsedInput;
    try {
      parsedInput = await parse(rawInput);
    } catch (cause) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause
      });
    }
    const combinedInput = isPlainObject(input) && isPlainObject(parsedInput) ? {
      ...input,
      ...parsedInput
    } : parsedInput;
    return next({
      input: combinedInput
    });
  };
  inputMiddleware._type = "input";
  return inputMiddleware;
}
function createOutputMiddleware(parse) {
  const outputMiddleware = async ({ next }) => {
    const result = await next();
    if (!result.ok) {
      return result;
    }
    try {
      const data = await parse(result.data);
      return {
        ...result,
        data
      };
    } catch (cause) {
      throw new TRPCError({
        message: "Output validation failed",
        code: "INTERNAL_SERVER_ERROR",
        cause
      });
    }
  };
  outputMiddleware._type = "output";
  return outputMiddleware;
}
var middlewareMarker = "middlewareMarker";
function createNewBuilder(def1, def2) {
  const { middlewares = [], inputs, meta, ...rest } = def2;
  return createBuilder({
    ...mergeWithoutOverrides(def1, rest),
    inputs: [
      ...def1.inputs,
      ...inputs ?? []
    ],
    middlewares: [
      ...def1.middlewares,
      ...middlewares
    ],
    meta: def1.meta && meta ? {
      ...def1.meta,
      ...meta
    } : meta ?? def1.meta
  });
}
function createBuilder(initDef = {}) {
  const _def = {
    inputs: [],
    middlewares: [],
    ...initDef
  };
  return {
    _def,
    input(input) {
      const parser = getParseFn(input);
      return createNewBuilder(_def, {
        inputs: [
          input
        ],
        middlewares: [
          createInputMiddleware(parser)
        ]
      });
    },
    output(output) {
      const parseOutput = getParseFn(output);
      return createNewBuilder(_def, {
        output,
        middlewares: [
          createOutputMiddleware(parseOutput)
        ]
      });
    },
    meta(meta) {
      return createNewBuilder(_def, {
        meta
      });
    },
    /**
    * @deprecated
    * This functionality is deprecated and will be removed in the next major version.
    */
    unstable_concat(builder) {
      return createNewBuilder(_def, builder._def);
    },
    use(middlewareBuilderOrFn) {
      const middlewares = "_middlewares" in middlewareBuilderOrFn ? middlewareBuilderOrFn._middlewares : [
        middlewareBuilderOrFn
      ];
      return createNewBuilder(_def, {
        middlewares
      });
    },
    query(resolver) {
      return createResolver({
        ..._def,
        query: true
      }, resolver);
    },
    mutation(resolver) {
      return createResolver({
        ..._def,
        mutation: true
      }, resolver);
    },
    subscription(resolver) {
      return createResolver({
        ..._def,
        subscription: true
      }, resolver);
    }
  };
}
function createResolver(_def, resolver) {
  const finalBuilder = createNewBuilder(_def, {
    resolver,
    middlewares: [
      async function resolveMiddleware(opts) {
        const data = await resolver(opts);
        return {
          marker: middlewareMarker,
          ok: true,
          data,
          ctx: opts.ctx
        };
      }
    ]
  });
  return createProcedureCaller(finalBuilder._def);
}
var codeblock = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/server/server-side-calls
`.trim();
function createProcedureCaller(_def) {
  const procedure = async function resolve(opts) {
    if (!opts || !("rawInput" in opts)) {
      throw new Error(codeblock);
    }
    const callRecursive = async (callOpts = {
      index: 0,
      ctx: opts.ctx
    }) => {
      try {
        const middleware = _def.middlewares[callOpts.index];
        const result2 = await middleware({
          ctx: callOpts.ctx,
          type: opts.type,
          path: opts.path,
          rawInput: callOpts.rawInput ?? opts.rawInput,
          meta: _def.meta,
          input: callOpts.input,
          next(_nextOpts) {
            const nextOpts = _nextOpts;
            return callRecursive({
              index: callOpts.index + 1,
              ctx: nextOpts && "ctx" in nextOpts ? {
                ...callOpts.ctx,
                ...nextOpts.ctx
              } : callOpts.ctx,
              input: nextOpts && "input" in nextOpts ? nextOpts.input : callOpts.input,
              rawInput: nextOpts && "rawInput" in nextOpts ? nextOpts.rawInput : callOpts.rawInput
            });
          }
        });
        return result2;
      } catch (cause) {
        return {
          ok: false,
          error: getTRPCErrorFromUnknown(cause),
          marker: middlewareMarker
        };
      }
    };
    const result = await callRecursive();
    if (!result) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No result from middlewares - did you forget to `return next()`?"
      });
    }
    if (!result.ok) {
      throw result.error;
    }
    return result.data;
  };
  procedure._def = _def;
  procedure.meta = _def.meta;
  return procedure;
}
function mergeRouters(...routerList) {
  const record = mergeWithoutOverrides({}, ...routerList.map((r) => r._def.record));
  const errorFormatter = routerList.reduce((currentErrorFormatter, nextRouter) => {
    if (nextRouter._def._config.errorFormatter && nextRouter._def._config.errorFormatter !== defaultFormatter) {
      if (currentErrorFormatter !== defaultFormatter && currentErrorFormatter !== nextRouter._def._config.errorFormatter) {
        throw new Error("You seem to have several error formatters");
      }
      return nextRouter._def._config.errorFormatter;
    }
    return currentErrorFormatter;
  }, defaultFormatter);
  const transformer = routerList.reduce((prev, current) => {
    if (current._def._config.transformer && current._def._config.transformer !== defaultTransformer) {
      if (prev !== defaultTransformer && prev !== current._def._config.transformer) {
        throw new Error("You seem to have several transformers");
      }
      return current._def._config.transformer;
    }
    return prev;
  }, defaultTransformer);
  const router2 = createRouterFactory({
    errorFormatter,
    transformer,
    isDev: routerList.some((r) => r._def._config.isDev),
    allowOutsideOfServer: routerList.some((r) => r._def._config.allowOutsideOfServer),
    isServer: routerList.some((r) => r._def._config.isServer),
    $types: routerList[0]?._def._config.$types
  })(record);
  return router2;
}
var TRPCBuilder = class {
  context() {
    return new TRPCBuilder();
  }
  meta() {
    return new TRPCBuilder();
  }
  create(options) {
    return createTRPCInner()(options);
  }
};
var initTRPC = new TRPCBuilder();
function createTRPCInner() {
  return function initTRPCInner(runtime) {
    const errorFormatter = runtime?.errorFormatter ?? defaultFormatter;
    const transformer = getDataTransformer(runtime?.transformer ?? defaultTransformer);
    const config = {
      transformer,
      isDev: runtime?.isDev ?? globalThis.process?.env?.NODE_ENV !== "production",
      allowOutsideOfServer: runtime?.allowOutsideOfServer ?? false,
      errorFormatter,
      isServer: runtime?.isServer ?? isServerDefault,
      /**
      * @internal
      */
      $types: createFlatProxy((key) => {
        throw new Error(`Tried to access "$types.${key}" which is not available at runtime`);
      })
    };
    {
      const isServer = runtime?.isServer ?? isServerDefault;
      if (!isServer && runtime?.allowOutsideOfServer !== true) {
        throw new Error(`You're trying to use @trpc/server in a non-server environment. This is not supported by default.`);
      }
    }
    return {
      /**
      * These are just types, they can't be used
      * @internal
      */
      _config: config,
      /**
      * Builder object for creating procedures
      * @see https://trpc.io/docs/server/procedures
      */
      procedure: createBuilder({
        meta: runtime?.defaultMeta
      }),
      /**
      * Create reusable middlewares
      * @see https://trpc.io/docs/server/middlewares
      */
      middleware: createMiddlewareFactory(),
      /**
      * Create a router
      * @see https://trpc.io/docs/server/routers
      */
      router: createRouterFactory(config),
      /**
      * Merge Routers
      * @see https://trpc.io/docs/server/merging-routers
      */
      mergeRouters,
      /**
      * Create a server-side caller for a router
      * @see https://trpc.io/docs/server/server-side-calls
      */
      createCallerFactory: createCallerFactory()
    };
  };
}

// src/trpc_server.ts
var t = initTRPC.create();
var router = t.router;
var publicProcedure = t.procedure;

// src/trpc_router.ts
var appRouter = router({
  gettodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  })
});

// src/server.ts
var server_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname == "/") {
      return new Response("Hello FHome");
    } else if (url.pathname.startsWith("/public")) {
      return await env.ASSETS.fetch(request);
    } else if (url.pathname == "/react") {
      const html = `<!DOCTYPE html>
                        <html>
                        <body>
                        <div id="app"></div>                            
                        </body>

                        <script src="public/app.js"><\/script>

                    </html>`;
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8"
        }
      });
    }
    const trpcResults = await fetchRequestHandler({
      endpoint: "/api",
      req: request,
      router: appRouter,
      createContext: () => ({})
    });
    if (trpcResults.ok) {
      return trpcResults;
    } else {
      return new Response("Not found");
    }
  }
};
export {
  server_default as default
};
/*! Bundled license information:

@trpc/server/dist/resolveHTTPResponse-2fc435bb.mjs:
  (* istanbul ignore if -- @preserve *)

@trpc/server/dist/adapters/fetch/index.mjs:
  (* istanbul ignore if -- @preserve *)
*/
