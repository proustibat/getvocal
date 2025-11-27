import { Button, Card, Spinner } from "components/ui";
import {useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

        <section className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-[2fr,1fr] sm:items-end">

            <div className="grid grid-cols-2 gap-3 items-end">
              <div className="flex items-end">
                <Button
                  type="button"
                  variant={favoritesOnly ? "primary" : "secondary"}
                  className="w-full h-full"
                  onClick={() => setFavoritesOnly((prev) => !prev)}
                  aria-pressed={favoritesOnly}
                >
                  {favoritesOnly ? "Showing favorites" : "Favorites only"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              {filteredFlows.length} / {flows?.length ?? 0} flows shown
            </span>
            {favoritesOnly && (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">
                Favorites filter active
              </span>
            )}
          </div>
        </section>

        <section>
          {(!flows || flows.length === 0) ? (
            <Card className="text-sm text-slate-500">
              No flows available yet.
            </Card>
          ) : filteredFlows.length === 0 ? (
            <Card className="text-sm text-slate-500">
              No flows match your filters.
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredFlows.map((flow) => (
                <Link
                  key={flow.id}
                  to={`/flow/${flow.id}`}
                  className="block group"
                >
                  <Card
                    className="flex items-center justify-between gap-3 transition-colors group-hover:bg-slate-50">
                    <div className="space-y-1">
                      <h2 className="text-sm font-medium text-slate-900 group-hover:text-slate-950">
                        {flow.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={favoriteIds.has(flow.id) ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favoriteIds.has(flow.id)}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(flow.id);
                        }}
                        className="rounded-full p-2 text-amber-500 hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={favoriteIds.has(flow.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.6a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.492 20.937a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.556l-4.204-3.6a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z"
                          />
                        </svg>
                      </button>
                      <span className="text-xs text-slate-400 group-hover:text-slate-500">→</span>
                    </div>
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
