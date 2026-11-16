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

* **VM1 (`vm1`) - Nó de Controle / Ansible:**
  * **IP Privado:** `192.168.56.10` | **RAM:** 1024 MB
  * **Função:** Executa o playbook Ansible que provisiona a VM2 automaticamente.
* **VM2 (`vm2`) - Servidor / Backend API & Agente:**
  * **IP Privado:** `192.168.56.11` | **RAM:** 1024 MB
  * **Função:** Executa a API Node.js 20.x via PM2 na porta `8080` e o `zabbix-agent2` na porta `10050`.

### Provisionamento Rápido

1. **Subir e provisionar as VMs:**
   ```bash
   vagrant up
   ```
   *O Vagrant baixa a box base, inicia as duas VMs e a VM1 executa automaticamente o playbook `configura-node.yaml` provisionando a VM2.*

2. **Reprovisionar (caso as VMs já estejam ligadas):**
   ```bash
   vagrant provision vm1
   # ou via SSH dentro da VM1:
   vagrant ssh vm1 -c "cd /vagrant && ansible-playbook -i inventory.ini configura-node.yaml"
   ```

### Validação

1. **Testar endpoints da API (via VM1 ou host):**
   ```bash
   curl http://192.168.56.11:8080/api/filmes
   curl http://192.168.56.11:8080/health
   ```

2. **Testar chave do Zabbix Agent 2 (na VM2):**
   ```bash
   vagrant ssh vm2 -c "sudo zabbix_agent2 -t api.films.health.status"
   ```
   *Retorno esperado:* `api.films.health.status [s|200]`

---

## Monitoramento Zabbix

O arquivo `zabbix-template-api-films.yaml` na raiz do projeto é o template oficial pronto para importação no Zabbix 7.0 LTS.

1. **Importar Template:** No painel web do Zabbix, acesse **Data collection** -> **Templates** -> **Import** e selecione `zabbix-template-api-films.yaml`.
2. **Vincular Host:** Em **Data collection** -> **Hosts**, crie/edite o host `vm2` com a interface Agent `192.168.56.11:10050` e vincule os templates:
   * `API Films Node.js Monitoring`
   * `Linux by Zabbix agent`

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
