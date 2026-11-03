Vagrant.configure("2") do |config|

  config.vm.define "vm1" do |vm1|
    vm1.vm.box = "ubuntu/jammy64"
    vm1.vm.network "private_network", ip: "192.168.56.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "lab-api-vm1"
      vb.memory = 1024
      vb.cpus = 1
    end

    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y curl wget
    SHELL
  end

  config.vm.define "vm2" do |vm2|
    vm2.vm.box = "ubuntu/jammy64"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    vm2.vm.synced_folder ".", "/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "lab-api-vm2"
      vb.memory = 1024
      vb.cpus = 1
    end

    vm2.vm.provision "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y curl ca-certificates gnupg
      curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
      apt-get install -y nodejs
      cd /vagrant_data
      npm ci --omit=dev || npm install --omit=dev
      nohup node /vagrant_data/src/server.js > /var/log/api-films.log 2>&1 &
    SHELL
  end

end
