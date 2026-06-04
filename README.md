# UsptoApiCatalog SDK

Search and retrieve US Patent and Trademark Office intellectual property data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About USPTO API Catalog

The USPTO API Catalog is a developer entry point published by the [United States Patent and Trademark Office](https://www.uspto.gov/), the federal agency that grants U.S. patents and registers trademarks. The catalogue surfaces machine-readable access to USPTO intellectual-property datasets through the [developer.uspto.gov](https://developer.uspto.gov) hub (which redirects to [data.uspto.gov](https://data.uspto.gov)).

What you can do with the catalogue:

- Query the intellectual-property marketplace dataset by free-text search (for example `searchText=vehicles`).
- Discover other USPTO APIs covering patents and trademarks from a single index.
- Pull government-sourced IP data for analytics, prior-art tooling, and brand-monitoring use cases.

Operational notes: the catalogue endpoint exposes GET requests over HTTPS and does not document an API-key requirement on the landing page. CORS is disabled, so calls typically need to come from a server. Response times observed by third-party monitors averaged around 800 ms. Rate limits, auth schemes, and field-level licence terms vary per underlying API and should be confirmed in each API's own documentation.

## Try it

**TypeScript**
```bash
npm install uspto-api-catalog
```

**Python**
```bash
pip install uspto-api-catalog-sdk
```

**PHP**
```bash
composer require voxgig/uspto-api-catalog-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/uspto-api-catalog-sdk/go
```

**Ruby**
```bash
gem install uspto-api-catalog-sdk
```

**Lua**
```bash
luarocks install uspto-api-catalog-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UsptoApiCatalogSDK } from 'uspto-api-catalog'

const client = new UsptoApiCatalogSDK({})

// List all patents
const patents = await client.Patent().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o uspto-api-catalog-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "uspto-api-catalog": {
      "command": "/abs/path/to/uspto-api-catalog-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Patent** | U.S. patent records and related intellectual-property marketplace data exposed through USPTO patent APIs reachable from the catalogue. | `/patent-assignment/v1.4` |
| **Trademark** | U.S. trademark filings and registrations accessible via the USPTO trademark APIs linked from the catalogue. | `/trademark-assignment/v1.4` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from usptoapicatalog_sdk import UsptoApiCatalogSDK

client = UsptoApiCatalogSDK({})

# List all patents
patents, err = client.Patent(None).list(None, None)

# Load a specific patent
patent, err = client.Patent(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'usptoapicatalog_sdk.php';

$client = new UsptoApiCatalogSDK([]);

// List all patents
[$patents, $err] = $client->Patent(null)->list(null, null);

// Load a specific patent
[$patent, $err] = $client->Patent(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/uspto-api-catalog-sdk/go"

client := sdk.NewUsptoApiCatalogSDK(map[string]any{})

// List all patents
patents, err := client.Patent(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "UsptoApiCatalog_sdk"

client = UsptoApiCatalogSDK.new({})

# List all patents
patents, err = client.Patent(nil).list(nil, nil)

# Load a specific patent
patent, err = client.Patent(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("uspto-api-catalog_sdk")

local client = sdk.new({})

-- List all patents
local patents, err = client:Patent(nil):list(nil, nil)

-- Load a specific patent
local patent, err = client:Patent(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UsptoApiCatalogSDK.test()
const result = await client.Patent().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UsptoApiCatalogSDK.test(None, None)
result, err = client.Patent(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UsptoApiCatalogSDK::test(null, null);
[$result, $err] = $client->Patent(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Patent(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UsptoApiCatalogSDK.test(nil, nil)
result, err = client.Patent(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Patent(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the USPTO API Catalog

- Upstream: [https://developer.uspto.gov](https://developer.uspto.gov)

- Data is produced by the United States Patent and Trademark Office, a U.S. federal agency.
- U.S. federal government works are generally in the public domain within the United States (17 U.S.C. § 105).
- No explicit licence or attribution text is published on the catalogue landing page; check the individual API documentation for terms before redistribution.
- CORS is reported as disabled on the catalogue endpoint, so browser-only clients may need a proxy.

---

Generated from the USPTO API Catalog OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
