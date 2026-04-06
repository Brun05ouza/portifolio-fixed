import { useCallback, useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import {
  createProject,
  deleteProject,
  listProjectsAll,
  updateProject,
} from '../../../services/portfolioDb';
import { uploadPortfolioFile } from '../../../services/storageUpload';
import type { ProjectDoc, ProjectWithId } from '../../../types/portfolio';
import { toAbsoluteHttpUrl } from '../../../utils/externalUrl';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '../../components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const empty: ProjectDoc = {
  title: '',
  description: '',
  imageUrl: '',
  tags: [],
  role: 'Front-end',
  demoLink: '',
  githubLink: '',
  hideGithubLink: false,
  hideImageOverlay: false,
  caseProblem: '',
  caseSolution: '',
  caseResult: '',
  active: true,
  order: 0,
  repoName: '',
};

function parseTags(s: string): string[] {
  return s
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export function ProjectsPanel() {
  const [rows, setRows] = useState<ProjectWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectDoc>(empty);
  const [tagsStr, setTagsStr] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await listProjectsAll();
    setRows(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...empty, order: rows.length });
    setTagsStr('');
    setMsg('');
    setOpen(true);
  };

  const openEdit = (row: ProjectWithId) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      description: row.description,
      imageUrl: row.imageUrl,
      tags: Array.isArray(row.tags) ? row.tags : [],
      role: row.role,
      demoLink: row.demoLink ?? '',
      githubLink: row.githubLink ?? '',
      hideGithubLink: row.hideGithubLink,
      hideImageOverlay: row.hideImageOverlay,
      caseProblem: row.caseProblem,
      caseSolution: row.caseSolution,
      caseResult: row.caseResult,
      active: row.active,
      order: row.order,
      repoName: row.repoName ?? '',
    });
    setTagsStr((Array.isArray(row.tags) ? row.tags : []).join(', '));
    setMsg('');
    setOpen(true);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg('');
    const path = `portfolio/media/${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
    const res = await uploadPortfolioFile(path, file);
    setUploading(false);
    e.target.value = '';
    if ('error' in res) {
      setMsg(res.error);
      return;
    }
    setForm((f) => ({ ...f, imageUrl: res.url }));
  };

  const buildPayload = (): ProjectDoc => {
    const tags = parseTags(tagsStr);
    const repoName = form.repoName?.trim() || undefined;
    const demo = form.demoLink.trim();
    const gh = form.githubLink.trim();
    return {
      ...form,
      tags,
      demoLink: demo ? toAbsoluteHttpUrl(demo) : '',
      githubLink: gh ? toAbsoluteHttpUrl(gh) : '',
      repoName,
    };
  };

  const save = async () => {
    const payload = buildPayload();
    if (!payload.title.trim()) {
      setMsg('Informe o título.');
      return;
    }
    if (!payload.imageUrl.trim()) {
      setMsg('Informe a URL da imagem ou envie um arquivo.');
      return;
    }
    setSaving(true);
    setMsg('');
    const res = editingId
      ? await updateProject(editingId, payload)
      : await createProject(payload);
    setSaving(false);
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setOpen(false);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este projeto?')) return;
    const res = await deleteProject(id);
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    await load();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Projetos</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Cards na seção Projetos. Imagem obrigatória para aparecer no site (ativos).
          </p>
        </div>
        <Button
          onClick={openNew}
          className="bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-900/40"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo projeto
        </Button>
      </div>

      {msg && !open && <p className="text-sm text-red-400">{msg}</p>}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Ordem</TableHead>
                <TableHead className="text-zinc-400">Título</TableHead>
                <TableHead className="text-zinc-400">Papel</TableHead>
                <TableHead className="text-zinc-400">Ativo</TableHead>
                <TableHead className="text-zinc-400">Imagem</TableHead>
                <TableHead className="text-right text-zinc-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={6} className="text-center text-zinc-500 py-12">
                    Nenhum projeto. Adicione o primeiro (ex.: Residencial Nature — veja seed no repo).
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id} className="border-zinc-800">
                    <TableCell className="text-zinc-300">{row.order}</TableCell>
                    <TableCell className="font-medium text-white">{row.title}</TableCell>
                    <TableCell className="text-zinc-400">{row.role}</TableCell>
                    <TableCell className="text-zinc-400">{row.active ? 'Sim' : 'Não'}</TableCell>
                    <TableCell className="text-zinc-500 max-w-[120px] truncate">
                      {row.imageUrl ? 'OK' : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-300"
                        onClick={() => openEdit(row)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400"
                        onClick={() => void remove(row.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex h-full max-h-[100dvh] w-full flex-col gap-0 overflow-hidden border-zinc-800 bg-zinc-950 p-0 text-white sm:max-w-xl">
          <SheetHeader className="shrink-0 space-y-1 border-b border-zinc-800/60 px-6 pb-4 pt-6 pr-14 sm:px-8">
            <SheetTitle>{editingId ? 'Editar projeto' : 'Novo projeto'}</SheetTitle>
            <SheetDescription className="sr-only">
              Formulário para criar ou editar um projeto do portfólio.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-y-contain px-6 py-4 sm:px-8">
            {msg && <p className="text-sm text-red-400">{msg}</p>}
            <div>
              <Label className="mb-2 block text-zinc-400">Título</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Descrição (card)</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
                rows={3}
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">URL da imagem (capa)</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-cyan-400">
                <Upload className="h-4 w-4" />
                {uploading ? 'Enviando…' : 'Enviar imagem'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleFile(e)} />
              </label>
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Tags (separadas por vírgula)</Label>
              <Input
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="border-zinc-700 bg-zinc-900"
                placeholder="React, TypeScript, SaaS"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Papel / função</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Link demo / site (redirecionamento principal)</Label>
              <Input
                value={form.demoLink}
                onChange={(e) => setForm((f) => ({ ...f, demoLink: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Link GitHub (opcional)</Label>
              <Input
                value={form.githubLink}
                onChange={(e) => setForm((f) => ({ ...f, githubLink: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">repoName (opcional — ex.: residencial-nature para texto Gênesis no card)</Label>
              <Input
                value={form.repoName ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, repoName: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.hideGithubLink}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, hideGithubLink: v }))}
                />
                <Label className="mb-2 block text-zinc-400">Ocultar link GitHub no card</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.hideImageOverlay}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, hideImageOverlay: v }))}
                />
                <Label className="mb-2 block text-zinc-400">Sem overlay escuro na imagem</Label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
              />
              <Label className="mb-2 block text-zinc-400">Ativo no site</Label>
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Ordem</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
                }
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Case (modal)
              </p>
              <div>
                <Label className="mb-2 block text-zinc-400">Problema</Label>
                <Textarea
                  value={form.caseProblem}
                  onChange={(e) => setForm((f) => ({ ...f, caseProblem: e.target.value }))}
                  className="border-zinc-700 bg-zinc-900"
                  rows={2}
                />
              </div>
              <div>
                <Label className="mb-2 block text-zinc-400">Solução técnica</Label>
                <Textarea
                  value={form.caseSolution}
                  onChange={(e) => setForm((f) => ({ ...f, caseSolution: e.target.value }))}
                  className="border-zinc-700 bg-zinc-900"
                  rows={2}
                />
              </div>
              <div>
                <Label className="mb-2 block text-zinc-400">Resultado / impacto</Label>
                <Textarea
                  value={form.caseResult}
                  onChange={(e) => setForm((f) => ({ ...f, caseResult: e.target.value }))}
                  className="border-zinc-700 bg-zinc-900"
                  rows={2}
                />
              </div>
            </div>
          </div>
          <SheetFooter className="shrink-0 flex flex-row flex-wrap gap-3 border-t border-zinc-800 bg-zinc-950 px-6 py-4 sm:px-8">
            <Button variant="outline" className="border-zinc-600" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-900/40"
              disabled={saving}
              onClick={() => void save()}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
