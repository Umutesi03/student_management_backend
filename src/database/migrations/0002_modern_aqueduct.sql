ALTER TABLE "users" ADD COLUMN "otp" varchar(10);
ALTER TABLE "users" ADD COLUMN "otp_verified" integer DEFAULT 0;