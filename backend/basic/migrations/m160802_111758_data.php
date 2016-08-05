<?php

use yii\db\Migration;

class m160802_111758_data extends Migration
{
    public function up()
    {
        for ($i = 0; $i < 30; $i++) {
            $this->insert('search_request', [
                'url' => "example-$i.com",
                'searchType' => 'images',
                'resultsCount' => $i + 1,
                'createdAt' => '2016-08-02 16:00:00'
            ]);

            $this->insert('search_result', [
                'requestId' => $i + 1,
                'value' => "http://example-$i.com/img1.jpg"
            ]);
            $this->insert('search_result', [
                'requestId' => $i + 1,
                'value' => "http://example-$i.com/img2.jpg"
            ]);
        }
    }

    public function down()
    {
//        $this->truncateTable('search_result');
//        $this->truncateTable('search_request');
    }
}
