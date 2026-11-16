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

app.get('/health', (c) => {
    return c.json({
        status: 'UP',
        uptime: Math.floor(process.uptime()),
        memory_rss_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
        timestamp: new Date().toISOString()
    }, 200);
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