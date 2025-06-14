import { EProgressAction } from '@/utils/enums/progress.enum';
import { apiClient } from './instances/api-client.instance';
import { SpecificationNameEnum } from '@/utils/enums/specification.enum';

const TemplateSpecificationEndpoint = {
  DOWNLOAD_DEFAULT: '/template-specification/default/download',
};

export const TemplateSpecificationApi = {
  async downloadDefault(request: {
    name: keyof typeof SpecificationNameEnum;
    action: EProgressAction;
    type?: 'template' | 'json';
  }): Promise<void> {
    try {
      const response = await apiClient.get(TemplateSpecificationEndpoint.DOWNLOAD_DEFAULT, {
        responseType: 'blob',
        params: request,
      });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${request.name}-${request.action}${request.type ? `-${request.type}` : ''}.${request.action === EProgressAction.IMPORT ? 'json' : request.type === 'template' ? 'xlsx' : 'json'}`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);

      link.remove();
    } catch (error) {
      throw error;
    }
  },
};
