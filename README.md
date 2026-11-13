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

A escolha desse modelo se deve à organização do ciclo de entrega. Ele garante que a branch main permaneça sempre estável, separando o desenvolvimento diário, o ambiente de testes e a versão final do sistema.

## Docker Hub
[![Docker Pulls](https://badgen.net/docker/pulls/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)
[![Docker Image Size](https://badgen.net/docker/size/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)

A imagem oficial desta API está disponível no Docker Hub:
[hub.docker.com/r/joaoguibarros/api-films](https://hub.docker.com/r/joaoguibarros/api-films)

---

## Infraestrutura Multi-VM (Vagrant & Ansible)

O projeto conta com uma configuração multi-máquina gerenciada pelo Vagrant utilizando o provedor VirtualBox, e provisionada automaticamente via Ansible. Isso simula uma arquitetura distribuída em uma rede privada Classe C (`192.168.100.0/24`).

### Topologia das Máquinas Virtuais

* **VM1 (`vm1`) - Nó de Controle / Cliente:**
  * **IP Privado:** `192.168.100.10`
  * **Memória RAM:** 1024 MB
  * **Provisionamento:** Instalação do Ansible, sshpass e montagem da pasta `/vagrant`. É responsável por disparar o playbook automatizado para a VM2.

* **VM2 (`vm2`) - Servidor / Backend API:**
  * **IP Privado:** `192.168.100.11`
  * **Memória RAM:** 1024 MB
  * **Pasta Sincronizada:** Pasta do repositório mapeada para `/vagrant_data`
  * **Provisionamento:** Gerenciado pelo Ansible disparado da VM1. Instala o Node.js 20.x, clona o repositório, instala dependências (`npm ci`) e executa a aplicação via PM2 na porta `8080`.

### Passo a Passo para Executar a Infraestrutura

1. **Pré-requisitos:**
   * [VirtualBox](https://www.virtualbox.org/) instalado como provedor.
   * [Vagrant](https://www.vagrantup.com/) instalado.

2. **Inicializar as máquinas virtuais:**
   No terminal, navegue até a raiz do repositório onde estão os arquivos `Vagrantfile`, `inventory.ini` e `configura-node.yaml` e execute:
   ```bash
   vagrant up
   ```
   *(O Vagrant fará o download da box, criará as duas VMs e a VM1 executará o playbook do Ansible configurando a API na VM2 sem necessidade de intervenção manual).*

### Como Testar a API (Dentro da VM1)

Para verificar se a infraestrutura foi configurada com sucesso, os testes devem ser realizados a partir da **VM1 (Cliente)**:

1. **Acesse a VM1 via SSH:**
   ```bash
   vagrant ssh vm1
   ```

2. **Teste a rota raiz com `curl` ou `wget`:**
   ```bash
   curl http://192.168.100.11:8080/
   # ou
   wget -qO- http://192.168.100.11:8080/
   ```
   *Resposta esperada:* `{"status":"ok","message":"API Films rodando"}`

3. **Teste a rota de filmes:**
   ```bash
   curl -i http://192.168.100.11:8080/api/filmes
   ```

4. **Encerrar a sessão SSH:**
   ```bash
   exit
   ```