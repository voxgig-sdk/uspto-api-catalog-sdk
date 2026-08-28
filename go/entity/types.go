// Typed models for the UsptoApiCatalog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/uspto-api-catalog-sdk/go/core"
)

// Patent is the typed data model for the patent entity.
type Patent struct {
	ApplicationNumber *string `json:"applicationNumber,omitempty"`
	Assignee *string `json:"assignee,omitempty"`
	AssignmentDate *string `json:"assignmentDate,omitempty"`
	AssignmentId *string `json:"assignmentId,omitempty"`
	Assignor *string `json:"assignor,omitempty"`
	CitationNumber *string `json:"citationNumber,omitempty"`
	CitationType *string `json:"citationType,omitempty"`
	Citations *[]any `json:"citations,omitempty"`
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	PatentNumber *string `json:"patentNumber,omitempty"`
	RejectionText *string `json:"rejectionText,omitempty"`
	RejectionType *string `json:"rejectionType,omitempty"`
	Text *string `json:"text,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PatentLoadMatch is the typed request payload for Patent.LoadTyped.
type PatentLoadMatch struct {
	ApplicationNumber *string `json:"application_number,omitempty"`
}

// PatentListMatch is the typed request payload for Patent.ListTyped.
type PatentListMatch struct {
	Format *string `json:"format,omitempty"`
	SearchQuery *string `json:"search_query,omitempty"`
}

// Trademark is the typed data model for the trademark entity.
type Trademark struct {
	Assignments *[]any `json:"assignments,omitempty"`
	Documents *[]any `json:"documents,omitempty"`
	SerialNumber *string `json:"serialNumber,omitempty"`
	Status *string `json:"status,omitempty"`
}

// TrademarkLoadMatch is the typed request payload for Trademark.LoadTyped.
type TrademarkLoadMatch struct {
	RegistrationNumber *string `json:"registration_number,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
}

// TrademarkListMatch is the typed request payload for Trademark.ListTyped.
type TrademarkListMatch struct {
	Format *string `json:"format,omitempty"`
	SearchQuery *string `json:"search_query,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
