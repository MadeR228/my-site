async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `REST request failed with ${response.status}`);
  }
  return payload;
}

export function getPage(page, signal) {
  return request(`/api/pages/${page}`, { signal });
}

export function getProject(slug, signal) {
  return request(`/api/projects/${encodeURIComponent(slug)}`, { signal });
}
