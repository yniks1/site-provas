import { ExternalLink, Trash2, ImageOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface Prova {
  id: string;
  titulo: string;
  descricao?: string;
  imagemUrl?: string;
  link: string;
}

interface CardProvaProps {
  prova: Prova;
  onRemove: (id: string) => void;
}

export function CardProva({ prova, onRemove }: CardProvaProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = prova.imagemUrl && !imgError;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {hasImage ? (
          <img
            src={prova.imagemUrl}
            alt={`Preview de ${prova.titulo}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="h-10 w-10" />
            <span className="text-sm">Sem imagem disponível</span>
          </div>
        )}
        <button
          onClick={() => onRemove(prova.id)}
          aria-label="Remover prova"
          className="absolute right-3 top-3 rounded-full bg-background/90 p-2 text-muted-foreground opacity-0 shadow-md transition hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-tight text-foreground">{prova.titulo}</h3>
        {prova.descricao && (
          <p className="text-sm text-muted-foreground">{prova.descricao}</p>
        )}
        <div className="mt-auto pt-2">
          <Button asChild variant="accent" className="w-full">
            <a href={prova.link} target="_blank" rel="noopener noreferrer">
              Acesse aqui
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
