# Optimized for Vagrant 1.7 and above.
Vagrant.require_version ">= 1.7.0"

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "smt-finder.local"
  config.hostsupdater.aliases = ["api.smt-finder.local"]

  nfs = !ENV['CI']

  if nfs
    config.vm.synced_folder ".", "/vagrant", :nfs => nfs, :mount_options => ["udp","vers=3","local_lock=all"]
  else
    config.vm.synced_folder ".", "/vagrant", :nfs => nfs
  end

  # Disable the new default behavior introduced in Vagrant 1.7, to
  # ensure that all Vagrant machines will use the same SSH key pair.
  # See https://github.com/mitchellh/vagrant/issues/5005
  config.ssh.insert_key = false

  config.vm.provider :virtualbox do |v|
    v.customize ["modifyvm", :id, "--memory", 2048]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.verbose = "vvv"
    ansible.playbook = "playbooks/vagrant.yml"
  end

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.50.4"
end