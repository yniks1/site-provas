import logoAssistme from "../assets/logoAssistme.png";

export function Header() {
  return (
    <header className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-8 sm:py-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          {/* A variável entra aqui */}
          <img 
            src={logoAssistme} 
            alt="Logo Assistme" 
            className="h-7 w-7 object-contain" 
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Central de Provas</h1>
          <p className="mt-1 text-sm text-primary-foreground/70 sm:text-base">
            Acesse todas as prova aplicadas pela Assistme.
          </p>
        </div>
      </div>
    </header>
  );
}