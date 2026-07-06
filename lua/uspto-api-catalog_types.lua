-- Typed models for the UsptoApiCatalog SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Patent
---@field assignee? string
---@field assignment_date? string
---@field assignment_id? string
---@field assignor? string
---@field citation? table
---@field citation_number? string
---@field citation_type? string
---@field data? table
---@field date? string
---@field office_action? table
---@field patent_number? string
---@field rejection_text? string
---@field rejection_type? string
---@field url? string

---@class PatentLoadMatch
---@field assignee? string
---@field assignment_date? string
---@field assignment_id? string
---@field assignor? string
---@field citation? table
---@field citation_number? string
---@field citation_type? string
---@field data? table
---@field date? string
---@field office_action? table
---@field patent_number? string
---@field rejection_text? string
---@field rejection_type? string
---@field url? string

---@class PatentListMatch
---@field assignee? string
---@field assignment_date? string
---@field assignment_id? string
---@field assignor? string
---@field citation? table
---@field citation_number? string
---@field citation_type? string
---@field data? table
---@field date? string
---@field office_action? table
---@field patent_number? string
---@field rejection_text? string
---@field rejection_type? string
---@field url? string

---@class Trademark
---@field assignment? table
---@field trademark_status? table

---@class TrademarkLoadMatch
---@field assignment? table
---@field trademark_status? table

---@class TrademarkListMatch
---@field assignment? table
---@field trademark_status? table

local M = {}

return M
