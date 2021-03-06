Smt finder
=====

Tool for finding text, images and links at external sites (using reactjs + redux + webpack for frontend, yii2 for backend API).

Installation
------------

* Install [VirtualBox](https://www.virtualbox.org/)
* Install vagrant using the installation instructions in the [Getting Started document](https://www.vagrantup.com/docs/getting-started/)
* Install [ansible provisioner](http://docs.ansible.com/ansible/intro_installation.html)
* Clone this repository and cd into it
* Run ```vagrant up``` in order to set up the box using the ansible provisioner
* You should now have your working 
    * Application under http://smt-finder.local/
    * Backend API under http://api.smt-finder.local/

You can now start working inside this folder directly on your host computer 
using your favourite IDE. 
Changes done there will be reflected directly on the vagrant box as the 
directory is mounted in the vagrant box under ```/vagrant```. Also you 
can login into the box using ```vagrant ssh``` and have the full control 
over processes etc.

As the provisioning using the ansible provisioner is very fast you can 
repeat the whole procedure at any time. In order to start fresh just run
```vagrant destroy``` and ```vagrant up```. This will undo all you manual 
changes done on the vagrant box and provide you with a clean setup.


Troubleshooting
---------------

* If you get an error while provisioning:
> Is the server running locally and accepting connections on Unix domain socket "/var/run/postgresql>/.s.PGSQL.5432"
see how to fix http://stackoverflow.com/a/31316156

Installed components
--------------------

* [Nginx](http://nginx.org)
* [PHP 5.6](http://www.php.net/)
* [php-fpm](http://php-fpm.org)
* [git](http://git-scm.com/)
* [Composer](https://getcomposer.org/)
* [YII2 basic](http://www.yiiframework.com/)
* [PHPUnit](https://phpunit.de/)
* [npm](https://www.npmjs.com/)
* [Node.js](https://nodejs.org/en/)


Troubleshooting
---------------

##### If you got error message:
> "unable to connect to database: could not connect to server: No such file or directory
> Is the server running locally and accepting
> connections on Unix domain socket \"/var/run/postgresql/.s.PGSQL.5432\"?"

Running following shell code before vagrant up fixed the problem:
> export LANGUAGE=en_US
> export LC_CTYPE="en_US.UTF-8"
> export LC_NUMERIC="en_US.UTF-8"
> export LC_TIME="en_US.UTF-8"
> export LC_COLLATE="en_US.UTF-8"
> export LC_MONETARY="en_US.UTF-8"
> export LC_MESSAGES="en_US.UTF-8"
> export LC_PAPER="en_US.UTF-8"
> export LC_NAME="en_US.UTF-8"
> export LC_ADDRESS="en_US.UTF-8"
> export LC_TELEPHONE="en_US.UTF-8"
> export LC_MEASUREMENT="en_US.UTF-8"
> export LC_IDENTIFICATION="en_US.UTF-8"

---


TODO
----

* Backend (REST API)
    * add input parameters validation
    * limit available REST methods
    * tests
* Frontend
    * tests