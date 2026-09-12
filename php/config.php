<?php
declare(strict_types=1);

// UsptoApiCatalog SDK configuration

class UsptoApiCatalogConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UsptoApiCatalog",
                "slug" => "uspto-api-catalog",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://developer.uspto.gov",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "patent" => [],
                    "trademark" => [],
                ],
            ],
            "entity" => [
        'patent' => [
          'fields' => [
            [
              'name' => 'applicationNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'assignee',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date',
              'name' => 'assignmentDate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'assignmentId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'assignor',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'citationNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'citationType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'citations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'data',
              'type' => '`$ARRAY`',
            ],
            [
              'format' => 'date',
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'patentNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rejectionText',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rejectionType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'patent',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'xml',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'search_query',
                        'orig' => 'search_query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/patent-assignment/v1.4',
                  'segments' => [
                    [
                      'lit' => 'patent-assignment',
                    ],
                    [
                      'lit' => 'v1.4',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'search_query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.assignments`',
                  ],
                  'parts' => [
                    'patent-assignment',
                    'v1.4',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'application_number',
                        'orig' => 'application_number',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/office-action-citations/v2',
                  'segments' => [
                    [
                      'lit' => 'office-action-citations',
                    ],
                    [
                      'lit' => 'v2',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'application_number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.citations`',
                  ],
                  'parts' => [
                    'office-action-citations',
                    'v2',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'application_number',
                        'orig' => 'application_number',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/office-action-rejections/v2',
                  'segments' => [
                    [
                      'lit' => 'office-action-rejections',
                    ],
                    [
                      'lit' => 'v2',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'application_number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.rejections`',
                  ],
                  'parts' => [
                    'office-action-rejections',
                    'v2',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/office-action-weekly-zips/v1',
                  'segments' => [
                    [
                      'lit' => 'office-action-weekly-zips',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.files`',
                  ],
                  'parts' => [
                    'office-action-weekly-zips',
                    'v1',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'patent_number',
                        'orig' => 'patent_number',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/enriched-citation/v3',
                  'segments' => [
                    [
                      'lit' => 'enriched-citation',
                    ],
                    [
                      'lit' => 'v3',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'patent_number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.citations`',
                  ],
                  'parts' => [
                    'enriched-citation',
                    'v3',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ptab/v3',
                  'segments' => [
                    [
                      'lit' => 'ptab',
                    ],
                    [
                      'lit' => 'v3',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                  'parts' => [
                    'ptab',
                    'v3',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'application_number',
                        'orig' => 'application_number',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/office-action-text/v1',
                  'segments' => [
                    [
                      'lit' => 'office-action-text',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'application_number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.officeAction`',
                  ],
                  'parts' => [
                    'office-action-text',
                    'v1',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'trademark' => [
          'fields' => [
            [
              'name' => 'assignments',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'documents',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'serialNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'trademark',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'xml',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'search_query',
                        'orig' => 'search_query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trademark-assignment/v1.4',
                  'segments' => [
                    [
                      'lit' => 'trademark-assignment',
                    ],
                    [
                      'lit' => 'v1.4',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'search_query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.assignments`',
                  ],
                  'parts' => [
                    'trademark-assignment',
                    'v1.4',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'registration_number',
                        'orig' => 'registration_number',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'serial_number',
                        'orig' => 'serial_number',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/tsdr/v1.0',
                  'segments' => [
                    [
                      'lit' => 'tsdr',
                    ],
                    [
                      'lit' => 'v1.0',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'registration_number',
                      'serial_number',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.trademarkStatus`',
                  ],
                  'parts' => [
                    'tsdr',
                    'v1.0',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UsptoApiCatalogFeatures::make_feature($name);
    }
}
