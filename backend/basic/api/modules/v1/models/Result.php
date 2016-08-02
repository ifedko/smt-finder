<?php

namespace app\api\modules\v1\models;

use yii\db\ActiveRecord;

class Result extends ActiveRecord
{
    /**
     * @return string the name of the table associated with this ActiveRecord class.
     */
    public static function tableName()
    {
        return 'search_result';
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
            [['url', 'searchType', 'createdAt', 'resultsCount'], 'required']
        ];
    }
}
