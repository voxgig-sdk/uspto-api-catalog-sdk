// Typed models for the UsptoApiCatalog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Patent is the typed data model for the patent entity.
type Patent struct {
	Assignee *string `json:"assignee,omitempty"`
	AssignmentDate *string `json:"assignment_date,omitempty"`
	AssignmentId *string `json:"assignment_id,omitempty"`
	Assignor *string `json:"assignor,omitempty"`
	Citation *[]any `json:"citation,omitempty"`
	CitationNumber *string `json:"citation_number,omitempty"`
	CitationType *string `json:"citation_type,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	OfficeAction *map[string]any `json:"office_action,omitempty"`
	PatentNumber *string `json:"patent_number,omitempty"`
	RejectionText *string `json:"rejection_text,omitempty"`
	RejectionType *string `json:"rejection_type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PatentLoadMatch mirrors the patent fields as an all-optional match
// filter (Go analog of Partial<Patent>).
type PatentLoadMatch struct {
	Assignee *string `json:"assignee,omitempty"`
	AssignmentDate *string `json:"assignment_date,omitempty"`
	AssignmentId *string `json:"assignment_id,omitempty"`
	Assignor *string `json:"assignor,omitempty"`
	Citation *[]any `json:"citation,omitempty"`
	CitationNumber *string `json:"citation_number,omitempty"`
	CitationType *string `json:"citation_type,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	OfficeAction *map[string]any `json:"office_action,omitempty"`
	PatentNumber *string `json:"patent_number,omitempty"`
	RejectionText *string `json:"rejection_text,omitempty"`
	RejectionType *string `json:"rejection_type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PatentListMatch mirrors the patent fields as an all-optional match
// filter (Go analog of Partial<Patent>).
type PatentListMatch struct {
	Assignee *string `json:"assignee,omitempty"`
	AssignmentDate *string `json:"assignment_date,omitempty"`
	AssignmentId *string `json:"assignment_id,omitempty"`
	Assignor *string `json:"assignor,omitempty"`
	Citation *[]any `json:"citation,omitempty"`
	CitationNumber *string `json:"citation_number,omitempty"`
	CitationType *string `json:"citation_type,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	OfficeAction *map[string]any `json:"office_action,omitempty"`
	PatentNumber *string `json:"patent_number,omitempty"`
	RejectionText *string `json:"rejection_text,omitempty"`
	RejectionType *string `json:"rejection_type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Trademark is the typed data model for the trademark entity.
type Trademark struct {
	Assignment *[]any `json:"assignment,omitempty"`
	TrademarkStatus *map[string]any `json:"trademark_status,omitempty"`
}

// TrademarkLoadMatch mirrors the trademark fields as an all-optional match
// filter (Go analog of Partial<Trademark>).
type TrademarkLoadMatch struct {
	Assignment *[]any `json:"assignment,omitempty"`
	TrademarkStatus *map[string]any `json:"trademark_status,omitempty"`
}

// TrademarkListMatch mirrors the trademark fields as an all-optional match
// filter (Go analog of Partial<Trademark>).
type TrademarkListMatch struct {
	Assignment *[]any `json:"assignment,omitempty"`
	TrademarkStatus *map[string]any `json:"trademark_status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
