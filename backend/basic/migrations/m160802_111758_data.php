<?php

use yii\db\Migration;

class m160802_111758_data extends Migration
{
    public function up()
    {
        $this->insert('search_request', [
            'url' => 'example.com',
            'searchType' => 'images',
            'resultsCount' => 34,
            'createdAt' => '2016-08-02 16:00:00'
        ]);

        $this->insert('search_result', [
            'requestId' => 1,
            'value' => 'http://example.com/img1.jpg'
        ]);
        $this->insert('search_result', [
            'requestId' => 1,
            'value' => 'http://example.com/img2.jpg'
        ]);
    }

    public function down()
    {
//        $this->truncateTable('search_result');
//        $this->truncateTable('search_request');
    }
}
