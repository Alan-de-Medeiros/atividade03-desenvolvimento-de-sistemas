-- CreateTable
CREATE TABLE "developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "techs" TEXT[],
    "username" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "developer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "developer_username_key" ON "developer"("username");
