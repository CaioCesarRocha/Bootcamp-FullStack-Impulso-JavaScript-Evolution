import { Request } from 'express'
import { Params } from 'express-serve-static-core'

export function makeMockRequest ({ params, query, body, file }:
    { params?: Params, query?: Params, body?: Params, file?: File}): Request {
  const request = {
    params: params || {},
    query: query || {},
    file: file || {},
    body: {}
  } as unknown

  return request as Request
}