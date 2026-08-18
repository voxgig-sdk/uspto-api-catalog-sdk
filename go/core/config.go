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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://developer.uspto.gov",
			"auth": map[string]any{
				"prefix": "",
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
								"parts": []any{
									"patent-assignment",
									"v1.4",
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
								"parts": []any{
									"office-action-citations",
									"v2",
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
								"parts": []any{
									"office-action-rejections",
									"v2",
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
								"parts": []any{
									"office-action-weekly-zips",
									"v1",
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
								"parts": []any{
									"enriched-citation",
									"v3",
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
								"parts": []any{
									"ptab",
									"v3",
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
								"parts": []any{
									"office-action-text",
									"v1",
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
								"parts": []any{
									"trademark-assignment",
									"v1.4",
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
								"parts": []any{
									"tsdr",
									"v1.0",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
