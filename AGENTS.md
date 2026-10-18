# VoteSub

Realtime voting SPA. Users register by category, create subjects with candidates, and spend votes
from a personal vote bank (100/day) on their favorites.

React 17 + TypeScript on Vite 2, Redux Toolkit, MUI 5. Backend is Firebase (Auth, Firestore,
Storage, Cloud Functions) in the `asia-south1` region.

## Commands

Frontend uses **Yarn 3.2.2**. `functions/` uses **npm only** — do not run yarn there.

| Task | Command |
| --- | --- |
| Dev server (port 3000) | `yarn dev` |
| Typecheck + build | `yarn build` |
| Lint | `yarn lint` |
| Build functions | `cd functions && npm run build` (or `build:watch`) |
| Emulators | `firebase emulators:start --export-on-exit=./emulators_data/ --import=./emulators_data` |

There is no test suite. Deployment runs through Google Cloud Build
(`cloudbuild-testing.yaml`, `cloudbuild-master.yaml`) to Firebase Hosting channels.

Commits are validated by commitlint (`@commitlint/config-conventional`) via husky, so use
conventional commit messages: `feat(scope):`, `fix(scope):`, `style(scope):`, `docs(scope):`,
`refactor:`.

## Layout

Imports are absolute via aliases declared in **both** `vite.config.ts` and `tsconfig.json`
(`baseUrl: src`). Adding an alias means editing both files.

`assets` `components` `config` `hooks` `layouts` `pages` `store` `styled` `utils` `types` `features`

- `src/features/` — Firebase SDK calls as standalone async functions (`voteNow`,
  `getCandidatesDetails`, `getCurrentLoggedUser`). These read and write Redux directly through
  `store.getState()` / `store.dispatch()` rather than hooks, since they run outside React.
- `src/store/` — Redux Toolkit slices, registered in `src/store/index.ts`.
- `src/components/` — `core/` for domain pieces, `InputFields/` for form wrappers,
  `layouts/` for Header/SideBar/Pagination, `UI/` for generic primitives.
- `src/utils/helperFunctions/` — one default-exported function per file.
- `functions/src/` — one Cloud Function per file, re-exported from `functions/src/index.ts`.

## Conventions

- Each component is a folder with `index.tsx` and a co-located `ComponentName.styles.scss`.
  Default export, named after the folder.
- Redux action creators are `SCREAMING_SNAKE_CASE` (`SHOW_SIDEBAR`, `SAVE_EXISTING_USER_AUTH_DETAILS`).
- Types live in `src/types/<domain>/index.ts`. Interfaces are `I`-prefixed (`ISubjectData`),
  type aliases are `T`-prefixed (`TGlobalUIState`).
- Form validation is `react-hook-form` + Yup, with schemas in a `yupValidations.ts` beside the form.
- Prettier: 4-space tabs, single quotes, trailing commas, 100 col. Runs on staged files via
  lint-staged.
- Routes in `App.tsx` are code-split with `lazyWithPreload`, then eagerly preloaded in a
  `useEffect`. New pages should follow the same pattern.

## Gotchas

- `getCurrentLoggedUser()` must be called inside `useEffect` or it infinite-loops.
- `src/config/firebase/index.ts` auto-connects to emulators when `hostname === 'localhost'`.
  Use `localhost`, not `127.0.0.1`, in the browser.
- React 17 is force-pinned through a `resolutions` entry in `package.json`. MUI and other deps
  must stay React-17 compatible.
- Five Cloud Functions (`voteNow`, `saveToHistory`, `getSubjectsList`, `getTotalVotes`,
  `getUserVotingHistory`) are written but commented out in both `functions/src/index.ts` and
  `src/config/firebase/index.ts`. That logic now lives client-side in `src/features/`.
- As a result, vote limits are enforced only on the client, and `firestore.rules` grants blanket
  read/write to any authenticated user. Treat vote and candidate writes as untrusted.
