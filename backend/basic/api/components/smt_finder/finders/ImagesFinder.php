<?php

namespace app\api\components\smt_finder\finders;

use app\api\components\smt_finder\Finder;
use Symfony\Component\DomCrawler\Crawler;

class ImagesFinder extends Finder
{
    /**
     * @inheritdoc
     */
    protected function find($source, array $parameters)
    {
        $crawler = new Crawler($source, null, $parameters['indexUrl']);
        $items = $crawler
            ->filterXpath('//img')
            ->extract(array('src'));

        $items = $this->handleItems($items);
        \Yii::info(sprintf('SmtFinder - found images: %s', var_export($items, true)));
        return [
            'count' => count($items),
            'items' => $items
        ];
    }

    /**
     * @inheritdoc
     */
    protected function validateParameters(array $parameters)
    {
        if (empty($parameters['indexUrl'])) {
            throw new SmtFinderNotValidParametersException(sprintf('Not set indexUrl value for finder: %s', static::class));
        }
        return true;
    }

    /**
     * @param array $items
     * @return array
     */
    protected function handleItems($items)
    {
        return array_unique(array_filter($items));
    }
}
