import { Button, Card, Spinner } from "components/ui";
import { useMemo, useState} from "react";
import ButtonFavorite from "../components/ui/ButtonFavorite.tsx";
import { Link } from "react-router-dom";
import NumberItemsTag from "../components/ui/NumberItemsTag.tsx";
import {useFlowsContext} from "../context/FlowContext.tsx";

export const FlowsPage = () => {
  const { flows, isLoading } = useFlowsContext();

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const storedFavorites = localStorage.getItem("favoriteFlows");

    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);

        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      } catch (error) {
        console.error("Failed to parse favorite flows", error);
      }
    }
    return new Set();
  });

  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);

      if (updatedFavorites.has(id)) {
        updatedFavorites.delete(id);
      } else {
        updatedFavorites.add(id);
      }

      localStorage.setItem(
        "favoriteFlows",
        JSON.stringify(Array.from(updatedFavorites)),
      );

      return updatedFavorites;
    });
  };

  const filteredFlows = useMemo(() => {
    if (!flows) return [];

    return flows.filter((flow) => {
      return favoritesOnly ? favoriteIds.has(flow.id) : true;
    });
  }, [favoriteIds, favoritesOnly, flows]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Flows
          </h1>
          <p className="text-sm text-slate-500">
            Browse your flows and view steps.
          </p>
        </header>

        {/* filters */}
        <section className="flex flex-row items-center gap-2 flex-wrap">
          <Button
            variant={favoritesOnly ? "primary" : "secondary"}
            onClick={() => setFavoritesOnly((prev) => !prev)}
            aria-pressed={favoritesOnly}
          >
            {favoritesOnly ? "Clear favorites filter" : "Show only favorites"}
          </Button>
        </section>
        <div className="flex justify-center">
          <NumberItemsTag value={filteredFlows.length} singularWord={`flow shown / ${flows?.length} total`} pluralWord={`flows shown / ${flows?.length} total`}/>
        </div>

        <section>
          {(!flows || flows.length === 0)
            ? <Card className="text-sm text-slate-500">No flows available yet.</Card>
            : filteredFlows.length === 0
              ? <Card className="text-sm text-slate-500">No flows match your filters.</Card>
              : (
                <div className="space-y-3">
                  {filteredFlows.map((flow) => (
                    <Link
                      key={flow.id}
                      to={`/flow/${flow.id}`}
                      className="block group"
                    >
                      <Card
                        className="flex items-center justify-between gap-3"
                      >
                        <h2 className="font-medium text-slate-900 ">{flow.name}</h2>
                        <ButtonFavorite
                          onClick={() => toggleFavorite(flow.id)}
                          isSelected={favoriteIds.has(flow.id)}
                        />
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
        </section>
      </main>
    </div>
  );
};
