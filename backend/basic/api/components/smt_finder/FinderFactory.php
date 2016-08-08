<?php

namespace app\api\components\smt_finder;

use app\api\components\smt_finder\exception\SmtFinderNotFoundException;

class FinderFactory
{
    /**
     * @param $type
     * @return Finder
     * @throws SmtFinderNotFoundException
     */
    public static function create($type)
    {
        $finderClassName = self::getFinderClassName($type);
        if (!class_exists($finderClassName)) {
            throw new SmtFinderNotFoundException(sprintf('Finder "%s" not found', $finderClassName));
        }

        return new $finderClassName();
    }

    /**
     * @param string $type
     * @return string
     */
    private static function getFinderClassName($type)
    {
        $finderClassName = ucfirst($type);
        return "app\\api\\components\\smt_finder\\finders\\" . $finderClassName ."Finder";
    }
}
