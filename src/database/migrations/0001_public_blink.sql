CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(20) NOT NULL,
	"description" text,
	"credits" integer NOT NULL,
	CONSTRAINT "courses_code_unique" UNIQUE("code")
);

ALTER TABLE "users" ADD COLUMN "course_id" integer;
ALTER TABLE "users" ADD CONSTRAINT "users_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "course";