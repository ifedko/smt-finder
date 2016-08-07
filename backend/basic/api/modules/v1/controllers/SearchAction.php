<?php

namespace app\api\modules\v1\controllers;

use app\api\modules\v1\models\Result;
use Yii;
use yii\base\Model;
use yii\helpers\Url;
use yii\rest\Action;
use yii\web\ServerErrorHttpException;

/**
 * @inheritdoc
 */
class SearchAction extends Action
{
    /**
     * @var string the scenario to be assigned to the new model before it is validated and saved.
     */
    public $scenario = Model::SCENARIO_DEFAULT;
    /**
     * @var string the name of the view action. This property is need to create the URL when the model is successfully created.
     */
    public $viewAction = 'view';


    /**
     * Creates a new model.
     * @return \yii\db\ActiveRecordInterface the model newly created
     * @throws ServerErrorHttpException if there is any error when creating the model
     */
    public function run()
    {
        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id);
        }

        $requestBody = Yii::$app->request->getRawBody();
        if (empty($requestBody)) {
            throw new \Exception('Empty request', 422);
        }

        $data = json_decode($requestBody, true);
//        Yii::info(sprintf('SmtFinder - get request with data: %s', var_export($data, true)));
        $data['createdAt'] = (new \DateTime('now'))->format('Y-m-d H:i:s');

        $results = [
            'http://beautiful-images.org/wp-content/uploads/2016/04/Sea-images-51Pics-2.jpg',
            'http://media.indiatimes.in/media/content/2016/Apr/vs88b943auuf6insi6f6_1461156185.jpg',
            'http://www.australiascoralcoast.com/sfimages/default-source/australian-sea-lion-encounters/jurien-bay-australian-sea-lion.jpg',
        ];
        $data['resultsCount'] = count($results);

        /* @var $model \yii\db\ActiveRecord */
        $model = new $this->modelClass([
            'scenario' => $this->scenario,
        ]);

        $model->load($data, '');
        if ($model->save()) {
            foreach ($results as $value) {
                $result = new Result();
                $result->request_id = $model->id;
                $result->value = $value;
                $result->save();
            }
            $response = \Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', array_values($model->getPrimaryKey(true)));
            $response->getHeaders()->set('Location', Url::toRoute([$this->viewAction, 'id' => $id], true));
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }

        return $model;
    }
}
