import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_media_kind" AS ENUM('image', 'document', 'video-embed-poster');
  CREATE TYPE "public"."enum_clients_kind" AS ENUM('client', 'partner-badge');
  CREATE TYPE "public"."enum_services_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_services_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_services_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_services_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_services_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_services_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_services_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_services_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_services_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_services_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_services_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_services_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_services_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_services_service_pillar" AS ENUM('commerce', 'build-grow');
  CREATE TYPE "public"."enum_services_service_category" AS ENUM('new-build', 'replatforming-migration', 'support-retainer', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__services_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__services_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__services_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__services_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__services_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__services_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__services_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__services_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__services_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__services_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__services_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__services_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__services_v_version_service_pillar" AS ENUM('commerce', 'build-grow');
  CREATE TYPE "public"."enum__services_v_version_service_category" AS ENUM('new-build', 'replatforming-migration', 'support-retainer', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_platform_hubs_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_platform_hubs_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_platform_hubs_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_platform_hubs_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_platform_hubs_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_platform_hubs_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_platform_hubs_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_platform_hubs_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_platform_hubs_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_platform_hubs_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_platform_hubs_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_platform_hubs_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_platform_hubs_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_platform_hubs_tier" AS ENUM('flagship', 'hub');
  CREATE TYPE "public"."enum_platform_hubs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__platform_hubs_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__platform_hubs_v_version_tier" AS ENUM('flagship', 'hub');
  CREATE TYPE "public"."enum__platform_hubs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_migration_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__migration_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_solutions_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_solutions_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_solutions_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_solutions_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_solutions_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_solutions_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_solutions_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_solutions_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_solutions_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_solutions_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_solutions_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_solutions_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_solutions_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_solutions_model_key" AS ENUM('b2b', 'dtc', 'marketplace', 'subscriptions', 'multi-region');
  CREATE TYPE "public"."enum_solutions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__solutions_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__solutions_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__solutions_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__solutions_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__solutions_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__solutions_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__solutions_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__solutions_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__solutions_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__solutions_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__solutions_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__solutions_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__solutions_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__solutions_v_version_model_key" AS ENUM('b2b', 'dtc', 'marketplace', 'subscriptions', 'multi-region');
  CREATE TYPE "public"."enum__solutions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_markets_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_markets_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_markets_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_markets_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_markets_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_markets_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_markets_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_markets_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_markets_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_markets_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_markets_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_markets_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_markets_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_markets_region" AS ENUM('india', 'usa', 'uae-gcc');
  CREATE TYPE "public"."enum_markets_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__markets_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__markets_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__markets_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__markets_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__markets_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__markets_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__markets_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__markets_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__markets_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__markets_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__markets_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__markets_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__markets_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__markets_v_version_region" AS ENUM('india', 'usa', 'uae-gcc');
  CREATE TYPE "public"."enum__markets_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_commerce_models" AS ENUM('b2b', 'dtc', 'marketplace', 'subscriptions', 'multi-region');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__case_studies_v_version_commerce_models" AS ENUM('b2b', 'dtc', 'marketplace', 'subscriptions', 'multi-region');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_open_source_projects_status" AS ENUM('active', 'maintained', 'archived');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lead_magnets_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_lead_magnets_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_lead_magnets_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_lead_magnets_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_lead_magnets_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_lead_magnets_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_lead_magnets_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_lead_magnets_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_lead_magnets_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_lead_magnets_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_lead_magnets_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_lead_magnets_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_lead_magnets_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_lead_magnets_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__lead_magnets_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__lead_magnets_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_pages_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum_pages_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_pages_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum_pages_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum_pages_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum_pages_page_kind" AS ENUM('home', 'index', 'about', 'pricing', 'contact', 'legal', 'thank-you');
  CREATE TYPE "public"."enum_pages_journey_position" AS ENUM('problem-aware', 'solution-evaluating', 'proof-seeking', 'researching', 'price-checking', 'utility');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('default', 'platform', 'migration');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__pages_v_blocks_pillar_cards_cards_icon" AS ENUM('build', 'migrate', 'support', 'web-app', 'mobile-app');
  CREATE TYPE "public"."enum__pages_v_blocks_case_study_card_list_source" AS ENUM('manual', 'related');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_secondary_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_strip_source" AS ENUM('clients', 'partner-badges', 'oss');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_table_tiers_cta_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work', 'read-migration-guide');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_embed_kind" AS ENUM('cal-inline', 'cal-popup', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_event_type_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_layout" AS ENUM('quote', 'card');
  CREATE TYPE "public"."enum__pages_v_version_page_kind" AS ENUM('home', 'index', 'about', 'pricing', 'contact', 'legal', 'thank-you');
  CREATE TYPE "public"."enum__pages_v_version_journey_position" AS ENUM('problem-aware', 'solution-evaluating', 'proof-seeking', 'researching', 'price-checking', 'utility');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('linkedin', 'github', 'x', 'youtube');
  CREATE TYPE "public"."enum_seo_defaults_robots_policy" AS ENUM('allow-all', 'custom');
  CREATE TYPE "public"."enum_redirects_redirects_type" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_cta_config_primary_ctas_key" AS ENUM('book-call', 'get-audit', 'scope-app', 'download-checklist', 'subscribe', 'view-work');
  CREATE TYPE "public"."enum_cta_config_booking_event_types_key" AS ENUM('discovery-30', 'audit-scoping');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"credit" varchar,
  	"kind" "enum_media_kind" DEFAULT 'image' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"headshot_id" integer,
  	"social_url" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_role" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"headshot_id" integer,
  	"platform_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"kind" "enum_clients_kind" NOT NULL,
  	"badge_url" varchar,
  	"url" varchar,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_engagement_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"typical_duration" varchar
  );
  
  CREATE TABLE "services_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_services_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_services_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_services_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "services_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_services_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "services_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "services_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_services_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_services_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_services_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "services_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_services_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "services_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_services_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "services_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_services_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_services_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_services_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "services_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "services_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "services_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"service_pillar" "enum_services_service_pillar",
  	"service_category" "enum_services_service_category",
  	"parent_service_id" integer,
  	"short_pitch" varchar,
  	"icon" "enum_services_icon",
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_services_v_version_engagement_models" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"typical_duration" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_proof_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__services_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__services_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__services_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__services_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__services_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__services_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__services_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__services_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__services_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__services_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__services_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__services_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__services_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_service_pillar" "enum__services_v_version_service_pillar",
  	"version_service_category" "enum__services_v_version_service_category",
  	"version_parent_service_id" integer,
  	"version_short_pitch" varchar,
  	"version_icon" "enum__services_v_version_icon",
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "platform_hubs_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_platform_hubs_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_platform_hubs_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_platform_hubs_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_platform_hubs_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_platform_hubs_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "platform_hubs_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_platform_hubs_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_platform_hubs_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_platform_hubs_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "platform_hubs_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_platform_hubs_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_platform_hubs_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "platform_hubs_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_platform_hubs_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_platform_hubs_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_platform_hubs_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "platform_hubs_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "platform_hubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tier" "enum_platform_hubs_tier",
  	"positioning_line" varchar,
  	"economics_cost_line" varchar,
  	"economics_license_note" varchar,
  	"economics_source" varchar,
  	"eos_date" timestamp(3) with time zone,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_platform_hubs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "platform_hubs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"migration_pages_id" integer,
  	"solutions_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__platform_hubs_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__platform_hubs_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__platform_hubs_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__platform_hubs_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__platform_hubs_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__platform_hubs_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__platform_hubs_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__platform_hubs_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__platform_hubs_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__platform_hubs_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__platform_hubs_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__platform_hubs_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__platform_hubs_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_platform_hubs_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_platform_hubs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_tier" "enum__platform_hubs_v_version_tier",
  	"version_positioning_line" varchar,
  	"version_economics_cost_line" varchar,
  	"version_economics_license_note" varchar,
  	"version_economics_source" varchar,
  	"version_eos_date" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__platform_hubs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_platform_hubs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"migration_pages_id" integer,
  	"solutions_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "migration_pages_tco_block_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"source_cost" varchar,
  	"target_cost" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "migration_pages_cutover_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_title" varchar,
  	"detail" varchar,
  	"duration_weeks" varchar
  );
  
  CREATE TABLE "migration_pages_seo_preservation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action" varchar
  );
  
  CREATE TABLE "migration_pages_timeline_bands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"band" varchar,
  	"scope" varchar,
  	"price_from" varchar
  );
  
  CREATE TABLE "migration_pages_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "migration_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"source_platform_id" integer,
  	"target_platform_id" integer,
  	"hero_headline" varchar,
  	"hero_subhead" varchar,
  	"cost_of_staying" jsonb,
  	"urgency_anchor_date" timestamp(3) with time zone,
  	"urgency_anchor_label" varchar,
  	"urgency_anchor_source" varchar,
  	"tco_block_methodology_note" varchar,
  	"rollback_plan" jsonb,
  	"when_not_to_migrate" jsonb,
  	"gated_asset_id" integer,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_migration_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "migration_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_migration_pages_v_version_tco_block_comparison_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"source_cost" varchar,
  	"target_cost" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_migration_pages_v_version_cutover_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step_title" varchar,
  	"detail" varchar,
  	"duration_weeks" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_migration_pages_v_version_seo_preservation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"action" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_migration_pages_v_version_timeline_bands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"band" varchar,
  	"scope" varchar,
  	"price_from" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_migration_pages_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_migration_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_source_platform_id" integer,
  	"version_target_platform_id" integer,
  	"version_hero_headline" varchar,
  	"version_hero_subhead" varchar,
  	"version_cost_of_staying" jsonb,
  	"version_urgency_anchor_date" timestamp(3) with time zone,
  	"version_urgency_anchor_label" varchar,
  	"version_urgency_anchor_source" varchar,
  	"version_tco_block_methodology_note" varchar,
  	"version_rollback_plan" jsonb,
  	"version_when_not_to_migrate" jsonb,
  	"version_gated_asset_id" integer,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__migration_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_migration_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "solutions_capability_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"platform_note" varchar
  );
  
  CREATE TABLE "solutions_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_solutions_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_solutions_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_solutions_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_solutions_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "solutions_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_solutions_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "solutions_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "solutions_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_solutions_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_solutions_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_solutions_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "solutions_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_solutions_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "solutions_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_solutions_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "solutions_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_solutions_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_solutions_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_solutions_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "solutions_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "solutions_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "solutions_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"model_key" "enum_solutions_model_key",
  	"pain_summary" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_solutions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "solutions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"platform_hubs_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_solutions_v_version_capability_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"capability" varchar,
  	"platform_note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__solutions_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__solutions_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__solutions_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__solutions_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__solutions_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__solutions_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__solutions_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__solutions_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__solutions_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__solutions_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__solutions_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__solutions_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__solutions_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_solutions_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_solutions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_model_key" "enum__solutions_v_version_model_key",
  	"version_pain_summary" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__solutions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_solutions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"platform_hubs_id" integer,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "markets_proof_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markets_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_markets_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_markets_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_markets_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_markets_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "markets_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_markets_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "markets_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "markets_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_markets_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_markets_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_markets_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "markets_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_markets_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "markets_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_markets_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "markets_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_markets_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_markets_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_markets_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "markets_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "markets_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "markets_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "markets_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "markets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"region" "enum_markets_region",
  	"market_context" jsonb,
  	"engagement_logistics_timezone_overlap" varchar,
  	"engagement_logistics_contracting_notes" varchar,
  	"engagement_logistics_payment_notes" varchar,
  	"compliance_notes" jsonb,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_markets_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "markets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_markets_v_version_proof_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__markets_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__markets_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__markets_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__markets_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__markets_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__markets_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__markets_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__markets_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__markets_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__markets_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__markets_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__markets_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__markets_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markets_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_markets_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_region" "enum__markets_v_version_region",
  	"version_market_context" jsonb,
  	"version_engagement_logistics_timezone_overlap" varchar,
  	"version_engagement_logistics_contracting_notes" varchar,
  	"version_engagement_logistics_payment_notes" varchar,
  	"version_compliance_notes" jsonb,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__markets_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_markets_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "case_studies_commerce_models" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_case_studies_commerce_models",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "case_studies_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"outcome_title" varchar,
  	"client" varchar,
  	"industry" varchar,
  	"platform_from_id" integer,
  	"platform_to_id" integer,
  	"challenge" jsonb,
  	"approach" jsonb,
  	"solution" jsonb,
  	"results" jsonb,
  	"testimonial_id" integer,
  	"live_url" varchar,
  	"is_placeholder" boolean DEFAULT false,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"markets_id" integer,
  	"media_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_commerce_models" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__case_studies_v_version_commerce_models",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_case_studies_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_outcome_title" varchar,
  	"version_client" varchar,
  	"version_industry" varchar,
  	"version_platform_from_id" integer,
  	"version_platform_to_id" integer,
  	"version_challenge" jsonb,
  	"version_approach" jsonb,
  	"version_solution" jsonb,
  	"version_results" jsonb,
  	"version_testimonial_id" integer,
  	"version_live_url" varchar,
  	"version_is_placeholder" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"markets_id" integer,
  	"media_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "open_source_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"repo_url" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"platform_id" integer NOT NULL,
  	"stars_snapshot" numeric,
  	"as_of" timestamp(3) with time zone,
  	"status" "enum_open_source_projects_status" DEFAULT 'active' NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"author_id" integer,
  	"body" jsonb,
  	"related_migration_page_id" integer,
  	"reading_time_min" numeric,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_author_id" integer,
  	"version_body" jsonb,
  	"version_related_migration_page_id" integer,
  	"version_reading_time_min" numeric,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "lead_magnets_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_lead_magnets_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_lead_magnets_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_lead_magnets_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_lead_magnets_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_lead_magnets_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "lead_magnets_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_lead_magnets_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_lead_magnets_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_lead_magnets_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "lead_magnets_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_lead_magnets_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_lead_magnets_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "lead_magnets_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_lead_magnets_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_lead_magnets_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_lead_magnets_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "lead_magnets_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lead_magnets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"asset_file_id" integer,
  	"form_id" integer,
  	"migration_page_id" integer,
  	"listmonk_list_id" numeric,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lead_magnets_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "lead_magnets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__lead_magnets_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__lead_magnets_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__lead_magnets_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__lead_magnets_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__lead_magnets_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__lead_magnets_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__lead_magnets_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__lead_magnets_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__lead_magnets_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__lead_magnets_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__lead_magnets_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__lead_magnets_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__lead_magnets_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lead_magnets_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lead_magnets_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_asset_file_id" integer,
  	"version_form_id" integer,
  	"version_migration_page_id" integer,
  	"version_listmonk_list_id" numeric,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lead_magnets_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_lead_magnets_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum_pages_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_pages_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum_pages_blocks_pillar_cards_cards_icon"
  );
  
  CREATE TABLE "pages_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_pages_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum_pages_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum_pages_blocks_cta_band_secondary_cta_key",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_trust_strip_source",
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum_pages_blocks_pricing_table_tiers_cta_key"
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"embed_kind" "enum_pages_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum_pages_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum_pages_blocks_testimonial_layout" DEFAULT 'quote',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar
  );
  
  CREATE TABLE "pages_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"route_path" varchar,
  	"page_kind" "enum_pages_page_kind",
  	"journey_position" "enum_pages_journey_position",
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_noindex" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"cta_key" "enum__pages_v_blocks_hero_cta_key",
  	"media_id" integer,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__pages_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"proof_line" varchar,
  	"link" varchar,
  	"icon" "enum__pages_v_blocks_pillar_cards_cards_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillar_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_callout_row_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"context" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_callout_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_case_study_card_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum__pages_v_blocks_case_study_card_list_source" DEFAULT 'manual',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"cta_key" "enum__pages_v_blocks_cta_band_cta_key",
  	"secondary_cta_key" "enum__pages_v_blocks_cta_band_secondary_cta_key",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"emit_schema" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_trust_strip_source",
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price_from" varchar,
  	"cta_key" "enum__pages_v_blocks_pricing_table_tiers_cta_key",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"embed_kind" "enum__pages_v_blocks_embed_embed_kind",
  	"url" varchar,
  	"event_type_key" "enum__pages_v_blocks_embed_event_type_key",
  	"poster_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"layout" "enum__pages_v_blocks_testimonial_layout" DEFAULT 'quote',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_route_path" varchar,
  	"version_page_kind" "enum__pages_v_version_page_kind",
  	"version_journey_position" "enum__pages_v_version_journey_position",
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_noindex" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"case_studies_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"authors_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"testimonials_id" integer,
  	"clients_id" integer,
  	"services_id" integer,
  	"platform_hubs_id" integer,
  	"migration_pages_id" integer,
  	"solutions_id" integer,
  	"markets_id" integer,
  	"case_studies_id" integer,
  	"open_source_projects_id" integer,
  	"posts_id" integer,
  	"lead_magnets_id" integer,
  	"pages_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"logo_dark_id" integer,
  	"default_og_image_id" integer NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"founding_year" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_primary_nav_dropdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_primary_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_trust_badges" boolean DEFAULT false NOT NULL,
  	"mobile_cta_label" varchar DEFAULT 'Book a call' NOT NULL,
  	"markets_strip" varchar DEFAULT 'Serving India · USA · UAE & GCC',
  	"markets_href" varchar DEFAULT '/markets',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_template" varchar DEFAULT '%s · GenMedha Hub' NOT NULL,
  	"default_meta_description" varchar NOT NULL,
  	"site_name" varchar DEFAULT 'GenMedha Hub' NOT NULL,
  	"twitter_handle" varchar,
  	"robots_policy" "enum_seo_defaults_robots_policy" DEFAULT 'allow-all' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects_redirects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"type" "enum_redirects_redirects_type" DEFAULT '301',
  	"note" varchar
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta_config_primary_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_cta_config_primary_ctas_key" NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "cta_config_booking_event_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_cta_config_booking_event_types_key" NOT NULL,
  	"cal_slug" varchar NOT NULL,
  	"duration_min" numeric NOT NULL
  );
  
  CREATE TABLE "cta_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"booking_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_platform_id_platform_hubs_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_engagement_models" ADD CONSTRAINT "services_engagement_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_proof_points" ADD CONSTRAINT "services_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero" ADD CONSTRAINT "services_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_rich_text_section" ADD CONSTRAINT "services_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid_items" ADD CONSTRAINT "services_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_feature_grid" ADD CONSTRAINT "services_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pillar_cards_cards" ADD CONSTRAINT "services_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pillar_cards" ADD CONSTRAINT "services_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "services_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_metrics_callout_row" ADD CONSTRAINT "services_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_case_study_card_list" ADD CONSTRAINT "services_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_band" ADD CONSTRAINT "services_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_accordion_faqs" ADD CONSTRAINT "services_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_faq_accordion" ADD CONSTRAINT "services_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_trust_strip" ADD CONSTRAINT "services_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table_tiers_features" ADD CONSTRAINT "services_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table_tiers" ADD CONSTRAINT "services_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_pricing_table" ADD CONSTRAINT "services_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_embed" ADD CONSTRAINT "services_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_embed" ADD CONSTRAINT "services_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonial" ADD CONSTRAINT "services_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_testimonial" ADD CONSTRAINT "services_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_comparison_table_columns" ADD CONSTRAINT "services_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_comparison_table_rows_cells" ADD CONSTRAINT "services_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_comparison_table_rows" ADD CONSTRAINT "services_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_comparison_table" ADD CONSTRAINT "services_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_service_id_services_id_fk" FOREIGN KEY ("parent_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_engagement_models" ADD CONSTRAINT "_services_v_version_engagement_models_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_proof_points" ADD CONSTRAINT "_services_v_version_proof_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_hero" ADD CONSTRAINT "_services_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_rich_text_section" ADD CONSTRAINT "_services_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid_items" ADD CONSTRAINT "_services_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_feature_grid" ADD CONSTRAINT "_services_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_services_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pillar_cards" ADD CONSTRAINT "_services_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_services_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_metrics_callout_row" ADD CONSTRAINT "_services_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_case_study_card_list" ADD CONSTRAINT "_services_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_cta_band" ADD CONSTRAINT "_services_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_services_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_faq_accordion" ADD CONSTRAINT "_services_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_trust_strip" ADD CONSTRAINT "_services_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_services_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_services_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_pricing_table" ADD CONSTRAINT "_services_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_embed" ADD CONSTRAINT "_services_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_embed" ADD CONSTRAINT "_services_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonial" ADD CONSTRAINT "_services_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_testimonial" ADD CONSTRAINT "_services_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_comparison_table_columns" ADD CONSTRAINT "_services_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_services_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_comparison_table_rows" ADD CONSTRAINT "_services_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_comparison_table" ADD CONSTRAINT "_services_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_parent_service_id_services_id_fk" FOREIGN KEY ("version_parent_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_hero" ADD CONSTRAINT "platform_hubs_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_hero" ADD CONSTRAINT "platform_hubs_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_rich_text_section" ADD CONSTRAINT "platform_hubs_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_feature_grid_items" ADD CONSTRAINT "platform_hubs_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_feature_grid" ADD CONSTRAINT "platform_hubs_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_pillar_cards_cards" ADD CONSTRAINT "platform_hubs_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_pillar_cards" ADD CONSTRAINT "platform_hubs_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "platform_hubs_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_metrics_callout_row" ADD CONSTRAINT "platform_hubs_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_case_study_card_list" ADD CONSTRAINT "platform_hubs_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_cta_band" ADD CONSTRAINT "platform_hubs_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_faq_accordion_faqs" ADD CONSTRAINT "platform_hubs_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_faq_accordion" ADD CONSTRAINT "platform_hubs_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_trust_strip" ADD CONSTRAINT "platform_hubs_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_pricing_table_tiers_features" ADD CONSTRAINT "platform_hubs_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_pricing_table_tiers" ADD CONSTRAINT "platform_hubs_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_pricing_table" ADD CONSTRAINT "platform_hubs_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_embed" ADD CONSTRAINT "platform_hubs_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_embed" ADD CONSTRAINT "platform_hubs_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_testimonial" ADD CONSTRAINT "platform_hubs_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_testimonial" ADD CONSTRAINT "platform_hubs_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_comparison_table_columns" ADD CONSTRAINT "platform_hubs_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_comparison_table_rows_cells" ADD CONSTRAINT "platform_hubs_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_comparison_table_rows" ADD CONSTRAINT "platform_hubs_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_blocks_comparison_table" ADD CONSTRAINT "platform_hubs_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs" ADD CONSTRAINT "platform_hubs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "platform_hubs_rels" ADD CONSTRAINT "platform_hubs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_rels" ADD CONSTRAINT "platform_hubs_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_rels" ADD CONSTRAINT "platform_hubs_rels_migration_pages_fk" FOREIGN KEY ("migration_pages_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_rels" ADD CONSTRAINT "platform_hubs_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "platform_hubs_rels" ADD CONSTRAINT "platform_hubs_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_hero" ADD CONSTRAINT "_platform_hubs_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_hero" ADD CONSTRAINT "_platform_hubs_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_rich_text_section" ADD CONSTRAINT "_platform_hubs_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_feature_grid_items" ADD CONSTRAINT "_platform_hubs_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_feature_grid" ADD CONSTRAINT "_platform_hubs_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_platform_hubs_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_pillar_cards" ADD CONSTRAINT "_platform_hubs_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_platform_hubs_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_metrics_callout_row" ADD CONSTRAINT "_platform_hubs_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_case_study_card_list" ADD CONSTRAINT "_platform_hubs_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_cta_band" ADD CONSTRAINT "_platform_hubs_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_platform_hubs_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_faq_accordion" ADD CONSTRAINT "_platform_hubs_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_trust_strip" ADD CONSTRAINT "_platform_hubs_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_platform_hubs_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_platform_hubs_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_pricing_table" ADD CONSTRAINT "_platform_hubs_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_embed" ADD CONSTRAINT "_platform_hubs_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_embed" ADD CONSTRAINT "_platform_hubs_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_testimonial" ADD CONSTRAINT "_platform_hubs_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_testimonial" ADD CONSTRAINT "_platform_hubs_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_comparison_table_columns" ADD CONSTRAINT "_platform_hubs_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_platform_hubs_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_comparison_table_rows" ADD CONSTRAINT "_platform_hubs_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_blocks_comparison_table" ADD CONSTRAINT "_platform_hubs_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v" ADD CONSTRAINT "_platform_hubs_v_parent_id_platform_hubs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v" ADD CONSTRAINT "_platform_hubs_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_rels" ADD CONSTRAINT "_platform_hubs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_platform_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_rels" ADD CONSTRAINT "_platform_hubs_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_rels" ADD CONSTRAINT "_platform_hubs_v_rels_migration_pages_fk" FOREIGN KEY ("migration_pages_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_rels" ADD CONSTRAINT "_platform_hubs_v_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_platform_hubs_v_rels" ADD CONSTRAINT "_platform_hubs_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_tco_block_comparison_rows" ADD CONSTRAINT "migration_pages_tco_block_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_cutover_steps" ADD CONSTRAINT "migration_pages_cutover_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_seo_preservation" ADD CONSTRAINT "migration_pages_seo_preservation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_timeline_bands" ADD CONSTRAINT "migration_pages_timeline_bands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_faqs" ADD CONSTRAINT "migration_pages_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages" ADD CONSTRAINT "migration_pages_source_platform_id_platform_hubs_id_fk" FOREIGN KEY ("source_platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "migration_pages" ADD CONSTRAINT "migration_pages_target_platform_id_platform_hubs_id_fk" FOREIGN KEY ("target_platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "migration_pages" ADD CONSTRAINT "migration_pages_gated_asset_id_lead_magnets_id_fk" FOREIGN KEY ("gated_asset_id") REFERENCES "public"."lead_magnets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "migration_pages" ADD CONSTRAINT "migration_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "migration_pages_rels" ADD CONSTRAINT "migration_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "migration_pages_rels" ADD CONSTRAINT "migration_pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_version_tco_block_comparison_rows" ADD CONSTRAINT "_migration_pages_v_version_tco_block_comparison_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_version_cutover_steps" ADD CONSTRAINT "_migration_pages_v_version_cutover_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_version_seo_preservation" ADD CONSTRAINT "_migration_pages_v_version_seo_preservation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_version_timeline_bands" ADD CONSTRAINT "_migration_pages_v_version_timeline_bands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_version_faqs" ADD CONSTRAINT "_migration_pages_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v" ADD CONSTRAINT "_migration_pages_v_parent_id_migration_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."migration_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_migration_pages_v" ADD CONSTRAINT "_migration_pages_v_version_source_platform_id_platform_hubs_id_fk" FOREIGN KEY ("version_source_platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_migration_pages_v" ADD CONSTRAINT "_migration_pages_v_version_target_platform_id_platform_hubs_id_fk" FOREIGN KEY ("version_target_platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_migration_pages_v" ADD CONSTRAINT "_migration_pages_v_version_gated_asset_id_lead_magnets_id_fk" FOREIGN KEY ("version_gated_asset_id") REFERENCES "public"."lead_magnets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_migration_pages_v" ADD CONSTRAINT "_migration_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_rels" ADD CONSTRAINT "_migration_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_migration_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_migration_pages_v_rels" ADD CONSTRAINT "_migration_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_capability_checklist" ADD CONSTRAINT "solutions_capability_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_hero" ADD CONSTRAINT "solutions_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_hero" ADD CONSTRAINT "solutions_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_rich_text_section" ADD CONSTRAINT "solutions_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_feature_grid_items" ADD CONSTRAINT "solutions_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_feature_grid" ADD CONSTRAINT "solutions_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_pillar_cards_cards" ADD CONSTRAINT "solutions_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_pillar_cards" ADD CONSTRAINT "solutions_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "solutions_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_metrics_callout_row" ADD CONSTRAINT "solutions_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_case_study_card_list" ADD CONSTRAINT "solutions_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_cta_band" ADD CONSTRAINT "solutions_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_faq_accordion_faqs" ADD CONSTRAINT "solutions_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_faq_accordion" ADD CONSTRAINT "solutions_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_trust_strip" ADD CONSTRAINT "solutions_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_pricing_table_tiers_features" ADD CONSTRAINT "solutions_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_pricing_table_tiers" ADD CONSTRAINT "solutions_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_pricing_table" ADD CONSTRAINT "solutions_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_embed" ADD CONSTRAINT "solutions_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_embed" ADD CONSTRAINT "solutions_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_testimonial" ADD CONSTRAINT "solutions_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_blocks_testimonial" ADD CONSTRAINT "solutions_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_comparison_table_columns" ADD CONSTRAINT "solutions_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_comparison_table_rows_cells" ADD CONSTRAINT "solutions_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_comparison_table_rows" ADD CONSTRAINT "solutions_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_blocks_comparison_table" ADD CONSTRAINT "solutions_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions" ADD CONSTRAINT "solutions_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_platform_hubs_fk" FOREIGN KEY ("platform_hubs_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_version_capability_checklist" ADD CONSTRAINT "_solutions_v_version_capability_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_hero" ADD CONSTRAINT "_solutions_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_hero" ADD CONSTRAINT "_solutions_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_rich_text_section" ADD CONSTRAINT "_solutions_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_feature_grid_items" ADD CONSTRAINT "_solutions_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_feature_grid" ADD CONSTRAINT "_solutions_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_solutions_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_pillar_cards" ADD CONSTRAINT "_solutions_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_solutions_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_metrics_callout_row" ADD CONSTRAINT "_solutions_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_case_study_card_list" ADD CONSTRAINT "_solutions_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_cta_band" ADD CONSTRAINT "_solutions_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_solutions_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_faq_accordion" ADD CONSTRAINT "_solutions_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_trust_strip" ADD CONSTRAINT "_solutions_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_solutions_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_solutions_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_pricing_table" ADD CONSTRAINT "_solutions_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_embed" ADD CONSTRAINT "_solutions_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_embed" ADD CONSTRAINT "_solutions_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_testimonial" ADD CONSTRAINT "_solutions_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_testimonial" ADD CONSTRAINT "_solutions_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_comparison_table_columns" ADD CONSTRAINT "_solutions_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_solutions_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_comparison_table_rows" ADD CONSTRAINT "_solutions_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_blocks_comparison_table" ADD CONSTRAINT "_solutions_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_parent_id_solutions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."solutions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v" ADD CONSTRAINT "_solutions_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_solutions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_platform_hubs_fk" FOREIGN KEY ("platform_hubs_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_proof_links" ADD CONSTRAINT "markets_proof_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_hero" ADD CONSTRAINT "markets_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markets_blocks_hero" ADD CONSTRAINT "markets_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_rich_text_section" ADD CONSTRAINT "markets_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_feature_grid_items" ADD CONSTRAINT "markets_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_feature_grid" ADD CONSTRAINT "markets_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_pillar_cards_cards" ADD CONSTRAINT "markets_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_pillar_cards" ADD CONSTRAINT "markets_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "markets_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_metrics_callout_row" ADD CONSTRAINT "markets_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_case_study_card_list" ADD CONSTRAINT "markets_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_cta_band" ADD CONSTRAINT "markets_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_faq_accordion_faqs" ADD CONSTRAINT "markets_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_faq_accordion" ADD CONSTRAINT "markets_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_trust_strip" ADD CONSTRAINT "markets_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_pricing_table_tiers_features" ADD CONSTRAINT "markets_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_pricing_table_tiers" ADD CONSTRAINT "markets_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_pricing_table" ADD CONSTRAINT "markets_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_embed" ADD CONSTRAINT "markets_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markets_blocks_embed" ADD CONSTRAINT "markets_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_testimonial" ADD CONSTRAINT "markets_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markets_blocks_testimonial" ADD CONSTRAINT "markets_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_comparison_table_columns" ADD CONSTRAINT "markets_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_comparison_table_rows_cells" ADD CONSTRAINT "markets_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_comparison_table_rows" ADD CONSTRAINT "markets_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_blocks_comparison_table" ADD CONSTRAINT "markets_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets" ADD CONSTRAINT "markets_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markets_rels" ADD CONSTRAINT "markets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_rels" ADD CONSTRAINT "markets_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markets_rels" ADD CONSTRAINT "markets_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_version_proof_links" ADD CONSTRAINT "_markets_v_version_proof_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_hero" ADD CONSTRAINT "_markets_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_hero" ADD CONSTRAINT "_markets_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_rich_text_section" ADD CONSTRAINT "_markets_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_feature_grid_items" ADD CONSTRAINT "_markets_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_feature_grid" ADD CONSTRAINT "_markets_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_markets_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_pillar_cards" ADD CONSTRAINT "_markets_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_markets_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_metrics_callout_row" ADD CONSTRAINT "_markets_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_case_study_card_list" ADD CONSTRAINT "_markets_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_cta_band" ADD CONSTRAINT "_markets_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_markets_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_faq_accordion" ADD CONSTRAINT "_markets_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_trust_strip" ADD CONSTRAINT "_markets_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_markets_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_markets_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_pricing_table" ADD CONSTRAINT "_markets_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_embed" ADD CONSTRAINT "_markets_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_embed" ADD CONSTRAINT "_markets_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_testimonial" ADD CONSTRAINT "_markets_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_testimonial" ADD CONSTRAINT "_markets_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_comparison_table_columns" ADD CONSTRAINT "_markets_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_markets_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_comparison_table_rows" ADD CONSTRAINT "_markets_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_blocks_comparison_table" ADD CONSTRAINT "_markets_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v" ADD CONSTRAINT "_markets_v_parent_id_markets_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."markets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markets_v" ADD CONSTRAINT "_markets_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markets_v_rels" ADD CONSTRAINT "_markets_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_markets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_rels" ADD CONSTRAINT "_markets_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markets_v_rels" ADD CONSTRAINT "_markets_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_commerce_models" ADD CONSTRAINT "case_studies_commerce_models_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_metrics" ADD CONSTRAINT "case_studies_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_platform_from_id_platform_hubs_id_fk" FOREIGN KEY ("platform_from_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_platform_to_id_platform_hubs_id_fk" FOREIGN KEY ("platform_to_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_markets_fk" FOREIGN KEY ("markets_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_commerce_models" ADD CONSTRAINT "_case_studies_v_version_commerce_models_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_metrics" ADD CONSTRAINT "_case_studies_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_platform_from_id_platform_hubs_id_fk" FOREIGN KEY ("version_platform_from_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_platform_to_id_platform_hubs_id_fk" FOREIGN KEY ("version_platform_to_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_markets_fk" FOREIGN KEY ("markets_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "open_source_projects" ADD CONSTRAINT "open_source_projects_platform_id_platform_hubs_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platform_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_related_migration_page_id_migration_pages_id_fk" FOREIGN KEY ("related_migration_page_id") REFERENCES "public"."migration_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_related_migration_page_id_migration_pages_id_fk" FOREIGN KEY ("version_related_migration_page_id") REFERENCES "public"."migration_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_hero" ADD CONSTRAINT "lead_magnets_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_hero" ADD CONSTRAINT "lead_magnets_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_rich_text_section" ADD CONSTRAINT "lead_magnets_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_feature_grid_items" ADD CONSTRAINT "lead_magnets_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_feature_grid" ADD CONSTRAINT "lead_magnets_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_pillar_cards_cards" ADD CONSTRAINT "lead_magnets_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_pillar_cards" ADD CONSTRAINT "lead_magnets_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "lead_magnets_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_metrics_callout_row" ADD CONSTRAINT "lead_magnets_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_case_study_card_list" ADD CONSTRAINT "lead_magnets_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_cta_band" ADD CONSTRAINT "lead_magnets_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_faq_accordion_faqs" ADD CONSTRAINT "lead_magnets_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_faq_accordion" ADD CONSTRAINT "lead_magnets_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_trust_strip" ADD CONSTRAINT "lead_magnets_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_pricing_table_tiers_features" ADD CONSTRAINT "lead_magnets_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_pricing_table_tiers" ADD CONSTRAINT "lead_magnets_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_pricing_table" ADD CONSTRAINT "lead_magnets_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_embed" ADD CONSTRAINT "lead_magnets_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_embed" ADD CONSTRAINT "lead_magnets_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_testimonial" ADD CONSTRAINT "lead_magnets_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_testimonial" ADD CONSTRAINT "lead_magnets_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_comparison_table_columns" ADD CONSTRAINT "lead_magnets_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_comparison_table_rows_cells" ADD CONSTRAINT "lead_magnets_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_comparison_table_rows" ADD CONSTRAINT "lead_magnets_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_blocks_comparison_table" ADD CONSTRAINT "lead_magnets_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets" ADD CONSTRAINT "lead_magnets_asset_file_id_media_id_fk" FOREIGN KEY ("asset_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets" ADD CONSTRAINT "lead_magnets_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets" ADD CONSTRAINT "lead_magnets_migration_page_id_migration_pages_id_fk" FOREIGN KEY ("migration_page_id") REFERENCES "public"."migration_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets" ADD CONSTRAINT "lead_magnets_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lead_magnets_rels" ADD CONSTRAINT "lead_magnets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lead_magnets_rels" ADD CONSTRAINT "lead_magnets_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_hero" ADD CONSTRAINT "_lead_magnets_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_hero" ADD CONSTRAINT "_lead_magnets_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_rich_text_section" ADD CONSTRAINT "_lead_magnets_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_feature_grid_items" ADD CONSTRAINT "_lead_magnets_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_feature_grid" ADD CONSTRAINT "_lead_magnets_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_lead_magnets_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_pillar_cards" ADD CONSTRAINT "_lead_magnets_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_lead_magnets_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_metrics_callout_row" ADD CONSTRAINT "_lead_magnets_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_case_study_card_list" ADD CONSTRAINT "_lead_magnets_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_cta_band" ADD CONSTRAINT "_lead_magnets_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_lead_magnets_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_faq_accordion" ADD CONSTRAINT "_lead_magnets_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_trust_strip" ADD CONSTRAINT "_lead_magnets_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_lead_magnets_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_lead_magnets_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_pricing_table" ADD CONSTRAINT "_lead_magnets_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_embed" ADD CONSTRAINT "_lead_magnets_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_embed" ADD CONSTRAINT "_lead_magnets_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_testimonial" ADD CONSTRAINT "_lead_magnets_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_testimonial" ADD CONSTRAINT "_lead_magnets_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_comparison_table_columns" ADD CONSTRAINT "_lead_magnets_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_lead_magnets_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_comparison_table_rows" ADD CONSTRAINT "_lead_magnets_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_blocks_comparison_table" ADD CONSTRAINT "_lead_magnets_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v" ADD CONSTRAINT "_lead_magnets_v_parent_id_lead_magnets_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lead_magnets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v" ADD CONSTRAINT "_lead_magnets_v_version_asset_file_id_media_id_fk" FOREIGN KEY ("version_asset_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v" ADD CONSTRAINT "_lead_magnets_v_version_form_id_forms_id_fk" FOREIGN KEY ("version_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v" ADD CONSTRAINT "_lead_magnets_v_version_migration_page_id_migration_pages_id_fk" FOREIGN KEY ("version_migration_page_id") REFERENCES "public"."migration_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v" ADD CONSTRAINT "_lead_magnets_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_rels" ADD CONSTRAINT "_lead_magnets_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_lead_magnets_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lead_magnets_v_rels" ADD CONSTRAINT "_lead_magnets_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_section" ADD CONSTRAINT "pages_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_cards_cards" ADD CONSTRAINT "pages_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillar_cards" ADD CONSTRAINT "pages_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "pages_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_callout_row" ADD CONSTRAINT "pages_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_case_study_card_list" ADD CONSTRAINT "pages_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_faqs" ADD CONSTRAINT "pages_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_strip" ADD CONSTRAINT "pages_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_tiers_features" ADD CONSTRAINT "pages_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_tiers" ADD CONSTRAINT "pages_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_columns" ADD CONSTRAINT "pages_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_rows_cells" ADD CONSTRAINT "pages_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table_rows" ADD CONSTRAINT "pages_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_comparison_table" ADD CONSTRAINT "pages_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_section" ADD CONSTRAINT "_pages_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_cards_cards" ADD CONSTRAINT "_pages_v_blocks_pillar_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillar_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillar_cards" ADD CONSTRAINT "_pages_v_blocks_pillar_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_callout_row_metrics" ADD CONSTRAINT "_pages_v_blocks_metrics_callout_row_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics_callout_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_callout_row" ADD CONSTRAINT "_pages_v_blocks_metrics_callout_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_case_study_card_list" ADD CONSTRAINT "_pages_v_blocks_case_study_card_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_faqs" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_strip" ADD CONSTRAINT "_pages_v_blocks_trust_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table_tiers_features" ADD CONSTRAINT "_pages_v_blocks_pricing_table_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_table_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table_tiers" ADD CONSTRAINT "_pages_v_blocks_pricing_table_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_table" ADD CONSTRAINT "_pages_v_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_columns" ADD CONSTRAINT "_pages_v_blocks_comparison_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_comparison_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table_rows" ADD CONSTRAINT "_pages_v_blocks_comparison_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_comparison_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_comparison_table" ADD CONSTRAINT "_pages_v_blocks_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_platform_hubs_fk" FOREIGN KEY ("platform_hubs_id") REFERENCES "public"."platform_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_migration_pages_fk" FOREIGN KEY ("migration_pages_id") REFERENCES "public"."migration_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_markets_fk" FOREIGN KEY ("markets_id") REFERENCES "public"."markets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_open_source_projects_fk" FOREIGN KEY ("open_source_projects_id") REFERENCES "public"."open_source_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lead_magnets_fk" FOREIGN KEY ("lead_magnets_id") REFERENCES "public"."lead_magnets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_primary_nav_dropdown" ADD CONSTRAINT "navigation_primary_nav_dropdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_nav" ADD CONSTRAINT "navigation_primary_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_redirects" ADD CONSTRAINT "redirects_redirects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_config_primary_ctas" ADD CONSTRAINT "cta_config_primary_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_config"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_config_booking_event_types" ADD CONSTRAINT "cta_config_booking_event_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_config"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "authors_headshot_idx" ON "authors" USING btree ("headshot_id");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories" USING btree ("name");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_name_idx" ON "tags" USING btree ("name");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "testimonials_headshot_idx" ON "testimonials" USING btree ("headshot_id");
  CREATE INDEX "testimonials_platform_idx" ON "testimonials" USING btree ("platform_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "services_engagement_models_order_idx" ON "services_engagement_models" USING btree ("_order");
  CREATE INDEX "services_engagement_models_parent_id_idx" ON "services_engagement_models" USING btree ("_parent_id");
  CREATE INDEX "services_proof_points_order_idx" ON "services_proof_points" USING btree ("_order");
  CREATE INDEX "services_proof_points_parent_id_idx" ON "services_proof_points" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_order_idx" ON "services_blocks_hero" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_parent_id_idx" ON "services_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_path_idx" ON "services_blocks_hero" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_media_idx" ON "services_blocks_hero" USING btree ("media_id");
  CREATE INDEX "services_blocks_rich_text_section_order_idx" ON "services_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "services_blocks_rich_text_section_parent_id_idx" ON "services_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_rich_text_section_path_idx" ON "services_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "services_blocks_feature_grid_items_order_idx" ON "services_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_items_parent_id_idx" ON "services_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_order_idx" ON "services_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_feature_grid_parent_id_idx" ON "services_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_feature_grid_path_idx" ON "services_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_pillar_cards_cards_order_idx" ON "services_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_pillar_cards_cards_parent_id_idx" ON "services_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pillar_cards_order_idx" ON "services_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_pillar_cards_parent_id_idx" ON "services_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pillar_cards_path_idx" ON "services_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "services_blocks_metrics_callout_row_metrics_order_idx" ON "services_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "services_blocks_metrics_callout_row_metrics_parent_id_idx" ON "services_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_metrics_callout_row_order_idx" ON "services_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "services_blocks_metrics_callout_row_parent_id_idx" ON "services_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_metrics_callout_row_path_idx" ON "services_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "services_blocks_case_study_card_list_order_idx" ON "services_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "services_blocks_case_study_card_list_parent_id_idx" ON "services_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_case_study_card_list_path_idx" ON "services_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_band_order_idx" ON "services_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_band_parent_id_idx" ON "services_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_band_path_idx" ON "services_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "services_blocks_faq_accordion_faqs_order_idx" ON "services_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_accordion_faqs_parent_id_idx" ON "services_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_accordion_order_idx" ON "services_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "services_blocks_faq_accordion_parent_id_idx" ON "services_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_faq_accordion_path_idx" ON "services_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "services_blocks_trust_strip_order_idx" ON "services_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "services_blocks_trust_strip_parent_id_idx" ON "services_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_trust_strip_path_idx" ON "services_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "services_blocks_pricing_table_tiers_features_order_idx" ON "services_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_tiers_features_parent_id_idx" ON "services_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_tiers_order_idx" ON "services_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_tiers_parent_id_idx" ON "services_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_order_idx" ON "services_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "services_blocks_pricing_table_parent_id_idx" ON "services_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_pricing_table_path_idx" ON "services_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "services_blocks_embed_order_idx" ON "services_blocks_embed" USING btree ("_order");
  CREATE INDEX "services_blocks_embed_parent_id_idx" ON "services_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_embed_path_idx" ON "services_blocks_embed" USING btree ("_path");
  CREATE INDEX "services_blocks_embed_poster_idx" ON "services_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "services_blocks_testimonial_order_idx" ON "services_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "services_blocks_testimonial_parent_id_idx" ON "services_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_testimonial_path_idx" ON "services_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "services_blocks_testimonial_testimonial_idx" ON "services_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "services_blocks_comparison_table_columns_order_idx" ON "services_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "services_blocks_comparison_table_columns_parent_id_idx" ON "services_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_comparison_table_rows_cells_order_idx" ON "services_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "services_blocks_comparison_table_rows_cells_parent_id_idx" ON "services_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_comparison_table_rows_order_idx" ON "services_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "services_blocks_comparison_table_rows_parent_id_idx" ON "services_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_comparison_table_order_idx" ON "services_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "services_blocks_comparison_table_parent_id_idx" ON "services_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_comparison_table_path_idx" ON "services_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "services_parent_service_idx" ON "services" USING btree ("parent_service_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_seo_seo_og_image_idx" ON "services" USING btree ("seo_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_case_studies_id_idx" ON "services_rels" USING btree ("case_studies_id");
  CREATE INDEX "_services_v_version_engagement_models_order_idx" ON "_services_v_version_engagement_models" USING btree ("_order");
  CREATE INDEX "_services_v_version_engagement_models_parent_id_idx" ON "_services_v_version_engagement_models" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_proof_points_order_idx" ON "_services_v_version_proof_points" USING btree ("_order");
  CREATE INDEX "_services_v_version_proof_points_parent_id_idx" ON "_services_v_version_proof_points" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_order_idx" ON "_services_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_hero_parent_id_idx" ON "_services_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_hero_path_idx" ON "_services_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_hero_media_idx" ON "_services_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_services_v_blocks_rich_text_section_order_idx" ON "_services_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_rich_text_section_parent_id_idx" ON "_services_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_rich_text_section_path_idx" ON "_services_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_feature_grid_items_order_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_items_parent_id_idx" ON "_services_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_order_idx" ON "_services_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_feature_grid_parent_id_idx" ON "_services_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_feature_grid_path_idx" ON "_services_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_pillar_cards_cards_order_idx" ON "_services_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pillar_cards_cards_parent_id_idx" ON "_services_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pillar_cards_order_idx" ON "_services_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pillar_cards_parent_id_idx" ON "_services_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pillar_cards_path_idx" ON "_services_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_metrics_callout_row_metrics_order_idx" ON "_services_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_services_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_metrics_callout_row_order_idx" ON "_services_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_metrics_callout_row_parent_id_idx" ON "_services_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_metrics_callout_row_path_idx" ON "_services_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_case_study_card_list_order_idx" ON "_services_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_case_study_card_list_parent_id_idx" ON "_services_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_case_study_card_list_path_idx" ON "_services_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_cta_band_order_idx" ON "_services_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_cta_band_parent_id_idx" ON "_services_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_cta_band_path_idx" ON "_services_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_faq_accordion_faqs_order_idx" ON "_services_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_services_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_accordion_order_idx" ON "_services_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_faq_accordion_parent_id_idx" ON "_services_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_faq_accordion_path_idx" ON "_services_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_trust_strip_order_idx" ON "_services_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_trust_strip_parent_id_idx" ON "_services_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_trust_strip_path_idx" ON "_services_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_pricing_table_tiers_features_order_idx" ON "_services_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_services_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pricing_table_tiers_order_idx" ON "_services_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pricing_table_tiers_parent_id_idx" ON "_services_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pricing_table_order_idx" ON "_services_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_pricing_table_parent_id_idx" ON "_services_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_pricing_table_path_idx" ON "_services_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_embed_order_idx" ON "_services_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_embed_parent_id_idx" ON "_services_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_embed_path_idx" ON "_services_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_embed_poster_idx" ON "_services_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_services_v_blocks_testimonial_order_idx" ON "_services_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_testimonial_parent_id_idx" ON "_services_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_testimonial_path_idx" ON "_services_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_services_v_blocks_testimonial_testimonial_idx" ON "_services_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_services_v_blocks_comparison_table_columns_order_idx" ON "_services_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_comparison_table_columns_parent_id_idx" ON "_services_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_comparison_table_rows_cells_order_idx" ON "_services_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_services_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_comparison_table_rows_order_idx" ON "_services_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_comparison_table_rows_parent_id_idx" ON "_services_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_comparison_table_order_idx" ON "_services_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_comparison_table_parent_id_idx" ON "_services_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_comparison_table_path_idx" ON "_services_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_parent_service_idx" ON "_services_v" USING btree ("version_parent_service_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_seo_version_seo_og_image_idx" ON "_services_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_case_studies_id_idx" ON "_services_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "platform_hubs_blocks_hero_order_idx" ON "platform_hubs_blocks_hero" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_hero_parent_id_idx" ON "platform_hubs_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_hero_path_idx" ON "platform_hubs_blocks_hero" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_hero_media_idx" ON "platform_hubs_blocks_hero" USING btree ("media_id");
  CREATE INDEX "platform_hubs_blocks_rich_text_section_order_idx" ON "platform_hubs_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_rich_text_section_parent_id_idx" ON "platform_hubs_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_rich_text_section_path_idx" ON "platform_hubs_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_feature_grid_items_order_idx" ON "platform_hubs_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_feature_grid_items_parent_id_idx" ON "platform_hubs_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_feature_grid_order_idx" ON "platform_hubs_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_feature_grid_parent_id_idx" ON "platform_hubs_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_feature_grid_path_idx" ON "platform_hubs_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_pillar_cards_cards_order_idx" ON "platform_hubs_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_pillar_cards_cards_parent_id_idx" ON "platform_hubs_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_pillar_cards_order_idx" ON "platform_hubs_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_pillar_cards_parent_id_idx" ON "platform_hubs_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_pillar_cards_path_idx" ON "platform_hubs_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_metrics_callout_row_metrics_order_idx" ON "platform_hubs_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_metrics_callout_row_metrics_parent_id_idx" ON "platform_hubs_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_metrics_callout_row_order_idx" ON "platform_hubs_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_metrics_callout_row_parent_id_idx" ON "platform_hubs_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_metrics_callout_row_path_idx" ON "platform_hubs_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_case_study_card_list_order_idx" ON "platform_hubs_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_case_study_card_list_parent_id_idx" ON "platform_hubs_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_case_study_card_list_path_idx" ON "platform_hubs_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_cta_band_order_idx" ON "platform_hubs_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_cta_band_parent_id_idx" ON "platform_hubs_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_cta_band_path_idx" ON "platform_hubs_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_faq_accordion_faqs_order_idx" ON "platform_hubs_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_faq_accordion_faqs_parent_id_idx" ON "platform_hubs_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_faq_accordion_order_idx" ON "platform_hubs_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_faq_accordion_parent_id_idx" ON "platform_hubs_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_faq_accordion_path_idx" ON "platform_hubs_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_trust_strip_order_idx" ON "platform_hubs_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_trust_strip_parent_id_idx" ON "platform_hubs_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_trust_strip_path_idx" ON "platform_hubs_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_pricing_table_tiers_features_order_idx" ON "platform_hubs_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_pricing_table_tiers_features_parent_id_idx" ON "platform_hubs_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_pricing_table_tiers_order_idx" ON "platform_hubs_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_pricing_table_tiers_parent_id_idx" ON "platform_hubs_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_pricing_table_order_idx" ON "platform_hubs_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_pricing_table_parent_id_idx" ON "platform_hubs_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_pricing_table_path_idx" ON "platform_hubs_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_embed_order_idx" ON "platform_hubs_blocks_embed" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_embed_parent_id_idx" ON "platform_hubs_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_embed_path_idx" ON "platform_hubs_blocks_embed" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_embed_poster_idx" ON "platform_hubs_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "platform_hubs_blocks_testimonial_order_idx" ON "platform_hubs_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_testimonial_parent_id_idx" ON "platform_hubs_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_testimonial_path_idx" ON "platform_hubs_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "platform_hubs_blocks_testimonial_testimonial_idx" ON "platform_hubs_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "platform_hubs_blocks_comparison_table_columns_order_idx" ON "platform_hubs_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_comparison_table_columns_parent_id_idx" ON "platform_hubs_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_comparison_table_rows_cells_order_idx" ON "platform_hubs_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_comparison_table_rows_cells_parent_id_idx" ON "platform_hubs_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_comparison_table_rows_order_idx" ON "platform_hubs_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_comparison_table_rows_parent_id_idx" ON "platform_hubs_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_comparison_table_order_idx" ON "platform_hubs_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "platform_hubs_blocks_comparison_table_parent_id_idx" ON "platform_hubs_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "platform_hubs_blocks_comparison_table_path_idx" ON "platform_hubs_blocks_comparison_table" USING btree ("_path");
  CREATE UNIQUE INDEX "platform_hubs_slug_idx" ON "platform_hubs" USING btree ("slug");
  CREATE INDEX "platform_hubs_seo_seo_og_image_idx" ON "platform_hubs" USING btree ("seo_og_image_id");
  CREATE INDEX "platform_hubs_updated_at_idx" ON "platform_hubs" USING btree ("updated_at");
  CREATE INDEX "platform_hubs_created_at_idx" ON "platform_hubs" USING btree ("created_at");
  CREATE INDEX "platform_hubs__status_idx" ON "platform_hubs" USING btree ("_status");
  CREATE INDEX "platform_hubs_rels_order_idx" ON "platform_hubs_rels" USING btree ("order");
  CREATE INDEX "platform_hubs_rels_parent_idx" ON "platform_hubs_rels" USING btree ("parent_id");
  CREATE INDEX "platform_hubs_rels_path_idx" ON "platform_hubs_rels" USING btree ("path");
  CREATE INDEX "platform_hubs_rels_services_id_idx" ON "platform_hubs_rels" USING btree ("services_id");
  CREATE INDEX "platform_hubs_rels_migration_pages_id_idx" ON "platform_hubs_rels" USING btree ("migration_pages_id");
  CREATE INDEX "platform_hubs_rels_solutions_id_idx" ON "platform_hubs_rels" USING btree ("solutions_id");
  CREATE INDEX "platform_hubs_rels_case_studies_id_idx" ON "platform_hubs_rels" USING btree ("case_studies_id");
  CREATE INDEX "_platform_hubs_v_blocks_hero_order_idx" ON "_platform_hubs_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_hero_parent_id_idx" ON "_platform_hubs_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_hero_path_idx" ON "_platform_hubs_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_hero_media_idx" ON "_platform_hubs_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_platform_hubs_v_blocks_rich_text_section_order_idx" ON "_platform_hubs_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_rich_text_section_parent_id_idx" ON "_platform_hubs_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_rich_text_section_path_idx" ON "_platform_hubs_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_feature_grid_items_order_idx" ON "_platform_hubs_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_feature_grid_items_parent_id_idx" ON "_platform_hubs_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_feature_grid_order_idx" ON "_platform_hubs_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_feature_grid_parent_id_idx" ON "_platform_hubs_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_feature_grid_path_idx" ON "_platform_hubs_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_pillar_cards_cards_order_idx" ON "_platform_hubs_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_pillar_cards_cards_parent_id_idx" ON "_platform_hubs_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_pillar_cards_order_idx" ON "_platform_hubs_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_pillar_cards_parent_id_idx" ON "_platform_hubs_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_pillar_cards_path_idx" ON "_platform_hubs_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_metrics_callout_row_metrics_order_idx" ON "_platform_hubs_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_platform_hubs_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_metrics_callout_row_order_idx" ON "_platform_hubs_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_metrics_callout_row_parent_id_idx" ON "_platform_hubs_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_metrics_callout_row_path_idx" ON "_platform_hubs_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_case_study_card_list_order_idx" ON "_platform_hubs_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_case_study_card_list_parent_id_idx" ON "_platform_hubs_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_case_study_card_list_path_idx" ON "_platform_hubs_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_cta_band_order_idx" ON "_platform_hubs_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_cta_band_parent_id_idx" ON "_platform_hubs_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_cta_band_path_idx" ON "_platform_hubs_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_faq_accordion_faqs_order_idx" ON "_platform_hubs_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_platform_hubs_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_faq_accordion_order_idx" ON "_platform_hubs_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_faq_accordion_parent_id_idx" ON "_platform_hubs_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_faq_accordion_path_idx" ON "_platform_hubs_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_trust_strip_order_idx" ON "_platform_hubs_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_trust_strip_parent_id_idx" ON "_platform_hubs_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_trust_strip_path_idx" ON "_platform_hubs_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_tiers_features_order_idx" ON "_platform_hubs_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_platform_hubs_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_tiers_order_idx" ON "_platform_hubs_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_tiers_parent_id_idx" ON "_platform_hubs_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_order_idx" ON "_platform_hubs_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_parent_id_idx" ON "_platform_hubs_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_pricing_table_path_idx" ON "_platform_hubs_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_embed_order_idx" ON "_platform_hubs_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_embed_parent_id_idx" ON "_platform_hubs_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_embed_path_idx" ON "_platform_hubs_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_embed_poster_idx" ON "_platform_hubs_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_platform_hubs_v_blocks_testimonial_order_idx" ON "_platform_hubs_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_testimonial_parent_id_idx" ON "_platform_hubs_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_testimonial_path_idx" ON "_platform_hubs_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_blocks_testimonial_testimonial_idx" ON "_platform_hubs_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_columns_order_idx" ON "_platform_hubs_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_columns_parent_id_idx" ON "_platform_hubs_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_rows_cells_order_idx" ON "_platform_hubs_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_platform_hubs_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_rows_order_idx" ON "_platform_hubs_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_rows_parent_id_idx" ON "_platform_hubs_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_order_idx" ON "_platform_hubs_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_parent_id_idx" ON "_platform_hubs_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_platform_hubs_v_blocks_comparison_table_path_idx" ON "_platform_hubs_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_platform_hubs_v_parent_idx" ON "_platform_hubs_v" USING btree ("parent_id");
  CREATE INDEX "_platform_hubs_v_version_version_slug_idx" ON "_platform_hubs_v" USING btree ("version_slug");
  CREATE INDEX "_platform_hubs_v_version_seo_version_seo_og_image_idx" ON "_platform_hubs_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_platform_hubs_v_version_version_updated_at_idx" ON "_platform_hubs_v" USING btree ("version_updated_at");
  CREATE INDEX "_platform_hubs_v_version_version_created_at_idx" ON "_platform_hubs_v" USING btree ("version_created_at");
  CREATE INDEX "_platform_hubs_v_version_version__status_idx" ON "_platform_hubs_v" USING btree ("version__status");
  CREATE INDEX "_platform_hubs_v_created_at_idx" ON "_platform_hubs_v" USING btree ("created_at");
  CREATE INDEX "_platform_hubs_v_updated_at_idx" ON "_platform_hubs_v" USING btree ("updated_at");
  CREATE INDEX "_platform_hubs_v_latest_idx" ON "_platform_hubs_v" USING btree ("latest");
  CREATE INDEX "_platform_hubs_v_autosave_idx" ON "_platform_hubs_v" USING btree ("autosave");
  CREATE INDEX "_platform_hubs_v_rels_order_idx" ON "_platform_hubs_v_rels" USING btree ("order");
  CREATE INDEX "_platform_hubs_v_rels_parent_idx" ON "_platform_hubs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_platform_hubs_v_rels_path_idx" ON "_platform_hubs_v_rels" USING btree ("path");
  CREATE INDEX "_platform_hubs_v_rels_services_id_idx" ON "_platform_hubs_v_rels" USING btree ("services_id");
  CREATE INDEX "_platform_hubs_v_rels_migration_pages_id_idx" ON "_platform_hubs_v_rels" USING btree ("migration_pages_id");
  CREATE INDEX "_platform_hubs_v_rels_solutions_id_idx" ON "_platform_hubs_v_rels" USING btree ("solutions_id");
  CREATE INDEX "_platform_hubs_v_rels_case_studies_id_idx" ON "_platform_hubs_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "migration_pages_tco_block_comparison_rows_order_idx" ON "migration_pages_tco_block_comparison_rows" USING btree ("_order");
  CREATE INDEX "migration_pages_tco_block_comparison_rows_parent_id_idx" ON "migration_pages_tco_block_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "migration_pages_cutover_steps_order_idx" ON "migration_pages_cutover_steps" USING btree ("_order");
  CREATE INDEX "migration_pages_cutover_steps_parent_id_idx" ON "migration_pages_cutover_steps" USING btree ("_parent_id");
  CREATE INDEX "migration_pages_seo_preservation_order_idx" ON "migration_pages_seo_preservation" USING btree ("_order");
  CREATE INDEX "migration_pages_seo_preservation_parent_id_idx" ON "migration_pages_seo_preservation" USING btree ("_parent_id");
  CREATE INDEX "migration_pages_timeline_bands_order_idx" ON "migration_pages_timeline_bands" USING btree ("_order");
  CREATE INDEX "migration_pages_timeline_bands_parent_id_idx" ON "migration_pages_timeline_bands" USING btree ("_parent_id");
  CREATE INDEX "migration_pages_faqs_order_idx" ON "migration_pages_faqs" USING btree ("_order");
  CREATE INDEX "migration_pages_faqs_parent_id_idx" ON "migration_pages_faqs" USING btree ("_parent_id");
  CREATE INDEX "migration_pages_source_platform_idx" ON "migration_pages" USING btree ("source_platform_id");
  CREATE INDEX "migration_pages_target_platform_idx" ON "migration_pages" USING btree ("target_platform_id");
  CREATE INDEX "migration_pages_gated_asset_idx" ON "migration_pages" USING btree ("gated_asset_id");
  CREATE UNIQUE INDEX "migration_pages_slug_idx" ON "migration_pages" USING btree ("slug");
  CREATE INDEX "migration_pages_seo_seo_og_image_idx" ON "migration_pages" USING btree ("seo_og_image_id");
  CREATE INDEX "migration_pages_updated_at_idx" ON "migration_pages" USING btree ("updated_at");
  CREATE INDEX "migration_pages_created_at_idx" ON "migration_pages" USING btree ("created_at");
  CREATE INDEX "migration_pages__status_idx" ON "migration_pages" USING btree ("_status");
  CREATE INDEX "migration_pages_rels_order_idx" ON "migration_pages_rels" USING btree ("order");
  CREATE INDEX "migration_pages_rels_parent_idx" ON "migration_pages_rels" USING btree ("parent_id");
  CREATE INDEX "migration_pages_rels_path_idx" ON "migration_pages_rels" USING btree ("path");
  CREATE INDEX "migration_pages_rels_case_studies_id_idx" ON "migration_pages_rels" USING btree ("case_studies_id");
  CREATE INDEX "_migration_pages_v_version_tco_block_comparison_rows_order_idx" ON "_migration_pages_v_version_tco_block_comparison_rows" USING btree ("_order");
  CREATE INDEX "_migration_pages_v_version_tco_block_comparison_rows_parent_id_idx" ON "_migration_pages_v_version_tco_block_comparison_rows" USING btree ("_parent_id");
  CREATE INDEX "_migration_pages_v_version_cutover_steps_order_idx" ON "_migration_pages_v_version_cutover_steps" USING btree ("_order");
  CREATE INDEX "_migration_pages_v_version_cutover_steps_parent_id_idx" ON "_migration_pages_v_version_cutover_steps" USING btree ("_parent_id");
  CREATE INDEX "_migration_pages_v_version_seo_preservation_order_idx" ON "_migration_pages_v_version_seo_preservation" USING btree ("_order");
  CREATE INDEX "_migration_pages_v_version_seo_preservation_parent_id_idx" ON "_migration_pages_v_version_seo_preservation" USING btree ("_parent_id");
  CREATE INDEX "_migration_pages_v_version_timeline_bands_order_idx" ON "_migration_pages_v_version_timeline_bands" USING btree ("_order");
  CREATE INDEX "_migration_pages_v_version_timeline_bands_parent_id_idx" ON "_migration_pages_v_version_timeline_bands" USING btree ("_parent_id");
  CREATE INDEX "_migration_pages_v_version_faqs_order_idx" ON "_migration_pages_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_migration_pages_v_version_faqs_parent_id_idx" ON "_migration_pages_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_migration_pages_v_parent_idx" ON "_migration_pages_v" USING btree ("parent_id");
  CREATE INDEX "_migration_pages_v_version_version_source_platform_idx" ON "_migration_pages_v" USING btree ("version_source_platform_id");
  CREATE INDEX "_migration_pages_v_version_version_target_platform_idx" ON "_migration_pages_v" USING btree ("version_target_platform_id");
  CREATE INDEX "_migration_pages_v_version_version_gated_asset_idx" ON "_migration_pages_v" USING btree ("version_gated_asset_id");
  CREATE INDEX "_migration_pages_v_version_version_slug_idx" ON "_migration_pages_v" USING btree ("version_slug");
  CREATE INDEX "_migration_pages_v_version_seo_version_seo_og_image_idx" ON "_migration_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_migration_pages_v_version_version_updated_at_idx" ON "_migration_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_migration_pages_v_version_version_created_at_idx" ON "_migration_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_migration_pages_v_version_version__status_idx" ON "_migration_pages_v" USING btree ("version__status");
  CREATE INDEX "_migration_pages_v_created_at_idx" ON "_migration_pages_v" USING btree ("created_at");
  CREATE INDEX "_migration_pages_v_updated_at_idx" ON "_migration_pages_v" USING btree ("updated_at");
  CREATE INDEX "_migration_pages_v_latest_idx" ON "_migration_pages_v" USING btree ("latest");
  CREATE INDEX "_migration_pages_v_autosave_idx" ON "_migration_pages_v" USING btree ("autosave");
  CREATE INDEX "_migration_pages_v_rels_order_idx" ON "_migration_pages_v_rels" USING btree ("order");
  CREATE INDEX "_migration_pages_v_rels_parent_idx" ON "_migration_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_migration_pages_v_rels_path_idx" ON "_migration_pages_v_rels" USING btree ("path");
  CREATE INDEX "_migration_pages_v_rels_case_studies_id_idx" ON "_migration_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "solutions_capability_checklist_order_idx" ON "solutions_capability_checklist" USING btree ("_order");
  CREATE INDEX "solutions_capability_checklist_parent_id_idx" ON "solutions_capability_checklist" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_hero_order_idx" ON "solutions_blocks_hero" USING btree ("_order");
  CREATE INDEX "solutions_blocks_hero_parent_id_idx" ON "solutions_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_hero_path_idx" ON "solutions_blocks_hero" USING btree ("_path");
  CREATE INDEX "solutions_blocks_hero_media_idx" ON "solutions_blocks_hero" USING btree ("media_id");
  CREATE INDEX "solutions_blocks_rich_text_section_order_idx" ON "solutions_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "solutions_blocks_rich_text_section_parent_id_idx" ON "solutions_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_rich_text_section_path_idx" ON "solutions_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "solutions_blocks_feature_grid_items_order_idx" ON "solutions_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "solutions_blocks_feature_grid_items_parent_id_idx" ON "solutions_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_feature_grid_order_idx" ON "solutions_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "solutions_blocks_feature_grid_parent_id_idx" ON "solutions_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_feature_grid_path_idx" ON "solutions_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "solutions_blocks_pillar_cards_cards_order_idx" ON "solutions_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "solutions_blocks_pillar_cards_cards_parent_id_idx" ON "solutions_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_pillar_cards_order_idx" ON "solutions_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "solutions_blocks_pillar_cards_parent_id_idx" ON "solutions_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_pillar_cards_path_idx" ON "solutions_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "solutions_blocks_metrics_callout_row_metrics_order_idx" ON "solutions_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "solutions_blocks_metrics_callout_row_metrics_parent_id_idx" ON "solutions_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_metrics_callout_row_order_idx" ON "solutions_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "solutions_blocks_metrics_callout_row_parent_id_idx" ON "solutions_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_metrics_callout_row_path_idx" ON "solutions_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "solutions_blocks_case_study_card_list_order_idx" ON "solutions_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "solutions_blocks_case_study_card_list_parent_id_idx" ON "solutions_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_case_study_card_list_path_idx" ON "solutions_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "solutions_blocks_cta_band_order_idx" ON "solutions_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "solutions_blocks_cta_band_parent_id_idx" ON "solutions_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_cta_band_path_idx" ON "solutions_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "solutions_blocks_faq_accordion_faqs_order_idx" ON "solutions_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "solutions_blocks_faq_accordion_faqs_parent_id_idx" ON "solutions_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_faq_accordion_order_idx" ON "solutions_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "solutions_blocks_faq_accordion_parent_id_idx" ON "solutions_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_faq_accordion_path_idx" ON "solutions_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "solutions_blocks_trust_strip_order_idx" ON "solutions_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "solutions_blocks_trust_strip_parent_id_idx" ON "solutions_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_trust_strip_path_idx" ON "solutions_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "solutions_blocks_pricing_table_tiers_features_order_idx" ON "solutions_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "solutions_blocks_pricing_table_tiers_features_parent_id_idx" ON "solutions_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_pricing_table_tiers_order_idx" ON "solutions_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "solutions_blocks_pricing_table_tiers_parent_id_idx" ON "solutions_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_pricing_table_order_idx" ON "solutions_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "solutions_blocks_pricing_table_parent_id_idx" ON "solutions_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_pricing_table_path_idx" ON "solutions_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "solutions_blocks_embed_order_idx" ON "solutions_blocks_embed" USING btree ("_order");
  CREATE INDEX "solutions_blocks_embed_parent_id_idx" ON "solutions_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_embed_path_idx" ON "solutions_blocks_embed" USING btree ("_path");
  CREATE INDEX "solutions_blocks_embed_poster_idx" ON "solutions_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "solutions_blocks_testimonial_order_idx" ON "solutions_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "solutions_blocks_testimonial_parent_id_idx" ON "solutions_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_testimonial_path_idx" ON "solutions_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "solutions_blocks_testimonial_testimonial_idx" ON "solutions_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "solutions_blocks_comparison_table_columns_order_idx" ON "solutions_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "solutions_blocks_comparison_table_columns_parent_id_idx" ON "solutions_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_comparison_table_rows_cells_order_idx" ON "solutions_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "solutions_blocks_comparison_table_rows_cells_parent_id_idx" ON "solutions_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_comparison_table_rows_order_idx" ON "solutions_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "solutions_blocks_comparison_table_rows_parent_id_idx" ON "solutions_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_comparison_table_order_idx" ON "solutions_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "solutions_blocks_comparison_table_parent_id_idx" ON "solutions_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "solutions_blocks_comparison_table_path_idx" ON "solutions_blocks_comparison_table" USING btree ("_path");
  CREATE UNIQUE INDEX "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX "solutions_seo_seo_og_image_idx" ON "solutions" USING btree ("seo_og_image_id");
  CREATE INDEX "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX "solutions__status_idx" ON "solutions" USING btree ("_status");
  CREATE INDEX "solutions_rels_order_idx" ON "solutions_rels" USING btree ("order");
  CREATE INDEX "solutions_rels_parent_idx" ON "solutions_rels" USING btree ("parent_id");
  CREATE INDEX "solutions_rels_path_idx" ON "solutions_rels" USING btree ("path");
  CREATE INDEX "solutions_rels_platform_hubs_id_idx" ON "solutions_rels" USING btree ("platform_hubs_id");
  CREATE INDEX "solutions_rels_case_studies_id_idx" ON "solutions_rels" USING btree ("case_studies_id");
  CREATE INDEX "_solutions_v_version_capability_checklist_order_idx" ON "_solutions_v_version_capability_checklist" USING btree ("_order");
  CREATE INDEX "_solutions_v_version_capability_checklist_parent_id_idx" ON "_solutions_v_version_capability_checklist" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_hero_order_idx" ON "_solutions_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_hero_parent_id_idx" ON "_solutions_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_hero_path_idx" ON "_solutions_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_hero_media_idx" ON "_solutions_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_solutions_v_blocks_rich_text_section_order_idx" ON "_solutions_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_rich_text_section_parent_id_idx" ON "_solutions_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_rich_text_section_path_idx" ON "_solutions_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_feature_grid_items_order_idx" ON "_solutions_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_feature_grid_items_parent_id_idx" ON "_solutions_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_feature_grid_order_idx" ON "_solutions_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_feature_grid_parent_id_idx" ON "_solutions_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_feature_grid_path_idx" ON "_solutions_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_pillar_cards_cards_order_idx" ON "_solutions_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_pillar_cards_cards_parent_id_idx" ON "_solutions_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_pillar_cards_order_idx" ON "_solutions_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_pillar_cards_parent_id_idx" ON "_solutions_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_pillar_cards_path_idx" ON "_solutions_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_metrics_callout_row_metrics_order_idx" ON "_solutions_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_solutions_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_metrics_callout_row_order_idx" ON "_solutions_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_metrics_callout_row_parent_id_idx" ON "_solutions_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_metrics_callout_row_path_idx" ON "_solutions_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_case_study_card_list_order_idx" ON "_solutions_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_case_study_card_list_parent_id_idx" ON "_solutions_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_case_study_card_list_path_idx" ON "_solutions_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_cta_band_order_idx" ON "_solutions_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_cta_band_parent_id_idx" ON "_solutions_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_cta_band_path_idx" ON "_solutions_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_faq_accordion_faqs_order_idx" ON "_solutions_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_solutions_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_faq_accordion_order_idx" ON "_solutions_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_faq_accordion_parent_id_idx" ON "_solutions_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_faq_accordion_path_idx" ON "_solutions_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_trust_strip_order_idx" ON "_solutions_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_trust_strip_parent_id_idx" ON "_solutions_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_trust_strip_path_idx" ON "_solutions_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_pricing_table_tiers_features_order_idx" ON "_solutions_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_solutions_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_pricing_table_tiers_order_idx" ON "_solutions_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_pricing_table_tiers_parent_id_idx" ON "_solutions_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_pricing_table_order_idx" ON "_solutions_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_pricing_table_parent_id_idx" ON "_solutions_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_pricing_table_path_idx" ON "_solutions_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_embed_order_idx" ON "_solutions_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_embed_parent_id_idx" ON "_solutions_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_embed_path_idx" ON "_solutions_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_embed_poster_idx" ON "_solutions_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_solutions_v_blocks_testimonial_order_idx" ON "_solutions_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_testimonial_parent_id_idx" ON "_solutions_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_testimonial_path_idx" ON "_solutions_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_solutions_v_blocks_testimonial_testimonial_idx" ON "_solutions_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_solutions_v_blocks_comparison_table_columns_order_idx" ON "_solutions_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_comparison_table_columns_parent_id_idx" ON "_solutions_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_comparison_table_rows_cells_order_idx" ON "_solutions_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_solutions_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_comparison_table_rows_order_idx" ON "_solutions_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_comparison_table_rows_parent_id_idx" ON "_solutions_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_comparison_table_order_idx" ON "_solutions_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_solutions_v_blocks_comparison_table_parent_id_idx" ON "_solutions_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_solutions_v_blocks_comparison_table_path_idx" ON "_solutions_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_solutions_v_parent_idx" ON "_solutions_v" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_version_version_slug_idx" ON "_solutions_v" USING btree ("version_slug");
  CREATE INDEX "_solutions_v_version_seo_version_seo_og_image_idx" ON "_solutions_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_solutions_v_version_version_updated_at_idx" ON "_solutions_v" USING btree ("version_updated_at");
  CREATE INDEX "_solutions_v_version_version_created_at_idx" ON "_solutions_v" USING btree ("version_created_at");
  CREATE INDEX "_solutions_v_version_version__status_idx" ON "_solutions_v" USING btree ("version__status");
  CREATE INDEX "_solutions_v_created_at_idx" ON "_solutions_v" USING btree ("created_at");
  CREATE INDEX "_solutions_v_updated_at_idx" ON "_solutions_v" USING btree ("updated_at");
  CREATE INDEX "_solutions_v_latest_idx" ON "_solutions_v" USING btree ("latest");
  CREATE INDEX "_solutions_v_autosave_idx" ON "_solutions_v" USING btree ("autosave");
  CREATE INDEX "_solutions_v_rels_order_idx" ON "_solutions_v_rels" USING btree ("order");
  CREATE INDEX "_solutions_v_rels_parent_idx" ON "_solutions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_solutions_v_rels_path_idx" ON "_solutions_v_rels" USING btree ("path");
  CREATE INDEX "_solutions_v_rels_platform_hubs_id_idx" ON "_solutions_v_rels" USING btree ("platform_hubs_id");
  CREATE INDEX "_solutions_v_rels_case_studies_id_idx" ON "_solutions_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "markets_proof_links_order_idx" ON "markets_proof_links" USING btree ("_order");
  CREATE INDEX "markets_proof_links_parent_id_idx" ON "markets_proof_links" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_hero_order_idx" ON "markets_blocks_hero" USING btree ("_order");
  CREATE INDEX "markets_blocks_hero_parent_id_idx" ON "markets_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_hero_path_idx" ON "markets_blocks_hero" USING btree ("_path");
  CREATE INDEX "markets_blocks_hero_media_idx" ON "markets_blocks_hero" USING btree ("media_id");
  CREATE INDEX "markets_blocks_rich_text_section_order_idx" ON "markets_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "markets_blocks_rich_text_section_parent_id_idx" ON "markets_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_rich_text_section_path_idx" ON "markets_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "markets_blocks_feature_grid_items_order_idx" ON "markets_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "markets_blocks_feature_grid_items_parent_id_idx" ON "markets_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_feature_grid_order_idx" ON "markets_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "markets_blocks_feature_grid_parent_id_idx" ON "markets_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_feature_grid_path_idx" ON "markets_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "markets_blocks_pillar_cards_cards_order_idx" ON "markets_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "markets_blocks_pillar_cards_cards_parent_id_idx" ON "markets_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_pillar_cards_order_idx" ON "markets_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "markets_blocks_pillar_cards_parent_id_idx" ON "markets_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_pillar_cards_path_idx" ON "markets_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "markets_blocks_metrics_callout_row_metrics_order_idx" ON "markets_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "markets_blocks_metrics_callout_row_metrics_parent_id_idx" ON "markets_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_metrics_callout_row_order_idx" ON "markets_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "markets_blocks_metrics_callout_row_parent_id_idx" ON "markets_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_metrics_callout_row_path_idx" ON "markets_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "markets_blocks_case_study_card_list_order_idx" ON "markets_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "markets_blocks_case_study_card_list_parent_id_idx" ON "markets_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_case_study_card_list_path_idx" ON "markets_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "markets_blocks_cta_band_order_idx" ON "markets_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "markets_blocks_cta_band_parent_id_idx" ON "markets_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_cta_band_path_idx" ON "markets_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "markets_blocks_faq_accordion_faqs_order_idx" ON "markets_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "markets_blocks_faq_accordion_faqs_parent_id_idx" ON "markets_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_faq_accordion_order_idx" ON "markets_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "markets_blocks_faq_accordion_parent_id_idx" ON "markets_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_faq_accordion_path_idx" ON "markets_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "markets_blocks_trust_strip_order_idx" ON "markets_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "markets_blocks_trust_strip_parent_id_idx" ON "markets_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_trust_strip_path_idx" ON "markets_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "markets_blocks_pricing_table_tiers_features_order_idx" ON "markets_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "markets_blocks_pricing_table_tiers_features_parent_id_idx" ON "markets_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_pricing_table_tiers_order_idx" ON "markets_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "markets_blocks_pricing_table_tiers_parent_id_idx" ON "markets_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_pricing_table_order_idx" ON "markets_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "markets_blocks_pricing_table_parent_id_idx" ON "markets_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_pricing_table_path_idx" ON "markets_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "markets_blocks_embed_order_idx" ON "markets_blocks_embed" USING btree ("_order");
  CREATE INDEX "markets_blocks_embed_parent_id_idx" ON "markets_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_embed_path_idx" ON "markets_blocks_embed" USING btree ("_path");
  CREATE INDEX "markets_blocks_embed_poster_idx" ON "markets_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "markets_blocks_testimonial_order_idx" ON "markets_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "markets_blocks_testimonial_parent_id_idx" ON "markets_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_testimonial_path_idx" ON "markets_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "markets_blocks_testimonial_testimonial_idx" ON "markets_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "markets_blocks_comparison_table_columns_order_idx" ON "markets_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "markets_blocks_comparison_table_columns_parent_id_idx" ON "markets_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_comparison_table_rows_cells_order_idx" ON "markets_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "markets_blocks_comparison_table_rows_cells_parent_id_idx" ON "markets_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_comparison_table_rows_order_idx" ON "markets_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "markets_blocks_comparison_table_rows_parent_id_idx" ON "markets_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_comparison_table_order_idx" ON "markets_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "markets_blocks_comparison_table_parent_id_idx" ON "markets_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "markets_blocks_comparison_table_path_idx" ON "markets_blocks_comparison_table" USING btree ("_path");
  CREATE UNIQUE INDEX "markets_slug_idx" ON "markets" USING btree ("slug");
  CREATE INDEX "markets_seo_seo_og_image_idx" ON "markets" USING btree ("seo_og_image_id");
  CREATE INDEX "markets_updated_at_idx" ON "markets" USING btree ("updated_at");
  CREATE INDEX "markets_created_at_idx" ON "markets" USING btree ("created_at");
  CREATE INDEX "markets__status_idx" ON "markets" USING btree ("_status");
  CREATE INDEX "markets_rels_order_idx" ON "markets_rels" USING btree ("order");
  CREATE INDEX "markets_rels_parent_idx" ON "markets_rels" USING btree ("parent_id");
  CREATE INDEX "markets_rels_path_idx" ON "markets_rels" USING btree ("path");
  CREATE INDEX "markets_rels_case_studies_id_idx" ON "markets_rels" USING btree ("case_studies_id");
  CREATE INDEX "markets_rels_posts_id_idx" ON "markets_rels" USING btree ("posts_id");
  CREATE INDEX "_markets_v_version_proof_links_order_idx" ON "_markets_v_version_proof_links" USING btree ("_order");
  CREATE INDEX "_markets_v_version_proof_links_parent_id_idx" ON "_markets_v_version_proof_links" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_hero_order_idx" ON "_markets_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_hero_parent_id_idx" ON "_markets_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_hero_path_idx" ON "_markets_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_hero_media_idx" ON "_markets_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_markets_v_blocks_rich_text_section_order_idx" ON "_markets_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_rich_text_section_parent_id_idx" ON "_markets_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_rich_text_section_path_idx" ON "_markets_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_feature_grid_items_order_idx" ON "_markets_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_feature_grid_items_parent_id_idx" ON "_markets_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_feature_grid_order_idx" ON "_markets_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_feature_grid_parent_id_idx" ON "_markets_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_feature_grid_path_idx" ON "_markets_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_pillar_cards_cards_order_idx" ON "_markets_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_pillar_cards_cards_parent_id_idx" ON "_markets_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_pillar_cards_order_idx" ON "_markets_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_pillar_cards_parent_id_idx" ON "_markets_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_pillar_cards_path_idx" ON "_markets_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_metrics_callout_row_metrics_order_idx" ON "_markets_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_markets_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_metrics_callout_row_order_idx" ON "_markets_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_metrics_callout_row_parent_id_idx" ON "_markets_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_metrics_callout_row_path_idx" ON "_markets_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_case_study_card_list_order_idx" ON "_markets_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_case_study_card_list_parent_id_idx" ON "_markets_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_case_study_card_list_path_idx" ON "_markets_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_cta_band_order_idx" ON "_markets_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_cta_band_parent_id_idx" ON "_markets_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_cta_band_path_idx" ON "_markets_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_faq_accordion_faqs_order_idx" ON "_markets_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_markets_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_faq_accordion_order_idx" ON "_markets_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_faq_accordion_parent_id_idx" ON "_markets_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_faq_accordion_path_idx" ON "_markets_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_trust_strip_order_idx" ON "_markets_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_trust_strip_parent_id_idx" ON "_markets_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_trust_strip_path_idx" ON "_markets_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_pricing_table_tiers_features_order_idx" ON "_markets_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_markets_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_pricing_table_tiers_order_idx" ON "_markets_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_pricing_table_tiers_parent_id_idx" ON "_markets_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_pricing_table_order_idx" ON "_markets_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_pricing_table_parent_id_idx" ON "_markets_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_pricing_table_path_idx" ON "_markets_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_embed_order_idx" ON "_markets_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_embed_parent_id_idx" ON "_markets_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_embed_path_idx" ON "_markets_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_embed_poster_idx" ON "_markets_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_markets_v_blocks_testimonial_order_idx" ON "_markets_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_testimonial_parent_id_idx" ON "_markets_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_testimonial_path_idx" ON "_markets_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_markets_v_blocks_testimonial_testimonial_idx" ON "_markets_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_markets_v_blocks_comparison_table_columns_order_idx" ON "_markets_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_comparison_table_columns_parent_id_idx" ON "_markets_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_comparison_table_rows_cells_order_idx" ON "_markets_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_markets_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_comparison_table_rows_order_idx" ON "_markets_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_comparison_table_rows_parent_id_idx" ON "_markets_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_comparison_table_order_idx" ON "_markets_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_markets_v_blocks_comparison_table_parent_id_idx" ON "_markets_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_markets_v_blocks_comparison_table_path_idx" ON "_markets_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_markets_v_parent_idx" ON "_markets_v" USING btree ("parent_id");
  CREATE INDEX "_markets_v_version_version_slug_idx" ON "_markets_v" USING btree ("version_slug");
  CREATE INDEX "_markets_v_version_seo_version_seo_og_image_idx" ON "_markets_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_markets_v_version_version_updated_at_idx" ON "_markets_v" USING btree ("version_updated_at");
  CREATE INDEX "_markets_v_version_version_created_at_idx" ON "_markets_v" USING btree ("version_created_at");
  CREATE INDEX "_markets_v_version_version__status_idx" ON "_markets_v" USING btree ("version__status");
  CREATE INDEX "_markets_v_created_at_idx" ON "_markets_v" USING btree ("created_at");
  CREATE INDEX "_markets_v_updated_at_idx" ON "_markets_v" USING btree ("updated_at");
  CREATE INDEX "_markets_v_latest_idx" ON "_markets_v" USING btree ("latest");
  CREATE INDEX "_markets_v_autosave_idx" ON "_markets_v" USING btree ("autosave");
  CREATE INDEX "_markets_v_rels_order_idx" ON "_markets_v_rels" USING btree ("order");
  CREATE INDEX "_markets_v_rels_parent_idx" ON "_markets_v_rels" USING btree ("parent_id");
  CREATE INDEX "_markets_v_rels_path_idx" ON "_markets_v_rels" USING btree ("path");
  CREATE INDEX "_markets_v_rels_case_studies_id_idx" ON "_markets_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_markets_v_rels_posts_id_idx" ON "_markets_v_rels" USING btree ("posts_id");
  CREATE INDEX "case_studies_commerce_models_order_idx" ON "case_studies_commerce_models" USING btree ("order");
  CREATE INDEX "case_studies_commerce_models_parent_idx" ON "case_studies_commerce_models" USING btree ("parent_id");
  CREATE INDEX "case_studies_metrics_order_idx" ON "case_studies_metrics" USING btree ("_order");
  CREATE INDEX "case_studies_metrics_parent_id_idx" ON "case_studies_metrics" USING btree ("_parent_id");
  CREATE INDEX "case_studies_platform_from_idx" ON "case_studies" USING btree ("platform_from_id");
  CREATE INDEX "case_studies_platform_to_idx" ON "case_studies" USING btree ("platform_to_id");
  CREATE INDEX "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_seo_seo_og_image_idx" ON "case_studies" USING btree ("seo_og_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_services_id_idx" ON "case_studies_rels" USING btree ("services_id");
  CREATE INDEX "case_studies_rels_markets_id_idx" ON "case_studies_rels" USING btree ("markets_id");
  CREATE INDEX "case_studies_rels_media_id_idx" ON "case_studies_rels" USING btree ("media_id");
  CREATE INDEX "case_studies_rels_tags_id_idx" ON "case_studies_rels" USING btree ("tags_id");
  CREATE INDEX "_case_studies_v_version_commerce_models_order_idx" ON "_case_studies_v_version_commerce_models" USING btree ("order");
  CREATE INDEX "_case_studies_v_version_commerce_models_parent_idx" ON "_case_studies_v_version_commerce_models" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_metrics_order_idx" ON "_case_studies_v_version_metrics" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_metrics_parent_id_idx" ON "_case_studies_v_version_metrics" USING btree ("_parent_id");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_platform_from_idx" ON "_case_studies_v" USING btree ("version_platform_from_id");
  CREATE INDEX "_case_studies_v_version_version_platform_to_idx" ON "_case_studies_v" USING btree ("version_platform_to_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_seo_version_seo_og_image_idx" ON "_case_studies_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_autosave_idx" ON "_case_studies_v" USING btree ("autosave");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_services_id_idx" ON "_case_studies_v_rels" USING btree ("services_id");
  CREATE INDEX "_case_studies_v_rels_markets_id_idx" ON "_case_studies_v_rels" USING btree ("markets_id");
  CREATE INDEX "_case_studies_v_rels_media_id_idx" ON "_case_studies_v_rels" USING btree ("media_id");
  CREATE INDEX "_case_studies_v_rels_tags_id_idx" ON "_case_studies_v_rels" USING btree ("tags_id");
  CREATE INDEX "open_source_projects_platform_idx" ON "open_source_projects" USING btree ("platform_id");
  CREATE UNIQUE INDEX "open_source_projects_slug_idx" ON "open_source_projects" USING btree ("slug");
  CREATE INDEX "open_source_projects_updated_at_idx" ON "open_source_projects" USING btree ("updated_at");
  CREATE INDEX "open_source_projects_created_at_idx" ON "open_source_projects" USING btree ("created_at");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_related_migration_page_idx" ON "posts" USING btree ("related_migration_page_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "posts_rels_services_id_idx" ON "posts_rels" USING btree ("services_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_related_migration_page_idx" ON "_posts_v" USING btree ("version_related_migration_page_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_rels_services_id_idx" ON "_posts_v_rels" USING btree ("services_id");
  CREATE INDEX "lead_magnets_blocks_hero_order_idx" ON "lead_magnets_blocks_hero" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_hero_parent_id_idx" ON "lead_magnets_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_hero_path_idx" ON "lead_magnets_blocks_hero" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_hero_media_idx" ON "lead_magnets_blocks_hero" USING btree ("media_id");
  CREATE INDEX "lead_magnets_blocks_rich_text_section_order_idx" ON "lead_magnets_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_rich_text_section_parent_id_idx" ON "lead_magnets_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_rich_text_section_path_idx" ON "lead_magnets_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_feature_grid_items_order_idx" ON "lead_magnets_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_feature_grid_items_parent_id_idx" ON "lead_magnets_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_feature_grid_order_idx" ON "lead_magnets_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_feature_grid_parent_id_idx" ON "lead_magnets_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_feature_grid_path_idx" ON "lead_magnets_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_pillar_cards_cards_order_idx" ON "lead_magnets_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_pillar_cards_cards_parent_id_idx" ON "lead_magnets_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_pillar_cards_order_idx" ON "lead_magnets_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_pillar_cards_parent_id_idx" ON "lead_magnets_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_pillar_cards_path_idx" ON "lead_magnets_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_metrics_callout_row_metrics_order_idx" ON "lead_magnets_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_metrics_callout_row_metrics_parent_id_idx" ON "lead_magnets_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_metrics_callout_row_order_idx" ON "lead_magnets_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_metrics_callout_row_parent_id_idx" ON "lead_magnets_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_metrics_callout_row_path_idx" ON "lead_magnets_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_case_study_card_list_order_idx" ON "lead_magnets_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_case_study_card_list_parent_id_idx" ON "lead_magnets_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_case_study_card_list_path_idx" ON "lead_magnets_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_cta_band_order_idx" ON "lead_magnets_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_cta_band_parent_id_idx" ON "lead_magnets_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_cta_band_path_idx" ON "lead_magnets_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_faq_accordion_faqs_order_idx" ON "lead_magnets_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_faq_accordion_faqs_parent_id_idx" ON "lead_magnets_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_faq_accordion_order_idx" ON "lead_magnets_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_faq_accordion_parent_id_idx" ON "lead_magnets_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_faq_accordion_path_idx" ON "lead_magnets_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_trust_strip_order_idx" ON "lead_magnets_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_trust_strip_parent_id_idx" ON "lead_magnets_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_trust_strip_path_idx" ON "lead_magnets_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_pricing_table_tiers_features_order_idx" ON "lead_magnets_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_pricing_table_tiers_features_parent_id_idx" ON "lead_magnets_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_pricing_table_tiers_order_idx" ON "lead_magnets_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_pricing_table_tiers_parent_id_idx" ON "lead_magnets_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_pricing_table_order_idx" ON "lead_magnets_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_pricing_table_parent_id_idx" ON "lead_magnets_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_pricing_table_path_idx" ON "lead_magnets_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_embed_order_idx" ON "lead_magnets_blocks_embed" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_embed_parent_id_idx" ON "lead_magnets_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_embed_path_idx" ON "lead_magnets_blocks_embed" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_embed_poster_idx" ON "lead_magnets_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "lead_magnets_blocks_testimonial_order_idx" ON "lead_magnets_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_testimonial_parent_id_idx" ON "lead_magnets_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_testimonial_path_idx" ON "lead_magnets_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "lead_magnets_blocks_testimonial_testimonial_idx" ON "lead_magnets_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "lead_magnets_blocks_comparison_table_columns_order_idx" ON "lead_magnets_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_comparison_table_columns_parent_id_idx" ON "lead_magnets_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_comparison_table_rows_cells_order_idx" ON "lead_magnets_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_comparison_table_rows_cells_parent_id_idx" ON "lead_magnets_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_comparison_table_rows_order_idx" ON "lead_magnets_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_comparison_table_rows_parent_id_idx" ON "lead_magnets_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_comparison_table_order_idx" ON "lead_magnets_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "lead_magnets_blocks_comparison_table_parent_id_idx" ON "lead_magnets_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "lead_magnets_blocks_comparison_table_path_idx" ON "lead_magnets_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "lead_magnets_asset_file_idx" ON "lead_magnets" USING btree ("asset_file_id");
  CREATE INDEX "lead_magnets_form_idx" ON "lead_magnets" USING btree ("form_id");
  CREATE INDEX "lead_magnets_migration_page_idx" ON "lead_magnets" USING btree ("migration_page_id");
  CREATE UNIQUE INDEX "lead_magnets_slug_idx" ON "lead_magnets" USING btree ("slug");
  CREATE INDEX "lead_magnets_seo_seo_og_image_idx" ON "lead_magnets" USING btree ("seo_og_image_id");
  CREATE INDEX "lead_magnets_updated_at_idx" ON "lead_magnets" USING btree ("updated_at");
  CREATE INDEX "lead_magnets_created_at_idx" ON "lead_magnets" USING btree ("created_at");
  CREATE INDEX "lead_magnets__status_idx" ON "lead_magnets" USING btree ("_status");
  CREATE INDEX "lead_magnets_rels_order_idx" ON "lead_magnets_rels" USING btree ("order");
  CREATE INDEX "lead_magnets_rels_parent_idx" ON "lead_magnets_rels" USING btree ("parent_id");
  CREATE INDEX "lead_magnets_rels_path_idx" ON "lead_magnets_rels" USING btree ("path");
  CREATE INDEX "lead_magnets_rels_case_studies_id_idx" ON "lead_magnets_rels" USING btree ("case_studies_id");
  CREATE INDEX "_lead_magnets_v_blocks_hero_order_idx" ON "_lead_magnets_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_hero_parent_id_idx" ON "_lead_magnets_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_hero_path_idx" ON "_lead_magnets_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_hero_media_idx" ON "_lead_magnets_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_lead_magnets_v_blocks_rich_text_section_order_idx" ON "_lead_magnets_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_rich_text_section_parent_id_idx" ON "_lead_magnets_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_rich_text_section_path_idx" ON "_lead_magnets_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_feature_grid_items_order_idx" ON "_lead_magnets_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_feature_grid_items_parent_id_idx" ON "_lead_magnets_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_feature_grid_order_idx" ON "_lead_magnets_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_feature_grid_parent_id_idx" ON "_lead_magnets_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_feature_grid_path_idx" ON "_lead_magnets_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_pillar_cards_cards_order_idx" ON "_lead_magnets_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_pillar_cards_cards_parent_id_idx" ON "_lead_magnets_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_pillar_cards_order_idx" ON "_lead_magnets_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_pillar_cards_parent_id_idx" ON "_lead_magnets_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_pillar_cards_path_idx" ON "_lead_magnets_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_metrics_callout_row_metrics_order_idx" ON "_lead_magnets_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_lead_magnets_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_metrics_callout_row_order_idx" ON "_lead_magnets_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_metrics_callout_row_parent_id_idx" ON "_lead_magnets_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_metrics_callout_row_path_idx" ON "_lead_magnets_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_case_study_card_list_order_idx" ON "_lead_magnets_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_case_study_card_list_parent_id_idx" ON "_lead_magnets_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_case_study_card_list_path_idx" ON "_lead_magnets_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_cta_band_order_idx" ON "_lead_magnets_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_cta_band_parent_id_idx" ON "_lead_magnets_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_cta_band_path_idx" ON "_lead_magnets_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_faq_accordion_faqs_order_idx" ON "_lead_magnets_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_lead_magnets_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_faq_accordion_order_idx" ON "_lead_magnets_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_faq_accordion_parent_id_idx" ON "_lead_magnets_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_faq_accordion_path_idx" ON "_lead_magnets_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_trust_strip_order_idx" ON "_lead_magnets_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_trust_strip_parent_id_idx" ON "_lead_magnets_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_trust_strip_path_idx" ON "_lead_magnets_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_tiers_features_order_idx" ON "_lead_magnets_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_lead_magnets_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_tiers_order_idx" ON "_lead_magnets_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_tiers_parent_id_idx" ON "_lead_magnets_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_order_idx" ON "_lead_magnets_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_parent_id_idx" ON "_lead_magnets_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_pricing_table_path_idx" ON "_lead_magnets_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_embed_order_idx" ON "_lead_magnets_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_embed_parent_id_idx" ON "_lead_magnets_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_embed_path_idx" ON "_lead_magnets_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_embed_poster_idx" ON "_lead_magnets_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_lead_magnets_v_blocks_testimonial_order_idx" ON "_lead_magnets_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_testimonial_parent_id_idx" ON "_lead_magnets_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_testimonial_path_idx" ON "_lead_magnets_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_blocks_testimonial_testimonial_idx" ON "_lead_magnets_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_columns_order_idx" ON "_lead_magnets_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_columns_parent_id_idx" ON "_lead_magnets_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_rows_cells_order_idx" ON "_lead_magnets_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_lead_magnets_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_rows_order_idx" ON "_lead_magnets_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_rows_parent_id_idx" ON "_lead_magnets_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_order_idx" ON "_lead_magnets_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_parent_id_idx" ON "_lead_magnets_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_lead_magnets_v_blocks_comparison_table_path_idx" ON "_lead_magnets_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_lead_magnets_v_parent_idx" ON "_lead_magnets_v" USING btree ("parent_id");
  CREATE INDEX "_lead_magnets_v_version_version_asset_file_idx" ON "_lead_magnets_v" USING btree ("version_asset_file_id");
  CREATE INDEX "_lead_magnets_v_version_version_form_idx" ON "_lead_magnets_v" USING btree ("version_form_id");
  CREATE INDEX "_lead_magnets_v_version_version_migration_page_idx" ON "_lead_magnets_v" USING btree ("version_migration_page_id");
  CREATE INDEX "_lead_magnets_v_version_version_slug_idx" ON "_lead_magnets_v" USING btree ("version_slug");
  CREATE INDEX "_lead_magnets_v_version_seo_version_seo_og_image_idx" ON "_lead_magnets_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_lead_magnets_v_version_version_updated_at_idx" ON "_lead_magnets_v" USING btree ("version_updated_at");
  CREATE INDEX "_lead_magnets_v_version_version_created_at_idx" ON "_lead_magnets_v" USING btree ("version_created_at");
  CREATE INDEX "_lead_magnets_v_version_version__status_idx" ON "_lead_magnets_v" USING btree ("version__status");
  CREATE INDEX "_lead_magnets_v_created_at_idx" ON "_lead_magnets_v" USING btree ("created_at");
  CREATE INDEX "_lead_magnets_v_updated_at_idx" ON "_lead_magnets_v" USING btree ("updated_at");
  CREATE INDEX "_lead_magnets_v_latest_idx" ON "_lead_magnets_v" USING btree ("latest");
  CREATE INDEX "_lead_magnets_v_autosave_idx" ON "_lead_magnets_v" USING btree ("autosave");
  CREATE INDEX "_lead_magnets_v_rels_order_idx" ON "_lead_magnets_v_rels" USING btree ("order");
  CREATE INDEX "_lead_magnets_v_rels_parent_idx" ON "_lead_magnets_v_rels" USING btree ("parent_id");
  CREATE INDEX "_lead_magnets_v_rels_path_idx" ON "_lead_magnets_v_rels" USING btree ("path");
  CREATE INDEX "_lead_magnets_v_rels_case_studies_id_idx" ON "_lead_magnets_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX "pages_blocks_rich_text_section_order_idx" ON "pages_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_section_parent_id_idx" ON "pages_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_section_path_idx" ON "pages_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillar_cards_cards_order_idx" ON "pages_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_cards_cards_parent_id_idx" ON "pages_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_cards_order_idx" ON "pages_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillar_cards_parent_id_idx" ON "pages_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillar_cards_path_idx" ON "pages_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_metrics_callout_row_metrics_order_idx" ON "pages_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_callout_row_metrics_parent_id_idx" ON "pages_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_callout_row_order_idx" ON "pages_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_callout_row_parent_id_idx" ON "pages_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_callout_row_path_idx" ON "pages_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_case_study_card_list_order_idx" ON "pages_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_case_study_card_list_parent_id_idx" ON "pages_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_case_study_card_list_path_idx" ON "pages_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_faqs_order_idx" ON "pages_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_faqs_parent_id_idx" ON "pages_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_strip_order_idx" ON "pages_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_strip_parent_id_idx" ON "pages_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_strip_path_idx" ON "pages_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_table_tiers_features_order_idx" ON "pages_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_tiers_features_parent_id_idx" ON "pages_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_tiers_order_idx" ON "pages_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_tiers_parent_id_idx" ON "pages_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_poster_idx" ON "pages_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_testimonial_idx" ON "pages_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "pages_blocks_comparison_table_columns_order_idx" ON "pages_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_columns_parent_id_idx" ON "pages_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_rows_cells_order_idx" ON "pages_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_rows_cells_parent_id_idx" ON "pages_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_rows_order_idx" ON "pages_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_rows_parent_id_idx" ON "pages_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_order_idx" ON "pages_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_comparison_table_parent_id_idx" ON "pages_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_comparison_table_path_idx" ON "pages_blocks_comparison_table" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_route_path_idx" ON "pages" USING btree ("route_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_case_studies_id_idx" ON "pages_rels" USING btree ("case_studies_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_rich_text_section_order_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_section_parent_id_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_section_path_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillar_cards_cards_order_idx" ON "_pages_v_blocks_pillar_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_cards_cards_parent_id_idx" ON "_pages_v_blocks_pillar_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_cards_order_idx" ON "_pages_v_blocks_pillar_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillar_cards_parent_id_idx" ON "_pages_v_blocks_pillar_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillar_cards_path_idx" ON "_pages_v_blocks_pillar_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_metrics_callout_row_metrics_order_idx" ON "_pages_v_blocks_metrics_callout_row_metrics" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_callout_row_metrics_parent_id_idx" ON "_pages_v_blocks_metrics_callout_row_metrics" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_callout_row_order_idx" ON "_pages_v_blocks_metrics_callout_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_callout_row_parent_id_idx" ON "_pages_v_blocks_metrics_callout_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_callout_row_path_idx" ON "_pages_v_blocks_metrics_callout_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_case_study_card_list_order_idx" ON "_pages_v_blocks_case_study_card_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_case_study_card_list_parent_id_idx" ON "_pages_v_blocks_case_study_card_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_case_study_card_list_path_idx" ON "_pages_v_blocks_case_study_card_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordion_faqs_order_idx" ON "_pages_v_blocks_faq_accordion_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_faqs_parent_id_idx" ON "_pages_v_blocks_faq_accordion_faqs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_strip_order_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_strip_parent_id_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_strip_path_idx" ON "_pages_v_blocks_trust_strip" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_table_tiers_features_order_idx" ON "_pages_v_blocks_pricing_table_tiers_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_tiers_features_parent_id_idx" ON "_pages_v_blocks_pricing_table_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_tiers_order_idx" ON "_pages_v_blocks_pricing_table_tiers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_tiers_parent_id_idx" ON "_pages_v_blocks_pricing_table_tiers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_order_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_table_parent_id_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_table_path_idx" ON "_pages_v_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_poster_idx" ON "_pages_v_blocks_embed" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_testimonial_order_idx" ON "_pages_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_parent_id_idx" ON "_pages_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_path_idx" ON "_pages_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_testimonial_idx" ON "_pages_v_blocks_testimonial" USING btree ("testimonial_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_columns_order_idx" ON "_pages_v_blocks_comparison_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_columns_parent_id_idx" ON "_pages_v_blocks_comparison_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_rows_cells_order_idx" ON "_pages_v_blocks_comparison_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_comparison_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_rows_order_idx" ON "_pages_v_blocks_comparison_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_rows_parent_id_idx" ON "_pages_v_blocks_comparison_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_order_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_comparison_table_parent_id_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_comparison_table_path_idx" ON "_pages_v_blocks_comparison_table" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_route_path_idx" ON "_pages_v" USING btree ("version_route_path");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_case_studies_id_idx" ON "_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_platform_hubs_id_idx" ON "payload_locked_documents_rels" USING btree ("platform_hubs_id");
  CREATE INDEX "payload_locked_documents_rels_migration_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("migration_pages_id");
  CREATE INDEX "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX "payload_locked_documents_rels_markets_id_idx" ON "payload_locked_documents_rels" USING btree ("markets_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_open_source_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("open_source_projects_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_lead_magnets_id_idx" ON "payload_locked_documents_rels" USING btree ("lead_magnets_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "navigation_primary_nav_dropdown_order_idx" ON "navigation_primary_nav_dropdown" USING btree ("_order");
  CREATE INDEX "navigation_primary_nav_dropdown_parent_id_idx" ON "navigation_primary_nav_dropdown" USING btree ("_parent_id");
  CREATE INDEX "navigation_primary_nav_order_idx" ON "navigation_primary_nav" USING btree ("_order");
  CREATE INDEX "navigation_primary_nav_parent_id_idx" ON "navigation_primary_nav" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "redirects_redirects_order_idx" ON "redirects_redirects" USING btree ("_order");
  CREATE INDEX "redirects_redirects_parent_id_idx" ON "redirects_redirects" USING btree ("_parent_id");
  CREATE INDEX "cta_config_primary_ctas_order_idx" ON "cta_config_primary_ctas" USING btree ("_order");
  CREATE INDEX "cta_config_primary_ctas_parent_id_idx" ON "cta_config_primary_ctas" USING btree ("_parent_id");
  CREATE INDEX "cta_config_booking_event_types_order_idx" ON "cta_config_booking_event_types" USING btree ("_order");
  CREATE INDEX "cta_config_booking_event_types_parent_id_idx" ON "cta_config_booking_event_types" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "services_engagement_models" CASCADE;
  DROP TABLE "services_proof_points" CASCADE;
  DROP TABLE "services_blocks_hero" CASCADE;
  DROP TABLE "services_blocks_rich_text_section" CASCADE;
  DROP TABLE "services_blocks_feature_grid_items" CASCADE;
  DROP TABLE "services_blocks_feature_grid" CASCADE;
  DROP TABLE "services_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "services_blocks_pillar_cards" CASCADE;
  DROP TABLE "services_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "services_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "services_blocks_case_study_card_list" CASCADE;
  DROP TABLE "services_blocks_cta_band" CASCADE;
  DROP TABLE "services_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "services_blocks_faq_accordion" CASCADE;
  DROP TABLE "services_blocks_trust_strip" CASCADE;
  DROP TABLE "services_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "services_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "services_blocks_pricing_table" CASCADE;
  DROP TABLE "services_blocks_embed" CASCADE;
  DROP TABLE "services_blocks_testimonial" CASCADE;
  DROP TABLE "services_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "services_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "services_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "services_blocks_comparison_table" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_engagement_models" CASCADE;
  DROP TABLE "_services_v_version_proof_points" CASCADE;
  DROP TABLE "_services_v_blocks_hero" CASCADE;
  DROP TABLE "_services_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_services_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_services_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_services_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_services_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_services_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_services_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_services_v_blocks_cta_band" CASCADE;
  DROP TABLE "_services_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_services_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_services_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_services_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_services_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_services_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_services_v_blocks_embed" CASCADE;
  DROP TABLE "_services_v_blocks_testimonial" CASCADE;
  DROP TABLE "_services_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_services_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_services_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_services_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "platform_hubs_blocks_hero" CASCADE;
  DROP TABLE "platform_hubs_blocks_rich_text_section" CASCADE;
  DROP TABLE "platform_hubs_blocks_feature_grid_items" CASCADE;
  DROP TABLE "platform_hubs_blocks_feature_grid" CASCADE;
  DROP TABLE "platform_hubs_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "platform_hubs_blocks_pillar_cards" CASCADE;
  DROP TABLE "platform_hubs_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "platform_hubs_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "platform_hubs_blocks_case_study_card_list" CASCADE;
  DROP TABLE "platform_hubs_blocks_cta_band" CASCADE;
  DROP TABLE "platform_hubs_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "platform_hubs_blocks_faq_accordion" CASCADE;
  DROP TABLE "platform_hubs_blocks_trust_strip" CASCADE;
  DROP TABLE "platform_hubs_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "platform_hubs_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "platform_hubs_blocks_pricing_table" CASCADE;
  DROP TABLE "platform_hubs_blocks_embed" CASCADE;
  DROP TABLE "platform_hubs_blocks_testimonial" CASCADE;
  DROP TABLE "platform_hubs_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "platform_hubs_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "platform_hubs_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "platform_hubs_blocks_comparison_table" CASCADE;
  DROP TABLE "platform_hubs" CASCADE;
  DROP TABLE "platform_hubs_rels" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_hero" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_cta_band" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_embed" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_testimonial" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_platform_hubs_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_platform_hubs_v" CASCADE;
  DROP TABLE "_platform_hubs_v_rels" CASCADE;
  DROP TABLE "migration_pages_tco_block_comparison_rows" CASCADE;
  DROP TABLE "migration_pages_cutover_steps" CASCADE;
  DROP TABLE "migration_pages_seo_preservation" CASCADE;
  DROP TABLE "migration_pages_timeline_bands" CASCADE;
  DROP TABLE "migration_pages_faqs" CASCADE;
  DROP TABLE "migration_pages" CASCADE;
  DROP TABLE "migration_pages_rels" CASCADE;
  DROP TABLE "_migration_pages_v_version_tco_block_comparison_rows" CASCADE;
  DROP TABLE "_migration_pages_v_version_cutover_steps" CASCADE;
  DROP TABLE "_migration_pages_v_version_seo_preservation" CASCADE;
  DROP TABLE "_migration_pages_v_version_timeline_bands" CASCADE;
  DROP TABLE "_migration_pages_v_version_faqs" CASCADE;
  DROP TABLE "_migration_pages_v" CASCADE;
  DROP TABLE "_migration_pages_v_rels" CASCADE;
  DROP TABLE "solutions_capability_checklist" CASCADE;
  DROP TABLE "solutions_blocks_hero" CASCADE;
  DROP TABLE "solutions_blocks_rich_text_section" CASCADE;
  DROP TABLE "solutions_blocks_feature_grid_items" CASCADE;
  DROP TABLE "solutions_blocks_feature_grid" CASCADE;
  DROP TABLE "solutions_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "solutions_blocks_pillar_cards" CASCADE;
  DROP TABLE "solutions_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "solutions_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "solutions_blocks_case_study_card_list" CASCADE;
  DROP TABLE "solutions_blocks_cta_band" CASCADE;
  DROP TABLE "solutions_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "solutions_blocks_faq_accordion" CASCADE;
  DROP TABLE "solutions_blocks_trust_strip" CASCADE;
  DROP TABLE "solutions_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "solutions_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "solutions_blocks_pricing_table" CASCADE;
  DROP TABLE "solutions_blocks_embed" CASCADE;
  DROP TABLE "solutions_blocks_testimonial" CASCADE;
  DROP TABLE "solutions_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "solutions_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "solutions_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "solutions_blocks_comparison_table" CASCADE;
  DROP TABLE "solutions" CASCADE;
  DROP TABLE "solutions_rels" CASCADE;
  DROP TABLE "_solutions_v_version_capability_checklist" CASCADE;
  DROP TABLE "_solutions_v_blocks_hero" CASCADE;
  DROP TABLE "_solutions_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_solutions_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_solutions_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_solutions_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_solutions_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_solutions_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_solutions_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_solutions_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_solutions_v_blocks_cta_band" CASCADE;
  DROP TABLE "_solutions_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_solutions_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_solutions_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_solutions_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_solutions_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_solutions_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_solutions_v_blocks_embed" CASCADE;
  DROP TABLE "_solutions_v_blocks_testimonial" CASCADE;
  DROP TABLE "_solutions_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_solutions_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_solutions_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_solutions_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_solutions_v" CASCADE;
  DROP TABLE "_solutions_v_rels" CASCADE;
  DROP TABLE "markets_proof_links" CASCADE;
  DROP TABLE "markets_blocks_hero" CASCADE;
  DROP TABLE "markets_blocks_rich_text_section" CASCADE;
  DROP TABLE "markets_blocks_feature_grid_items" CASCADE;
  DROP TABLE "markets_blocks_feature_grid" CASCADE;
  DROP TABLE "markets_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "markets_blocks_pillar_cards" CASCADE;
  DROP TABLE "markets_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "markets_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "markets_blocks_case_study_card_list" CASCADE;
  DROP TABLE "markets_blocks_cta_band" CASCADE;
  DROP TABLE "markets_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "markets_blocks_faq_accordion" CASCADE;
  DROP TABLE "markets_blocks_trust_strip" CASCADE;
  DROP TABLE "markets_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "markets_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "markets_blocks_pricing_table" CASCADE;
  DROP TABLE "markets_blocks_embed" CASCADE;
  DROP TABLE "markets_blocks_testimonial" CASCADE;
  DROP TABLE "markets_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "markets_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "markets_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "markets_blocks_comparison_table" CASCADE;
  DROP TABLE "markets" CASCADE;
  DROP TABLE "markets_rels" CASCADE;
  DROP TABLE "_markets_v_version_proof_links" CASCADE;
  DROP TABLE "_markets_v_blocks_hero" CASCADE;
  DROP TABLE "_markets_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_markets_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_markets_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_markets_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_markets_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_markets_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_markets_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_markets_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_markets_v_blocks_cta_band" CASCADE;
  DROP TABLE "_markets_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_markets_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_markets_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_markets_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_markets_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_markets_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_markets_v_blocks_embed" CASCADE;
  DROP TABLE "_markets_v_blocks_testimonial" CASCADE;
  DROP TABLE "_markets_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_markets_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_markets_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_markets_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_markets_v" CASCADE;
  DROP TABLE "_markets_v_rels" CASCADE;
  DROP TABLE "case_studies_commerce_models" CASCADE;
  DROP TABLE "case_studies_metrics" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_commerce_models" CASCADE;
  DROP TABLE "_case_studies_v_version_metrics" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "open_source_projects" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "lead_magnets_blocks_hero" CASCADE;
  DROP TABLE "lead_magnets_blocks_rich_text_section" CASCADE;
  DROP TABLE "lead_magnets_blocks_feature_grid_items" CASCADE;
  DROP TABLE "lead_magnets_blocks_feature_grid" CASCADE;
  DROP TABLE "lead_magnets_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "lead_magnets_blocks_pillar_cards" CASCADE;
  DROP TABLE "lead_magnets_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "lead_magnets_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "lead_magnets_blocks_case_study_card_list" CASCADE;
  DROP TABLE "lead_magnets_blocks_cta_band" CASCADE;
  DROP TABLE "lead_magnets_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "lead_magnets_blocks_faq_accordion" CASCADE;
  DROP TABLE "lead_magnets_blocks_trust_strip" CASCADE;
  DROP TABLE "lead_magnets_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "lead_magnets_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "lead_magnets_blocks_pricing_table" CASCADE;
  DROP TABLE "lead_magnets_blocks_embed" CASCADE;
  DROP TABLE "lead_magnets_blocks_testimonial" CASCADE;
  DROP TABLE "lead_magnets_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "lead_magnets_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "lead_magnets_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "lead_magnets_blocks_comparison_table" CASCADE;
  DROP TABLE "lead_magnets" CASCADE;
  DROP TABLE "lead_magnets_rels" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_hero" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_cta_band" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_embed" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_testimonial" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_lead_magnets_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_lead_magnets_v" CASCADE;
  DROP TABLE "_lead_magnets_v_rels" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text_section" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_pillar_cards" CASCADE;
  DROP TABLE "pages_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "pages_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "pages_blocks_case_study_card_list" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_trust_strip" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "pages_blocks_comparison_table" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pillar_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_callout_row_metrics" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_callout_row" CASCADE;
  DROP TABLE "_pages_v_blocks_case_study_card_list" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_strip" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table_tiers_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table_tiers" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_table" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_comparison_table" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_primary_nav_dropdown" CASCADE;
  DROP TABLE "navigation_primary_nav" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "redirects_redirects" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "cta_config_primary_ctas" CASCADE;
  DROP TABLE "cta_config_booking_event_types" CASCADE;
  DROP TABLE "cta_config" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_media_kind";
  DROP TYPE "public"."enum_clients_kind";
  DROP TYPE "public"."enum_services_blocks_hero_cta_key";
  DROP TYPE "public"."enum_services_blocks_hero_variant";
  DROP TYPE "public"."enum_services_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_services_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_services_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_services_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_services_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_services_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_services_blocks_trust_strip_source";
  DROP TYPE "public"."enum_services_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_services_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_services_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_services_blocks_testimonial_layout";
  DROP TYPE "public"."enum_services_service_pillar";
  DROP TYPE "public"."enum_services_service_category";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__services_v_blocks_hero_variant";
  DROP TYPE "public"."enum__services_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__services_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__services_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__services_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__services_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__services_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__services_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__services_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__services_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__services_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__services_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__services_v_version_service_pillar";
  DROP TYPE "public"."enum__services_v_version_service_category";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_platform_hubs_blocks_hero_cta_key";
  DROP TYPE "public"."enum_platform_hubs_blocks_hero_variant";
  DROP TYPE "public"."enum_platform_hubs_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_platform_hubs_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_platform_hubs_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_platform_hubs_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_platform_hubs_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_platform_hubs_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_platform_hubs_blocks_trust_strip_source";
  DROP TYPE "public"."enum_platform_hubs_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_platform_hubs_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_platform_hubs_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_platform_hubs_blocks_testimonial_layout";
  DROP TYPE "public"."enum_platform_hubs_tier";
  DROP TYPE "public"."enum_platform_hubs_status";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_hero_variant";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__platform_hubs_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__platform_hubs_v_version_tier";
  DROP TYPE "public"."enum__platform_hubs_v_version_status";
  DROP TYPE "public"."enum_migration_pages_status";
  DROP TYPE "public"."enum__migration_pages_v_version_status";
  DROP TYPE "public"."enum_solutions_blocks_hero_cta_key";
  DROP TYPE "public"."enum_solutions_blocks_hero_variant";
  DROP TYPE "public"."enum_solutions_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_solutions_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_solutions_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_solutions_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_solutions_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_solutions_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_solutions_blocks_trust_strip_source";
  DROP TYPE "public"."enum_solutions_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_solutions_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_solutions_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_solutions_blocks_testimonial_layout";
  DROP TYPE "public"."enum_solutions_model_key";
  DROP TYPE "public"."enum_solutions_status";
  DROP TYPE "public"."enum__solutions_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__solutions_v_blocks_hero_variant";
  DROP TYPE "public"."enum__solutions_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__solutions_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__solutions_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__solutions_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__solutions_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__solutions_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__solutions_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__solutions_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__solutions_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__solutions_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__solutions_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__solutions_v_version_model_key";
  DROP TYPE "public"."enum__solutions_v_version_status";
  DROP TYPE "public"."enum_markets_blocks_hero_cta_key";
  DROP TYPE "public"."enum_markets_blocks_hero_variant";
  DROP TYPE "public"."enum_markets_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_markets_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_markets_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_markets_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_markets_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_markets_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_markets_blocks_trust_strip_source";
  DROP TYPE "public"."enum_markets_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_markets_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_markets_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_markets_blocks_testimonial_layout";
  DROP TYPE "public"."enum_markets_region";
  DROP TYPE "public"."enum_markets_status";
  DROP TYPE "public"."enum__markets_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__markets_v_blocks_hero_variant";
  DROP TYPE "public"."enum__markets_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__markets_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__markets_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__markets_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__markets_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__markets_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__markets_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__markets_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__markets_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__markets_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__markets_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__markets_v_version_region";
  DROP TYPE "public"."enum__markets_v_version_status";
  DROP TYPE "public"."enum_case_studies_commerce_models";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum__case_studies_v_version_commerce_models";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_open_source_projects_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_lead_magnets_blocks_hero_cta_key";
  DROP TYPE "public"."enum_lead_magnets_blocks_hero_variant";
  DROP TYPE "public"."enum_lead_magnets_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_lead_magnets_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_lead_magnets_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_lead_magnets_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_lead_magnets_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_lead_magnets_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_lead_magnets_blocks_trust_strip_source";
  DROP TYPE "public"."enum_lead_magnets_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_lead_magnets_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_lead_magnets_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_lead_magnets_blocks_testimonial_layout";
  DROP TYPE "public"."enum_lead_magnets_status";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_hero_variant";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__lead_magnets_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__lead_magnets_v_version_status";
  DROP TYPE "public"."enum_pages_blocks_hero_cta_key";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_pages_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum_pages_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum_pages_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum_pages_blocks_trust_strip_source";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum_pages_blocks_embed_embed_kind";
  DROP TYPE "public"."enum_pages_blocks_embed_event_type_key";
  DROP TYPE "public"."enum_pages_blocks_testimonial_layout";
  DROP TYPE "public"."enum_pages_page_kind";
  DROP TYPE "public"."enum_pages_journey_position";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_cta_key";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pillar_cards_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_case_study_card_list_source";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_cta_key";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_secondary_cta_key";
  DROP TYPE "public"."enum__pages_v_blocks_trust_strip_source";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_table_tiers_cta_key";
  DROP TYPE "public"."enum__pages_v_blocks_embed_embed_kind";
  DROP TYPE "public"."enum__pages_v_blocks_embed_event_type_key";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__pages_v_version_page_kind";
  DROP TYPE "public"."enum__pages_v_version_journey_position";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_seo_defaults_robots_policy";
  DROP TYPE "public"."enum_redirects_redirects_type";
  DROP TYPE "public"."enum_cta_config_primary_ctas_key";
  DROP TYPE "public"."enum_cta_config_booking_event_types_key";`)
}
