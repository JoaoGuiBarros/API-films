Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # =====================================================================
  # VM2: Infraestrutura da Aplicação (Definida primeiro)
  # =====================================================================
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    # Definir um endereço IPv4 privado (Classe C) de acordo com o inventário
    vm2.vm.network "private_network", ip: "192.168.56.11"
    
    vm2.vm.provider "virtualbox" do |vb|
      # Memória necessária para execução do backend Node.js
      vb.memory = "1024"
      vb.name = "vm2_app_node"
    end

    # Sincronizar a pasta da aplicação host com a pasta vagrant_data dentro da VM2
    vm2.vm.synced_folder ".", "/vagrant_data"

    # Habilitar a autenticação por senha para que o Ansible consiga acessar via SSH
    # usando 'ansible_password=vagrant' contido no arquivo inventory.ini
    vm2.vm.provision "shell", inline: <<-SHELL
      sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
      sudo sed -i 's/KbdInteractiveAuthentication no/KbdInteractiveAuthentication yes/g' /etc/ssh/sshd_config
      if [ -d /etc/ssh/sshd_config.d ]; then
        sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config.d/*.conf || true
      fi
      sudo systemctl restart ssh
    SHELL
  end

  # =====================================================================
  # VM1: Nó de Controle (Ansible)
  # =====================================================================
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    # Definir um endereço IPv4 privado (Classe C)
    vm1.vm.network "private_network", ip: "192.168.56.10"
    
    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024" 
      vb.name = "vm1_ansible_control"
    end

    # Instalar o software necessário para execução do Ansible e o sshpass
    # (sshpass é obrigatório para o Ansible logar com senha plana)
    vm1.vm.provision "shell", inline: <<-SHELL
      sudo apt-get update
      sudo apt-get install -y software-properties-common sshpass curl wget
      sudo apt-add-repository --yes --update ppa:ansible/ansible
      sudo apt-get install -y ansible
    SHELL

    # O diretório do projeto no host já é montado automaticamente em /vagrant.
    # Disparar o playbook automaticamente de dentro da VM1 apontando para a VM2.
    vm1.vm.provision "shell", privileged: false, inline: <<-SHELL
      echo "Aguardando estabilização da rede na VM2..."
      sleep 10
      cd /vagrant
      echo "Executando Playbook do Ansible..."
      ansible-playbook -i inventory.ini configura-node.yaml
    SHELL
  end
end