# RecipeAI API
Recipe AI is an application that uses machine learning to recommend recipes based on the ingredients you have at home.

## Prerequisites

Make sure you have the following tools and their specified versions installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Configuration

### Running the Project with Docker

Use Docker Compose to build and run the application. To do this, execute the following command:

```bash
make up
```

After running the command, the API will be available on the port configured in your .env file.

## Database Migration

### Create a migration
The project uses a migration system to keep the database up to date. To execute the migrations, use the following command:

```bash
make migrate n=<migration_name>
```

### Revert a migration
```bash
make migration-revert
```

### Apply migrations
```bash
make migration-run
```
