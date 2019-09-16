# HOWTO

## Install

```
brew install golang-migrate
```

## Create a migration file

```
migrate create -ext sql -dir migrations -seq initial
```

## Run

```
migrate -database "$MY_DB_URI?x-migrations-table=podcastbin_schema_migrations" -path migrations up
```
