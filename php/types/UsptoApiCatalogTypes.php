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
    public ?string $applicationNumber = null;
    public ?string $assignee = null;
    public ?string $assignmentDate = null;
    public ?string $assignmentId = null;
    public ?string $assignor = null;
    public ?string $citationNumber = null;
    public ?string $citationType = null;
    public ?array $citations = null;
    public ?array $data = null;
    public ?string $date = null;
    public ?string $patentNumber = null;
    public ?string $rejectionText = null;
    public ?string $rejectionType = null;
    public ?string $text = null;
    public ?string $url = null;
}

/** Request payload for Patent#load. */
class PatentLoadMatch
{
    public ?string $application_number = null;
}

/** Request payload for Patent#list. */
class PatentListMatch
{
    public ?string $format = null;
    public ?string $search_query = null;
}

/** Trademark entity data model. */
class Trademark
{
    public ?array $assignments = null;
    public ?array $documents = null;
    public ?string $serialNumber = null;
    public ?string $status = null;
}

/** Request payload for Trademark#load. */
class TrademarkLoadMatch
{
    public ?string $registration_number = null;
    public ?string $serial_number = null;
}

/** Request payload for Trademark#list. */
class TrademarkListMatch
{
    public ?string $format = null;
    public ?string $search_query = null;
}

