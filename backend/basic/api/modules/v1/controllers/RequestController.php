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
}
