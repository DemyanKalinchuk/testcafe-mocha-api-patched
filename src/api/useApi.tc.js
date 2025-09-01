import { cfg } from '../../config/env.js';

export class UseApiTC {
constructor(t, logger) {
this.t = t; this.logger = logger;
this.base = cfg.baseUrl.replace(/\/$/, '');
this.defaultHeaders = { 'accept-language': cfg.acceptLanguage, 'x-api-key': cfg.apiToken, 'content-type': 'application/json' };

}
  async request(method, url, { params, body, headers } = {}) {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const full = `${this.base}${url}${query}`;
    const opts = { url: full, method, headers: { ...this.defaultHeaders, ...(headers || {}) } };
    if (body) opts.body = body;
    const started = Date.now();
    this.logger?.httpReq({ method, url: full, headers: opts.headers, body });
    const res = await this.t.request(opts);
    this.logger?.httpRes({ status: res.status, ms: Date.now() - started, headers: res.headers, body: res.body });
    return res;
    }
  get(url, opts) { return this.request('GET', url, opts); }
  post(url, opts) { return this.request('POST', url, opts); }
  put(url, opts) { return this.request('PUT', url, opts); }
  patch(url, opts) { return this.request('PATCH', url, opts); }
  delete(url, opts) { return this.request('DELETE', url, opts); }
}
