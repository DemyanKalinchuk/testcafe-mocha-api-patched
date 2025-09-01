import axios from 'axios';
import { cfg } from '../../config/env.js';


const client = axios.create({
baseURL: cfg.baseUrl,
headers: { 'accept-language': cfg.acceptLanguage, 'x-api-key': cfg.apiToken, 'content-type': 'application/json' },
timeout: 15000, validateStatus: () => true
});


export class UseApiNode {
constructor(logger) { this.logger = logger; }
async request(method, url, { params, data, headers } = {}) {
const started = Date.now();
this.logger?.httpReq({ method, url, headers, body: data });
const res = await client.request({ method, url, params, data, headers });
this.logger?.httpRes({ status: res.status, ms: Date.now() - started, headers: res.headers, body: res.data });
return res;
}
  get(url, opts) { return this.request('GET', url, opts); }
  post(url, opts) { return this.request('POST', url, opts); }
  put(url, opts) { return this.request('PUT', url, opts); }
  patch(url, opts) { return this.request('PATCH', url, opts); }
  delete(url, opts) { return this.request('DELETE', url, opts); }
}
