<?php

use yii\db\Migration;

class m160802_072814_initial extends Migration
{
    public function up()
    {
        $this->createTable('search_request', [
            'id' => $this->primaryKey(),
            'url' => $this->string(255)->notNull(),
            'searchType' => $this->string('100')->notNull(),
            'text' => $this->text(),
            'resultsCount' => $this->integer()->defaultValue(null),
            'createdAt' => $this->dateTime()
        ]);

        $this->createTable('search_result', [
            'id' => $this->primaryKey(),
            'request_id' => $this->integer()->notNull(),
            'value' => $this->string('1000')->notNull()
        ]);
        $this->createIndex('request_idx', 'search_result', ['request_id']);
        $this->addForeignKey('search_result_fk', 'search_result', 'request_id', 'search_request', 'id', 'RESTRICT', 'RESTRICT');
    }

    public function down()
    {
        $this->dropForeignKey('search_result_fk', 'search_result');
        $this->dropTable('search_request');
        $this->dropTable('search_result');
    }
}
