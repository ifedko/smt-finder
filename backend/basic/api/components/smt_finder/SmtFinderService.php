<?php

namespace app\api\components\smt_finder;

use app\api\components\smt_finder\exception\SmtFinderNotFoundException;
use app\api\components\smt_finder\exception\SmtFinderSourceNotAvailableException;
use app\api\components\smt_finder\SmtFinderUrlHelper;
use yii\base\Component;
use GuzzleHttp\Client as HttpClient;

class SmtFinderService extends Component
{
    protected $httpClient;

    public function setHttpClient($httpClient)
    {
        $this->httpClient = $httpClient;
    }

    public function run($type, $url, $parameters)
    {
        $url = SmtFinderUrlHelper::getIndexUrl($url);
        \Yii::info(sprintf(
            'SmtFinder - run with type "%s", url "%s" and parameters: %s',
            $type, $url, var_export($parameters, true)
        ));

        $source = $this->getSource($url);
        $finder = FinderFactory::create($type);
        return $finder->run($source, array_merge($parameters, ['indexUrl' => $url]));
    }

    /**
     * @param string $url
     * @return string
     * @throws \Exception
     */
    private function getSource($url)
    {
        try {
            $httpClient = new HttpClient();
            $response = $httpClient->request('GET', $url, [
                'allow_redirects' => true,
                'connection_timeout' => 0,
            ]);
            $source = $response->getBody()->getContents();
            \Yii::info(sprintf(
                'SmtFinder - make request on url "%s" and get response %s',
                $url, var_export($source, true)
            ));
            if ($response->getStatusCode() !== 200) {
                throw new SmtFinderSourceNotAvailableException(sprintf(
                    'Requested url "%s" responses with status %d',
                    $url, $response->getStatusCode()
                ));
            }
        } catch (\Exception $exception) {
            \Yii::error(sprintf(
                'SmtFinder - during request to source get error "%s"',
                $exception->getMessage()
            ));
            throw new \Exception('Something is broken.');
        }
        return $source;
    }
}
