package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UsptoApiCatalog",
			"slug": "uspto-api-catalog",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://developer.uspto.gov",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-KEY",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"patent": map[string]any{},
				"trademark": map[string]any{},
			},
		},
		"entity": map[string]any{
			"patent": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "applicationNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "assignee",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "assignmentDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "assignmentId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "assignor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "citationNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "citationType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "citations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "data",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "patentNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rejectionText",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rejectionType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "patent",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "search_query",
											"orig": "search_query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/patent-assignment/v1.4",
								"segments": []any{
									map[string]any{
										"lit": "patent-assignment",
									},
									map[string]any{
										"lit": "v1.4",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"search_query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.assignments`",
								},
								"parts": []any{
									"patent-assignment",
									"v1.4",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_number",
											"orig": "application_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/office-action-citations/v2",
								"segments": []any{
									map[string]any{
										"lit": "office-action-citations",
									},
									map[string]any{
										"lit": "v2",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.citations`",
								},
								"parts": []any{
									"office-action-citations",
									"v2",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_number",
											"orig": "application_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/office-action-rejections/v2",
								"segments": []any{
									map[string]any{
										"lit": "office-action-rejections",
									},
									map[string]any{
										"lit": "v2",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rejections`",
								},
								"parts": []any{
									"office-action-rejections",
									"v2",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/office-action-weekly-zips/v1",
								"segments": []any{
									map[string]any{
										"lit": "office-action-weekly-zips",
									},
									map[string]any{
										"lit": "v1",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.files`",
								},
								"parts": []any{
									"office-action-weekly-zips",
									"v1",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "patent_number",
											"orig": "patent_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/enriched-citation/v3",
								"segments": []any{
									map[string]any{
										"lit": "enriched-citation",
									},
									map[string]any{
										"lit": "v3",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"patent_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.citations`",
								},
								"parts": []any{
									"enriched-citation",
									"v3",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ptab/v3",
								"segments": []any{
									map[string]any{
										"lit": "ptab",
									},
									map[string]any{
										"lit": "v3",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"ptab",
									"v3",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "application_number",
											"orig": "application_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/office-action-text/v1",
								"segments": []any{
									map[string]any{
										"lit": "office-action-text",
									},
									map[string]any{
										"lit": "v1",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"application_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.officeAction`",
								},
								"parts": []any{
									"office-action-text",
									"v1",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"trademark": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "assignments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "documents",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "serialNumber",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "trademark",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "xml",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "search_query",
											"orig": "search_query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/trademark-assignment/v1.4",
								"segments": []any{
									map[string]any{
										"lit": "trademark-assignment",
									},
									map[string]any{
										"lit": "v1.4",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"search_query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.assignments`",
								},
								"parts": []any{
									"trademark-assignment",
									"v1.4",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "registration_number",
											"orig": "registration_number",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "serial_number",
											"orig": "serial_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tsdr/v1.0",
								"segments": []any{
									map[string]any{
										"lit": "tsdr",
									},
									map[string]any{
										"lit": "v1.0",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"registration_number",
										"serial_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.trademarkStatus`",
								},
								"parts": []any{
									"tsdr",
									"v1.0",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
