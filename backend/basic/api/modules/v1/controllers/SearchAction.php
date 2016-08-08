<?php

namespace app\api\modules\v1\controllers;

use app\api\modules\v1\models\Result;
use Yii;
use yii\base\Model;
use yii\helpers\Url;
use yii\rest\Action;
use yii\web\ServerErrorHttpException;
use app\api\components\smt_finder\SmtFinderService;

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
        // @todo add data validation

        $data = json_decode($requestBody, true);
        $data['createdAt'] = (new \DateTime('now'))->format('Y-m-d H:i:s');

        try {
            /* @var SmtFinderService $smtFinderService */
            $smtFinderService = \Yii::$app->smtFinder;
            $result = $smtFinderService->run($data['searchType'], $data['url'], $data);
            $data['resultsCount'] = $result['count'];
            $results = $result['items'];
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), 422);
        }

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
