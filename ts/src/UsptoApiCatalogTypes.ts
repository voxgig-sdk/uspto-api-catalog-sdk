// Typed models for the UsptoApiCatalog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Patent {
  assignee?: string
  assignment_date?: string
  assignment_id?: string
  assignor?: string
  citation?: any[]
  citation_number?: string
  citation_type?: string
  data?: any[]
  date?: string
  office_action?: Record<string, any>
  patent_number?: string
  rejection_text?: string
  rejection_type?: string
  url?: string
}

export type PatentLoadMatch = Partial<Patent>

export type PatentListMatch = Partial<Patent>

export interface Trademark {
  assignment?: any[]
  trademark_status?: Record<string, any>
}

export type TrademarkLoadMatch = Partial<Trademark>

export type TrademarkListMatch = Partial<Trademark>

