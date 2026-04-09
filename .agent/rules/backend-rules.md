---
trigger: always_on
---

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
5. `tests`
6. `README`

## Testing
- **Unit**: `tests/services/`
- **Integration**: `tests/endpoints/` (Supertest)
