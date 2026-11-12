# API Films

API REST simples desenvolvida com Hono sobre Node.js.

## Como rodar

```bash
npm install
npm start
```

Modo dev:
```bash
npm run dev
```

Servidor: `http://localhost:8080`

## Rotas

### GET /api/filmes
Retorna a lista de filmes.

Exemplo de chamada:
```bash
curl http://localhost:8080/api/filmes
```
## Workflow de Versionamento

  O workflow adotado no projeto é o Gitflow, utilizando as branches feature, dev, stage e main.

  O fluxo funciona da seguinte forma:

  1. Novas funcionalidades são desenvolvidas em branches próprias (como feature/post-films).
  2. O código finalizado é integrado na branch dev.
  3. As alterações são enviadas para a branch stage para testes e validação.
  4. O código validado é mesclado na branch main (produção) por meio de Pull Request.

  A escolha desse modelo se deve à organização do ciclo de entrega. Ele garante que a branch main permaneça sempre
  estável, separando o desenvolvimento diário, o ambiente de testes e a versão final do sistema

## Docker Hub
[![Docker Pulls](https://badgen.net/docker/pulls/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)
[![Docker Image Size](https://badgen.net/docker/size/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)

A imagem oficial desta API está disponível no Docker Hub:
[hub.docker.com/r/joaoguibarros/api-films](https://hub.docker.com/r/joaoguibarros/api-films)


## Infraestrutura Multi-VM (Vagrant & VirtualBox)

O projeto conta com uma configuração multi-máquina gerenciada pelo Vagrant utilizando o provedor VirtualBox, simulando uma arquitetura distribuída cliente-servidor em uma rede privada Classe C (`192.168.56.0/24`).

### Topologia das Máquinas Virtuais

* **VM1 (`lab-api-vm1`) - Cliente / Testes:**
  * **IP Privado:** `192.168.56.10`
  * **Memória RAM:** 1024 MB
  * **Provedor:** VirtualBox
  * **Ferramentas Provisionadas:** `curl` e `wget`

* **VM2 (`lab-api-vm2`) - Servidor / Backend API:**
  * **IP Privado:** `192.168.56.11`
  * **Memória RAM:** 1024 MB
  * **Provedor:** VirtualBox
  * **Pasta Sincronizada:** Pasta do repositório mapeada para `/vagrant_data`
  * **Provisionamento:** Instalação do Node.js 20.x, instalação das dependências da aplicação (`npm ci --omit=dev`) e execução automática do backend em segundo plano na porta `8080`.

---

### Passo a Passo para Executar a Infraestrutura

1. **Pré-requisitos:**
   * [VirtualBox](https://www.virtualbox.org/) instalado.
   * [Vagrant](https://www.vagrantup.com/) instalado.

2. **Inicializar as máquinas virtuais:**
   Na raiz do repositório (`API-films`), execute:
   ```bash
   vagrant up
   ```
   *(O Vagrant fará o download da box Ubuntu caso necessário, criará as duas VMs e executará o provisionamento automático de ambas).*

3. **Verificar o status das VMs:**
   ```bash
   vagrant status
   ```
   *Ambas as máquinas (`vm1` e `vm2`) devem constar como `running`.*

---

### Como Testar a Rota GET Dentro da VM1

Com as VMs em execução, os testes devem ser realizados diretamente a partir da **VM1 (Cliente)** consumindo a API hospedada na **VM2 (Servidor)**:

1. **Acessar a VM1 via SSH:**
   ```bash
   vagrant ssh vm1
   ```
   *(O prompt do terminal mudará para `vagrant@vm1:~$`).*

2. **Testar a rota GET com `curl`:**
   * Consultar a listagem de filmes:
     ```bash
     curl -i http://192.168.56.11:8080/api/filmes
     ```
   * Consultar o endpoint raiz da API:
     ```bash
     curl -i http://192.168.56.11:8080/
     ```

3. **Testar a rota GET com `wget`:**
   * Consultar a listagem de filmes exibindo a resposta no terminal:
     ```bash
     wget -qO- http://192.168.56.11:8080/api/filmes
     ```
   * Consultar o endpoint raiz da API:
     ```bash
     wget -qO- http://192.168.56.11:8080/
     ```

4. **Encerrar a sessão SSH na VM1:**
   ```bash
   exit
   ```

5. **Gerenciamento das Máquinas:**
   * Desligar as VMs: `vagrant halt`
   * Reiniciar e reaplicar provisionamento: `vagrant reload --provision`
   * Destruir as VMs para liberar espaço: `vagrant destroy -f`

## Implantação e Configuração com Ansible

A infraestrutura é provisionada automaticamente a partir da **VM1 (Nó de Controle)** para a **VM2 (Servidor)** utilizando Ansible.

### Como executar o Playbook
1. Com as máquinas em execução, acesse a VM1 via SSH:
   ```bash
   vagrant ssh vm1