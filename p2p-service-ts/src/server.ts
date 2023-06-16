import { App } from '@/app';
import { OrderRoute } from '@/routes/orders.route';
import { ActionRoute } from '@/routes/actions.route';
import { ValidateEnv } from '@/utils/validateEnv';

ValidateEnv();

const app = new App([new OrderRoute(), new ActionRoute()]);

app.listen();
