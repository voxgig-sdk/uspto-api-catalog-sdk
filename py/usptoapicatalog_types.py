# Typed models for the UsptoApiCatalog SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Patent(TypedDict, total=False):
    assignee: str
    assignment_date: str
    assignment_id: str
    assignor: str
    citation: list
    citation_number: str
    citation_type: str
    data: list
    date: str
    office_action: dict
    patent_number: str
    rejection_text: str
    rejection_type: str
    url: str


class PatentLoadMatch(TypedDict, total=False):
    assignee: str
    assignment_date: str
    assignment_id: str
    assignor: str
    citation: list
    citation_number: str
    citation_type: str
    data: list
    date: str
    office_action: dict
    patent_number: str
    rejection_text: str
    rejection_type: str
    url: str


class PatentListMatch(TypedDict, total=False):
    assignee: str
    assignment_date: str
    assignment_id: str
    assignor: str
    citation: list
    citation_number: str
    citation_type: str
    data: list
    date: str
    office_action: dict
    patent_number: str
    rejection_text: str
    rejection_type: str
    url: str


class Trademark(TypedDict, total=False):
    assignment: list
    trademark_status: dict


class TrademarkLoadMatch(TypedDict, total=False):
    assignment: list
    trademark_status: dict


class TrademarkListMatch(TypedDict, total=False):
    assignment: list
    trademark_status: dict
