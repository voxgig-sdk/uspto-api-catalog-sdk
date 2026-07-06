# frozen_string_literal: true

# Typed models for the UsptoApiCatalog SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Patent entity data model.
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignment_date
#   @return [String, nil]
#
# @!attribute [rw] assignment_id
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citation
#   @return [Array, nil]
#
# @!attribute [rw] citation_number
#   @return [String, nil]
#
# @!attribute [rw] citation_type
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] office_action
#   @return [Hash, nil]
#
# @!attribute [rw] patent_number
#   @return [String, nil]
#
# @!attribute [rw] rejection_text
#   @return [String, nil]
#
# @!attribute [rw] rejection_type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Patent = Struct.new(
  :assignee,
  :assignment_date,
  :assignment_id,
  :assignor,
  :citation,
  :citation_number,
  :citation_type,
  :data,
  :date,
  :office_action,
  :patent_number,
  :rejection_text,
  :rejection_type,
  :url,
  keyword_init: true
)

# Request payload for Patent#load.
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignment_date
#   @return [String, nil]
#
# @!attribute [rw] assignment_id
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citation
#   @return [Array, nil]
#
# @!attribute [rw] citation_number
#   @return [String, nil]
#
# @!attribute [rw] citation_type
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] office_action
#   @return [Hash, nil]
#
# @!attribute [rw] patent_number
#   @return [String, nil]
#
# @!attribute [rw] rejection_text
#   @return [String, nil]
#
# @!attribute [rw] rejection_type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PatentLoadMatch = Struct.new(
  :assignee,
  :assignment_date,
  :assignment_id,
  :assignor,
  :citation,
  :citation_number,
  :citation_type,
  :data,
  :date,
  :office_action,
  :patent_number,
  :rejection_text,
  :rejection_type,
  :url,
  keyword_init: true
)

# Request payload for Patent#list.
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignment_date
#   @return [String, nil]
#
# @!attribute [rw] assignment_id
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citation
#   @return [Array, nil]
#
# @!attribute [rw] citation_number
#   @return [String, nil]
#
# @!attribute [rw] citation_type
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] office_action
#   @return [Hash, nil]
#
# @!attribute [rw] patent_number
#   @return [String, nil]
#
# @!attribute [rw] rejection_text
#   @return [String, nil]
#
# @!attribute [rw] rejection_type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PatentListMatch = Struct.new(
  :assignee,
  :assignment_date,
  :assignment_id,
  :assignor,
  :citation,
  :citation_number,
  :citation_type,
  :data,
  :date,
  :office_action,
  :patent_number,
  :rejection_text,
  :rejection_type,
  :url,
  keyword_init: true
)

# Trademark entity data model.
#
# @!attribute [rw] assignment
#   @return [Array, nil]
#
# @!attribute [rw] trademark_status
#   @return [Hash, nil]
Trademark = Struct.new(
  :assignment,
  :trademark_status,
  keyword_init: true
)

# Request payload for Trademark#load.
#
# @!attribute [rw] assignment
#   @return [Array, nil]
#
# @!attribute [rw] trademark_status
#   @return [Hash, nil]
TrademarkLoadMatch = Struct.new(
  :assignment,
  :trademark_status,
  keyword_init: true
)

# Request payload for Trademark#list.
#
# @!attribute [rw] assignment
#   @return [Array, nil]
#
# @!attribute [rw] trademark_status
#   @return [Hash, nil]
TrademarkListMatch = Struct.new(
  :assignment,
  :trademark_status,
  keyword_init: true
)

