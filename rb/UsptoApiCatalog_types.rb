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
# @!attribute [rw] applicationNumber
#   @return [String, nil]
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignmentDate
#   @return [String, nil]
#
# @!attribute [rw] assignmentId
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citationNumber
#   @return [String, nil]
#
# @!attribute [rw] citationType
#   @return [String, nil]
#
# @!attribute [rw] citations
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] patentNumber
#   @return [String, nil]
#
# @!attribute [rw] rejectionText
#   @return [String, nil]
#
# @!attribute [rw] rejectionType
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Patent = Struct.new(
  :applicationNumber,
  :assignee,
  :assignmentDate,
  :assignmentId,
  :assignor,
  :citationNumber,
  :citationType,
  :citations,
  :data,
  :date,
  :patentNumber,
  :rejectionText,
  :rejectionType,
  :text,
  :url,
  keyword_init: true
)

# Request payload for Patent#load.
#
# @!attribute [rw] applicationNumber
#   @return [String, nil]
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignmentDate
#   @return [String, nil]
#
# @!attribute [rw] assignmentId
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citationNumber
#   @return [String, nil]
#
# @!attribute [rw] citationType
#   @return [String, nil]
#
# @!attribute [rw] citations
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] patentNumber
#   @return [String, nil]
#
# @!attribute [rw] rejectionText
#   @return [String, nil]
#
# @!attribute [rw] rejectionType
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PatentLoadMatch = Struct.new(
  :applicationNumber,
  :assignee,
  :assignmentDate,
  :assignmentId,
  :assignor,
  :citationNumber,
  :citationType,
  :citations,
  :data,
  :date,
  :patentNumber,
  :rejectionText,
  :rejectionType,
  :text,
  :url,
  keyword_init: true
)

# Request payload for Patent#list.
#
# @!attribute [rw] applicationNumber
#   @return [String, nil]
#
# @!attribute [rw] assignee
#   @return [String, nil]
#
# @!attribute [rw] assignmentDate
#   @return [String, nil]
#
# @!attribute [rw] assignmentId
#   @return [String, nil]
#
# @!attribute [rw] assignor
#   @return [String, nil]
#
# @!attribute [rw] citationNumber
#   @return [String, nil]
#
# @!attribute [rw] citationType
#   @return [String, nil]
#
# @!attribute [rw] citations
#   @return [Array, nil]
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] patentNumber
#   @return [String, nil]
#
# @!attribute [rw] rejectionText
#   @return [String, nil]
#
# @!attribute [rw] rejectionType
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PatentListMatch = Struct.new(
  :applicationNumber,
  :assignee,
  :assignmentDate,
  :assignmentId,
  :assignor,
  :citationNumber,
  :citationType,
  :citations,
  :data,
  :date,
  :patentNumber,
  :rejectionText,
  :rejectionType,
  :text,
  :url,
  keyword_init: true
)

# Trademark entity data model.
#
# @!attribute [rw] assignments
#   @return [Array, nil]
#
# @!attribute [rw] documents
#   @return [Array, nil]
#
# @!attribute [rw] serialNumber
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Trademark = Struct.new(
  :assignments,
  :documents,
  :serialNumber,
  :status,
  keyword_init: true
)

# Request payload for Trademark#load.
#
# @!attribute [rw] assignments
#   @return [Array, nil]
#
# @!attribute [rw] documents
#   @return [Array, nil]
#
# @!attribute [rw] serialNumber
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
TrademarkLoadMatch = Struct.new(
  :assignments,
  :documents,
  :serialNumber,
  :status,
  keyword_init: true
)

# Request payload for Trademark#list.
#
# @!attribute [rw] assignments
#   @return [Array, nil]
#
# @!attribute [rw] documents
#   @return [Array, nil]
#
# @!attribute [rw] serialNumber
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
TrademarkListMatch = Struct.new(
  :assignments,
  :documents,
  :serialNumber,
  :status,
  keyword_init: true
)

