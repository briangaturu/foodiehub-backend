CREATE TYPE "public"."statusType" AS ENUM('pending', 'canceled', 'completed');--> statement-breakpoint
ALTER TYPE "public"."userType" ADD VALUE 'disabled';--> statement-breakpoint
CREATE TABLE "mealTable" (
	"mealId" serial PRIMARY KEY NOT NULL,
	"mealName" varchar,
	"mealUrl" varchar,
	"mealDescription" varchar NOT NULL,
	"mealPrice" numeric NOT NULL,
	"mealBadge" varchar,
	"rating" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orderTable" (
	"orderId" serial PRIMARY KEY NOT NULL,
	"mealId" integer NOT NULL,
	"userId" integer NOT NULL,
	"statusType" "statusType" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "userTable" RENAME COLUMN "fullName" TO "firstName";--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "lastName" varchar;--> statement-breakpoint
ALTER TABLE "userTable" ADD COLUMN "profileUrl" varchar DEFAULT 'null';--> statement-breakpoint
ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_mealId_mealTable_mealId_fk" FOREIGN KEY ("mealId") REFERENCES "public"."mealTable"("mealId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;