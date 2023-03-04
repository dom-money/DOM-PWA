import {
  RestRequest,
  PathParams,
  ResponseComposition,
  DefaultBodyType,
  RestContext,
} from 'msw';

export type ResolverType = (
    req: RestRequest<never, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
) => ReturnType<ResponseComposition<DefaultBodyType>>;
