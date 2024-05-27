# Event Parser

- I cloned example from [Aptos](https://github.com/aptos-labs/aptos-indexer-processors/tree/main/typescript/examples/event_processor)
- Add logics to validate event in `processor.ts` file & validate version in `config.yaml` file.

`From me:` I just add logic to filter events, but cannot confirm that everything work as expected cause I unable run this Aptos sdk cause error on gRPC Client JS for Aptos SDK (was raise in README of them)

# Crawler

- I implemented crawler for Thela on starting point at `index.ts`
- For Liquidswap, as my CV, I don't know anything about blockchain, so I'm not very clearly about requirement. So I decided to not implement it now.

# How to run

## Event Parser

### Prerequisites

- `pnpm`: The code is tested with pnpm 8.6.2. Later versions should work too.
- `node`: The code is tested with Node 18. Later versions should work too.

### Usage

Install all the dependencies:

```
pnpm install
```

I prepared the `config.yaml` file. You don't need to config anything

Run the example:

```
pnpm start process --config config.yaml
```

## Crawler

### Prerequisites

- `pnpm`: The code is tested with pnpm 8.6.2. Later versions should work too.
- `node`: The code is tested with Node 18. Later versions should work too.

### Usage

Install all the dependencies:

```
pnpm install
```

Run the example:

```
pnpm start crawler --source thala
```
