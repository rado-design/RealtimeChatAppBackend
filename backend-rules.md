# Backend Rules

## Stack
- Node.js + Express
- MongoDB + Mongoose
- ES Modules only (`import`/`export`)

## Structure
- `controllers/`: `[domain]-controller.js`
- `services/`: `[domain]-service.js` (logic)
- `models/`: `[domain]-model.js`
- `routes/`: `[domain]-routes.js` + `index.js`
- `middleware/`: custom middlewares
- `utils/`: helper functions
- `config/`: database and other configs

## Workflow
1. `model`
2. `service`
3. `controller`
4. `route`
5. `tests` (Always write corresponding tests for every implementation)
6. `documentation` (Update documentation in `docs/[domain]/` for every new endpoint)
7. `README` (Document the implementation with the date)
8. `Delivery`

## Documentation
- Store API docs in `docs/[domain]/` folder.
- Use Markdown for documentation.
- Update documentation at the same time as the code.

## Testing
- **Unit**: `tests/services/`
- **Integration**: `tests/endpoints/` (Supertest)

## Running the Server
- Always use Doppler to inject environment variables: `doppler run -- npm run dev`
