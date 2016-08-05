<?php

$db     = require(__DIR__ . '/../../config/db.php');
$params = require(__DIR__ . '/params.php');

//$params = array_merge(
//    require(__DIR__ . '/../../config/params.php'),
//    require(__DIR__ . '/params.php')
//);

return [
    'id' => 'api',
    'basePath' => dirname(__DIR__) . '/..',
    'bootstrap' => ['log'],
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
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                    'logFile' => '@app/runtime/logs/api.log',
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
                        'v1/result',
                    ]
                ],
            ],
        ],
        'db' => $db,
    ],
    'modules' => [
        'v1' => [
            'class' => 'app\api\modules\v1\Module',
        ]
    ],
    'params' => $params,
];
