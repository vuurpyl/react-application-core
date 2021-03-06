import { makeChainedMiddleware } from './chained.middleware';
import { makeLazyLoadedEntityMiddleware } from './edited-list.middleware';
import {
  makeLoadedListOnNavigateToFirstPageMiddleware,
  makeLoadedListOnNavigateToLastPageMiddleware,
  makeLoadedListOnNavigateToNextPageMiddleware,
  makeLoadedListOnNavigateToPreviousPageMiddleware,
  makeUntouchedListMiddleware,
} from './loaded-list.middleware';

/**
 * @stable [07.06.2020]
 */
export class MiddlewareFactories {
  public static readonly chainedMiddleware = makeChainedMiddleware;
  public static readonly lazyLoadedEntityMiddleware = makeLazyLoadedEntityMiddleware;
  public static readonly loadedListOnNavigateToFirstPageMiddleware = makeLoadedListOnNavigateToFirstPageMiddleware;
  public static readonly loadedListOnNavigateToLastPageMiddleware = makeLoadedListOnNavigateToLastPageMiddleware;
  public static readonly loadedListOnNavigateToNextPageMiddleware = makeLoadedListOnNavigateToNextPageMiddleware;
  public static readonly loadedListOnNavigateToPreviousPageMiddleware = makeLoadedListOnNavigateToPreviousPageMiddleware;
  public static readonly untouchedListMiddleware = makeUntouchedListMiddleware;
}
