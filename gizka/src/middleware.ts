import { stackMiddlewares } from './middlewares/stackHandler';
import { withCors } from './middlewares/withCors';
import { withNextIntl } from './middlewares/withNextIntl';

const middlewares = [withCors, withNextIntl];
export default stackMiddlewares(middlewares);
