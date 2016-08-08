<?php

namespace app\api\components\smt_finder;


class SmtFinderUrlHelper
{
    /**
     * @param string $url
     * @return string
     */
    static public function getIndexUrl($url)
    {
        $urlChunks = parse_url($url);
        return (!empty($urlChunks['scheme']) && !empty($urlChunks['host']))
            ? $urlChunks['scheme'] . "://" . $urlChunks['host']
            : "http://" . $url;
    }

    /**
     * @param string $url
     * @return int
     */
    static public function isValidUrl($url)
    {
        return preg_match("@(https?|ftp)://(-\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?$@iS", $url);
    }
}
