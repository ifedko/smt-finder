<?php

namespace app\api\components\smt_finder\finders;

use app\api\components\smt_finder\Finder;
use app\api\components\smt_finder\SmtFinderUrlHelper;
use Symfony\Component\DomCrawler\Crawler;

class LinksFinder extends Finder
{
    protected function find($source, array $parameters)
    {
        $crawler = new Crawler($source, null, $parameters['indexUrl']);
        $items = $crawler->filter('a')->links();

        $items = $this->handleItems($items);
        \Yii::info(sprintf('SmtFinder - found links: %s', var_export($items, true)));
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
        $links = array_map(function ($item) {
            return $item->getUri();
        }, $items);
        $filteredLinks = array_filter($links, function ($link) {
            return SmtFinderUrlHelper::isValidUrl($link);
        });
        return array_unique($filteredLinks);
    }
}
