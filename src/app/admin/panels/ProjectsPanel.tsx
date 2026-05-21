import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { Building2, Loader2, Pencil, Plus, Trash2, Upload, UserPlus } from 'lucide-react';
import {
  createCompany,
  createProject,
  deleteProject,
  listCompaniesAll,
  listProjectsAll,
  updateProject,
} from '../../../services/portfolioDb';
import { uploadPortfolioFile } from '../../../services/storageUpload';
import { TECHNOLOGIES, TechnologyIcon } from '../../../config/technologies';
import type { CompanyWithId, ProjectDoc, ProjectWithId } from '../../../types/portfolio';
import { toAbsoluteHttpUrl } from '../../../utils/externalUrl';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
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
  companyId: '',
  company: null,
  collaborators: [],
};

function getNextOrder(rows: ProjectWithId[]): number {
  return Math.max(0, ...rows.map((row) => Number(row.order) || 0)) + 1;
}

export function ProjectsPanel() {
  const [rows, setRows] = useState<ProjectWithId[]>([]);
  const [companies, setCompanies] = useState<CompanyWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectDoc>(empty);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [creatingCompany, setCreatingCompany] = useState(false);
  const [companyDraft, setCompanyDraft] = useState({
    name: '',
    iconUrl: '',
    websiteUrl: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    const [list, companyList] = await Promise.all([listProjectsAll(), listCompaniesAll()]);
    setRows(list);
    setCompanies(companyList);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...empty, order: getNextOrder(rows) });
    setSelectedTechnologies([]);
    setMsg('');
    setOpen(true);
  };

  const openEdit = (row: ProjectWithId) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      description: row.description,
      imageUrl: row.imageUrl,
      tags: row.tags,
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
      companyId: row.companyId ?? row.company?.id ?? '',
      company: row.company ?? null,
      collaborators: row.collaborators ?? [],
    });
    setSelectedTechnologies(row.tags);
    setMsg('');
    setOpen(true);
  };

  const toggleTechnology = (technologyId: string) => {
    setSelectedTechnologies((current) => {
      if (current.includes(technologyId)) {
        return current.filter((item) => item !== technologyId);
      }
      return [...current, technologyId];
    });
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg('');
    const path = `portfolio/media/${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;
    const res = await uploadPortfolioFile(path, file);
    setUploading(false);
    event.target.value = '';
    if ('error' in res) {
      setMsg(res.error ?? 'Falha ao enviar imagem.');
      return;
    }
    setForm((current) => ({ ...current, imageUrl: res.url ?? '' }));
  };

  const addCollaborator = () => {
    setForm((current) => ({
      ...current,
      collaborators: [...current.collaborators, { name: '', platform: 'github', url: '' }],
    }));
  };

  const updateCollaborator = (index: number, field: 'name' | 'platform' | 'url', value: string) => {
    setForm((current) => ({
      ...current,
      collaborators: current.collaborators.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        if (field === 'platform') {
          return { ...item, platform: value === 'instagram' || value === 'site' ? value : 'github' };
        }
        return { ...item, [field]: value };
      }),
    }));
  };

  const removeCollaborator = (index: number) => {
    setForm((current) => ({
      ...current,
      collaborators: current.collaborators.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const buildPayload = (): ProjectDoc => {
    const demo = form.demoLink.trim();
    const github = form.githubLink.trim();
    return {
      ...form,
      tags: selectedTechnologies,
      order: editingId ? form.order : getNextOrder(rows),
      demoLink: demo ? toAbsoluteHttpUrl(demo) : '',
      githubLink: github ? toAbsoluteHttpUrl(github) : '',
      repoName: form.repoName?.trim() || undefined,
      companyId: form.companyId || undefined,
      company: null,
      collaborators: form.collaborators
        .map((item) => ({
          ...item,
          name: item.name.trim(),
          url: item.url.trim() ? toAbsoluteHttpUrl(item.url.trim()) : '',
        }))
        .filter((item) => item.name && item.url),
    };
  };

  const save = async () => {
    const payload = buildPayload();
    if (!payload.title.trim()) {
      setMsg('Informe o titulo.');
      return;
    }
    if (!payload.imageUrl.trim()) {
      setMsg('Informe a imagem do projeto.');
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

  const addCompany = async () => {
    if (!companyDraft.name.trim()) {
      setMsg('Informe o nome da empresa.');
      return;
    }

    setCreatingCompany(true);
    setMsg('');
    const res = await createCompany({
      name: companyDraft.name.trim(),
      iconUrl: companyDraft.iconUrl.trim(),
      websiteUrl: companyDraft.websiteUrl.trim() ? toAbsoluteHttpUrl(companyDraft.websiteUrl.trim()) : '',
      active: true,
    });
    setCreatingCompany(false);
    if (!res.ok || !res.id) {
      setMsg(res.ok ? 'Nao foi possivel criar a empresa.' : res.error);
      return;
    }
    const companyList = await listCompaniesAll();
    setCompanies(companyList);
    setForm((current) => ({ ...current, companyId: res.id }));
    setCompanyDraft({ name: '', iconUrl: '', websiteUrl: '' });
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
            Cards na seção Projetos. Imagem obrigatória para aparecer no site.
          </p>
        </div>
        <Button onClick={openNew} className="bg-cyan-600 text-white hover:bg-cyan-500">
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
                <TableHead className="text-zinc-400">Empresa</TableHead>
                <TableHead className="text-zinc-400">Apoio</TableHead>
                <TableHead className="text-zinc-400">Ativo</TableHead>
                <TableHead className="text-zinc-400">Imagem</TableHead>
                <TableHead className="text-right text-zinc-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={8} className="text-center text-zinc-500 py-12">
                    Nenhum projeto. Adicione o primeiro projeto para publicar no portfolio.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id} className="border-zinc-800">
                    <TableCell className="text-zinc-300">{row.order}</TableCell>
                    <TableCell className="font-medium text-white">{row.title}</TableCell>
                    <TableCell className="text-zinc-400">{row.role}</TableCell>
                    <TableCell className="text-zinc-400">{row.company?.name ?? '-'}</TableCell>
                    <TableCell className="text-zinc-400">{row.collaborators?.length ?? 0}</TableCell>
                    <TableCell className="text-zinc-400">{row.active ? 'Sim' : 'Não'}</TableCell>
                    <TableCell className="text-zinc-500 max-w-[120px] truncate">
                      {row.imageUrl ? 'OK' : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-zinc-300" onClick={() => openEdit(row)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400" onClick={() => void remove(row.id)}>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="admin-project-modal">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar projeto' : 'Novo projeto'}</DialogTitle>
            <DialogDescription>
              Preencha apenas o essencial. Você pode completar os detalhes depois.
            </DialogDescription>
          </DialogHeader>

          <div className="admin-simple-form">
            {msg && <p className="admin-project-error">{msg}</p>}

            <div className="admin-simple-grid">
              <div className="admin-field admin-field-wide">
                <Label>Título</Label>
                <Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
              </div>

              <div className="admin-field admin-field-wide">
                <Label>Descrição</Label>
                <Textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  rows={3}
                />
              </div>

              <div className="admin-field">
                <Label>Papel</Label>
                <Input value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} />
              </div>

              <div className="admin-field admin-field-wide">
                <Label>Empresa destacada</Label>
                <div className="admin-company-picker">
                  <select
                    value={form.companyId ?? ''}
                    onChange={(event) => setForm((current) => ({ ...current, companyId: event.target.value }))}
                  >
                    <option value="">Sem empresa no card</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {companies.find((company) => company.id === form.companyId) ? (
                    <div className="admin-company-preview">
                      {companies.find((company) => company.id === form.companyId)?.iconUrl ? (
                        <img src={companies.find((company) => company.id === form.companyId)?.iconUrl} alt="" />
                      ) : (
                        <Building2 className="h-4 w-4" />
                      )}
                      <span>{companies.find((company) => company.id === form.companyId)?.name}</span>
                    </div>
                  ) : null}
                </div>
                <div className="admin-company-create">
                  <Input
                    value={companyDraft.name}
                    onChange={(event) => setCompanyDraft((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Nome da empresa"
                  />
                  <Input
                    value={companyDraft.iconUrl}
                    onChange={(event) => setCompanyDraft((current) => ({ ...current, iconUrl: event.target.value }))}
                    placeholder="URL do icone/logo"
                  />
                  <Input
                    value={companyDraft.websiteUrl}
                    onChange={(event) => setCompanyDraft((current) => ({ ...current, websiteUrl: event.target.value }))}
                    placeholder="Site"
                  />
                  <Button type="button" variant="outline" className="border-zinc-700" disabled={creatingCompany} onClick={() => void addCompany()}>
                    {creatingCompany ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                    Criar empresa
                  </Button>
                </div>
              </div>

              <div className="admin-field admin-field-wide">
                <Label>Tecnologias</Label>
                <div className="admin-tech-picker">
                  {TECHNOLOGIES.map((technology) => {
                    const selected = selectedTechnologies.includes(technology.id);
                    return (
                      <button
                        key={technology.id}
                        type="button"
                        className={selected ? 'is-selected' : ''}
                        title={technology.label}
                        aria-label={technology.label}
                        aria-pressed={selected}
                        onClick={() => toggleTechnology(technology.id)}
                      >
                        <TechnologyIcon name={technology.id} size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="admin-field admin-field-wide">
                <Label>Imagem</Label>
                <div className="admin-image-input-row">
                  <Input value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} />
                  <label className="admin-upload-button">
                    <Upload className="h-4 w-4" />
                    {uploading ? 'Enviando...' : 'Upload'}
                    <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleFile(event)} />
                  </label>
                </div>
              </div>

              <div className="admin-field">
                <Label>Link do site/demo</Label>
                <Input value={form.demoLink} onChange={(event) => setForm((current) => ({ ...current, demoLink: event.target.value }))} />
              </div>

              <div className="admin-field">
                <Label>GitHub</Label>
                <Input value={form.githubLink} onChange={(event) => setForm((current) => ({ ...current, githubLink: event.target.value }))} />
              </div>

              <div className="admin-simple-switches">
                <label>
                  <Switch checked={form.active} onCheckedChange={(value) => setForm((current) => ({ ...current, active: value }))} />
                  Ativo
                </label>
                <label>
                  <Switch checked={form.hideGithubLink} onCheckedChange={(value) => setForm((current) => ({ ...current, hideGithubLink: value }))} />
                  Ocultar GitHub
                </label>
              </div>
            </div>

            <div className="admin-simple-collaborators">
              <div className="admin-simple-collaborators-head">
                <strong>Apoio / colaboradores</strong>
                <Button type="button" variant="outline" className="border-zinc-700" onClick={addCollaborator}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>

              {form.collaborators.length === 0 ? (
                <p>Nenhuma pessoa adicionada.</p>
              ) : (
                <div className="admin-simple-collaborator-list">
                  {form.collaborators.map((collaborator, index) => (
                    <div className="admin-simple-collaborator" key={index}>
                      <Input
                        value={collaborator.name}
                        onChange={(event) => updateCollaborator(index, 'name', event.target.value)}
                        placeholder="Nome"
                      />
                      <select
                        value={collaborator.platform}
                        onChange={(event) => updateCollaborator(index, 'platform', event.target.value)}
                      >
                        <option value="github">GitHub</option>
                        <option value="instagram">Instagram</option>
                        <option value="site">Site</option>
                      </select>
                      <Input
                        value={collaborator.url}
                        onChange={(event) => updateCollaborator(index, 'url', event.target.value)}
                        placeholder="Link"
                      />
                      <Button type="button" variant="ghost" className="text-red-400" onClick={() => removeCollaborator(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="admin-simple-footer">
            <Button variant="outline" className="border-zinc-600" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-cyan-600 text-white hover:bg-cyan-500" disabled={saving} onClick={() => void save()}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
