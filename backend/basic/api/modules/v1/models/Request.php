<?php

namespace app\api\modules\v1\models;

use yii\db\ActiveRecord;

class Request extends ActiveRecord
{
    /**
     * @return string the name of the table associated with this ActiveRecord class.
     */
    public static function tableName()
    {
        return 'search_request';
    }

    /**
     * @inheritdoc
     */
    public static function primaryKey()
    {
        return ['id'];
    }

    /**
     * Define rules for validation
     */
    public function rules()
    {
        return [
            [['url', 'searchType', 'createdAt', 'resultsCount'], 'required'],
            [['text'], 'string']
        ];
    }

    public function getResults()
    {
        return $this->hasMany(Result::className(), ['request_id' => 'id']);
    }
}
