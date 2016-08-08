<?php

namespace app\api\components\smt_finder;


abstract class Finder
{
    /**
     * @param string $source
     * @param array $parameters
     * @return array
     */
    public function run($source, array $parameters)
    {
        if ($this->validateParameters($parameters)) {
            return $this->find($source, $parameters);
        }

        return [];
    }

    /**
     * @param $source
     * @param array $parameters
     * @return array
     */
    abstract protected function find($source, array $parameters);

    /**
     * @param array $parameters
     * @return boolean
     */
    abstract protected function validateParameters(array $parameters);
}
