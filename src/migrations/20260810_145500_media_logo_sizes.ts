import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/** Adds logo + logoDisplay image size columns to media (216×62 header slot). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_url" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_width" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_height" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_mime_type" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_filesize" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_filename" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_url" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_width" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_height" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_mime_type" varchar;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_filesize" numeric;
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_display_filename" varchar;
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "media_sizes_logo_sizes_logo_filename_idx"
      ON "media" USING btree ("sizes_logo_filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_logo_display_sizes_logo_display_filename_idx"
      ON "media" USING btree ("sizes_logo_display_filename");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_sizes_logo_display_sizes_logo_display_filename_idx";
    DROP INDEX IF EXISTS "media_sizes_logo_sizes_logo_filename_idx";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_filename";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_filesize";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_mime_type";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_height";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_width";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_display_url";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_filename";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_filesize";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_mime_type";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_height";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_width";
    ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_url";
  `)
}
