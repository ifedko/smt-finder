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


            for ($j = 0; $j < 33; $j++) {
                $this->insert('search_result', [
                    'request_id' => $i + 1,
                    'value' => "http://beautiful-images.org/wp-content/uploads/2016/04/Sea-images-51Pics-2.jpg"
                ]);
                $this->insert('search_result', [
                    'request_id' => $i + 1,
                    'value' => "http://media.indiatimes.in/media/content/2016/Apr/vs88b943auuf6insi6f6_1461156185.jpg"
                ]);
                $this->insert('search_result', [
                    'request_id' => $i + 1,
                    'value' => "http://www.australiascoralcoast.com/sfimages/default-source/australian-sea-lion-encounters/jurien-bay-australian-sea-lion.jpg"
                ]);
                $this->insert('search_result', [
                    'request_id' => $i + 1,
                    'value' => "http://news.nationalgeographic.com/content/dam/news/2016/05/14/sea_turtles/01seaturtles.adapt.768.1.jpg"
                ]);
            }
        }
    }

    public function down()
    {
//        $this->truncateTable('search_result');
//        $this->truncateTable('search_request');
    }
}
