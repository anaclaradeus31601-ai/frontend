
import PropertyGrid from "#components/property/property-grid";
import { useAuth } from "../../contexts/auth-context";
import { useFavorites } from "../../hooks/use-favorites";

export default function FavoritesProperties() {
  const { isAuthenticated, loading } = useAuth();
  const { data: favorites = [], isLoading, isError } = useFavorites();

  if (loading || isLoading) {
    return <div className="px-6 py-12 text-center text-muted-foreground">Carregando favoritos...</div>;
  }

  if (!isAuthenticated) {
    return <div className="px-6 py-12 text-center text-muted-foreground">Faça login para ver seus imóveis favoritos.</div>;
  }

  if (isError) {
    return <div className="px-6 py-12 text-center text-destructive">Não foi possível carregar seus favoritos.</div>;
  }

  return (
    <div className="space-y-6 py-8">
      <div className="px-6">
        <h1 className="text-3xl font-bold tracking-tight">Imóveis Favoritos</h1>
        <p className="text-sm text-muted-foreground">Salve os imóveis que você quer revisitar depois.</p>
      </div>

      <PropertyGrid
        properties={favorites.map((favorite) => ({
          ...favorite.property,
          isFavorite: true,
        }))}
        emptyMessage="Você ainda não salvou nenhum imóvel como favorito."
      />
    </div>
  );
}
