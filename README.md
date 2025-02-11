# Gradio WebUI Stream Node para n8n  

Um node customizado para integração com APIs Gradio WebUI com suporte a streaming.  

## Instalação  
```bash  
npm install n8n-nodes-gradio-webui  
```  

## Configuração  
1. Adicione o node ao seu fluxo n8n  
2. Configure os parâmetros:  
   - URL da API Gradio  
   - Chaves de API (Gradio e LLM)  
   - Parâmetros específicos do workflow  

## Uso Básico  
```json  
{  
  "nodes": [  
    {  
      "parameters": {  
        "apiUrl": "SUA_URL_GRADIO",  
        "gradioApiKey": "SUA_CHAVE_GRADIO",  
        "taskDescription": "Sua descrição de tarefa aqui"  
      },  
      "name": "Gradio WebUI Stream",  
      "type": "n8n-nodes-gradio-webui",  
      "typeVersion": 1  
    }  
  ]  
}  
```  

## Parâmetros Principais  
| Campo                  | Obrigatório | Descrição                          |  
|------------------------|-------------|------------------------------------|  
| API URL                | Sim         | Endpoint da API Gradio             |  
| Gradio API Key          | Sim         | Chave de autenticação do Gradio    |  
| Descrição da Tarefa     | Sim         | Instruções para o agente executar  |  

## Licença  
MIT © 2025 Wesley Silva
