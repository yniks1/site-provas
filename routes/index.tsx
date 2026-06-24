import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileQuestion } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { CardProva, type Prova } from "@/components/CardProva";
import { FormAdicionarProva } from "@/components/FormAdicionarProva";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Central de Provas - Assistme" },
      {
        name: "description",
        content:
          "Hub centralizador de provas aplicadas pela Assistme.",
      },
      { property: "og:title", content: "Central de Provas - Assistme" },
      {
        property: "og:description",
        content: "Acesse todas as provas de treinamento em um só lugar.",
      },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "central-de-provas:v1";

const PROVAS_INICIAIS: Prova[] = [
  {
    id: "ex-1",
    titulo: "Prova de Matemática - 9º Ano",
    descricao: "1º Bimestre — Álgebra e geometria",
    imagemUrl: "https://placehold.co/600x400/1a365d/ffffff?text=Preview+da+Prova",
    link: "#",
  },
  {
    id: "ex-2",
    titulo: "Prova de Português - Ensino Médio",
    descricao: "Interpretação de texto e gramática",
    imagemUrl: "https://placehold.co/600x400/1a365d/ffffff?text=Preview+da+Prova",
    link: "#",
  },
  {
    id: "ex-3",
    titulo: "Prova de Ciências - 8º Ano",
    descricao: "Sistema solar e ecologia",
    imagemUrl: "https://placehold.co/600x400/1a365d/ffffff?text=Preview+da+Prova",
    link: "#",
  },
];

function Index() {
  const [provas, setProvas] = useState<Prova[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProvas(JSON.parse(raw));
      } else {
        setProvas(PROVAS_INICIAIS);
      }
    } catch {
      setProvas(PROVAS_INICIAIS);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(provas));
  }, [provas, loaded]);

  const handleAdd = (data: Omit<Prova, "id">) => {
    const nova: Prova = {
      ...data,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
    setProvas((p) => [nova, ...p]);
    toast.success("Prova adicionada com sucesso!");
  };

  const handleRemove = (id: string) => {
    setProvas((p) => p.filter((x) => x.id !== id));
    toast.success("Prova removida.");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {provas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-20 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <FileQuestion className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Nenhuma prova cadastrada ainda
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Clique no botão <span className="font-medium text-foreground">+</span> no canto
              inferior direito para adicionar sua primeira prova.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {provas.length} {provas.length === 1 ? "prova" : "provas"} disponíve{provas.length === 1 ? "l" : "is"}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {provas.map((prova) => (
                <CardProva key={prova.id} prova={prova} onRemove={handleRemove} />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Desenvolvido por Yago | Setor de Qualidade.
        </div>
      </footer>

      <FormAdicionarProva onAdd={handleAdd} />
      <Toaster position="top-right" />
    </div>
  );
}
