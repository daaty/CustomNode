import {
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
  NodeApiError,
  NodeConnectionType,
  IRequestOptions,
} from 'n8n-workflow';

export class GradioWebUiStream implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Gradio WebUI Stream',
    name: 'gradioWebUiStream',
    icon: 'fa:robot',
    group: ['transform'],
    version: 1,
    description: 'Connect to Gradio WebUI API and run with stream',
    defaults: { name: 'Gradio WebUI Stream' },
    inputs: [NodeConnectionType.Main] as const,
    outputs: [NodeConnectionType.Main] as const,
    properties: [
      {
        displayName: 'API URL',
        name: 'apiUrl',
        type: 'string',
        default: 'https://980e-170-79-156-214.ngrok-free.app/gradio_api/call/run_with_stream',
        required: true,
        description: 'URL of the Gradio WebUI API endpoint',
      },
      {
        displayName: 'Gradio API Key',
        name: 'gradioApiKey',
        type: 'string',
        typeOptions: {
          password: true,
        },
        default: '',
        required: false,
        description: 'Authentication key for Gradio WebUI API access',
      },
      {
        displayName: 'Agent Type',
        name: 'agent_type',
        type: 'string',
        default: 'org',
        required: true,
        description: 'The input value that is provided in the "Agent Type" Radio component',
      },
      {
        displayName: 'LLM Provider',
        name: 'llm_provider',
        type: 'string',
        default: 'gemini',
        required: true,
        description: 'The input value that is provided in the "LLM Provider" Dropdown component',
      },
      {
        displayName: 'Model Name',
        name: 'llm_model_name',
        type: 'string',
        default: 'gemini-2.0-flash-exp',
        required: true,
        description: 'The input value that is provided in the "Model Name" Dropdown component',
      },
      {
        displayName: 'Temperature',
        name: 'llm_temperature',
        type: 'number',
        default: 1,
        required: true,
        description: 'The input value that is provided in the "Temperature" Slider component',
      },
      {
        displayName: 'Base URL',
        name: 'base_url',
        type: 'string',
        default: 'https://generativelanguage.googleapis.com',
        required: true,
        description: 'The input value that is provided in the "Base URL" Textbox component',
      },
      {
        displayName: 'LLM Provider API Key',
        name: 'llmApiKey',
        type: 'string',
        typeOptions: {
          password: true,
        },
        default: '',
        required: true,
        description: 'API key for the LLM service provider (e.g. Google Gemini)',
      },
      {
        displayName: 'Use Own Browser',
        name: 'use_own_browser',
        type: 'boolean',
        default: true,
        required: true,
        description: 'Whether the input value that is provided in the "Use Own Browser" Checkbox component',
      },
      {
        displayName: 'Keep Browser Open',
        name: 'keep_browser_open',
        type: 'boolean',
        default: true,
        required: true,
        description: 'Whether the input value that is provided in the "Keep Browser Open" Checkbox component',
      },
      {
        displayName: 'Headless Mode',
        name: 'headless_mode',
        type: 'boolean',
        default: true,
        required: true,
        description: 'Whether the input value that is provided in the "Headless Mode" Checkbox component',
      },
      {
        displayName: 'Disable Security',
        name: 'disable_security',
        type: 'boolean',
        default: true,
        required: true,
        description: 'Whether the input value that is provided in the "Disable Security" Checkbox component',
      },
      {
        displayName: 'Window Width',
        name: 'window_width',
        type: 'number',
        default: 3,
        required: true,
        description: 'The input value that is provided in the "Window Width" Number component',
      },
      {
        displayName: 'Window Height',
        name: 'window_height',
        type: 'number',
        default: 3,
        required: true,
        description: 'The input value that is provided in the "Window Height" Number component',
      },
      {
        displayName: 'Recording Path',
        name: 'recording_path',
        type: 'string',
        default: './tmp/record_videos',
        required: true,
        description: 'The input value that is provided in the "Recording Path" Textbox component',
      },
      {
        displayName: 'Agent History Save Path',
        name: 'agent_history_save_path',
        type: 'string',
        default: './tmp/agent_history',
        required: true,
        description: 'The input value that is provided in the "Agent History Save Path" Textbox component',
      },
      {
        displayName: 'Trace Path',
        name: 'trace_path',
        type: 'string',
        default: './tmp/traces',
        required: true,
        description: 'The input value that is provided in the "Trace Path" Textbox component',
      },
      {
        displayName: 'Enable Recording',
        name: 'enable_recording',
        type: 'boolean',
        default: false,
        required: true,
        description: 'Whether the input value that is provided in the "Enable Recording" Checkbox component',
      },
      {
        displayName: 'Task Description',
        name: 'task_description',
        type: 'string',
        default: 'go to google.com and type \'OpenAI\' click search and give me the first url',
        required: true,
        description: 'The input value that is provided in the "Task Description" Textbox component',
      },
      {
        displayName: 'Additional Information',
        name: 'additional_information',
        type: 'string',
        default: 'hellow',
        required: true,
        description: 'The input value that is provided in the "Additional Information" Textbox component',
      },
      {
        displayName: 'Max Run Steps',
        name: 'max_run_steps',
        type: 'number',
        default: 10,
        required: true,
        description: 'The input value that is provided in the "Max Run Steps" Slider component',
      },
      {
        displayName: 'Use Vision',
        name: 'use_vision',
        type: 'boolean',
        default: true,
        required: true,
        description: 'Whether the input value that is provided in the "Use Vision" Checkbox component',
      },
      {
        displayName: 'Max Actions per Step',
        name: 'max_actions_per_step',
        type: 'number',
        default: 10,
        required: true,
        description: 'The input value that is provided in the "Max Actions per Step" Slider component',
      },
      {
        displayName: 'Tool Calling Method',
        name: 'tool_calling_method',
        type: 'string',
        default: 'auto',
        required: true,
        description: 'The input value that is provided in the "Tool Calling Method" Dropdown component',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<any> {
    const items = this.getInputData();
    const returnData: Array<{ json: any }> = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const apiUrl = this.getNodeParameter('apiUrl', itemIndex) as string;
        const gradioApiKey = this.getNodeParameter('gradioApiKey', itemIndex) as string;
        const llmApiKey = this.getNodeParameter('llmApiKey', itemIndex) as string;

        const data = {
          data: [
            this.getNodeParameter('agent_type', itemIndex),
            this.getNodeParameter('llm_provider', itemIndex),
            this.getNodeParameter('llm_model_name', itemIndex),
            this.getNodeParameter('llm_temperature', itemIndex),
            this.getNodeParameter('base_url', itemIndex),
            llmApiKey,
            this.getNodeParameter('use_own_browser', itemIndex),
            this.getNodeParameter('keep_browser_open', itemIndex),
            this.getNodeParameter('headless_mode', itemIndex),
            this.getNodeParameter('disable_security', itemIndex),
            this.getNodeParameter('window_width', itemIndex),
            this.getNodeParameter('window_height', itemIndex),
            this.getNodeParameter('recording_path', itemIndex),
            this.getNodeParameter('agent_history_save_path', itemIndex),
            this.getNodeParameter('trace_path', itemIndex),
            this.getNodeParameter('enable_recording', itemIndex),
            this.getNodeParameter('task_description', itemIndex),
            this.getNodeParameter('additional_information', itemIndex),
            this.getNodeParameter('max_run_steps', itemIndex),
            this.getNodeParameter('use_vision', itemIndex),
            this.getNodeParameter('max_actions_per_step', itemIndex),
            this.getNodeParameter('tool_calling_method', itemIndex),
          ],
        };

        const options: IRequestOptions = {
          method: 'POST',
          uri: apiUrl,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${gradioApiKey}`,
          },
          body: data,
          json: true,
        };

        if (!this.helpers.request) {
          throw new NodeApiError(this.getNode(), { message: 'Request helper not available' });
        }

        const response = await this.helpers.request(options);

        const eventId = response.event_id;
        const getOptions: IRequestOptions = {
          method: 'GET',
          uri: `${apiUrl}/${eventId}`,
          headers: {
            'Content-Type': 'text/event-stream',
            Authorization: `Bearer ${gradioApiKey}`,
          },
          json: false,
        };

        const getResponse = await this.helpers.request(getOptions);

        // Processar a resposta
        const events = getResponse.split('\n\n').filter((event: string) => event.startsWith('event:'));
        let finalData: any[] = [];
        try {
          events.forEach((event: string) => {
            if (event.startsWith('event: complete')) {
              const dataString = event.substring(event.indexOf('data:') + 5);
              try {
                finalData = JSON.parse(dataString);
              } catch (error) {
                console.log('Failed to parse JSON data', dataString);
                finalData = [];
              }
            }
          });
        } catch (error) {
          finalData = [];
        }

        returnData.push({
          json: {
            liveBrowserView: finalData[0] !== undefined ? finalData[0] : null, // Html component
            finalResult: finalData[1] !== undefined ? finalData[1] : null,    // Textbox component
            errors: finalData[2] !== undefined ? finalData[2] : null,         // Textbox component
            modelActions: finalData[3] !== undefined ? finalData[3] : null,   // Textbox component
            modelThoughts: finalData[4] !== undefined ? finalData[4] : null,  // Textbox component
            latestRecording: finalData[5] !== undefined ? finalData[5] : null,// Video component
            traceFile: finalData[6] !== undefined ? finalData[6] : null,      // File component
            agentHistory: finalData[7] !== undefined ? finalData[7] : null,   // File component
            },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
        } else {
          throw new NodeApiError(this.getNode(), error, {
            message: `Error processing item ${itemIndex}`,
            description: error.message,
          });
        }
      }
    }

    return this.prepareOutputData(returnData);
  }
}

