up:
	docker compose up -d
migrate:
	yarn typeorm migration:create src/database/migrations/$(n)
migration-run:
	docker compose exec app sh -c "yarn typeorm migration:run -d src/database/config/datasource.config.ts"
migration-revert:
	docker compose exec app sh -c "yarn typeorm migration:revert -d src/database/config/datasource.config.ts"