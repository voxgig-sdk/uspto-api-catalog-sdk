# Typed models for the UsptoApiCatalog SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Patent:
    assignee: Optional[str] = None
    assignment_date: Optional[str] = None
    assignment_id: Optional[str] = None
    assignor: Optional[str] = None
    citation: Optional[list] = None
    citation_number: Optional[str] = None
    citation_type: Optional[str] = None
    data: Optional[list] = None
    date: Optional[str] = None
    office_action: Optional[dict] = None
    patent_number: Optional[str] = None
    rejection_text: Optional[str] = None
    rejection_type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PatentLoadMatch:
    assignee: Optional[str] = None
    assignment_date: Optional[str] = None
    assignment_id: Optional[str] = None
    assignor: Optional[str] = None
    citation: Optional[list] = None
    citation_number: Optional[str] = None
    citation_type: Optional[str] = None
    data: Optional[list] = None
    date: Optional[str] = None
    office_action: Optional[dict] = None
    patent_number: Optional[str] = None
    rejection_text: Optional[str] = None
    rejection_type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PatentListMatch:
    assignee: Optional[str] = None
    assignment_date: Optional[str] = None
    assignment_id: Optional[str] = None
    assignor: Optional[str] = None
    citation: Optional[list] = None
    citation_number: Optional[str] = None
    citation_type: Optional[str] = None
    data: Optional[list] = None
    date: Optional[str] = None
    office_action: Optional[dict] = None
    patent_number: Optional[str] = None
    rejection_text: Optional[str] = None
    rejection_type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Trademark:
    assignment: Optional[list] = None
    trademark_status: Optional[dict] = None


@dataclass
class TrademarkLoadMatch:
    assignment: Optional[list] = None
    trademark_status: Optional[dict] = None


@dataclass
class TrademarkListMatch:
    assignment: Optional[list] = None
    trademark_status: Optional[dict] = None

