<?php

$db     = require(__DIR__ . '/../../config/db.php');
$params = require(__DIR__ . '/params.php');

return [
    'id' => 'api',
    'basePath' => dirname(__DIR__) . '/..',
    'bootstrap' => ['log', 'smtFinder'],
    'components' => [
        'user' => [
            'identityClass' => 'app\models\User',
            // Set to null to not redirect unathorized requests
            'loginUrl' => null,
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                $responseData = $response->data;
                if ($responseData !== null && !empty($responseData['code']) && $responseData['code'] === 422) {
                    $response->data = [
                        'status' => $response->isSuccessful,
                        'error' => $responseData['message'],
                        'code' => $responseData['code']
                    ];
                    $response->statusCode = 200;
                }
            },
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning', 'info'],
                    'logFile' => '@app/api/runtime/logs/api.log',
                ],
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => [
                        'v1/request',
                    ],
                    'extraPatterns' => [
                        'POST search' => 'search'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => [
                        'v1/result',
                    ]
                ],
            ],
        ],
        'db' => $db,
        'smtFinder' => [
            'class' => 'app\api\components\smt_finder\SmtFinderService'
        ]
    ],
    'modules' => [
        'v1' => [
            'class' => 'app\api\modules\v1\Module',
        ]
    ],
    'params' => $params,
];
