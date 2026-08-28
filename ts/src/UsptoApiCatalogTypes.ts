// Typed models for the UsptoApiCatalog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Patent {
  applicationNumber?: string
  assignee?: string
  assignmentDate?: string
  assignmentId?: string
  assignor?: string
  citationNumber?: string
  citationType?: string
  citations?: any[]
  data?: any[]
  date?: string
  patentNumber?: string
  rejectionText?: string
  rejectionType?: string
  text?: string
  url?: string
}

export interface PatentLoadMatch {
  application_number?: string
}

export interface PatentListMatch {
  format?: string
  search_query?: string
}

export interface Trademark {
  assignments?: any[]
  documents?: any[]
  serialNumber?: string
  status?: string
}

export interface TrademarkLoadMatch {
  registration_number?: string
  serial_number?: string
}

export interface TrademarkListMatch {
  format?: string
  search_query?: string
}

