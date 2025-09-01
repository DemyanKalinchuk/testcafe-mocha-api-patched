// src/utils/logger.js
import fs from 'fs';
import path from 'path';
import process from 'process';

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const safe = (name) => name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 120);
const bool = (v, d) => (v === undefined ? d : String(v).toLowerCase() !== 'false');
const num  = (v, d) => (v !== undefined ? Number(v) : d);

// Env toggles
const COLOR    = bool(process.env.LOG_COLOR, true);
const MAX      = num(process.env.LOG_MAX, 400);
const COMPACT  = bool(process.env.LOG_COMPACT, true);

// Minimal ANSI color helpers (no chalk; CJS/ESM-safe)
const ansi = (code) => (s) => COLOR ? `\x1b[${code}m${s}\x1b[0m` : String(s);
const C = {
  step:  ansi('36'), // cyan
  info:  ansi('34'), // blue
  warn:  ansi('33'), // yellow
  error: ansi('31'), // red
  req:   ansi('35'), // magenta
  res:   ansi('32'), // green
  meta:  ansi('90'), // gray
  method: (m) => ansi('1')(String(m)), // bold
  url:    (u) => String(u),
  status: (s) => {
    const n = Number(s);
    if (!COLOR) return String(s);
    if (n >= 200 && n < 300) return `\x1b[32m${s}\x1b[0m`; // green
    if (n >= 400)            return `\x1b[31m${s}\x1b[0m`; // red
    return `\x1b[33m${s}\x1b[0m`; // yellow
  },
  time:  ansi('90'),
};

const preview = (obj) => {
  try {
    const txt = typeof obj === 'string' ? obj : JSON.stringify(obj, COMPACT ? 0 : 2);
    if (txt.length <= MAX) return txt;
    return txt.slice(0, MAX) + ' …';
  } catch {
    return String(obj);
  }
};

export class Logger {
  constructor({ suite = 'suite', test = 'test' } = {}) {
    const base = path.resolve('test-results', safe(suite));
    ensureDir(base);
    this.file = path.join(base, `${safe(test)}.log`);
    ensureDir(path.dirname(this.file));
    this.suite = suite;
    this.test = test;
  }

  write(line) {
    const ts = new Date().toISOString();
    fs.appendFileSync(this.file, `[${ts}] ${line}\n`);
    console.log(line);
  }

  step(msg)  { this.write(`${C.step('STEP')} ${msg}`); }
  info(msg)  { this.write(`${C.info('INFO')} ${msg}`); }
  warn(msg)  { this.write(`${C.warn('WARN')} ${msg}`); }
  error(msg) { this.write(`${C.error('ERROR')} ${msg}`); }

  httpReq({ method, url, headers, body }) {
    const hdr = headers !== undefined ? ` ${C.meta('hdr=')} ${preview(headers)}` : '';
    const bdy = body    !== undefined ? ` ${C.meta('body=')} ${preview(body)}`   : '';
    this.write(`${C.req('REQ')} ${C.method(method)} ${C.url(url)}${hdr}${bdy}`);
  }

  httpRes({ status, ms, headers, body }) {
    const hdr = headers !== undefined ? ` ${C.meta('hdr=')} ${preview(headers)}` : '';
    const bdy = body    !== undefined ? ` ${C.meta('body=')} ${preview(body)}`   : '';
    const time = ms !== undefined ? ` ${C.time(`(${ms} ms)`)}` : '';
    this.write(`${C.res('RES')} ${C.status(status)}${time}${hdr}${bdy}`);
  }
}

// Allure attachment (Mocha) — safe no-op under TestCafe
export const attachLogIfPossible = async (logger) => {
  try {
    const g = globalThis || global;
    const allure = g.allure;
    if (!allure || !logger?.file) return;
    const fsPromises = await import('fs/promises');
    const buf = await fsPromises.readFile(logger.file);
    allure.attachment('combined-log.txt', buf, 'text/plain');
  } catch {}
};