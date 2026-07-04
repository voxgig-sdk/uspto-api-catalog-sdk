<?php
declare(strict_types=1);

// Typed models for the UsptoApiCatalog SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Patent entity data model. */
class Patent
{
    public ?string $assignee = null;
    public ?string $assignment_date = null;
    public ?string $assignment_id = null;
    public ?string $assignor = null;
    public ?array $citation = null;
    public ?string $citation_number = null;
    public ?string $citation_type = null;
    public ?array $data = null;
    public ?string $date = null;
    public ?array $office_action = null;
    public ?string $patent_number = null;
    public ?string $rejection_text = null;
    public ?string $rejection_type = null;
    public ?string $url = null;
}

/** Match filter for Patent#load (any subset of Patent fields). */
class PatentLoadMatch
{
    public ?string $assignee = null;
    public ?string $assignment_date = null;
    public ?string $assignment_id = null;
    public ?string $assignor = null;
    public ?array $citation = null;
    public ?string $citation_number = null;
    public ?string $citation_type = null;
    public ?array $data = null;
    public ?string $date = null;
    public ?array $office_action = null;
    public ?string $patent_number = null;
    public ?string $rejection_text = null;
    public ?string $rejection_type = null;
    public ?string $url = null;
}

/** Match filter for Patent#list (any subset of Patent fields). */
class PatentListMatch
{
    public ?string $assignee = null;
    public ?string $assignment_date = null;
    public ?string $assignment_id = null;
    public ?string $assignor = null;
    public ?array $citation = null;
    public ?string $citation_number = null;
    public ?string $citation_type = null;
    public ?array $data = null;
    public ?string $date = null;
    public ?array $office_action = null;
    public ?string $patent_number = null;
    public ?string $rejection_text = null;
    public ?string $rejection_type = null;
    public ?string $url = null;
}

/** Trademark entity data model. */
class Trademark
{
    public ?array $assignment = null;
    public ?array $trademark_status = null;
}

/** Match filter for Trademark#load (any subset of Trademark fields). */
class TrademarkLoadMatch
{
    public ?array $assignment = null;
    public ?array $trademark_status = null;
}

/** Match filter for Trademark#list (any subset of Trademark fields). */
class TrademarkListMatch
{
    public ?array $assignment = null;
    public ?array $trademark_status = null;
}

