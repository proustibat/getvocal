# GetVocal Flow Designer

A small prototype for the GetVocal.ai flow builder take-home. It lets you browse flows, open a flow to view its steps, and add, edit or remove steps with lightweight persistence.

## Prerequisites
- **Node.js & npm**: Install a recent Node.js LTS release, which also ships with npm. See [nodejs.org](https://nodejs.org/) for installers and docs, and [docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for npm specifics.
- **nvm (recommended)**: A `.nvmrc` file pins the project to Node `v20.19.6`. Install [nvm](https://github.com/nvm-sh/nvm) and run `nvm use` in the repository root to automatically switch to the correct runtime.

## Installation
1. Clone the repository and move into it:
   ```bash
   git clone git@github.com:proustibat/getvocal.git
   cd getvocal
   ```
2. (Optional but recommended) align your Node version with nvm:
   ```bash
   nvm use
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development
- Start the Vite dev server:
  ```bash
  npm run dev
  ```
  The app runs at `http://localhost:5173` by default.


### Other scripts
- `npm run build` bundles the app for production (TypeScript project references run first).
- `npm run preview` serves the production build locally for a quick smoke test.
- `npm run lint` runs ESLint across the repo.


## Tests
- Automated tests are not written yet. When Vitest is added, they can be run with `npx vitest` (or a dedicated npm script) from the project root.

## Architectural decisions
- **Folder layout**: UI atoms and shared form elements live under `src/components/ui`, composable flow-specific pieces (e.g., `StepForm`) sit in `src/components`, feature logic and API facades are grouped under `src/features/flows`, and context/state lives in `src/context`, keeping concerns separated while keeping the surface small.
- **UI primitives**: Reusable UI atoms (cards, buttons, form inputs/selects/textareas, modal dialog) keep page components lean. Markdown rendering (`react-markdown`) formats step content for quick readability.
- **Routing**: `react-router-dom` defines the flows list (`/`) and flow details (`/flow/:id`) routes.
- **API simulation**: `src/features/flows/api.ts` returns mocked flow data from `mocks/flows.json` and waits briefly to mimic network latency, while `useFlowsQuery` wraps that call in React Query to expose loading/error states as if it were a real server round trip.
- **Persistence and resets**: `FlowProvider` hydrates from `localStorage` first, then seeds with the mocked flows on initial fetch. Any edits/creates/deletes write back to `localStorage`, so clearing `localStorage` restores the original mocked flows if you want a clean slate.
- **Forms**: `react-hook-form` powers the step creation/edit form components for minimal boilerplate and built-in validation messaging.
- 
## Tradeoffs and next steps
- **Step ordering**: Reordering is not implemented yet; the next step is to add drag-and-drop or up/down controls (e.g., via `@dnd-kit`) and persist the new order.
- **Deletions**: Steps delete immediately with no confirmation; a lightweight alert or modal should gate the action.
- **Flow discovery**: The flows list only supports a favorites toggle; adding text search/filtering would make navigation faster.
- **Modal UX**: Modals only close via the dedicated control; they should also close on outside clicks or Escape and improve focus/animation polish.
- **Validation**: Only `react-hook-form` required rules are active; wiring Zod schemas would tighten validation and error messaging.
- **Visualization**: The flow is linear; experimenting with `@xyflow/react` could make relationships clearer.
- **Tests**: Vitest + React Testing Library are not configured yet; bringing them in would let me cover the flows context, form behaviors, and critical UI paths.
