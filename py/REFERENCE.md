# UsptoApiCatalog Python SDK Reference

Complete API reference for the UsptoApiCatalog Python SDK.


## UsptoApiCatalogSDK

### Constructor

```python
from uspto-api-catalog_sdk import UsptoApiCatalogSDK

client = UsptoApiCatalogSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UsptoApiCatalogSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = UsptoApiCatalogSDK.test()
```


### Instance Methods

#### `Patent(data=None)`

Create a new `PatentEntity` instance. Pass `None` for no initial data.

#### `Trademark(data=None)`

Create a new `TrademarkEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## PatentEntity

```python
patent = client.patent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignee` | ``$STRING`` | No |  |
| `assignment_date` | ``$STRING`` | No |  |
| `assignment_id` | ``$STRING`` | No |  |
| `assignor` | ``$STRING`` | No |  |
| `citation` | ``$ARRAY`` | No |  |
| `citation_number` | ``$STRING`` | No |  |
| `citation_type` | ``$STRING`` | No |  |
| `data` | ``$ARRAY`` | No |  |
| `date` | ``$STRING`` | No |  |
| `office_action` | ``$OBJECT`` | No |  |
| `patent_number` | ``$STRING`` | No |  |
| `rejection_text` | ``$STRING`` | No |  |
| `rejection_type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.patent.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.patent.load({"id": "patent_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PatentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrademarkEntity

```python
trademark = client.trademark
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assignment` | ``$ARRAY`` | No |  |
| `trademark_status` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.trademark.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.trademark.load({"id": "trademark_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrademarkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = UsptoApiCatalogSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

