import { z } from "zod";

type StatusCodeName = {
   [code: number]: string;
};

const informationalStatusCodes: StatusCodeName = {
   100: "Continue",
   101: "Switching Protocols",
   102: "Processing",
   103: "Early Hints",
};

const successfulStatusCodes: StatusCodeName = {
   200: "OK",
   201: "Created",
   202: "Accepted",
   203: "Non-Authoritative Information",
   204: "No Content",
   205: "Reset Content",
   206: "Partial Content",
   207: "Multi-Status",
   208: "Already Reported",
   226: "IM Used",
};

const redirectionStatusCodes: StatusCodeName = {
   300: "Multiple Choices",
   301: "Moved Permanently",
   302: "Found",
   303: "See Other",
   304: "Not Modified",
   307: "Temporary Redirect",
   308: "Permanent Redirect",
};

const clientErrorStatusCodes: StatusCodeName = {
   400: "Bad Request",
   401: "Unauthorized",
   402: "Payment Required",
   403: "Forbidden",
   404: "Not Found",
   405: "Method Not Allowed",
   406: "Not Acceptable",
   407: "Proxy Authentication Required",
   408: "Request Timeout",
   409: "Conflict",
   410: "Gone",
   411: "Length Required",
   412: "Precondition Failed",
   413: "Payload Too Large",
   414: "URI Too Long",
   415: "Unsupported Media Type",
   416: "Range Not Satisfiable",
   417: "Expectation Failed",
   418: "I'm a teapot",
   421: "Misdirected Request",
   422: "Unprocessable Entity",
   423: "Locked",
   424: "Failed Dependency",
   425: "Too Early",
   426: "Upgrade Required",
   428: "Precondition Required",
   429: "Too Many Requests",
   431: "Request Header Fields Too Large",
   451: "Unavailable For Legal Reasons",
};

const serverErrorStatusCodes: StatusCodeName = {
   500: "Internal Server Error",
   501: "Not Implemented",
   502: "Bad Gateway",
   503: "Service Unavailable",
   504: "Gateway Timeout",
   505: "HTTP Version Not Supported",
   506: "Variant Also Negotiates",
   507: "Insufficient Storage",
   508: "Loop Detected",
   510: "Not Extended",
   511: "Network Authentication Required",
};

export const allStatusCodes: StatusCodeName = {
   ...informationalStatusCodes,
   ...successfulStatusCodes,
   ...redirectionStatusCodes,
   ...clientErrorStatusCodes,
   ...serverErrorStatusCodes,
};

export const HttpStatusCode = z
   .enum(Object.keys(allStatusCodes) as [string, ...string[]])
   .transform(Number);
export type HttpStatusCode = z.infer<typeof HttpStatusCode>;

export const InformationalStatusCode = z
   .enum(Object.keys(informationalStatusCodes) as [string, ...string[]])
   .transform(Number);
export type InformationalStatusCode = z.infer<typeof InformationalStatusCode>;

export const SuccessfulStatusCode = z
   .enum(Object.keys(successfulStatusCodes) as [string, ...string[]])
   .transform(Number);
export type SuccessfulStatusCode = z.infer<typeof SuccessfulStatusCode>;

export const RedirectionStatusCode = z
   .enum(Object.keys(redirectionStatusCodes) as [string, ...string[]])
   .transform(Number);
export type RedirectionStatusCode = z.infer<typeof RedirectionStatusCode>;

export const ClientErrorStatusCode = z
   .enum(Object.keys(clientErrorStatusCodes) as [string, ...string[]])
   .transform(Number);
export type ClientErrorStatusCode = z.infer<typeof ClientErrorStatusCode>;

export const ServerErrorStatusCode = z
   .enum(Object.keys(serverErrorStatusCodes) as [string, ...string[]])
   .transform(Number);
export type ServerErrorStatusCode = z.infer<typeof ServerErrorStatusCode>;

export const HttpStatusCodeName: Readonly<StatusCodeName> = allStatusCodes;
export const InformationalStatusCodeName: Readonly<StatusCodeName> =
   informationalStatusCodes;
export const SuccessfulStatusCodeName: Readonly<StatusCodeName> =
   successfulStatusCodes;
export const RedirectionStatusCodeName: Readonly<StatusCodeName> =
   redirectionStatusCodes;
export const ClientErrorStatusCodeName: Readonly<StatusCodeName> =
   clientErrorStatusCodes;
export const ServerErrorStatusCodeName: Readonly<StatusCodeName> =
   serverErrorStatusCodes;

export const allStatusCodesArray = Object.keys(allStatusCodes).map(Number);
export const allStatusNamesArray = Object.values(allStatusCodes);
export const successfulStatusCodesArray = Object.keys(
   successfulStatusCodes,
).map(Number);
export const clientErrorStatusCodesArray = Object.keys(
   clientErrorStatusCodes,
).map(Number);
export const serverErrorStatusCodesArray = Object.keys(
   serverErrorStatusCodes,
).map(Number);
