import { TSystemConfig } from "@/utils/types/system-config.type";

export function getConfigValueType(config: TSystemConfig): 'string' | 'number' | 'boolean' | 'json' | null {
  if (config.stringValue !== undefined && config.stringValue !== null) {
    return 'string';
  }
  if (config.numberValue !== undefined && config.numberValue !== null) {
    return 'number';
  }
  if (config.booleanValue !== undefined && config.booleanValue !== null) {
    return 'boolean';
  }
  if (config.jsonValue !== undefined && config.jsonValue !== null) {
    return 'json';
  }
  return null;
}

export function getConfigValue(config: TSystemConfig): any {
  const type = getConfigValueType(config);
  
  switch (type) {
    case 'string':
      return config.stringValue;
    case 'number':
      return config.numberValue;
    case 'boolean':
      return config.booleanValue;
    case 'json':
      return config.jsonValue;
    default:
      return null;
  }
}

export function createConfigWithValue(key: string, value: any, type: 'string' | 'number' | 'boolean' | 'json'): TSystemConfig {
  const config: TSystemConfig = { key };
  
  switch (type) {
    case 'string':
      config.stringValue = String(value);
      break;
    case 'number':
      config.numberValue = typeof value === 'number' ? value : parseFloat(value);
      break;
    case 'boolean':
      config.booleanValue = Boolean(value);
      break;
    case 'json':
      config.jsonValue = typeof value === 'string' ? JSON.parse(value) : value;
      break;
  }
  
  return config;
}