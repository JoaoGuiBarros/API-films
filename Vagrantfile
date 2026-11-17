Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # VM2

  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    
    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
      vb.name = "vm2_app_node"
    end

    vm2.vm.synced_folder ".", "/vagrant_data"

    vm2.vm.provision "shell", inline: <<-SHELL
      sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
      sudo sed -i 's/KbdInteractiveAuthentication no/KbdInteractiveAuthentication yes/g' /etc/ssh/sshd_config
      if [ -d /etc/ssh/sshd_config.d ]; then
        sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config.d/*.conf || true
      fi
      sudo systemctl restart ssh
    SHELL
  end

  # VM1

  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    vm1.vm.network "private_network", ip: "192.168.56.10"
    
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "2048" 
      vb.name = "vm1_ansible_control"
    end

    vm1.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y software-properties-common sshpass curl wget docker.io docker-compose-v2
      sudo apt-add-repository --yes --update ppa:ansible/ansible
      sudo apt-get install -y ansible

      mkdir -p /home/vagrant/zabbix-server
      cat << 'EOF' > /home/vagrant/zabbix-server/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: zabbix
      POSTGRES_PASSWORD: zabbix_password
      POSTGRES_DB: zabbix
    restart: unless-stopped
  zabbix-server:
    image: zabbix/zabbix-server-pgsql:alpine-7.0-latest
    environment:
      DB_SERVER_HOST: postgres
      POSTGRES_USER: zabbix
      POSTGRES_PASSWORD: zabbix_password
      POSTGRES_DB: zabbix
    ports:
      - "10051:10051"
    depends_on:
      - postgres
    restart: unless-stopped
  zabbix-web:
    image: zabbix/zabbix-web-nginx-pgsql:alpine-7.0-latest
    environment:
      ZBX_SERVER_HOST: zabbix-server
      DB_SERVER_HOST: postgres
      POSTGRES_USER: zabbix
      POSTGRES_PASSWORD: zabbix_password
      POSTGRES_DB: zabbix
      PHP_TZ: America/Sao_Paulo
    ports:
      - "80:8080"
    depends_on:
      - postgres
      - zabbix-server
    restart: unless-stopped
EOF
      docker compose -f /home/vagrant/zabbix-server/docker-compose.yml up -d
    SHELL

    vm1.vm.provision "shell", privileged: false, inline: <<-SHELL
      echo "Aguardando estabilização da rede na VM2..."
      sleep 10
      cd /vagrant
      echo "Executando Playbook do Ansible..."
      ansible-playbook -i inventory.ini configura-node.yaml
    SHELL
  end
end