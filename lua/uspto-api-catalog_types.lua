-- Typed models for the UsptoApiCatalog SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Patent
---@field applicationNumber? string
---@field assignee? string
---@field assignmentDate? string
---@field assignmentId? string
---@field assignor? string
---@field citationNumber? string
---@field citationType? string
---@field citations? table
---@field data? table
---@field date? string
---@field patentNumber? string
---@field rejectionText? string
---@field rejectionType? string
---@field text? string
---@field url? string

---@class PatentLoadMatch
---@field application_number? string

---@class PatentListMatch
---@field format? string
---@field search_query? string

---@class Trademark
---@field assignments? table
---@field documents? table
---@field serialNumber? string
---@field status? string

---@class TrademarkLoadMatch
---@field registration_number? string
---@field serial_number? string

---@class TrademarkListMatch
---@field format? string
---@field search_query? string

local M = {}

return M
