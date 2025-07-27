CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"password" varchar(255) NOT NULL,
	"role" varchar(10) DEFAULT 'student' NOT NULL,
	"profile_picture" text,
	"course" text,
	"enrollment_year" integer,
	"status" varchar(20) DEFAULT 'Active',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
