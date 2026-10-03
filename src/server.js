import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { filmRoutes } from './routes/film-routes.js';

const app = new Hono();
const PORT = 8080;

app.get('/', (c) => {
    return c.json({
        status: 'ok',
        message: 'API Films rodando'
    });
});

app.route('/api', filmRoutes);

export default app;

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    serve({
        fetch: app.fetch,
        port: PORT
    });
}