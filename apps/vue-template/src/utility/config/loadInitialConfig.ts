import type { AppConfig } from '../../types';

export async function loadInitialConfig(fn: (config: AppConfig) => void) {
  try {
    const response = await fetch('/config.json');
    const config = (await response.json()) as AppConfig;
    fn(config);
  } catch (error) {
    console.error('載入初始數據時發生錯誤:', error);
    throw error;
  }
}
