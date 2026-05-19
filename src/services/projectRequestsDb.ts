export interface ProjectRequestSummary {
  total: number;
  newCount: number;
  last7d: number;
  latest: Array<{
    id: string;
    name: string;
    email: string;
    description: string;
    status: string;
    createdAt: string;
  }>;
}

const emptySummary: ProjectRequestSummary = {
  total: 0,
  newCount: 0,
  last7d: 0,
  latest: [],
};

export async function createProjectRequest(input: {
  name: string;
  email: string;
  description: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/project-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) return { ok: false, error: json.error || 'Nao foi possivel enviar.' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Nao foi possivel enviar.' };
  }
}

export async function fetchProjectRequestSummary(): Promise<ProjectRequestSummary> {
  try {
    const response = await fetch('/api/admin/project-requests', { headers: { Accept: 'application/json' } });
    if (!response.ok) return emptySummary;
    const json = await response.json();
    const data = json?.data ?? {};
    return {
      total: Number(data.total) || 0,
      newCount: Number(data.newCount) || 0,
      last7d: Number(data.last7d) || 0,
      latest: Array.isArray(data.latest)
        ? data.latest.map((item: Record<string, unknown>) => ({
            id: String(item.id || ''),
            name: String(item.name || ''),
            email: String(item.email || ''),
            description: String(item.description || ''),
            status: String(item.status || 'new'),
            createdAt: String(item.created_at || item.createdAt || ''),
          }))
        : [],
    };
  } catch {
    return emptySummary;
  }
}
