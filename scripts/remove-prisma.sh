# Remove Prisma schema file
rm -f prisma/schema.prisma

# Remove Prisma directory if empty
rmdir prisma 2>/dev/null || true

# Remove Prisma client generated files
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma

# Remove Prisma environment cache
rm -rf node_modules/.cache/prisma

echo "Prisma files removed successfully."
