import { Prisma } from '@prisma/client';

/**
 * It takes a logger as an argument and returns a middleware function that logs the time it takes to
 * execute a Prisma query
 * @param {any} logger - any = console
 * @returns A function that takes a logger and returns a middleware function.
 */

export function loggingMiddleware(logger: any = console): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    logger.log(
      `Prisma Query ${params.model}.${params.action} took ${after - before}ms`,
    );

    return result;
  };
}
