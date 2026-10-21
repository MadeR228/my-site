import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profile, projects } from './server/data.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const production = process.argv.includes('--production');
const port = Number(process.env.PORT || 5173);
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_request, response) => {
  response.set('Cache-Control', 'no-store').json({ status: 'ok', apiVersion: 1 });
});

app.get('/api/profile', (_request, response) => {
  response.set('Cache-Control', 'no-store').json({ data: profile, apiVersion: 1 });
});

app.get('/api/pages/:page', (request, response) => {
  const pages = {
    home: { profile, projects: projects.slice(0, 2) },
    projects: { profile, projects },
  };
  const page = pages[request.params.page];
  if (!page) {
    response.status(404).json({ error: 'Page not found', apiVersion: 1 });
    return;
  }
  response.set('Cache-Control', 'no-store').json({ data: page, apiVersion: 1 });
});

app.get('/api/projects', (request, response) => {
  const data = request.query.featured === 'true' ? projects.slice(0, 2) : projects;
  response.set('Cache-Control', 'no-store').json({ data, count: data.length, apiVersion: 1 });
});

app.get('/api/projects/:slug', (request, response) => {
  const project = projects.find((item) => item.slug === request.params.slug);
  if (!project) {
    response.status(404).json({ error: 'Project not found', apiVersion: 1 });
    return;
  }
  response.set('Cache-Control', 'no-store').json({ data: project, apiVersion: 1 });
});

if (production) {
  app.use(express.static(path.join(root, 'dist')));
  app.use((request, response, next) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') return next();
    response.sendFile(path.join(root, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    root,
    appType: 'spa',
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
}

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error', apiVersion: 1 });
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
