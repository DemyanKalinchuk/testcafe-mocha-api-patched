import Joi from 'joi';
import { paths } from '../paths/workPath.js';

export class UseApiSteps {
  constructor(client, logger) {
    this.api = client;
    this.logger = logger;
  }
  async login(email, password) {
    const res = await this.api.post(paths.login, { body: { email, password } });
    if (res.status && res.body) {
      if (res.status !== 200) throw new Error(`Login failed: ${res.status} ${JSON.stringify(res.body)}`);
      return res.body.token;
    } else {
      if (res.status !== 200) throw new Error(`Login failed: ${res.status} ${JSON.stringify(res.data)}`);
      return res.data.token;
    }
  }
  async listUsers(page = 2) {
    const res = await this.api.get(paths.users, { params: { page } });
    const body = res.body ?? res.data;
    const schema = Joi.object({ data: Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        avatar: Joi.string().uri().required()
      })
    ).required() }).unknown(true);
    const { error } = schema.validate(body);
    if (error) throw new Error(`Schema validation failed: ${error}`);
    return body;
  }
}
