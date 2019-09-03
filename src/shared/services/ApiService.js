// @flow
import { serialize } from "../helpers/url";
import type { ApiServiceInterface } from "./ApiServiceInterface";

export class ApiService implements ApiServiceInterface {
  static METHOD_GET = "GET";
  static METHOD_PUT = "PUT";
  static METHOD_POST = "POST";
  static METHOD_DELETE = "DELETE";

  defaultOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = this._formatApiEndpoint(baseUrl);
  }

  get baseUrl() {
    return this._baseUrl;
  }

  _formatApiEndpoint(baseUrl: string): string {
    return baseUrl.replace(/\/$/, "");
  }

  get(
    endpoint: string,
    query: Object = {},
    options: Object = {}
  ): Promise<Response & any> {
    return this._fetch(
      this.constructor.METHOD_GET,
      endpoint,
      {},
      query,
      options
    );
  }

  post(
    endpoint: string,
    body: Object = {},
    query: Object = {},
    options: Object = {}
  ): Promise<Response & any> {
    return this._fetch(
      this.constructor.METHOD_POST,
      endpoint,
      body,
      query,
      options
    );
  }

  put(
    endpoint: string,
    body: Object = {},
    query: Object = {},
    options: Object = {}
  ): Promise<Response & any> {
    return this._fetch(
      this.constructor.METHOD_PUT,
      endpoint,
      body,
      query,
      options
    );
  }

  delete(
    endpoint: string,
    query: Object = {},
    options: Object = {}
  ): Promise<Response & any> {
    return this._fetch(
      this.constructor.METHOD_DELETE,
      endpoint,
      {},
      query,
      options
    );
  }

  buildUrl(endpoint: string, query: Object = {}): string {
    if (Object.keys(query).length > 0) {
      endpoint = `${endpoint}?${serialize(query)}`;
    }

    return `${this._baseUrl}${endpoint}`;
  }

  _fetch(
    method: string,
    endpoint: string,
    body: Object = {},
    query: Object = {},
    options: Object = {}
  ): Promise<Response & any> {
    const url = this.buildUrl(endpoint, query);

    options = { ...this.defaultOptions, ...options, method };

    if (Object.keys(body).length > 0) {
      options.body = typeof body === "object" ? JSON.stringify(body) : body;
    }

    return fetch(url, options).then(response => response.json());
  }
}
