import { useCallback, useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2, Upload } from 'lucide-react';
import {
  createCourse,
  deleteCourse,
  listCoursesAll,
  updateCourse,
} from '../../../services/portfolioDb';
import { uploadPortfolioFile } from '../../../services/storageUpload';
import type { CourseDoc, CourseWithId } from '../../../types/portfolio';
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

const empty: CourseDoc = {
  title: '',
  description: '',
  provider: '',
  url: '',
  imageUrl: '',
  active: true,
  order: 0,
};

export function CoursesPanel() {
  const [rows, setRows] = useState<CourseWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseDoc>(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const list = await listCoursesAll();
    setRows(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openNew = () => {
    setEditingId(null);
    setForm({ ...empty, order: rows.length });
    setMsg('');
    setOpen(true);
  };

  const openEdit = (row: CourseWithId) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      description: row.description,
      provider: row.provider,
      url: row.url,
      imageUrl: row.imageUrl,
      active: row.active,
      order: row.order,
    });
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

  const save = async () => {
    setSaving(true);
    setMsg('');
    const res = editingId
      ? await updateCourse(editingId, form)
      : await createCourse(form);
    setSaving(false);
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setOpen(false);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este curso?')) return;
    const res = await deleteCourse(id);
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
          <h1 className="text-2xl font-semibold tracking-tight text-white">Cursos</h1>
          <p className="mt-1 text-sm text-zinc-400">Listagem exibida na seção Cursos do site.</p>
        </div>
        <Button
          onClick={openNew}
          className="bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:shadow-cyan-900/40"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo curso
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
                <TableHead className="text-zinc-400">Instituição</TableHead>
                <TableHead className="text-zinc-400">Ativo</TableHead>
                <TableHead className="text-right text-zinc-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={5} className="text-center text-zinc-500 py-12">
                    Nenhum curso. Crie o primeiro ou importe dados (veja seed no repositório).
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id} className="border-zinc-800">
                    <TableCell className="text-zinc-300">{row.order}</TableCell>
                    <TableCell className="font-medium text-white">{row.title}</TableCell>
                    <TableCell className="text-zinc-400">{row.provider}</TableCell>
                    <TableCell className="text-zinc-400">{row.active ? 'Sim' : 'Não'}</TableCell>
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
                        className="text-red-400 hover:text-red-300"
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
        <SheetContent className="flex h-full max-h-[100dvh] w-full flex-col gap-0 overflow-hidden border-zinc-800 bg-zinc-950 p-0 text-white sm:max-w-lg">
          <SheetHeader className="shrink-0 space-y-1 border-b border-zinc-800/60 px-6 pb-4 pt-6 pr-14 sm:px-8">
            <SheetTitle>{editingId ? 'Editar curso' : 'Novo curso'}</SheetTitle>
            <SheetDescription className="sr-only">
              Formulário para criar ou editar um curso.
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
              <Label className="mb-2 block text-zinc-400">Descrição</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
                rows={3}
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Instituição / provedor</Label>
              <Input
                value={form.provider}
                onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">URL (curso, certificado, etc.)</Label>
              <Input
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">URL da imagem</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="border-zinc-700 bg-zinc-900"
              />
              <div className="mt-3">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-cyan-400">
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Enviando…' : 'Enviar arquivo'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleFile(e)} />
                </label>
              </div>
            </div>
            <div>
              <Label className="mb-2 block text-zinc-400">Ordem (número menor aparece primeiro)</Label>
              <Input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: Number(e.target.value) || 0 }))
                }
                className="border-zinc-700 bg-zinc-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: v }))}
              />
              <Label className="mb-2 block text-zinc-400">Ativo no site</Label>
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
