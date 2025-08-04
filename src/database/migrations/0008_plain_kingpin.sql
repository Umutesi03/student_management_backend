CREATE TABLE "recent_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"type" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"course_id" integer,
	"created_at" timestamp DEFAULT now(),
	"visible_to" varchar(20) DEFAULT 'admin' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recent_activities" ADD CONSTRAINT "recent_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recent_activities" ADD CONSTRAINT "recent_activities_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;