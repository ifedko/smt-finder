<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\web\Response;

//@todo remain only save, get list and get by id methods
class RequestController extends ActiveController
{
    public $modelClass = 'app\api\modules\v1\models\Request';

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator'] = [
            'class' => 'yii\filters\ContentNegotiator',
            'formats' => [
                'text/html' => Response::FORMAT_JSON,
                'application/json' => Response::FORMAT_JSON,
                'application/xml' => Response::FORMAT_XML,
            ],
        ];
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST'],
                'Access-Control-Request-Headers' => ['accept', 'content-type'],
                'Access-Control-Expose-Headers' => [
                    'X-Pagination-Total-Count',
                    'X-Pagination-Page-Count',
                    'X-Pagination-Current-Page',
                    'X-Pagination-Per-Page'
                ],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
            ],
        ];
        return $behaviors;
    }

    public function actions()
    {
        return array_merge(
            parent::actions(),
            [
                'search' => [
                    'class' => 'app\api\modules\v1\controllers\SearchAction',
                    'modelClass' => $this->modelClass,
                    'checkAccess' => [$this, 'checkAccess']
                ]
            ]
        );
    }
}
