# API Films

API REST de filmes desenvolvida com Hono sobre Node.js em arquitetura limpa.

## Como rodar localmente

```bash
npm install
npm start
```

Modo desenvolvimento:
```bash
npm run dev
```

Servidor padrão: `http://localhost:8080`

## Rotas Principais

### `GET /api/filmes`
Retorna a lista de filmes cadastrados.
```bash
curl http://localhost:8080/api/filmes
```

### `GET /health`
Endpoint de monitoramento e integridade (status, uptime e consumo de memória RSS).
```bash
curl http://localhost:8080/health
```

---

## Infraestrutura Multi-VM (Vagrant & Ansible)

Configuração multi-máquina gerenciada por Vagrant (VirtualBox) e provisionada automaticamente via Ansible em rede privada Classe C (`192.168.56.0/24`).

### Topologia das VMs

* **VM1 (`vm1`) - Nó de Controle (Ansible) & Zabbix Server:**
  * **IP Privado:** `192.168.56.10` | **RAM:** 2048 MB
  * **Função:** Executa o playbook Ansible (`configura-node.yaml`) e hospeda a stack do **Zabbix 7.0 LTS** (Zabbix Server, Zabbix Web Nginx e PostgreSQL) via Docker Compose na porta `80` (e Zabbix Server na `10051`).
* **VM2 (`vm2`) - Servidor / Backend API & Agente:**
  * **IP Privado:** `192.168.56.11` | **RAM:** 1024 MB
  * **Função:** Executa a API Node.js 20.x via PM2 na porta `8080` e o `zabbix-agent2` na porta `10050`.

### Provisionamento Rápido

1. **Subir e provisionar todo o ambiente:**
   ```bash
   vagrant up
   ```
   *O Vagrant sobe as duas VMs, inicializa os containers do Zabbix na VM1 e dispara automaticamente o `configura-node.yaml` para implantar a API, configurar o Zabbix Agent 2 na VM2 e registrar o monitoramento via API do Zabbix.*

2. **Reprovisionar (caso as VMs já estejam ligadas):**
   ```bash
   vagrant provision
   ```

### Validação

1. **Testar endpoints da API (via host ou VM1):**
   ```bash
   curl [http://192.168.56.11:8080/api/filmes](http://192.168.56.11:8080/api/filmes)
   curl [http://192.168.56.11:8080/health](http://192.168.56.11:8080/health)
   ```

2. **Testar chave do Zabbix Agent 2 (na VM2):**
   ```bash
   vagrant ssh vm2 -c "sudo zabbix_agent2 -t api.films.health.status"
   ```
   *Retorno esperado:* `api.films.health.status [s|200]`

---

## Monitoramento Zabbix

O arquivo `zabbix-template-api-films.yaml` na raiz do projeto contém o template oficial para o Zabbix 7.0 LTS. Todo o processo de configuração no servidor é executado **automaticamente** pelo Ansible via API JSON-RPC (`http://192.168.56.10/api_jsonrpc.php`):

* Importação/atualização do template `API Films Node.js Monitoring`.
* Cadastro do host `vm2` (`192.168.56.11:10050`).
* Vinculação dos templates `API Films Node.js Monitoring` e `Linux by Zabbix agent`.
* Validação automática da coleta inicial (`HTTP 200` no `/health`).

### Acesso ao Painel Web

* **URL:** `http://192.168.56.10`
* **Usuário:** `Admin`
* **Senha:** `zabbix`

### Métricas e Alertas Configurados

* **HTTP Status (`/health`):** Verifica disponibilidade a cada 30s (Trigger *High* se `HTTP <> 200`).
* **Uptime:** Tempo de atividade do processo Node.js em segundos.
* **Uso de Memória RSS (MB):** Consumo de RAM da aplicação (Trigger *Warning* se `> 512 MB`).

---

## Workflow de Versionamento

Adota o padrão Gitflow com branches `feature/*`, `dev`, `stage` e `main`:
1. Funcionalidades e correções são desenvolvidas em branches específicas.
2. Integradas na branch `dev` via Pull Request.
3. Promovidas para `stage` para homologação.
4. Mescladas na `main` para produção.

## Docker Hub

[![Docker Pulls](https://badgen.net/docker/pulls/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)
[![Docker Image Size](https://badgen.net/docker/size/joaoguibarros/api-films)](https://hub.docker.com/r/joaoguibarros/api-films)

Imagem oficial: [hub.docker.com/r/joaoguibarros/api-films](https://hub.docker.com/r/joaoguibarros/api-films)
