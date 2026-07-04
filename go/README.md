# UsptoApiCatalog Golang SDK



The Golang SDK for the UsptoApiCatalog API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/uspto-api-catalog-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/uspto-api-catalog-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/uspto-api-catalog-sdk/go=../uspto-api-catalog-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/uspto-api-catalog-sdk/go"
)

func main() {
    client := sdk.NewUsptoApiCatalogSDK(map[string]any{
        "apikey": os.Getenv("USPTO_API_CATALOG_APIKEY"),
    })

    // List patent records — the value is the array of records itself.
    patents, err := client.Patent(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range patents.([]any) {
        fmt.Println(item)
    }

    // Load a single patent — the value is the loaded record.
    patent, err := client.Patent(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(patent)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

patent, err := client.Patent(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(patent) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewUsptoApiCatalogSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
USPTO_API_CATALOG_TEST_LIVE=TRUE
USPTO_API_CATALOG_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewUsptoApiCatalogSDK

```go
func NewUsptoApiCatalogSDK(options map[string]any) *UsptoApiCatalogSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *UsptoApiCatalogSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UsptoApiCatalogSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Patent` | `(data map[string]any) UsptoApiCatalogEntity` | Create a Patent entity instance. |
| `Trademark` | `(data map[string]any) UsptoApiCatalogEntity` | Create a Trademark entity instance. |

### Entity interface (UsptoApiCatalogEntity)

All entities implement the `UsptoApiCatalogEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    patent, err := client.Patent(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // patent is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Patent

| Field | Description |
| --- | --- |
| `"assignee"` |  |
| `"assignment_date"` |  |
| `"assignment_id"` |  |
| `"assignor"` |  |
| `"citation"` |  |
| `"citation_number"` |  |
| `"citation_type"` |  |
| `"data"` |  |
| `"date"` |  |
| `"office_action"` |  |
| `"patent_number"` |  |
| `"rejection_text"` |  |
| `"rejection_type"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/patent-assignment/v1.4`

#### Trademark

| Field | Description |
| --- | --- |
| `"assignment"` |  |
| `"trademark_status"` |  |

Operations: List, Load.

API path: `/trademark-assignment/v1.4`



## Entities


### Patent

Create an instance: `patent := client.Patent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignee` | ``$STRING`` |  |
| `assignment_date` | ``$STRING`` |  |
| `assignment_id` | ``$STRING`` |  |
| `assignor` | ``$STRING`` |  |
| `citation` | ``$ARRAY`` |  |
| `citation_number` | ``$STRING`` |  |
| `citation_type` | ``$STRING`` |  |
| `data` | ``$ARRAY`` |  |
| `date` | ``$STRING`` |  |
| `office_action` | ``$OBJECT`` |  |
| `patent_number` | ``$STRING`` |  |
| `rejection_text` | ``$STRING`` |  |
| `rejection_type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
patent, err := client.Patent(nil).Load(map[string]any{"id": "patent_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(patent) // the loaded record
```

#### Example: List

```go
patents, err := client.Patent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(patents) // the array of records
```


### Trademark

Create an instance: `trademark := client.Trademark(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assignment` | ``$ARRAY`` |  |
| `trademark_status` | ``$OBJECT`` |  |

#### Example: Load

```go
trademark, err := client.Trademark(nil).Load(map[string]any{"id": "trademark_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(trademark) // the loaded record
```

#### Example: List

```go
trademarks, err := client.Trademark(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(trademarks) // the array of records
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/uspto-api-catalog-sdk/go/
├── uspto-api-catalog.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/uspto-api-catalog-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
patent := client.Patent(nil)
patent.Load(map[string]any{"id": "example_id"}, nil)

// patent.Data() now returns the loaded patent data
// patent.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
