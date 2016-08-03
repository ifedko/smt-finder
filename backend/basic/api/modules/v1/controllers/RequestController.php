<?php

namespace app\api\modules\v1\controllers;

use yii\rest\ActiveController;

class RequestController extends ActiveController
{
    public $modelClass = 'app\api\modules\v1\models\Request';

    //@todo remain only save, get list and get by id methods
    public function extraFields()
    {
        return ['results'];
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
            ],
        ];
        return $behaviors;
    }
}
