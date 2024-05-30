/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'client_index': RouteRecordInfo<'client_index', '/', Record<never, never>, Record<never, never>>,
    'not-found': RouteRecordInfo<'not-found', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    'forbidden': RouteRecordInfo<'forbidden', '/403', Record<never, never>, Record<never, never>>,
    'server-error': RouteRecordInfo<'server-error', '/500', Record<never, never>, Record<never, never>>,
    'admin_index': RouteRecordInfo<'admin_index', '/admin', Record<never, never>, Record<never, never>>,
    'documents': RouteRecordInfo<'documents', '/admin/document', Record<never, never>, Record<never, never>>,
    'document_naive-ui': RouteRecordInfo<'document_naive-ui', '/admin/document/naive-ui', Record<never, never>, Record<never, never>>,
    'document_unocss': RouteRecordInfo<'document_unocss', '/admin/document/unocss', Record<never, never>, Record<never, never>>,
    'document_vite': RouteRecordInfo<'document_vite', '/admin/document/vite', Record<never, never>, Record<never, never>>,
    'documents_vue': RouteRecordInfo<'documents_vue', '/admin/document/vue', Record<never, never>, Record<never, never>>,
    'documents_vueuse': RouteRecordInfo<'documents_vueuse', '/admin/document/vueuse', Record<never, never>, Record<never, never>>,
    'admin_layer_1': RouteRecordInfo<'admin_layer_1', '/admin/layer-1', Record<never, never>, Record<never, never>>,
    'admin_layer_1-1': RouteRecordInfo<'admin_layer_1-1', '/admin/layer-1', Record<never, never>, Record<never, never>>,
    'admin_layer_1-2': RouteRecordInfo<'admin_layer_1-2', '/admin/layer-1/layer-1-2', Record<never, never>, Record<never, never>>,
    'admin_layer_1_2-1': RouteRecordInfo<'admin_layer_1_2-1', '/admin/layer-1/layer-1-2', Record<never, never>, Record<never, never>>,
    'admin_layer_1_2-2': RouteRecordInfo<'admin_layer_1_2-2', '/admin/layer-1/layer-1-2/layer-1-2-2', Record<never, never>, Record<never, never>>,
    'admin_theme_config': RouteRecordInfo<'admin_theme_config', '/admin/theme', Record<never, never>, Record<never, never>>,
  }
}
