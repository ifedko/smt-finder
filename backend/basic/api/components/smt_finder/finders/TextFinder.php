<?php

namespace app\api\components\smt_finder\finders;

use app\api\components\smt_finder\Finder;
use app\api\components\smt_finder\exception\SmtFinderNotValidParametersException;
use Symfony\Component\DomCrawler\Crawler;

class TextFinder extends Finder
{
    protected function find($source, array $parameters)
    {
        $source = mb_strtolower($source);
        $crawler = new Crawler($source);
        $items = $crawler
            ->filterXpath(sprintf("//text()[contains(., '%s')]", strtolower($parameters['text'])))
            ->extract(array('_text'))
        ;
        \Yii::info(sprintf('MYITEMS %s', var_export($items, true)));

        $totalCount = 0;
        \Yii::info(sprintf('SmtFinder - found items with text: %s', $parameters['text']));
        return [
            'count' => count($items),
            'items' => []
        ];
    }

    /**
     * @param array $parameters
     * @return bool
     * @throws SmtFinderNotValidParametersException
     */
    protected function validateParameters(array $parameters)
    {
        if (empty($parameters['text'])) {
            throw new SmtFinderNotValidParametersException(sprintf('Not set text value for finder: %s', static::class));
        }
        return true;
    }

    static protected function removeBreaks($str)
    {
        $str = str_replace('\r\n', ' ', $str);
        $str = str_replace('\n', ' ', $str);

        return $str;
    }
}
