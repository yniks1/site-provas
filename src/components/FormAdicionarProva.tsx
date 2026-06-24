import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Prova } from "./CardProva";

interface Props {
  onAdd: (prova: Omit<Prova, "id">) => void;
}

export function FormAdicionarProva({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [link, setLink] = useState("");

  const reset = () => {
    setTitulo("");
    setDescricao("");
    setImagemUrl("");
    setLink("");
  };

  // Transformamos a função em assíncrona (async) para esperar o Firebase
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !link.trim()) return;

    try {
      // 1. Salva os dados no Firestore (Firebase)
      const docRef = await addDoc(collection(db, "provas"), {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        imagemUrl: imagemUrl.trim(),
        link: link.trim(),
        dataCriacao: new Date()
      });

      console.log("Sucesso! Prova salva com a ID: ", docRef.id);
      alert("Prova salva com sucesso no Banco de Dados!");

      // 2. Mantém a sua lógica original para atualizar a tela na hora
      onAdd({
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
        imagemUrl: imagemUrl.trim() || undefined,
        link: link.trim(),
      });

      // 3. Limpa os campos e fecha a janelinha
      reset();
      setOpen(false);

    } catch (erro) {
      console.error("Erro ao salvar no Firebase: ", erro);
      alert("Houve um erro ao tentar salvar. Verifique o console.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Adicionar nova prova"
          className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-action)] text-[var(--accent-action-foreground)] shadow-lg transition-all hover:scale-110 hover:bg-[var(--accent-action-hover)] hover:shadow-xl"
        >
          <Plus className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar nova prova</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova prova no hub.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">
              Título <span className="text-destructive">*</span>
            </Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Prova de Matemática - 1º Bimestre"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição (opcional)</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: 9º Ano A — 20/03/2026"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagem">URL da imagem de preview (opcional)</Label>
            <Input
              id="imagem"
              type="url"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">
              Link da prova <span className="text-destructive">*</span>
            </Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="accent">
              Adicionar prova
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}