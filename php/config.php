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
                  'parts' => [
                    'patent-assignment',
                    'v1.4',
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
                  'parts' => [
                    'office-action-citations',
                    'v2',
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
                  'parts' => [
                    'office-action-rejections',
                    'v2',
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
                  'parts' => [
                    'office-action-weekly-zips',
                    'v1',
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
                  'parts' => [
                    'enriched-citation',
                    'v3',
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
                  'parts' => [
                    'ptab',
                    'v3',
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
                  'parts' => [
                    'office-action-text',
                    'v1',
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
                  'parts' => [
                    'trademark-assignment',
                    'v1.4',
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
                  'parts' => [
                    'tsdr',
                    'v1.0',
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
